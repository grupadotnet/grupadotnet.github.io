import { useRef, useState, type ReactNode } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import {
  RiAppleFill,
  RiArrowRightUpLine,
  RiCalendar2Line,
  RiCheckLine,
  RiDownload2Line,
  RiFileCopyLine,
  RiGoogleFill,
  RiMicrosoftFill,
} from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import { sections } from '@/lib/sections.ts';
import { useScrollAndWidth } from '@/lib/useScrollAndWidth.tsx';
import {
  buildCalendarTargets,
  useCalendarLinks,
  usePreferredCalendarApp,
  type CalendarApp,
  type CalendarEventData,
  type EventLinks,
} from '@/lib/useCalendarLinks.tsx';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ButtonGroup } from '@/components/ui/button-group.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';

export const Route = createFileRoute('/schedule')({
  component: Schedule,
  staticData: {
    titleData: extractTranslation('Schedule.navbarTitle', 'Harmonogram'),
    hideInNav: false,
    order: 3,
  },
});

interface EventType extends CalendarEventData {
  eventLinks: EventLinks;
}

interface RawEventType {
  id: string;
  title: string;
  description: string;
  start: string | number | Date;
  end: string | number | Date;
  calendarName: string;
  eventLinks: EventLinks;
}

type ActionMode = 'singular' | 'subscribe';

type DialogState =
  | { type: 'action'; event: EventType; mode: ActionMode }
  | { type: 'preference' }
  | null;

const POLISH_LOCALE = 'pl-PL';
const POLISH_TIME_ZONE = 'Europe/Warsaw';

const polishTimeFormatter = new Intl.DateTimeFormat(POLISH_LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: POLISH_TIME_ZONE,
});

const polishDateFormatter = new Intl.DateTimeFormat(POLISH_LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: POLISH_TIME_ZONE,
});

const polishDayKeyFormatter = new Intl.DateTimeFormat(POLISH_LOCALE, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: POLISH_TIME_ZONE,
});

function formatEventSchedule(start: Date, end: Date) {
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return { timeLabel: '', dateLabel: '' };
  }

  const startTime = polishTimeFormatter.format(start);
  const endTime = polishTimeFormatter.format(end);
  const isSameDay =
    polishDayKeyFormatter.format(start) === polishDayKeyFormatter.format(end);

  if (isSameDay) {
    return {
      timeLabel: `${startTime} – ${endTime}`,
      dateLabel: polishDateFormatter.format(start),
    };
  }

  return {
    timeLabel: `${polishDateFormatter.format(start)}, ${startTime}`,
    dateLabel: `– ${polishDateFormatter.format(end)}, ${endTime}`,
  };
}

function getCalendarAppLabel(app: CalendarApp, t: TFunction): string {
  switch (app) {
    case 'google':
      return t('Schedule.calendarApps.google.name', 'Google Kalendarz');
    case 'apple':
      return t(
        'Schedule.calendarApps.apple.name',
        'Kalendarz Apple (iPhone / Mac)'
      );
    case 'outlook-live':
      return t('Schedule.calendarApps.outlookLive.name', 'Outlook.com');
    case 'outlook-office':
      return t('Schedule.calendarApps.outlookOffice.name', 'Outlook 365');
    case 'other':
      return t(
        'Schedule.calendarApps.other.name',
        'Inny kalendarz (.ics / iCal)'
      );
  }
}

const fetchCalendarEvents = async (): Promise<EventType[]> => {
  // We still keep the cache buster because Google Apps Script is notoriously sticky
  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbzeFQDs7qwoKq2qZKYkn4BEX4mCY22FQYdGHYEnb_mDffa4ydn1AOQ71CM7d-zgxZV2JA/exec';
  const res = await fetch(`${scriptUrl}`);

  if (!res.ok) throw new Error('Failed to fetch events');

  const data: RawEventType[] = await res.json();

  return data.map((item) => ({
    calendarName: item.calendarName,
    id: item.id,
    title: item.title,
    description: item.description,
    start: new Date(item.start),
    end: new Date(item.end),
    eventLinks: item.eventLinks,
  }));
};

