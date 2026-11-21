import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCalendar2Line,
  RiCalendarEventLine,
  RiCodeBoxLine,
  RiCompass3Line,
  RiDiscordFill,
  RiSparklingLine,
  RiStackLine,
  RiTimeLine,
} from '@remixicon/react';

import { sections, type SectionPath } from '@/lib/sections.ts';
import {
  fetchCalendarEvents,
  formatEventSchedule,
  getCalendarAppLabel,
  useCalendarLinks,
  usePreferredCalendarApp,
  type ActionMode,
  type CalendarApp,
  type DialogState,
  type EventType,
} from '@/lib/useCalendarLinks.tsx';
import {
  CalendarActionButton,
  CalendarPickerDialog,
} from '@/components/ScheduleCalendarDialog.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ButtonGroup } from '@/components/ui/button-group.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export interface SectionPillar {
  id: string;
  icon: typeof RiCodeBoxLine;
  badge: string;
  title: string;
  description: string;
}

export interface SectionTechGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface SectionStep {
  step: string;
  icon: typeof RiCodeBoxLine;
  title: string;
  description: string;
}

export interface SectionHighlight {
  id: string;
  label: string;
  value: string;
}

export interface SectionPageData {
  sectionPath: SectionPath;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  highlights: SectionHighlight[];
  pillarsBadge: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: SectionPillar[];
  techBadge: string;
  techTitle: string;
  techSubtitle: string;
  techGroups: SectionTechGroup[];
  workflowBadge: string;
  workflowTitle: string;
  workflowSubtitle: string;
  workflowSteps: SectionStep[];
  ctaTitle: string;
  ctaDescription: string;
}

const SECTION_CALENDAR_TOKENS: Record<SectionPath, string[]> = {
  webdev: ['webdev', 'web-dev'],
  'data&ai': ['data&ai', 'data', 'ai', 'ml'],
  cybersec: ['cybersec', 'cyber'],
};

