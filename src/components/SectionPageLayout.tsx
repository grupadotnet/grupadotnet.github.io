import { useState, type ReactNode } from 'react';
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
  RiTerminalLine,
  RiTimeLine,
} from '@remixicon/react';

import {
  doesEventMatchSection,
  getSectionColors,
  sections,
  type SectionPath,
} from '@/lib/sections.ts';
import { cn } from '@/lib/utils';
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
import {
  NumberedStepCard,
  TechGroupsMatrixSheet,
} from '@/components/PageBlocks.tsx';
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

const cardClass =
  'group h-full border-none bg-muted/50 shadow-sm transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:bg-muted/70';

function getIconBoxClass(sectionPath: SectionPath): string {
  return cn(
    'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
    getSectionColors(sectionPath).iconBox
  );
}

function SectionHeroBackLink() {
  const { t } = useTranslation();

  return (
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
  );
}

function SectionHeroBadge({
  sectionPath,
  badge,
  compact,
}: {
  sectionPath: SectionPath;
  badge: string;
  compact?: boolean;
}) {
  const currentSection = sections.find((s) => s.path === sectionPath);
  const SectionIcon = currentSection?.icon;
  const colors = getSectionColors(sectionPath);

  return (
    <Badge
      variant="secondary"
      className={cn(
        compact ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm font-medium',
        colors.badge
      )}
    >
      {SectionIcon && (
        <SectionIcon
          className={compact ? 'mr-1.5 h-3.5 w-3.5' : 'mr-2 h-4 w-4'}
        />
      )}
      {badge}
    </Badge>
  );
}

function SectionHeroActions({
  className = 'flex flex-wrap items-center gap-3 pt-1',
}: {
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <div className={className}>
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
  );
}

