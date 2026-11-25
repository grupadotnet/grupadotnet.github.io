import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiStackLine } from '@remixicon/react';
import { useTranslation } from 'react-i18next';
import { extractTranslation } from '../lib/extractTranslation.tsx';
import { sections } from '@/lib/sections.ts';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/sections')({
  component: Sections,
  staticData: {
    titleData: extractTranslation('Sections.navbarTitle', 'Sekcje'),
    hideInNav: false,
    order: 1,
  },
});

function Sections() {
  const { t } = useTranslation();

  const location = useLocation().pathname;
  const isSection =
    location === '/sections' || location === '/sections/' || location === '/';

  if (!isSection) return <Outlet />;

  const isStandalone = location !== '/';
  const Heading = isStandalone ? 'h1' : 'h2';
  const cardTitleAs = isStandalone ? 'h2' : 'h3';

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
              <RiStackLine aria-hidden="true" className="mr-2 h-4 w-4" />
              {t('Sections.badge', 'Ścieżki rozwoju')}
            </Badge>
            <Heading className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Sections.title', 'Czym się zajmujemy?')}
            </Heading>
            <p className="max-w-2xl text-lg text-muted-foreground text-balance">
              {t(
                'Sections.paragraph',
                'Wybierz obszar, który najbardziej Cię interesuje i rozwijaj swoje\n              umiejętności pod okiem starszych studentów.'
              )}
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid gap-6 md:grid-cols-3 md:auto-rows-fr">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  to={`/sections/${section.path}`}
                  key={section.path}
                  className="block h-full"
                >
                  <Card className="group h-full border-none bg-muted/50 shadow-sm transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:bg-muted/70">
                    <CardHeader>
                      <div
                        className={cn(
                          'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg',
                          section.colors.iconBox
                        )}
                      >
                        {/* Remix Icons accept standard Tailwind sizing classes perfectly */}
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </div>
                      <CardTitle
                        as={cardTitleAs}
                        className={cn(
                          'text-xl transition-colors',
                          section.colors.hoverTitle
                        )}
                      >
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
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
    </div>
  );
}