function Schedule() {
  const { t } = useTranslation();

  return (
    <div className="bg-background flex py-10 w-full min-w-0 items-center justify-center flex-col space-y-4">
      <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
        <RiCalendar2Line className="mr-2 h-4 w-4" />
        {t('Schedule.badge', 'Harmonogram spotkań')}
      </Badge>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {t('Schedule.title', 'Kiedy się spotykamy?')}
      </h2>
      <p className="max-w-2xl text-lg text-muted-foreground text-balance text-center">
        {t(
          'Schedule.paragraph',
          'Lista zaplanowanych spotkań na kolejny miesiąc'
        )}
      </p>
      {/* Suspense removed. The child component handles its own loading state */}
      <LoadedCarousel />
    </div>
  );
}

function LoadedCarousel() {
  const { t } = useTranslation();
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['calendarEvents'], // A unique key for this data
    queryFn: fetchCalendarEvents,
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes (won't refetch on tab switch)
  });
  const { isMobile } = useScrollAndWidth(useRef(null), '');
  const [preferredApp, setPreferredApp] = usePreferredCalendarApp();
  const [dialogState, setDialogState] = useState<DialogState>(null);

  const sortedEvents = [...events].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  // 3. Show Skeleton if fetching
  if (isLoading) {
    return <GhostCarousel isMobile={isMobile} />;
  }

  // 4. Show Empty State if no events
  if (sortedEvents.length === 0 || isError) {
    return (
      <Card>
        <CardHeader>
          {/* Removed wrapping <h2> to fix hydration error */}
          <CardTitle>{t('Schedule.notFound.title', 'O kurcze!!')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Removed wrapping <p> to fix hydration error */}
          <CardDescription className="max-w-2xl text-lg text-muted-foreground text-balance">
            {t(
              'Schedule.notFound.paragraph',
              'Nie mamy zaplanowanych żadnych spotkań, możliwe że w kolejnych dniach to się zmieni.'
            )}
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  // 5. Show Actual Data
  return (
    <>
      {preferredApp && (
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 text-sm text-muted-foreground">
          <span>
            {t('Schedule.preferredApp.label', 'Wybrany kalendarz:')}{' '}
            <strong className="font-medium text-foreground">
              {getCalendarAppLabel(preferredApp, t)}
            </strong>
          </span>
          <Button
            type="button"
            variant="outline"
            size="xs"
            className="cursor-pointer"
            onClick={() => setDialogState({ type: 'preference' })}
          >
            {t('Schedule.preferredApp.change', 'Zmień')}
          </Button>
        </div>
      )}

      <ScrollArea className={`${isMobile ? 'w-9/11' : 'w-2/3'} rounded-xl`}>
        <div className="flex w-max space-x-4 pb-4">
          {sortedEvents.map((event) => {
            const matchedSection = sections.find((section) =>
              event.calendarName
                .toLowerCase()
                .includes(section.title.toLowerCase())
            );
            return (
              <EventCarouselItem
                key={`${event.id}-${event.calendarName}-${event.start.getTime()}`}
                event={event}
                matchedSection={matchedSection}
                isMobile={isMobile}
                preferredApp={preferredApp}
                onRequestAppChoice={(mode) =>
                  setDialogState({ type: 'action', event, mode })
                }
              />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <CalendarPickerDialog
        dialogState={dialogState}
        preferredApp={preferredApp}
        onClose={() => setDialogState(null)}
        onSelectPreferredApp={setPreferredApp}
      />
    </>
  );
}

function renderCalendarActionButton({
  label,
  href,
  external = false,
  onClick,
}: {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  if (href) {
    return (
      <Button
        variant="default"
        nativeButton={false}
        render={
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {label}
          </a>
        }
      />
    );
  }

  return (
    <Button type="button" variant="default" onClick={onClick}>
      {label}
    </Button>
  );
}

function EventCarouselItem({
  event,
  matchedSection,
  isMobile,
  preferredApp,
  onRequestAppChoice,
}: {
  event: EventType;
  matchedSection: (typeof sections)[0] | undefined;
  isMobile: boolean;
  preferredApp: CalendarApp | null;
  onRequestAppChoice: (mode: ActionMode) => void;
}) {
  const { t } = useTranslation();
  const targets = useCalendarLinks(event);
  const Icon = matchedSection?.icon;
  const { timeLabel, dateLabel } = formatEventSchedule(event.start, event.end);

  const singularUrlByApp: Partial<Record<CalendarApp, string>> = {
    google: targets.singular.googleUrl,
    'outlook-live': targets.singular.outlookLiveUrl,
    'outlook-office': targets.singular.outlookOfficeUrl,
  };

  const subscribeUrlByApp: Partial<
    Record<CalendarApp, { href?: string; external: boolean }>
  > = {
    google: { href: targets.subscribe.googleUrl, external: true },
    apple: { href: targets.subscribe.webcalUrl, external: false },
    'outlook-live': { href: targets.subscribe.outlookLiveUrl, external: true },
    'outlook-office': {
      href: targets.subscribe.outlookOfficeUrl,
      external: true,
    },
  };

  const singularHref = preferredApp
    ? singularUrlByApp[preferredApp]
    : undefined;
  const singularOnClick =
    preferredApp === 'apple' || preferredApp === 'other'
      ? targets.singular.downloadIcs
      : () => onRequestAppChoice('singular');

  const subscribeTarget = preferredApp
    ? subscribeUrlByApp[preferredApp]
    : undefined;

  return (
    <div
      className={
        isMobile
          ? 'w-[calc(8/11*100dvw)] min-w-fit'
          : 'min-w-25dvw max-w-50dvw w-fit'
      }
    >
      <Card className="h-full flex flex-col group bg-muted/50 shadow-sm transition-shadow duration-300 hover:shadow-md dark:hover:bg-muted/70">
        {matchedSection && (
          <Badge
            variant="secondary"
            className="px-3 py-1 text-sm font-medium flex items-center mx-7"
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {matchedSection.title}
          </Badge>
        )}
        <CardHeader>
          <CardTitle className="flex text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 grow">
          <CardDescription>{event.description}</CardDescription>
          <div className="text-sm font-medium">
            <p>{timeLabel}</p>
            <p>{dateLabel}</p>
          </div>
        </CardContent>
        <CardFooter
          className={
            isMobile
              ? 'flex justify-between *:mx-0.5'
              : 'flex justify-between *:mx-2 *:grow'
          }
        >
          <ButtonGroup>
            {renderCalendarActionButton({
              label: t('Schedule.joinEvent', 'Wbijam!!'),
              href: singularHref,
              external: Boolean(singularHref),
              onClick: singularOnClick,
            })}
            {renderCalendarActionButton({
              label: t(
                'Schedule.subscribeCalendar',
                'Przypominaj o spotkaniach!'
              ),
              href: subscribeTarget?.href,
              external: subscribeTarget?.external,
              onClick: () => onRequestAppChoice('subscribe'),
            })}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

const dialogRowClassName =
  'group flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-2 text-left transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none sm:gap-3 sm:px-3.5 sm:py-2.5';

const dialogIconBoxClassName =
  'flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-foreground ring-1 ring-foreground/10 sm:size-9';

interface CalendarOptionRowProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href?: string;
  external?: boolean;
  trailing?: ReactNode;
  onSelect: () => void;
}

function CalendarOptionRow({
  icon,
  title,
  subtitle,
  href,
  external = false,
  trailing,
  onSelect,
}: CalendarOptionRowProps) {
  const content = (
    <>
      <span className={dialogIconBoxClassName}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium wrap-break-word text-foreground">
          {title}
        </span>
        <span className="block text-xs leading-snug wrap-break-word text-muted-foreground">
          {subtitle}
        </span>
      </span>
      <span className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5">
        {trailing}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onSelect}
        className={dialogRowClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onSelect} className={dialogRowClassName}>
      {content}
    </button>
  );
}

function CalendarPickerDialog({
  dialogState,
  preferredApp,
  onClose,
  onSelectPreferredApp,
}: {
  dialogState: DialogState;
  preferredApp: CalendarApp | null;
  onClose: () => void;
  onSelectPreferredApp: (app: CalendarApp | null) => void;
}) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={dialogState !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent closeLabel={t('Schedule.calendarDialog.close', 'Zamknij')}>
        {dialogState?.type === 'action' && (
          <ActionDialogBody
            key={`${dialogState.mode}-${dialogState.event.id}-${dialogState.event.start.getTime()}`}
            event={dialogState.event}
            mode={dialogState.mode}
            initialRemember={preferredApp !== null}
            onClose={onClose}
            onSavePreferredApp={onSelectPreferredApp}
          />
        )}

        {dialogState?.type === 'preference' && (
          <PreferenceDialogBody
            preferredApp={preferredApp}
            onClose={onClose}
            onSelectPreferredApp={onSelectPreferredApp}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface ActionDialogOption extends CalendarOptionRowProps {
  key: CalendarApp;
}

function CopyFeedSection({ feedUrl }: { feedUrl: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyFeedUrl = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  return (
    <div className="min-w-0 space-y-2 border-t border-border/70 pt-3">
      <p className="text-xs leading-snug text-muted-foreground">
        {t(
          'Schedule.calendarDialog.copyFeedLabel',
          'Lub skopiuj adres iCal (.ics) do wklejenia ręcznie (np. Proton Calendar, Nextcloud):'
        )}
      </p>
      <div className="flex min-w-0 items-center justify-between gap-2 rounded-xl bg-muted/60 p-2 pl-3 ring-1 ring-foreground/10">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
          {feedUrl}
        </code>
        <Button
          type="button"
          variant="secondary"
          size="xs"
          onClick={handleCopyFeedUrl}
          className="shrink-0 cursor-pointer gap-1.5 rounded-lg"
        >
          {copied ? (
            <>
              <RiCheckLine className="size-3.5 text-emerald-500" />
              <span>{t('Schedule.calendarDialog.copied', 'Skopiowano')}</span>
            </>
          ) : (
            <>
              <RiFileCopyLine className="size-3.5" />
              <span>{t('Schedule.calendarDialog.copy', 'Kopiuj')}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function buildActionDialogOptions({
  isSingular,
  targets,
  t,
  onFinalize,
}: {
  isSingular: boolean;
  targets: ReturnType<typeof buildCalendarTargets>;
  t: TFunction;
  onFinalize: (app: CalendarApp) => void;
}): ActionDialogOption[] {
  const urlSource = isSingular ? targets.singular : targets.subscribe;
  const externalEntries: Array<{
    app: CalendarApp;
    href?: string;
    icon: ReactNode;
    title: string;
    subtitle: string;
  }> = [
    {
      app: 'google',
      href: urlSource.googleUrl,
      icon: <RiGoogleFill className="size-5" />,
      title: t('Schedule.calendarApps.google.name', 'Google Kalendarz'),
      subtitle: isSingular
        ? t(
            'Schedule.calendarApps.google.singularHint',
            'Otwórz w Google Calendar'
          )
        : t(
            'Schedule.calendarApps.google.subscribeHint',
            'Subskrybuj w Google Calendar'
          ),
    },
    {
      app: 'outlook-live',
      href: urlSource.outlookLiveUrl,
      icon: <RiMicrosoftFill className="size-5" />,
      title: t('Schedule.calendarApps.outlookLive.name', 'Outlook.com'),
      subtitle: isSingular
        ? t(
            'Schedule.calendarApps.outlookLive.singularHint',
            'Konto prywatne Microsoft (outlook.live.com)'
          )
        : t(
            'Schedule.calendarApps.outlookLive.subscribeHint',
            'Subskrybuj na koncie prywatnym Microsoft'
          ),
    },
    {
      app: 'outlook-office',
      href: urlSource.outlookOfficeUrl,
      icon: <RiMicrosoftFill className="size-5" />,
      title: t('Schedule.calendarApps.outlookOffice.name', 'Outlook 365'),
      subtitle: isSingular
        ? t(
            'Schedule.calendarApps.outlookOffice.singularHint',
            'Konto uczelniane lub firmowe (Microsoft 365)'
          )
        : t(
            'Schedule.calendarApps.outlookOffice.subscribeHint',
            'Subskrybuj na koncie uczelnianym / firmowym'
          ),
    },
  ];

  const externalOptions = externalEntries
    .filter((entry): entry is typeof entry & { href: string } =>
      Boolean(entry.href)
    )
    .map((entry) => ({
      key: entry.app,
      icon: entry.icon,
      title: entry.title,
      subtitle: entry.subtitle,
      href: entry.href,
      external: true,
      trailing: <RiArrowRightUpLine className="size-4" />,
      onSelect: () => onFinalize(entry.app),
    }));

  const localOrWebcalOptions: ActionDialogOption[] = [];
  if (isSingular || targets.subscribe.webcalUrl) {
    const localHref = isSingular ? undefined : targets.subscribe.webcalUrl;
    const localTrailing = isSingular ? (
      <RiDownload2Line className="size-4" />
    ) : (
      <RiArrowRightUpLine className="size-4" />
    );
    const selectLocalOrWebcal = (app: CalendarApp) => {
      if (isSingular) {
        targets.singular.downloadIcs();
      }
      onFinalize(app);
    };

    localOrWebcalOptions.push(
      {
        key: 'apple',
        icon: <RiAppleFill className="size-5" />,
        title: t(
          'Schedule.calendarApps.apple.name',
          'Kalendarz Apple (iPhone / Mac)'
        ),
        subtitle: isSingular
          ? t(
              'Schedule.calendarApps.apple.singularHint',
              'Pobierz plik .ics i otwórz w Apple Calendar'
            )
          : t(
              'Schedule.calendarApps.apple.subscribeHint',
              'Subskrybuj bezpośrednio przez webcal://'
            ),
        href: localHref,
        trailing: localTrailing,
        onSelect: () => selectLocalOrWebcal('apple'),
      },
      {
        key: 'other',
        icon: isSingular ? (
          <RiDownload2Line className="size-5" />
        ) : (
          <RiCalendar2Line className="size-5" />
        ),
        title: isSingular
          ? t(
              'Schedule.calendarApps.other.singularName',
              'Inny kalendarz (plik .ics)'
            )
          : t(
              'Schedule.calendarApps.other.subscribeName',
              'Inny kalendarz (webcal://)'
            ),
        subtitle: isSingular
          ? t(
              'Schedule.calendarApps.other.singularHint',
              'Outlook Desktop, Thunderbird, Proton, Samsung Calendar...'
            )
          : t(
              'Schedule.calendarApps.other.subscribeHint',
              'Otwórz w domyślnej aplikacji (Thunderbird, Outlook Desktop...)'
            ),
        href: localHref,
        trailing: localTrailing,
        onSelect: () => selectLocalOrWebcal('other'),
      }
    );
  }

  // Keep original display order: Google, Apple, Outlook.com, Outlook 365, Other
  const google = externalOptions.filter((opt) => opt.key === 'google');
  const apple = localOrWebcalOptions.filter((opt) => opt.key === 'apple');
  const outlook = externalOptions.filter(
    (opt) => opt.key === 'outlook-live' || opt.key === 'outlook-office'
  );
  const other = localOrWebcalOptions.filter((opt) => opt.key === 'other');

  return [...google, ...apple, ...outlook, ...other];
}

function ActionDialogBody({
  event,
  mode,
  initialRemember,
  onClose,
  onSavePreferredApp,
}: {
  event: EventType;
  mode: ActionMode;
  initialRemember: boolean;
  onClose: () => void;
  onSavePreferredApp: (app: CalendarApp | null) => void;
}) {
  const { t } = useTranslation();
  const [rememberChoice, setRememberChoice] = useState(initialRemember);

  const targets = buildCalendarTargets(event);
  const { timeLabel, dateLabel } = formatEventSchedule(event.start, event.end);
  const isSingular = mode === 'singular';

  const finalizeSelection = (app: CalendarApp) => {
    if (rememberChoice) {
      onSavePreferredApp(app);
    }
    onClose();
  };

  const options = buildActionDialogOptions({
    isSingular,
    targets,
    t,
    onFinalize: finalizeSelection,
  });

  const dialogTitle = isSingular
    ? t('Schedule.calendarDialog.addTitle', 'Dodaj do kalendarza')
    : t(
        'Schedule.calendarDialog.subscribeTitle',
        'Subskrybuj kalendarz spotkań'
      );

  const dialogDescription = isSingular
    ? t(
        'Schedule.calendarDialog.addDescription',
        'Wybierz aplikację kalendarza dla spotkania „{{title}}” ({{date}}, {{time}}).',
        {
          title: event.title,
          date: dateLabel,
          time: timeLabel,
        }
      )
    : t(
        'Schedule.calendarDialog.subscribeDescription',
        'Wybierz aplikację, aby automatycznie otrzymywać aktualizacje spotkań ({{calendar}}).',
        {
          calendar: event.calendarName || 'KNPiMI',
        }
      );

  return (
    <>
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>{dialogDescription}</DialogDescription>
      </DialogHeader>

      <div className="flex min-w-0 flex-col gap-2">
        {options.map(({ key, ...rowProps }) => (
          <CalendarOptionRow key={key} {...rowProps} />
        ))}
      </div>

      {!isSingular && targets.subscribe.httpsFeedUrl && (
        <CopyFeedSection feedUrl={targets.subscribe.httpsFeedUrl} />
      )}

      <label className="flex min-w-0 cursor-pointer items-center gap-2.5 pt-1 text-xs leading-snug text-muted-foreground select-none">
        <input
          type="checkbox"
          checked={rememberChoice}
          onChange={(e) => setRememberChoice(e.target.checked)}
          className="size-4 shrink-0 rounded border-border accent-primary"
        />
        <span>
          {t(
            'Schedule.calendarDialog.rememberChoice',
            'Zapamiętaj mój wybór na tym urządzeniu'
          )}
        </span>
      </label>
    </>
  );
}

function PreferenceDialogBody({
  preferredApp,
  onClose,
  onSelectPreferredApp,
}: {
  preferredApp: CalendarApp | null;
  onClose: () => void;
  onSelectPreferredApp: (app: CalendarApp | null) => void;
}) {
  const { t } = useTranslation();

  const preferenceOptions: {
    app: CalendarApp | null;
    icon: ReactNode;
    title: string;
    subtitle: string;
  }[] = [
    {
      app: 'google',
      icon: <RiGoogleFill className="size-5" />,
      title: t('Schedule.calendarApps.google.name', 'Google Kalendarz'),
      subtitle: t(
        'Schedule.calendarApps.google.singularHint',
        'Otwórz w Google Calendar'
      ),
    },
    {
      app: 'apple',
      icon: <RiAppleFill className="size-5" />,
      title: t(
        'Schedule.calendarApps.apple.name',
        'Kalendarz Apple (iPhone / Mac)'
      ),
      subtitle: t(
        'Schedule.calendarApps.apple.preferenceHint',
        'Plik .ics oraz linki webcal://'
      ),
    },
    {
      app: 'outlook-live',
      icon: <RiMicrosoftFill className="size-5" />,
      title: t('Schedule.calendarApps.outlookLive.name', 'Outlook.com'),
      subtitle: t(
        'Schedule.calendarApps.outlookLive.singularHint',
        'Konto prywatne Microsoft (outlook.live.com)'
      ),
    },
    {
      app: 'outlook-office',
      icon: <RiMicrosoftFill className="size-5" />,
      title: t('Schedule.calendarApps.outlookOffice.name', 'Outlook 365'),
      subtitle: t(
        'Schedule.calendarApps.outlookOffice.singularHint',
        'Konto uczelniane lub firmowe (Microsoft 365)'
      ),
    },
    {
      app: 'other',
      icon: <RiDownload2Line className="size-5" />,
      title: t(
        'Schedule.calendarApps.other.name',
        'Inny kalendarz (.ics / iCal)'
      ),
      subtitle: t(
        'Schedule.calendarApps.other.singularHint',
        'Outlook Desktop, Thunderbird, Proton, Samsung Calendar...'
      ),
    },
    {
      app: null,
      icon: <RiCalendar2Line className="size-5" />,
      title: t('Schedule.preferredApp.askEveryTime', 'Pytaj za każdym razem'),
      subtitle: t(
        'Schedule.preferredApp.askEveryTimeHint',
        'Pokaż listę aplikacji po każdym kliknięciu'
      ),
    },
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {t('Schedule.preferredApp.dialogTitle', 'Wybierz domyślny kalendarz')}
        </DialogTitle>
        <DialogDescription>
          {t(
            'Schedule.preferredApp.dialogDescription',
            'Wybrana aplikacja zostanie użyta automatycznie przy dodawaniu i subskrybowaniu spotkań.'
          )}
        </DialogDescription>
      </DialogHeader>

      <div className="flex min-w-0 flex-col gap-2">
        {preferenceOptions.map((option) => (
          <CalendarOptionRow
            key={option.app ?? 'ask'}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            trailing={
              preferredApp === option.app ? (
                <RiCheckLine className="size-4 text-emerald-500" />
              ) : null
            }
            onSelect={() => {
              onSelectPreferredApp(option.app);
              onClose();
            }}
          />
        ))}
      </div>
    </>
  );
}

// 6. The Skeleton Component using Shadcn <Skeleton />
function GhostCarousel(props: { isMobile: boolean }) {
  const isMobile = props.isMobile;
  return (
    <ScrollArea className={`${isMobile ? 'w-9/11' : 'w-2/3'} rounded-xl`}>
      <div className="flex w-max space-x-4 pb-4">
        {/* Render 4 dummy skeleton cards so the scroll area looks full */}
        {Array.from({ length: isMobile ? 1 : 4 }).map((_, index) => (
          <div
            key={index}
            className={
              isMobile
                ? 'w-[calc(8/11*100dvw)] min-w-fit'
                : 'min-w-25dvw max-w-50dvw w-fit'
            }
          >
            <Card className="h-full flex flex-col group bg-muted/50 shadow-sm transition-shadow duration-300 hover:shadow-md dark:hover:bg-muted/70">
              {/* Badge skeleton */}
              <Skeleton className="h-5 w-24 rounded-4xl mx-7" />
              <CardHeader>
                <CardTitle className="flex text-xl">
                  {/* Title skeleton */}
                  <Skeleton className="h-7 w-48" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 grow">
                {/* Description skeleton */}
                <Skeleton className="h-16 w-full" />
                <div className="space-y-2 text-sm font-medium">
                  {/* Time skeleton */}
                  <Skeleton className="h-4 w-28" />
                  {/* Date skeleton */}
                  <Skeleton className="h-4 w-44" />
                </div>
              </CardContent>
              <CardFooter
                className={
                  isMobile
                    ? 'flex justify-between *:mx-0.5'
                    : 'flex justify-between *:mx-2 *:grow'
                }
              >
                <ButtonGroup>
                  {/* Singular link button skeleton */}
                  <Skeleton className="h-9 w-20 rounded-4xl border border-transparent bg-clip-padding" />
                  {/* Entire link button skeleton */}
                  <Skeleton className="h-9 w-48 rounded-4xl border border-transparent bg-clip-padding" />
                </ButtonGroup>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
