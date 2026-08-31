import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/projects')({
  component: Projects,
  staticData: {
    title: 'Projects',
    hideInNav: false,
    order: 2,
  },
});

export function Projects() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 bg-background py-30">
      <div className="max-w-md space-y-3 border border-border/40 bg-muted/50 p-6 rounded-xl backdrop-blur-sm">
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {t('wip', '🚧 WIP')}
        </span>
        <h2 className="text-lg font-medium tracking-tight">
          {t('underConstruction', 'Under Construction')}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t(
            'weAreCurrentlyBuildingOutThisSectionCheckBackSoon',
            'We are currently building out this section. Check back soon.'
          )}
        </p>
      </div>
    </div>
  );
}
