import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiArrowRightLine, RiFolderOpenLine } from '@remixicon/react';
import { useTranslation } from 'react-i18next';
import { extractTranslation } from '../lib/extractTranslation.tsx';
import { projects } from '@/lib/projects.ts';

export const Route = createFileRoute('/projects')({
  component: Projects,
  staticData: {
    titleData: extractTranslation('Projects.navbarTitle', 'Projekty'),
    hideInNav: false,
    order: 2,
  },
});

function getProjectGridSpanClass(index: number, total: number): string {
  if (total === 5) {
    if (index < 3) return 'lg:col-span-2';
    if (index === 4) return 'md:col-span-2 lg:col-span-3';
    return 'lg:col-span-3';
  }
  return 'lg:col-span-2';
}

function Projects() {
  const { t } = useTranslation();

  const location = useLocation().pathname;
  const isProjectsIndex =
    location === '/projects' || location === '/projects/' || location === '/';

  if (!isProjectsIndex) return <Outlet />;

  const isStandalone = location !== '/';
  const Heading = isStandalone ? 'h1' : 'h2';
  const cardTitleAs = isStandalone ? 'h2' : 'h3';

  return (
    <div className={'bg-background'}>
      <section
        id="projekty"
        className="container mx-auto max-w-6xl px-4 py-16 md:py-24"
      >
        <div className="flex flex-col space-y-12">
          {/* Section Header */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiFolderOpenLine aria-hidden="true" className="mr-2 h-4 w-4" />
              {t('Projects.badge', 'Nasze realizacje')}
            </Badge>
            <Heading className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Projects.title', 'Projekty koła')}
            </Heading>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground">
              {t(
                'Projects.paragraph',
                'Poznaj aplikacje webowe, mobilne i systemy IoT tworzone przez studentów KNPiMI od pomysłu aż po wdrożenie.'
              )}
            </p>
          </div>

          {/* Balanced Grid for 5 Projects */}
          <div className="grid gap-6 md:grid-cols-2 md:auto-rows-fr lg:grid-cols-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const spanClass = getProjectGridSpanClass(index, projects.length);

              return (
                <Link
                  to={`/projects/${project.path}`}
                  key={project.path}
                  className={`block h-full ${spanClass}`}
                >
                  <Card className="group relative flex h-full flex-col justify-between overflow-hidden border border-border/50 bg-muted/40 shadow-sm transition-[translate,box-shadow,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-md dark:hover:bg-muted/70">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-(image:--primary-gradient) opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div>
                      <CardHeader>
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <Icon aria-hidden="true" className="h-6 w-6" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {t(
                                project.category.key,
                                project.category.translation
                              )}
                            </Badge>
                            <RiArrowRightLine
                              aria-hidden="true"
                              className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            />
                          </div>
                        </div>
                        <CardTitle
                          as={cardTitleAs}
                          className="text-xl transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        >
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="leading-relaxed text-muted-foreground">
                          {t(
                            project.description.key,
                            project.description.translation
                          )}
                        </p>
                      </CardContent>
                    </div>
                    <CardFooter className="pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techPreview.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="font-mono text-xs font-normal"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
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
