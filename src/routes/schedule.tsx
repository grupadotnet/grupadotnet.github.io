import { useState } from 'react';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { RiCalendar2Line } from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import { matchSectionByCalendarName, sections } from '@/lib/sections.ts';
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

export const Route = createFileRoute('/schedule')({
  component: Schedule,
  staticData: {
    titleData: extractTranslation('Schedule.navbarTitle', 'Harmonogram'),
    hideInNav: false,
    order: 3,
  },
});

const SCHEDULE_SCROLL_AREA_CLASS =
  '@container w-[92%] md:w-[94%] lg:w-[92%] max-w-[100rem] rounded-xl';
const SCHEDULE_TRACK_CLASS = 'mx-auto flex w-max gap-4 pb-4';
const SCHEDULE_CARD_WRAPPER_CLASS =
  'shrink-0 w-[calc(100cqw-1.5rem)] sm:w-[min(24rem,calc(100cqw-1.5rem))] md:w-[calc((100cqw-1rem)/2)] lg:w-[calc((100cqw-2rem)/2.5)] xl:w-[calc((100cqw-2rem)/3)] 2xl:w-[calc((100cqw-3rem)/4)]';

function Schedule() {
  const { t } = useTranslation();
  const isStandalone = useLocation().pathname !== '/';
  const Heading = isStandalone ? 'h1' : 'h2';
  const cardTitleAs = isStandalone ? 'h2' : 'h3';

  return (
    <section
      id="harmonogram"
      className="bg-background flex py-10 w-full min-w-0 items-center justify-center flex-col space-y-4"
    >
      <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
        <RiCalendar2Line aria-hidden="true" className="mr-2 h-4 w-4" />
        {t('Schedule.badge', 'Harmonogram spotkań')}
      </Badge>
      <Heading className="px-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
        {t('Schedule.title', 'Kiedy się spotykamy?')}
      </Heading>
      <p className="max-w-2xl px-4 text-lg text-muted-foreground text-balance text-center">
        {t(
          'Schedule.paragraph',
          'Lista zaplanowanych spotkań na kolejny miesiąc'
        )}
      </p>
      {/* Suspense removed. The child component handles its own loading state */}
      <LoadedCarousel cardTitleAs={cardTitleAs} />
    </section>
  );
}

function LoadedCarousel({ cardTitleAs }: { cardTitleAs: 'h2' | 'h3' }) {
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
  const [preferredApp, setPreferredApp] = usePreferredCalendarApp();
  const [dialogState, setDialogState] = useState<DialogState>(null);

  const sortedEvents = [...events].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  // 3. Show Skeleton if fetching
  if (isLoading) {
    return <GhostCarousel />;
  }

  // 4. Show Empty State if no events
  if (sortedEvents.length === 0 || isError) {
    return (
      <Card>
        <CardHeader>
          {/* Removed wrapping <h2> to fix hydration error */}
          <CardTitle as={cardTitleAs}>
            {t('Schedule.notFound.title', 'O kurcze!!')}
          </CardTitle>
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

      <ScrollArea className={SCHEDULE_SCROLL_AREA_CLASS}>
        <div className={SCHEDULE_TRACK_CLASS}>
          {sortedEvents.map((event) => {
            const matchedSection = matchSectionByCalendarName(
              event.calendarName
            );
            return (
              <EventCarouselItem
                key={`${event.id}-${event.calendarName}-${event.start.getTime()}`}
                event={event}
                matchedSection={matchedSection}
                preferredApp={preferredApp}
                cardTitleAs={cardTitleAs}
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

function EventCarouselItem({
  event,
  matchedSection,
  preferredApp,
  cardTitleAs,
  onRequestAppChoice,
}: {
  event: EventType;
  matchedSection: (typeof sections)[0] | undefined;
  preferredApp: CalendarApp | null;
  cardTitleAs: 'h2' | 'h3';
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
    <div className={SCHEDULE_CARD_WRAPPER_CLASS}>
      <Card className="h-full flex flex-col group bg-muted/50 shadow-sm transition-shadow duration-300 hover:shadow-md dark:hover:bg-muted/70">
        {matchedSection && (
          <Badge
            variant="secondary"
            className={cn(
              'mx-7 flex items-center px-3 py-1 text-sm font-medium',
              matchedSection.colors.badge
            )}
          >
            {Icon && <Icon aria-hidden="true" className="mr-2 h-4 w-4" />}
            {matchedSection.title}
          </Badge>
        )}
        <CardHeader>
          <CardTitle
            as={cardTitleAs}
            className={cn(
              'flex text-xl transition-colors duration-300',
              matchedSection
                ? matchedSection.colors.hoverTitle
                : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
            )}
          >
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
        <CardFooter className="flex justify-between">
          <ButtonGroup className="w-full">
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
              onClick={() => onRequestAppChoice('subscribe')}
            />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

// 6. The Skeleton Component using Shadcn <Skeleton />
function GhostCarousel() {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={t('Schedule.loading', 'Ładowanie harmonogramu spotkań...')}
      className="flex w-full justify-center"
    >
      <ScrollArea className={SCHEDULE_SCROLL_AREA_CLASS}>
        <div aria-hidden="true" className={SCHEDULE_TRACK_CLASS}>
          {/* Render 4 dummy skeleton cards so the scroll area looks full */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={SCHEDULE_CARD_WRAPPER_CLASS}>
              <Card className="h-full flex flex-col group bg-muted/50 shadow-sm transition-shadow duration-300 hover:shadow-md dark:hover:bg-muted/70">
                {/* Badge skeleton */}
                <Skeleton className="h-5 w-24 rounded-4xl mx-7" />
                <CardHeader>
                  <CardTitle as="div" className="flex text-xl">
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
                <CardFooter className="flex justify-between">
                  <ButtonGroup className="w-full">
                    {/* Singular link button skeleton */}
                    <Skeleton className="h-9 flex-1 rounded-4xl border border-transparent bg-clip-padding" />
                    {/* Entire link button skeleton */}
                    <Skeleton className="h-9 flex-[2] rounded-4xl border border-transparent bg-clip-padding" />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
