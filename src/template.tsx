import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { extractTitle } from './lib/extractTitle.tsx';

// @ts-expect-error: Template path token

export const Route = createFileRoute('%%tsrPath%%')({
  component: RouteComponent,
  staticData: {
    titleData: extractTitle('Pages', 'temp'),
    hideInNav: true,
    order: -1,
  },
});

function RouteComponent() {
  // Call the hook with parentheses to properly initialize it
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 bg-background py-30">
      <div className="max-w-md space-y-3 border border-border/40 bg-muted/50 p-6 rounded-xl backdrop-blur-sm">
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {t('WorkInProgress.badge', '🚧 WIP')}
        </span>
        <h2 className="text-lg font-medium tracking-tight">
          {t('WorkInProgress.title', 'W trakcie prac')}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t(
            'WorkInProgress.description',
            'Ekipa budowlana już wylewa fundamenty pod tę stronę. Za kilka dni powinny być widoczne rezultaty.'
          )}
        </p>
      </div>
    </div>
  );
}