function SectionHeroSplit({
  data,
  rightSlot,
}: {
  data: SectionPageData;
  rightSlot?: ReactNode;
}) {
  return (
    <section className="container mx-auto max-w-6xl px-4 pt-10 pb-12 md:pt-16 md:pb-16">
      <div className="mb-8 flex items-center justify-between">
        <SectionHeroBackLink />
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <SectionHeroBadge sectionPath={data.sectionPath} badge={data.badge} />

          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {data.titlePrefix}{' '}
            <span className="bg-(image:--primary-text-gradient) bg-clip-text text-transparent">
              {data.titleHighlight}
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {data.subtitle}
          </p>

          <SectionHeroActions />
        </div>

        <div className="space-y-4 lg:col-span-5">
          {rightSlot}
          <div className="grid gap-3">
            {data.highlights.map((item) => (
              <Card key={item.id} className="border-none bg-muted/50 shadow-sm">
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {item.label}
                  </span>
                  <span className="text-right text-sm font-semibold text-foreground">
                    {item.value}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeroTerminal({ data }: { data: SectionPageData }) {
  return (
    <section className="container mx-auto max-w-6xl px-4 pt-10 pb-12 md:pt-16 md:pb-16">
      <div className="mb-8 flex justify-between">
        <SectionHeroBackLink />
        <Badge
          variant="outline"
          className={cn(
            'gap-1.5 font-mono text-xs',
            getSectionColors(data.sectionPath).badgeOutline
          )}
        >
          <RiTerminalLine
            className={cn(
              'h-3.5 w-3.5',
              getSectionColors(data.sectionPath).textAccent
            )}
          />
          <span>~/sections/{data.sectionPath}</span>
        </Badge>
      </div>

      <Card className="overflow-hidden border border-border/60 bg-muted/40 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/50 bg-background/70 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <SectionHeroBadge
            sectionPath={data.sectionPath}
            badge={data.badge}
            compact
          />
        </div>

        <CardContent className="space-y-8 p-6 md:p-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
              {data.titlePrefix}{' '}
              <span className="bg-(image:--primary-text-gradient) bg-clip-text text-transparent">
                {data.titleHighlight}
              </span>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
              {data.subtitle}
            </p>
          </div>

          <SectionHeroActions className="flex flex-wrap items-center gap-3" />

          <div className="grid divide-y divide-border/50 rounded-xl border border-border/50 bg-background/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {data.highlights.map((item) => (
              <div key={item.id} className="p-4">
                <p className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function SectionHeroCentered({ data }: { data: SectionPageData }) {
  return (
    <section className="container mx-auto max-w-6xl px-4 pt-12 pb-12 md:pt-20 md:pb-16">
      <div className="mb-8 flex justify-center">
        <SectionHeroBackLink />
      </div>

      <div className="flex flex-col items-center space-y-6 text-center">
        <SectionHeroBadge sectionPath={data.sectionPath} badge={data.badge} />

        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {data.titlePrefix}{' '}
          <span className="bg-(image:--primary-text-gradient) bg-clip-text text-transparent">
            {data.titleHighlight}
          </span>
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {data.subtitle}
        </p>

        <SectionHeroActions className="flex flex-wrap items-center justify-center gap-3 pt-2" />

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

export function SectionHero({
  data,
  variant = 'centered',
  rightSlot,
}: {
  data: SectionPageData;
  variant?: 'centered' | 'split' | 'terminal';
  rightSlot?: ReactNode;
}) {
  if (variant === 'split') {
    return <SectionHeroSplit data={data} rightSlot={rightSlot} />;
  }

  if (variant === 'terminal') {
    return <SectionHeroTerminal data={data} />;
  }

  return <SectionHeroCentered data={data} />;
}

function SpotlightEventCard({
  event,
  sectionPath,
  sectionTitle,
  preferredApp,
  onRequestAppChoice,
}: {
  event: EventType;
  sectionPath: SectionPath;
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
  const colors = getSectionColors(sectionPath);

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
          <Badge
            variant="secondary"
            className={cn('px-3 py-1 text-xs font-medium', colors.badge)}
          >
            {SectionIcon && <SectionIcon className="mr-1.5 h-3.5 w-3.5" />}
            {sectionTitle}
          </Badge>
        </div>
        <CardTitle
          className={cn(
            'text-2xl transition-colors duration-300',
            colors.hoverTitle
          )}
        >
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
            <RiCalendar2Line className={cn('h-4 w-4', colors.textAccent)} />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium">
            <RiTimeLine className={cn('h-4 w-4', colors.textAccent)} />
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
  sectionPath,
  preferredApp,
  onRequestAppChoice,
}: {
  event: EventType;
  sectionPath: SectionPath;
  preferredApp: CalendarApp | null;
  onRequestAppChoice: (event: EventType, mode: ActionMode) => void;
}) {
  const { t } = useTranslation();
  const targets = useCalendarLinks(event);
  const { timeLabel, dateLabel } = formatEventSchedule(event.start, event.end);
  const colors = getSectionColors(sectionPath);

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
        <CardTitle
          as="h4"
          className={cn('text-lg transition-colors', colors.hoverTitle)}
        >
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
  const { t } = useTranslation();

  return (
    <Card
      role="status"
      aria-busy="true"
      aria-label={t('Schedule.loading', 'Ładowanie harmonogramu spotkań...')}
      className="border-none bg-muted/50 shadow-sm"
    >
      <CardHeader aria-hidden="true" className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-8 w-2/3" />
      </CardHeader>
      <CardContent aria-hidden="true" className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </CardContent>
      <CardFooter aria-hidden="true">
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

export function SectionNextEventSection({
  sectionPath,
  variant = 'centered',
}: {
  sectionPath: SectionPath;
  variant?: 'centered' | 'split-row';
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
  const colors = getSectionColors(sectionPath);

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

  const preferenceBar = preferredApp && !isLoading && !isError && nextEvent && (
    <div
      className={`flex flex-wrap items-center gap-2 text-sm text-muted-foreground ${
        variant === 'centered' ? 'justify-center' : 'justify-start'
      }`}
    >
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
  );

  const spotlightBlock = isLoading ? (
    <NextEventLoadingCard />
  ) : isError || !nextEvent ? (
    <NextEventEmptyCard />
  ) : (
    <SpotlightEventCard
      event={nextEvent}
      sectionPath={sectionPath}
      sectionTitle={sectionTitle}
      preferredApp={preferredApp}
      onRequestAppChoice={(event, mode) =>
        setDialogState({ type: 'action', event, mode })
      }
    />
  );

  return (
    <section
      id="spotkania"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
    >
      <div className="flex flex-col space-y-8">
        {variant === 'split-row' ? (
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <Badge
                variant="secondary"
                className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
              >
                <RiCalendarEventLine className="mr-2 h-4 w-4" />
                {t('SectionPage.nextEvent.badge', 'Harmonogram sekcji')}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t('SectionPage.nextEvent.title', 'Najbliższe spotkanie')}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t(
                  'SectionPage.nextEvent.subtitle',
                  'Aktualne terminy spotkań sekcji pobierane bezpośrednio z kalendarza KNPiMI.'
                )}
              </p>
              {preferenceBar}
            </div>
            <div className="lg:col-span-8">{spotlightBlock}</div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-3 text-center">
              <Badge
                variant="secondary"
                className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
              >
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
            {preferenceBar}
            {spotlightBlock}
          </>
        )}

        {!isLoading && !isError && moreEvents.length > 0 && (
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
                  sectionPath={sectionPath}
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

      <CalendarPickerDialog
        dialogState={dialogState}
        preferredApp={preferredApp}
        onClose={() => setDialogState(null)}
        onSelectPreferredApp={setPreferredApp}
      />
    </section>
  );
}

export function SectionPillars({
  data,
  variant = 'grid-2x2',
}: {
  data: SectionPageData;
  variant?: 'grid-2x2' | 'bento' | 'notebook' | 'briefing';
}) {
  const colors = getSectionColors(data.sectionPath);
  const sectionIconBoxClass = getIconBoxClass(data.sectionPath);

  return (
    <section
      id="obszary"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
    >
      <div className="flex flex-col space-y-10">
        {variant === 'bento' || variant === 'briefing' ? (
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-3">
              <Badge
                variant="secondary"
                className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
              >
                <RiStackLine className="mr-2 h-4 w-4" />
                {data.pillarsBadge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {data.pillarsTitle}
              </h2>
            </div>
            <p className="max-w-xl text-base text-muted-foreground">
              {data.pillarsSubtitle}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 text-center">
            <Badge
              variant="secondary"
              className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
            >
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
        )}

        {variant === 'bento' ? (
          <div className="grid gap-6 md:grid-cols-12">
            {data.pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isWide = index === 0 || index === 3;
              return (
                <Card
                  key={pillar.id}
                  className={`relative overflow-hidden ${cardClass} ${
                    isWide ? 'md:col-span-7' : 'md:col-span-5'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-(image:--primary-gradient) opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={sectionIconBoxClass}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-muted-foreground">
                          0{index + 1}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs font-medium',
                          colors.badgeOutline
                        )}
                      >
                        {pillar.badge}
                      </Badge>
                    </div>
                    <CardTitle
                      className={cn(
                        'text-xl transition-colors',
                        colors.hoverTitle
                      )}
                    >
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
        ) : variant === 'notebook' ? (
          <div className="space-y-4">
            {data.pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  className={cn(
                    'group overflow-hidden border border-border/50 bg-muted/40 py-0 shadow-sm transition-colors hover:bg-muted/60',
                    colors.hoverBorder
                  )}
                >
                  <div className="grid md:grid-cols-12">
                    <div className="flex flex-col justify-between gap-3 border-b border-border/40 bg-background/60 p-5 md:col-span-5 md:border-r md:border-b-0">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            'font-mono text-xs font-semibold',
                            colors.textAccent
                          )}
                        >
                          In [{String(index + 1).padStart(2, '0')}]:
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            'font-mono text-xs font-medium',
                            colors.badgeOutline
                          )}
                        >
                          {pillar.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={sectionIconBoxClass}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3
                          className={cn(
                            'text-lg font-bold tracking-tight transition-colors',
                            colors.hoverTitle
                          )}
                        >
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center p-5 md:col-span-7 md:p-6">
                      <p className="leading-relaxed text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : variant === 'briefing' ? (
          <Card className="overflow-hidden border border-border/50 bg-muted/40 py-0 shadow-sm">
            <div className="divide-y divide-border/50">
              {data.pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="group grid items-start gap-4 p-6 transition-colors hover:bg-muted/70 md:grid-cols-12"
                  >
                    <div className="flex items-center gap-3 md:col-span-4">
                      <span className="font-mono text-sm font-bold text-muted-foreground">
                        [{String(index + 1).padStart(2, '0')}]
                      </span>
                      <div className={sectionIconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'font-mono text-xs font-medium',
                          colors.badgeOutline
                        )}
                      >
                        {pillar.badge}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 md:col-span-8">
                      <h3
                        className={cn(
                          'text-lg font-bold transition-colors',
                          colors.hoverTitle
                        )}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {data.pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.id} className={cardClass}>
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className={sectionIconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs font-medium',
                          colors.badgeOutline
                        )}
                      >
                        {pillar.badge}
                      </Badge>
                    </div>
                    <CardTitle
                      className={cn(
                        'text-xl transition-colors',
                        colors.hoverTitle
                      )}
                    >
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
        )}
      </div>
    </section>
  );
}

export function SectionTechStack({
  data,
  variant = 'cards-3',
}: {
  data: SectionPageData;
  variant?: 'cards-3' | 'matrix' | 'terminal-grid';
}) {
  const colors = getSectionColors(data.sectionPath);

  return (
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex flex-col space-y-10">
        {variant === 'matrix' ? (
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-3">
              <Badge
                variant="secondary"
                className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
              >
                <RiCodeBoxLine className="mr-2 h-4 w-4" />
                {data.techBadge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {data.techTitle}
              </h2>
            </div>
            <p className="max-w-xl text-base text-muted-foreground">
              {data.techSubtitle}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 text-center">
            <Badge
              variant="secondary"
              className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
            >
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
        )}

        {variant === 'matrix' ? (
          <TechGroupsMatrixSheet groups={data.techGroups} />
        ) : variant === 'terminal-grid' ? (
          <div className="grid gap-6 md:grid-cols-3">
            {data.techGroups.map((group) => (
              <Card
                key={group.id}
                className="overflow-hidden border border-border/60 bg-muted/40 py-0 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-border/50 bg-background/70 px-4 py-2.5">
                  <span className="font-mono text-xs font-semibold text-foreground">
                    $ ls ./{group.id}
                  </span>
                  <span className={cn('h-2 w-2 rounded-full', colors.dot)} />
                </div>
                <CardHeader className="space-y-1.5 pt-5">
                  <CardTitle className="text-base">{group.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="bg-background/70 px-2.5 py-1 font-mono text-xs font-medium"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {data.techGroups.map((group) => (
              <Card
                key={group.id}
                className="border-none bg-muted/50 shadow-sm"
              >
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
        )}
      </div>
    </section>
  );
}

export function SectionWorkflow({
  data,
  variant = 'card-3',
}: {
  data: SectionPageData;
  variant?: 'card-3' | 'pipeline' | 'checklist';
}) {
  const colors = getSectionColors(data.sectionPath);
  const sectionIconBoxClass = getIconBoxClass(data.sectionPath);

  if (variant === 'pipeline') {
    return (
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col items-center space-y-3 text-center">
            <Badge
              variant="secondary"
              className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
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
            {data.workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative flex flex-col">
                  <Card className="relative h-full border border-border/50 bg-muted/40 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={sectionIconBoxClass}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={cn(
                            'font-mono text-3xl font-black tracking-tighter select-none',
                            colors.watermark
                          )}
                        >
                          {step.step}
                        </span>
                      </div>
                      <CardTitle className="pt-2 text-lg">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {index < data.workflowSteps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 -right-5 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground shadow-xs md:flex"
                    >
                      <RiArrowRightLine className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'checklist') {
    return (
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:sticky lg:top-28 lg:col-span-5">
            <Badge
              variant="secondary"
              className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
            >
              <RiCompass3Line className="mr-2 h-4 w-4" />
              {data.workflowBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {data.workflowTitle}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {data.workflowSubtitle}
            </p>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {data.workflowSteps.map((step) => (
              <NumberedStepCard
                key={step.step}
                step={step}
                iconBoxClassName={sectionIconBoxClass}
                stepNumberClassName={colors.textAccent}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <Card className="border-none bg-muted/50 p-6 shadow-sm md:p-10">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center space-y-3 text-center">
            <Badge
              variant="secondary"
              className={cn('px-3 py-1 text-sm font-medium', colors.badge)}
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
                    <div className={sectionIconBoxClass}>
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

export function SectionOtherAndCta({ data }: { data: SectionPageData }) {
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
                      <div
                        className={cn(
                          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
                          section.colors.iconBox
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <RiArrowRightLine
                        className={cn(
                          'h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1',
                          section.colors.hoverTitle
                        )}
                      />
                    </div>
                    <CardTitle
                      className={cn(
                        'mt-3 text-xl transition-colors',
                        section.colors.hoverTitle
                      )}
                    >
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
