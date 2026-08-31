import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
// @ts-expect-error: unrepairable
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// @ts-expect-error: unrepairable
import { Badge } from '@/components/ui/badge';
import {
  RiStackLine,
  RiCodeBoxLine,
  RiBrainLine,
  RiShieldCheckLine,
} from '@remixicon/react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/sections')({
  component: Sections,
  staticData: {
    title: 'Sekcje',
    hideInNav: false,
    order: 1,
  },
});

export function Sections() {
  const { t } = useTranslation();
  const sections = [
    {
      // i18next-instrument-ignore-next-line
      title: 'WebDev',
      path: 'webdev',
      icon: RiCodeBoxLine,
      description: t(
        'Sections.sectionData.webdev.description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
      ),
    },
    {
      // i18next-instrument-ignore-next-line
      title: 'Data&AI',
      path: 'data&ai',
      icon: RiBrainLine,
      description: t(
        'Sections.sectionData.data&ai.description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
      ),
    },
    {
      // i18next-instrument-ignore-next-line
      title: 'CyberSec',
      path: 'cybersec',
      icon: RiShieldCheckLine,
      description: t(
        'Sections.sectionData.cybersec.description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
      ),
    },
  ];

  const location = useLocation().pathname;
  const isSection = location === '/sections' || location === '/';

  if (!isSection) return <Outlet />;

  return (
    <div className={'bg-background'}>
      <section
        id="sekcje"
        className="container mx-auto max-w-6xl px-4 py-16 md:py-24"
      >
        <div className="flex flex-col space-y-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiStackLine className="mr-2 h-4 w-4" />
              {t('Sections.badge', 'Ścieżki rozwoju')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Sections.title', 'Czym się zajmujemy?')}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground text-balance">
              {t(
                'Sections.paragraph',
                'Wybierz obszar, który najbardziej Cię interesuje i rozwijaj swoje\n              umiejętności pod okiem starszych studentów.'
              )}
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <Link to={section.path}>
                  <Card
                    key={index}
                    className="group border-none bg-muted/50 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:hover:bg-muted/70"
                  >
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {/* Remix Icons accept standard Tailwind sizing classes perfectly */}
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
