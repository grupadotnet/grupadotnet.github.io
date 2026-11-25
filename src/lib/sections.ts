import {
  RiCodeBoxLine,
  RiBrainLine,
  RiShieldCheckLine,
} from '@remixicon/react';
import { extractTranslation } from './extractTranslation.tsx';
import type { FileRouteTypes } from '@/routeTree.gen';

export type SectionPath = FileRouteTypes['to'] extends infer T
  ? T extends `/sections/${infer P}`
    ? P
    : never
  : never;

export interface SectionColors {
  badge: string;
  badgeOutline: string;
  iconBox: string;
  textAccent: string;
  hoverTitle: string;
  hoverBorder: string;
  watermark: string;
  dot: string;
}

export const sectionColorsByPath: Record<SectionPath, SectionColors> = {
  webdev: {
    badge:
      'border-blue-500/25 bg-blue-500/12 text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/15 dark:text-blue-300',
    badgeOutline:
      'border-blue-500/30 bg-blue-500/8 text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/12 dark:text-blue-300',
    iconBox: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    textAccent: 'text-blue-600 dark:text-blue-400',
    hoverTitle: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    hoverBorder: 'hover:border-blue-500/30',
    watermark: 'text-blue-600/20 dark:text-blue-400/20',
    dot: 'bg-blue-500',
  },
  'data&ai': {
    badge:
      'border-violet-500/25 bg-violet-500/12 text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-300',
    badgeOutline:
      'border-violet-500/30 bg-violet-500/8 text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/12 dark:text-violet-300',
    iconBox:
      'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    textAccent: 'text-violet-600 dark:text-violet-400',
    hoverTitle: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
    hoverBorder: 'hover:border-violet-500/30',
    watermark: 'text-violet-600/20 dark:text-violet-400/20',
    dot: 'bg-violet-500',
  },
  cybersec: {
    badge:
      'border-green-500/25 bg-green-500/12 text-green-800 dark:border-green-400/30 dark:bg-green-500/15 dark:text-green-300',
    badgeOutline:
      'border-green-500/30 bg-green-500/8 text-green-800 dark:border-green-400/30 dark:bg-green-500/12 dark:text-green-300',
    iconBox:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    textAccent: 'text-green-700 dark:text-green-400',
    hoverTitle: 'group-hover:text-green-700 dark:group-hover:text-green-400',
    hoverBorder: 'hover:border-green-500/30',
    watermark: 'text-green-600/20 dark:text-green-400/20',
    dot: 'bg-green-500',
  },
};

export function getSectionColors(sectionPath: SectionPath): SectionColors {
  return sectionColorsByPath[sectionPath];
}

export interface Section {
  title: string;
  path: SectionPath;
  icon: typeof RiCodeBoxLine;
  description: ReturnType<typeof extractTranslation>;
  colors: SectionColors;
  id: number;
}

export const sections: Section[] = [
  {
    // i18next-instrument-ignore-next-line
    title: 'WebDev',
    path: 'webdev',
    icon: RiCodeBoxLine,
    description: extractTranslation(
      'Sections.webdev.description',
      'W sekcji Webdev zajmujemy się praktycznym tworzeniem nowoczesnych aplikacji internetowych. Podczas wspólnej pracy nad projektami na bieżąco uczymy się nowych narzędzi oraz wykorzystujemy sprawdzone w przemyśle rozwiązania.'
    ),
    colors: sectionColorsByPath.webdev,
    id: 1,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'Data&AI',
    path: 'data&ai',
    icon: RiBrainLine,
    description: extractTranslation(
      'Sections.data&ai.description',
      'Przekuwamy teoretyczną wiedzę z AI, Machine Learning i Data Science w innowacyjne projekty prototypowe o znaczeniu przemysłowym i badawczym.'
    ),
    colors: sectionColorsByPath['data&ai'],
    id: 2,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'CyberSec',
    path: 'cybersec',
    icon: RiShieldCheckLine,
    description: extractTranslation(
      'Sections.cybersec.description',
      'W sekcji cyberbezpieczeństwa łączymy solidną wiedzę teoretyczną z praktyką, skupiając się na testach penetracyjnych, systemie Kali Linux oraz technikach OSINT. Rozwijamy nasze umiejętności, biorąc udział w konferencjach i hackathonach.'
    ),
    colors: sectionColorsByPath.cybersec,
    id: 3,
  },
];

const SECTION_CALENDAR_TOKENS: Record<SectionPath, string[]> = {
  webdev: ['webdev', 'web-dev'],
  'data&ai': ['data&ai', 'data', 'ai', 'ml'],
  cybersec: ['cybersec', 'cyber'],
};

export function doesEventMatchSection(
  calendarName: string,
  sectionPath: SectionPath
): boolean {
  const lower = calendarName.toLowerCase();
  const compact = lower.replace(/\s+/g, '');
  const tokens = SECTION_CALENDAR_TOKENS[sectionPath];

  return tokens.some(
    (token) => lower.includes(token) || compact.includes(token)
  );
}

export function matchSectionByCalendarName(
  calendarName: string
): Section | undefined {
  return sections.find((section) =>
    doesEventMatchSection(calendarName, section.path)
  );
}