function doesEventMatchSection(
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

const cardClass =
  'group h-full border-none bg-muted/50 shadow-sm transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:bg-muted/70';

const iconBoxClass =
  'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';

function SectionHero({ data }: { data: SectionPageData }) {
  const { t } = useTranslation();
  const currentSection = sections.find((s) => s.path === data.sectionPath);
  const SectionIcon = currentSection?.icon;

  return (
    <section className="container mx-auto max-w-6xl px-4 pt-12 pb-12 md:pt-20 md:pb-16">
      <div className="mb-8 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          render={
            <Link to="/sections">
              <RiArrowLeftLine className="h-4 w-4" />
              <span>{t('SectionPage.backToSections', 'Wszystkie sekcje')}</span>
            </Link>
          }
        />
      </div>

      <div className="flex flex-col items-center space-y-6 text-center">
        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
          {SectionIcon && <SectionIcon className="mr-2 h-4 w-4" />}
          {data.badge}
        </Badge>

        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {data.titlePrefix}{' '}
          <span className="bg-(image:--primary-gradient) bg-clip-text text-transparent">
            {data.titleHighlight}
          </span>
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {data.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            nativeButton={false}
            className="cursor-pointer gap-2"
            render={
              <a href="#spotkania">
                <RiCalendarEventLine className="h-4 w-4" />
                <span>
                  {t('SectionPage.heroNextMeeting', 'Najbliższe spotkanie')}
                </span>
              </a>
            }
          />
          <Button
            variant="outline"
            nativeButton={false}
            className="cursor-pointer gap-2"
            render={
              <Link to="/contact">
                <RiDiscordFill className="h-4 w-4" />
                <span>{t('SectionPage.heroJoin', 'Dołącz do sekcji')}</span>
              </Link>
            }
          />
          <Button
            variant="secondary"
            nativeButton={false}
            className="cursor-pointer gap-2"
            render={
              <a href="#obszary">
                <RiCompass3Line className="h-4 w-4" />
                <span>{t('SectionPage.heroAreas', 'Obszary tematyczne')}</span>
              </a>
            }
          />
        </div>

        <div className="grid w-full max-w-4xl gap-4 pt-6 sm:grid-cols-3">
          {data.highlights.map((item) => (
            <Card
              key={item.id}
              className="border-none bg-muted/50 text-left shadow-sm"
            >
              <CardContent className="p-5">
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-1.5 text-base font-semibold text-foreground">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightEventCard({
  event,
  sectionTitle,
  preferredApp,
  onRequestAppChoice,
}: {
  event: EventType;
  sectionTitle: string;
  preferredApp: CalendarApp | null;
  onRequestAppChoice: (event: EventType, mode: ActionMode) => void;
}) {
  const { t } = useTranslation();
  const targets = useCalendarLinks(event);
  const { timeLabel, dateLabel } = formatEventSchedule(event.start, event.end);
  const currentSection = sections.find(
    (s) => s.title.toLowerCase() === sectionTitle.toLowerCase()
  );
  const SectionIcon = currentSection?.icon;

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
      : () => onRequestAppChoice(event, 'singular');

  const subscribeTarget = preferredApp
    ? subscribeUrlByApp[preferredApp]
    : undefined;

  return (
    <Card className="group border-none bg-muted/50 shadow-sm transition-shadow duration-300 hover:shadow-md dark:hover:bg-muted/70">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default" className="px-3 py-1 text-xs font-medium">
            <RiSparklingLine className="mr-1.5 h-3.5 w-3.5" />
            {t('SectionPage.nextEvent.spotlightBadge', 'Najbliższe spotkanie')}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            {SectionIcon && <SectionIcon className="mr-1.5 h-3.5 w-3.5" />}
            {sectionTitle}
          </Badge>
        </div>
        <CardTitle className="text-2xl transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {event.description && (
          <CardDescription className="text-base leading-relaxed text-muted-foreground">
            {event.description}
          </CardDescription>
        )}

        <div className="flex flex-wrap gap-4 rounded-xl bg-background/70 p-4 ring-1 ring-foreground/10">
          <div className="flex items-center gap-2.5 text-sm font-medium">
            <RiCalendar2Line className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium">
            <RiTimeLine className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>{timeLabel}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ButtonGroup className="w-full sm:w-auto">
          <CalendarActionButton
            label={t('Schedule.joinEvent', 'Wbijam!!')}
            href={singularHref}
            external={Boolean(singularHref)}
            onClick={singularOnClick}
          />
          <CalendarActionButton
            label={t(
              'Schedule.subscribeCalendar',
              'Przypominaj o spotkaniach!'
            )}
            href={subscribeTarget?.href}
            external={subscribeTarget?.external}
            onClick={() => onRequestAppChoice(event, 'subscribe')}
          />
        </ButtonGroup>

        <Button
          variant="outline"
          nativeButton={false}
          className="w-full shrink-0 gap-1.5 sm:w-auto"
          render={
            <Link to="/schedule">
              <span>
                {t('SectionPage.nextEvent.fullSchedule', 'Pełny harmonogram')}
              </span>
              <RiArrowRightLine className="h-4 w-4" />
            </Link>
          }
        />
      </CardFooter>
    </Card>
  );
}

function UpcomingSectionEventCard({
  event,
  preferredApp,
  onRequestAppChoice,
}: {
  event: EventType;
  preferredApp: CalendarApp | null;
  onRequestAppChoice: (event: EventType, mode: ActionMode) => void;
}) {
  const { t } = useTranslation();
  const targets = useCalendarLinks(event);
  const { timeLabel, dateLabel } = formatEventSchedule(event.start, event.end);

  const singularUrlByApp: Partial<Record<CalendarApp, string>> = {
    google: targets.singular.googleUrl,
    'outlook-live': targets.singular.outlookLiveUrl,
    'outlook-office': targets.singular.outlookOfficeUrl,
  };

  const singularHref = preferredApp
    ? singularUrlByApp[preferredApp]
    : undefined;
  const singularOnClick =
    preferredApp === 'apple' || preferredApp === 'other'
      ? targets.singular.downloadIcs
      : () => onRequestAppChoice(event, 'singular');

  return (
    <Card className={cardClass}>
      <CardHeader>
        <CardTitle className="text-lg transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow space-y-3">
        {event.description && (
          <CardDescription className="line-clamp-3 text-sm">
            {event.description}
          </CardDescription>
        )}
        <div className="space-y-1 text-xs font-medium text-foreground">
          <p>{dateLabel}</p>
          <p className="text-muted-foreground">{timeLabel}</p>
        </div>
      </CardContent>
      <CardFooter>
        <CalendarActionButton
          label={t('Schedule.joinEvent', 'Wbijam!!')}
          href={singularHref}
          external={Boolean(singularHref)}
          onClick={singularOnClick}
        />
      </CardFooter>
    </Card>
  );
}

function NextEventLoadingCard() {
  return (
    <Card className="border-none bg-muted/50 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-8 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9 w-64 rounded-4xl" />
      </CardFooter>
    </Card>
  );
}

function NextEventEmptyCard() {
  const { t } = useTranslation();

  return (
    <Card className="border-none bg-muted/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          {t(
            'SectionPage.nextEvent.emptyTitle',
            'Brak zaplanowanych spotkań w kalendarzu'
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base leading-relaxed">
          {t(
            'SectionPage.nextEvent.emptyDescription',
            'Dla tej sekcji nie ma jeszcze dodanego terminu na najbliższe tygodnie. Sprawdź pełny harmonogram koła albo wpadnij na naszego Discorda, gdzie na bieżąco ustalamy tematy i godziny.'
          )}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Button
          nativeButton={false}
          className="cursor-pointer gap-2"
          render={
            <Link to="/schedule">
              <RiCalendar2Line className="h-4 w-4" />
              <span>
                {t(
                  'SectionPage.nextEvent.viewAllSchedule',
                  'Zobacz pełny harmonogram'
                )}
              </span>
            </Link>
          }
        />
        <Button
          variant="outline"
          nativeButton={false}
          className="cursor-pointer gap-2"
          render={
            <Link to="/contact">
              <RiDiscordFill className="h-4 w-4" />
              <span>
                {t(
                  'SectionPage.nextEvent.checkDiscord',
                  'Sprawdź ogłoszenia na Discordzie'
                )}
              </span>
            </Link>
          }
        />
      </CardFooter>
    </Card>
  );
}

function SectionNextEventSection({
  sectionPath,
}: {
  sectionPath: SectionPath;
}) {
  const { t } = useTranslation();
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: fetchCalendarEvents,
    staleTime: 1000 * 60 * 5,
  });
  const [preferredApp, setPreferredApp] = usePreferredCalendarApp();
  const [dialogState, setDialogState] = useState<DialogState>(null);
  const [now] = useState(() => Date.now());

  const sectionMeta = sections.find((s) => s.path === sectionPath);
  const sectionTitle = sectionMeta?.title ?? sectionPath;

  const matchingEvents = [...events]
    .filter((event) => doesEventMatchSection(event.calendarName, sectionPath))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const upcomingEvents = matchingEvents.filter(
    (event) => event.end.getTime() >= now
  );
  const displayEvents =
    upcomingEvents.length > 0 ? upcomingEvents : matchingEvents;
  const nextEvent = displayEvents[0];
  const moreEvents = displayEvents.slice(1, 4);

  return (
    <section
      id="spotkania"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col items-center space-y-3 text-center">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            <RiCalendarEventLine className="mr-2 h-4 w-4" />
            {t('SectionPage.nextEvent.badge', 'Harmonogram sekcji')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('SectionPage.nextEvent.title', 'Najbliższe spotkanie')}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            {t(
              'SectionPage.nextEvent.subtitle',
              'Aktualne terminy spotkań sekcji pobierane bezpośrednio z kalendarza KNPiMI.'
            )}
          </p>
        </div>

        {preferredApp && !isLoading && !isError && nextEvent && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
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

        {isLoading ? (
          <NextEventLoadingCard />
        ) : isError || !nextEvent ? (
          <NextEventEmptyCard />
        ) : (
          <div className="space-y-6">
            <SpotlightEventCard
              event={nextEvent}
              sectionTitle={sectionTitle}
              preferredApp={preferredApp}
              onRequestAppChoice={(event, mode) =>
                setDialogState({ type: 'action', event, mode })
              }
            />

            {moreEvents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  {t(
                    'SectionPage.nextEvent.moreUpcoming',
                    'Kolejne zaplanowane spotkania'
                  )}
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {moreEvents.map((event) => (
                    <UpcomingSectionEventCard
                      key={`${event.id}-${event.start.getTime()}`}
                      event={event}
                      preferredApp={preferredApp}
                      onRequestAppChoice={(selected, mode) =>
                        setDialogState({
                          type: 'action',
                          event: selected,
                          mode,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <CalendarPickerDialog
        dialogState={dialogState}
        preferredApp={preferredApp}
        onClose={() => setDialogState(null)}
        onSelectPreferredApp={setPreferredApp}
      />
    </section>
  );
}

function SectionPillars({ data }: { data: SectionPageData }) {
  return (
    <section
      id="obszary"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
    >
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col items-center space-y-3 text-center">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            <RiStackLine className="mr-2 h-4 w-4" />
            {data.pillarsBadge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {data.pillarsTitle}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            {data.pillarsSubtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {data.pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.id} className={cardClass}>
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className={iconBoxClass}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {pillar.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionTechStack({ data }: { data: SectionPageData }) {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col items-center space-y-3 text-center">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            <RiCodeBoxLine className="mr-2 h-4 w-4" />
            {data.techBadge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {data.techTitle}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            {data.techSubtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {data.techGroups.map((group) => (
            <Card key={group.id} className="border-none bg-muted/50 shadow-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">{group.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {group.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="px-2.5 py-1 font-mono text-xs font-medium"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionWorkflow({ data }: { data: SectionPageData }) {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <Card className="border-none bg-muted/50 p-6 shadow-sm md:p-10">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center space-y-3 text-center">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiCompass3Line className="mr-2 h-4 w-4" />
              {data.workflowBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {data.workflowTitle}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              {data.workflowSubtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {data.workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="space-y-3 rounded-xl border border-border/40 bg-background/60 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className={iconBoxClass}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted-foreground">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </section>
  );
}

function SectionOtherAndCta({ data }: { data: SectionPageData }) {
  const { t } = useTranslation();
  const otherSections = sections.filter((s) => s.path !== data.sectionPath);

  return (
    <section className="container mx-auto max-w-6xl space-y-12 px-4 pt-8 pb-20">
      <Card className="border-none bg-muted/50 p-6 shadow-sm md:p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {data.ctaTitle}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {data.ctaDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              className="cursor-pointer gap-2"
              render={
                <Link to="/contact">
                  <RiDiscordFill className="h-4 w-4" />
                  <span>
                    {t('SectionPage.ctaContact', 'Skontaktuj się z nami')}
                  </span>
                </Link>
              }
            />
            <Button
              variant="outline"
              nativeButton={false}
              className="cursor-pointer gap-2"
              render={
                <Link to="/schedule">
                  <RiCalendar2Line className="h-4 w-4" />
                  <span>
                    {t('SectionPage.ctaSchedule', 'Zobacz harmonogram')}
                  </span>
                </Link>
              }
            />
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {t('SectionPage.otherSections', 'Poznaj też inne sekcje')}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="gap-1.5"
            render={
              <Link to="/sections">
                <span>{t('SectionPage.allSections', 'Wszystkie')}</span>
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            }
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {otherSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                to={`/sections/${section.path}`}
                className="block h-full"
              >
                <Card className={cardClass}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={iconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <RiArrowRightLine className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                    <CardTitle className="mt-3 text-xl transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">
                      {t(
                        section.description.key,
                        section.description.translation
                      )}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionPageLayout({ data }: { data: SectionPageData }) {
  return (
    <div className="min-h-screen bg-background">
      <SectionHero data={data} />
      <SectionNextEventSection sectionPath={data.sectionPath} />
      <SectionPillars data={data} />
      <SectionTechStack data={data} />
      <SectionWorkflow data={data} />
      <SectionOtherAndCta data={data} />
    </div>
  );
}
