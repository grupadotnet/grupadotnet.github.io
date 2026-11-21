import { useState, type ReactNode } from 'react';
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

import {
  buildCalendarTargets,
  formatEventSchedule,
  type ActionMode,
  type CalendarApp,
  type DialogState,
  type EventType,
} from '@/lib/useCalendarLinks.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';

const scheduleActionButtonClassName =
  'grow h-auto min-h-9 py-1.5 whitespace-normal text-center leading-tight';

export function CalendarActionButton({
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
        className={scheduleActionButtonClassName}
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
    <Button
      type="button"
      variant="default"
      className={scheduleActionButtonClassName}
      onClick={onClick}
    >
      {label}
    </Button>
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

export function CalendarPickerDialog({
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
