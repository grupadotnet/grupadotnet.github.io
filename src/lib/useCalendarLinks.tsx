import { useCallback, useMemo, useState } from 'react';

export interface EventLinks {
  googleTemplateUrl: string;
  icsUrl: string;
  googleSubscribeUrl: string;
  webcalUrl: string;
}

export interface CalendarEventData {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  calendarName: string;
  eventLinks?: EventLinks;
}

export type CalendarApp =
  | 'google'
  | 'apple'
  | 'outlook-live'
  | 'outlook-office'
  | 'other';

export interface CalendarTargets {
  singular: {
    googleUrl: string;
    outlookLiveUrl: string;
    outlookOfficeUrl: string;
    downloadIcs: () => void;
  };
  subscribe: {
    googleUrl: string;
    webcalUrl: string;
    httpsFeedUrl: string;
    outlookLiveUrl: string;
    outlookOfficeUrl: string;
  };
}

const PREFERRED_CALENDAR_STORAGE_KEY = 'knpimi:preferred-calendar-app';

const VALID_CALENDAR_APPS = new Set<CalendarApp>([
  'google',
  'apple',
  'outlook-live',
  'outlook-office',
  'other',
]);

const utf8Encoder = new TextEncoder();

function formatUtcCompact(date: Date): string {
  if (Number.isNaN(date.getTime())) return '';
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

function unescapeIcsText(value: string): string {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim();
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

function foldIcsLine(line: string): string {
  if (utf8Encoder.encode(line).length <= 75) {
    return line;
  }

  const segments: string[] = [];
  let current = '';
  let currentBytes = 0;
  let maxBytes = 75;

  for (const char of line) {
    const charBytes = utf8Encoder.encode(char).length;
    if (currentBytes + charBytes > maxBytes && current.length > 0) {
      segments.push(current);
      current = char;
      currentBytes = charBytes;
      maxBytes = 74;
    } else {
      current += char;
      currentBytes += charBytes;
    }
  }

  if (current.length > 0) {
    segments.push(current);
  }

  return segments.join('\r\n ');
}

function decodeIcsDataUri(icsUrl: string): string {
  const commaIndex = icsUrl.indexOf(',');
  if (commaIndex === -1) return '';

  const header = icsUrl.slice(0, commaIndex).toLowerCase();
  const payload = icsUrl.slice(commaIndex + 1);

  if (header.includes(';base64')) {
    const binary = atob(payload);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  }

  return decodeURIComponent(payload);
}

function extractLocation(eventLinks?: EventLinks): string {
  if (!eventLinks) return '';

  if (eventLinks.googleTemplateUrl) {
    try {
      const parsed = new URL(eventLinks.googleTemplateUrl);
      const location = parsed.searchParams.get('location')?.trim();
      if (location) return location;
    } catch {
      // Ignore invalid template URL
    }
  }

  if (eventLinks.icsUrl?.startsWith('data:')) {
    try {
      const unfolded = decodeIcsDataUri(eventLinks.icsUrl).replace(
        /\r?\n[ \t]/g,
        ''
      );
      const match = unfolded.match(/^LOCATION(?:;[^:]*)?:(.*)$/im);
      if (match?.[1]) {
        return unescapeIcsText(match[1]);
      }
    } catch {
      // Ignore invalid data URI
    }
  }

  return '';
}

function sanitizeFilename(title: string): string {
  const normalized = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'spotkanie';
}

export function buildIcsContent(event: CalendarEventData): string {
  const location = extractLocation(event.eventLinks);
  const safeUidBase = (event.id || 'event').replace(/[^A-Za-z0-9._-]/g, '-');
  const startStamp = formatUtcCompact(event.start);
  const endStamp = formatUtcCompact(event.end);
  const uid = `${safeUidBase}-${event.start.getTime()}@knpimi.pk.edu.pl`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//KNPiMI PK//Harmonogram//PL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatUtcCompact(new Date())}`,
    ...(startStamp ? [`DTSTART:${startStamp}`] : []),
    ...(endStamp ? [`DTEND:${endStamp}`] : []),
    `SUMMARY:${escapeIcsText(event.title)}`,
    ...(event.description
      ? [`DESCRIPTION:${escapeIcsText(event.description)}`]
      : []),
    ...(location ? [`LOCATION:${escapeIcsText(location)}`] : []),
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return `${lines.map(foldIcsLine).join('\r\n')}\r\n`;
}

export function downloadEventIcs(event: CalendarEventData): void {
  if (
    Number.isNaN(event.start.getTime()) ||
    Number.isNaN(event.end.getTime())
  ) {
    return;
  }

  const icsContent = buildIcsContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `${sanitizeFilename(event.title)}.ics`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Delay revoking so iOS Safari finishes reading the blob resource
  window.setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 60_000);
}

function buildGoogleEventUrl(
  event: CalendarEventData,
  location: string
): string {
  const existing = event.eventLinks?.googleTemplateUrl;
  if (existing && /^https?:\/\//i.test(existing)) {
    return existing;
  }

  const startUtc = formatUtcCompact(event.start);
  const endUtc = formatUtcCompact(event.end);
  if (!startUtc || !endUtc) return '';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startUtc}/${endUtc}`,
  });

  if (event.description) {
    params.set('details', event.description);
  }
  if (location) {
    params.set('location', location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildOutlookEventUrl(
  event: CalendarEventData,
  host: 'outlook.live.com' | 'outlook.office.com',
  location: string
): string {
  if (
    Number.isNaN(event.start.getTime()) ||
    Number.isNaN(event.end.getTime())
  ) {
    return '';
  }

  const queryParts = [
    `path=${encodeURIComponent('/calendar/action/compose')}`,
    `rru=${encodeURIComponent('addevent')}`,
    `subject=${encodeURIComponent(event.title)}`,
    `startdt=${encodeURIComponent(event.start.toISOString())}`,
    `enddt=${encodeURIComponent(event.end.toISOString())}`,
  ];

  if (event.description) {
    queryParts.push(`body=${encodeURIComponent(event.description)}`);
  }
  if (location) {
    queryParts.push(`location=${encodeURIComponent(location)}`);
  }

  return `https://${host}/calendar/0/deeplink/compose?${queryParts.join('&')}`;
}

function normalizeWebcalUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  if (/^webcal:\/\//i.test(rawUrl)) return rawUrl;
  if (/^https?:\/\//i.test(rawUrl)) {
    return rawUrl.replace(/^https?:\/\//i, 'webcal://');
  }
  return '';
}

function toHttpsFeedUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;
  if (/^webcal:\/\//i.test(rawUrl)) {
    return rawUrl.replace(/^webcal:\/\//i, 'https://');
  }
  return '';
}

function buildGoogleSubscribeUrl(
  eventLinks?: EventLinks,
  webcalUrl?: string
): string {
  const existing = eventLinks?.googleSubscribeUrl;
  if (existing && /^https?:\/\//i.test(existing)) {
    return existing;
  }

  if (webcalUrl) {
    return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcalUrl)}`;
  }

  return '';
}

function buildOutlookSubscribeUrl(
  httpsFeedUrl: string,
  calendarName: string,
  host: 'outlook.live.com' | 'outlook.office.com'
): string {
  if (!httpsFeedUrl) return '';

  const name = calendarName || 'KNPiMI Harmonogram';
  return `https://${host}/calendar/0/addfromweb?name=${encodeURIComponent(name)}&url=${encodeURIComponent(httpsFeedUrl)}`;
}

function readPreferredCalendarApp(): CalendarApp | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(PREFERRED_CALENDAR_STORAGE_KEY);
    if (stored && VALID_CALENDAR_APPS.has(stored as CalendarApp)) {
      return stored as CalendarApp;
    }
  } catch {
    // Ignore storage access errors
  }
  return null;
}

export function usePreferredCalendarApp(): [
  CalendarApp | null,
  (app: CalendarApp | null) => void,
] {
  const [preferredApp, setPreferredApp] = useState<CalendarApp | null>(() =>
    readPreferredCalendarApp()
  );

  const updatePreferredApp = useCallback((app: CalendarApp | null) => {
    setPreferredApp(app);
    if (typeof window === 'undefined') return;
    try {
      if (app === null) {
        window.localStorage.removeItem(PREFERRED_CALENDAR_STORAGE_KEY);
      } else {
        window.localStorage.setItem(PREFERRED_CALENDAR_STORAGE_KEY, app);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  return [preferredApp, updatePreferredApp];
}

export function buildCalendarTargets(
  event: CalendarEventData
): CalendarTargets {
  const location = extractLocation(event.eventLinks);
  const webcalUrl = normalizeWebcalUrl(event.eventLinks?.webcalUrl);
  const httpsFeedUrl = toHttpsFeedUrl(event.eventLinks?.webcalUrl);

  return {
    singular: {
      googleUrl: buildGoogleEventUrl(event, location),
      outlookLiveUrl: buildOutlookEventUrl(event, 'outlook.live.com', location),
      outlookOfficeUrl: buildOutlookEventUrl(
        event,
        'outlook.office.com',
        location
      ),
      downloadIcs: () => downloadEventIcs(event),
    },
    subscribe: {
      googleUrl: buildGoogleSubscribeUrl(event.eventLinks, webcalUrl),
      webcalUrl,
      httpsFeedUrl,
      outlookLiveUrl: buildOutlookSubscribeUrl(
        httpsFeedUrl,
        event.calendarName,
        'outlook.live.com'
      ),
      outlookOfficeUrl: buildOutlookSubscribeUrl(
        httpsFeedUrl,
        event.calendarName,
        'outlook.office.com'
      ),
    },
  };
}

export function useCalendarLinks(event: CalendarEventData): CalendarTargets {
  return useMemo(() => buildCalendarTargets(event), [event]);
}
