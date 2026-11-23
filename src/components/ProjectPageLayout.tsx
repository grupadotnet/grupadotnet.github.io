import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCodeBoxLine,
  RiCompass3Line,
  RiDiscordFill,
  RiEyeLine,
  RiGitBranchLine,
  RiGithubFill,
  RiImageLine,
  RiStackLine,
  RiZoomInLine,
} from '@remixicon/react';

import { projects, type ProjectPath } from '@/lib/projects.ts';
import {
  NumberedStepCard,
  TechGroupsMatrixSheet,
} from '@/components/PageBlocks.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';

export interface ProjectFeature {
  id: string;
  icon: typeof RiCodeBoxLine;
  badge: string;
  title: string;
  description: string;
}

export interface ProjectTechGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface ProjectStep {
  step: string;
  icon: typeof RiCodeBoxLine;
  title: string;
  description: string;
}

export interface ProjectHighlight {
  id: string;
  label: string;
  value: string;
}

export interface ProjectRepository {
  name: string;
  description: string;
  url: string;
  language?: string;
}

export interface ProjectVisual {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  badge: string;
  variant: 'desktop' | 'mobile' | 'diagram';
}

export interface ProjectPageData {
  projectPath: ProjectPath;
  badge: string;
  status?: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  highlights: ProjectHighlight[];
  featuresBadge: string;
  featuresTitle: string;
  featuresSubtitle: string;
  features: ProjectFeature[];
  techBadge: string;
  techTitle: string;
  techSubtitle: string;
  techGroups: ProjectTechGroup[];
  architectureBadge: string;
  architectureTitle: string;
  architectureSubtitle: string;
  architectureSteps: ProjectStep[];
  visualsBadge?: string;
  visualsTitle?: string;
  visualsSubtitle?: string;
  visuals?: ProjectVisual[];
  repositories?: ProjectRepository[];
  ctaTitle: string;
  ctaDescription: string;
}

const LANGUAGE_DOT_COLOR: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  Java: 'bg-orange-500',
  Kotlin: 'bg-purple-500',
  'C#': 'bg-emerald-500',
  'C++': 'bg-pink-500',
  Docker: 'bg-sky-500',
  'KMP / Go': 'bg-cyan-500',
  'Java / Expo': 'bg-amber-500',
};

const cardClass =
  'group h-full border border-border/50 bg-muted/40 shadow-sm transition-[translate,box-shadow,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-md dark:hover:bg-muted/70';

const iconBoxClass =
  'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';

function HeroVisualPreview({
  visuals,
  onSelectVisual,
}: {
  visuals: ProjectVisual[];
  onSelectVisual: (visual: ProjectVisual) => void;
}) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVisual = visuals[activeIndex] ?? visuals[0];

  return (
    <Card className="overflow-hidden border border-border/60 bg-muted/40 shadow-md">
      <div className="flex items-center justify-between border-b border-border/50 bg-background/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {activeVisual.badge}
        </span>
        <button
          type="button"
          onClick={() => onSelectVisual(activeVisual)}
          aria-label={t('ProjectPage.zoomVisual', 'Powiększ podgląd')}
          className="inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RiZoomInLine className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">
            {t('ProjectPage.zoomShort', 'Powiększ')}
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelectVisual(activeVisual)}
        className="group relative block w-full cursor-pointer overflow-hidden bg-background/60 p-3 text-left"
      >
        <div className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-lg border border-border/40 bg-white">
          <img
            src={activeVisual.src}
            alt={activeVisual.alt}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/55 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-xs font-medium text-white">
              {activeVisual.title}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">
              <RiEyeLine className="h-3 w-3" />
              {t('ProjectPage.zoomShort', 'Powiększ')}
            </span>
          </div>
        </div>
      </button>

      {visuals.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/50 bg-background/60 px-3 py-2.5">
          {visuals.map((visual, idx) => (
            <button
              key={visual.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                idx === activeIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {visual.badge}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}

function HeroBlueprintCard({ data }: { data: ProjectPageData }) {
  const { t } = useTranslation();
  const topTech = data.techGroups.flatMap((g) => g.items).slice(0, 6);

  return (
    <Card className="relative overflow-hidden border border-border/60 bg-muted/40 shadow-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="relative flex items-center justify-between border-b border-border/50 bg-background/85 px-4 py-2.5 backdrop-blur-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {data.projectPath}.blueprint
        </span>
      </div>

      <CardContent className="relative space-y-4 p-5">
        <div className="space-y-2.5">
          {data.architectureSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={step.step} className="relative">
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/85 p-3 backdrop-blur-xs">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    <StepIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold">
                        {step.title}
                      </p>
                      <span className="font-mono text-[11px] font-bold text-muted-foreground">
                        {step.step}
                      </span>
                    </div>
                  </div>
                </div>
                {index < data.architectureSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="mx-auto h-2.5 w-px bg-border"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-2 border-t border-border/50 pt-3">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {t('ProjectPage.blueprintStack', 'Kluczowy stack')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {topTech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="font-mono text-[11px] font-normal"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectHeroTopBar({ status }: { status?: string }) {
  const { t } = useTranslation();

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        className="gap-1.5 text-muted-foreground hover:text-foreground"
        render={
          <Link to="/projects">
            <RiArrowLeftLine className="h-4 w-4" />
            <span>{t('ProjectPage.backToProjects', 'Wszystkie projekty')}</span>
          </Link>
        }
      />
      {status && (
        <Badge
          variant="outline"
          className="gap-2 border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {status}
        </Badge>
      )}
    </div>
  );
}

function ProjectHeroBadge({
  projectPath,
  badge,
}: {
  projectPath: ProjectPath;
  badge: string;
}) {
  const currentProject = projects.find((p) => p.path === projectPath);
  const ProjectIcon = currentProject?.icon;

  return (
    <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
      {ProjectIcon && <ProjectIcon className="mr-2 h-4 w-4" />}
      {badge}
    </Badge>
  );
}

function ProjectHeroActions({
  hasVisuals,
  hasRepos,
  centered,
}: {
  hasVisuals: boolean;
  hasRepos: boolean;
  centered?: boolean;
}) {
  const { t } = useTranslation();

  const primaryAction = hasVisuals
    ? {
        href: '#wizualizacje',
        icon: RiImageLine,
        label: t('ProjectPage.heroVisuals', 'Podgląd interfejsu'),
      }
    : hasRepos
      ? {
          href: '#repozytoria',
          icon: RiGithubFill,
          label: t('ProjectPage.heroRepos', 'Repozytoria GitHub'),
        }
      : {
          href: '#funkcjonalnosci',
          icon: RiCompass3Line,
          label: t('ProjectPage.heroFeatures', 'Kluczowe funkcje'),
        };

  const PrimaryIcon = primaryAction.icon;

  return (
    <div
      className={`flex flex-wrap items-center gap-3 pt-1 ${
        centered ? 'justify-center' : ''
      }`}
    >
      <Button
        nativeButton={false}
        className="cursor-pointer gap-2"
        render={
          <a href={primaryAction.href}>
            <PrimaryIcon className="h-4 w-4" />
            <span>{primaryAction.label}</span>
          </a>
        }
      />

      {hasVisuals && hasRepos && (
        <Button
          variant="secondary"
          nativeButton={false}
          className="cursor-pointer gap-2"
          render={
            <a href="#repozytoria">
              <RiGithubFill className="h-4 w-4" />
              <span>{t('ProjectPage.heroRepos', 'Repozytoria GitHub')}</span>
            </a>
          }
        />
      )}

      <Button
        variant="outline"
        nativeButton={false}
        className="cursor-pointer gap-2"
        render={
          <Link to="/contact">
            <RiDiscordFill className="h-4 w-4" />
            <span>{t('ProjectPage.heroJoin', 'Dołącz do projektu')}</span>
          </Link>
        }
      />
    </div>
  );
}

function ProjectHeroHighlights({
  highlights,
  containerClassName,
  itemClassName,
  valueClassName,
}: {
  highlights: ProjectHighlight[];
  containerClassName: string;
  itemClassName: string;
  valueClassName: string;
}) {
  return (
    <div className={containerClassName}>
      {highlights.map((item) => (
        <div key={item.id} className={itemClassName}>
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {item.label}
          </p>
          <p className={valueClassName}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectHeroVisualPane({
  data,
  rightSlot,
  onSelectVisual,
}: {
  data: ProjectPageData;
  rightSlot?: ReactNode;
  onSelectVisual?: (visual: ProjectVisual) => void;
}) {
  if (rightSlot) {
    return <>{rightSlot}</>;
  }

  if (data.visuals && data.visuals.length > 0 && onSelectVisual) {
    return (
      <HeroVisualPreview
        visuals={data.visuals}
        onSelectVisual={onSelectVisual}
      />
    );
  }

  return <HeroBlueprintCard data={data} />;
}

function ProjectHeroCentered({
  data,
  topSlot,
  hasVisuals,
  hasRepos,
}: {
  data: ProjectPageData;
  topSlot?: ReactNode;
  hasVisuals: boolean;
  hasRepos: boolean;
}) {
  return (
    <section className="container mx-auto max-w-6xl px-4 pt-10 pb-12 md:pt-16 md:pb-16">
      <ProjectHeroTopBar status={data.status} />

      <div className="mx-auto flex max-w-4xl flex-col items-center space-y-6 text-center">
        <ProjectHeroBadge projectPath={data.projectPath} badge={data.badge} />

        {topSlot}

        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {data.titlePrefix}{' '}
          <span className="bg-(image:--primary-gradient) bg-clip-text text-transparent">
            {data.titleHighlight}
          </span>
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {data.subtitle}
        </p>

        <ProjectHeroActions
          hasVisuals={hasVisuals}
          hasRepos={hasRepos}
          centered
        />

        <ProjectHeroHighlights
          highlights={data.highlights}
          containerClassName="grid w-full divide-y divide-border/50 rounded-2xl border border-border/50 bg-muted/40 text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          itemClassName="p-5"
          valueClassName="mt-1.5 text-sm font-semibold text-foreground"
        />
      </div>
    </section>
  );
}

function ProjectHeroSplit({
  data,
  rightSlot,
  onSelectVisual,
  hasVisuals,
  hasRepos,
}: {
  data: ProjectPageData;
  rightSlot?: ReactNode;
  onSelectVisual?: (visual: ProjectVisual) => void;
  hasVisuals: boolean;
  hasRepos: boolean;
}) {
  return (
    <section className="container mx-auto max-w-6xl px-4 pt-10 pb-12 md:pt-16 md:pb-16">
      <ProjectHeroTopBar status={data.status} />

      <div className="grid items-center gap-10 lg:grid-cols-12">
        {/* Left column: Editorial header + CTA + Spec Strip */}
        <div className="space-y-6 lg:col-span-7">
          <ProjectHeroBadge projectPath={data.projectPath} badge={data.badge} />

          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {data.titlePrefix}{' '}
            <span className="bg-(image:--primary-gradient) bg-clip-text text-transparent">
              {data.titleHighlight}
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {data.subtitle}
          </p>

          <ProjectHeroActions hasVisuals={hasVisuals} hasRepos={hasRepos} />

          {/* Unified Spec Strip */}
          <ProjectHeroHighlights
            highlights={data.highlights}
            containerClassName="grid divide-y divide-border/50 rounded-2xl border border-border/50 bg-muted/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            itemClassName="p-4"
            valueClassName="mt-1 text-sm font-semibold text-foreground"
          />
        </div>

        {/* Right column: Custom slot, Visual showcase or System Blueprint */}
        <div className="lg:col-span-5">
          <ProjectHeroVisualPane
            data={data}
            rightSlot={rightSlot}
            onSelectVisual={onSelectVisual}
          />
        </div>
      </div>
    </section>
  );
}

export function ProjectHero({
  data,
  variant = 'split',
  rightSlot,
  topSlot,
  onSelectVisual,
}: {
  data: ProjectPageData;
  variant?: 'split' | 'centered';
  rightSlot?: ReactNode;
  topSlot?: ReactNode;
  onSelectVisual?: (visual: ProjectVisual) => void;
}) {
  const hasRepos = Boolean(data.repositories && data.repositories.length > 0);
  const hasVisuals = Boolean(data.visuals && data.visuals.length > 0);

  if (variant === 'centered') {
    return (
      <ProjectHeroCentered
        data={data}
        topSlot={topSlot}
        hasVisuals={hasVisuals}
        hasRepos={hasRepos}
      />
    );
  }

  return (
    <ProjectHeroSplit
      data={data}
      rightSlot={rightSlot}
      onSelectVisual={onSelectVisual}
      hasVisuals={hasVisuals}
      hasRepos={hasRepos}
    />
  );
}

function ProjectVisualShowcase({
  data,
  onSelectVisual,
}: {
  data: ProjectPageData;
  onSelectVisual: (visual: ProjectVisual) => void;
}) {
  const { t } = useTranslation();
  const visuals = data.visuals ?? [];
  if (visuals.length === 0) return null;

  const desktopVisuals = visuals.filter((v) => v.variant === 'desktop');
  const mobileVisuals = visuals.filter((v) => v.variant === 'mobile');
  const diagramVisuals = visuals.filter((v) => v.variant === 'diagram');

  return (
    <section
      id="wizualizacje"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
    >
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiImageLine className="mr-2 h-4 w-4" />
              {data.visualsBadge ??
                t('ProjectPage.visuals.badge', 'Wizualizacje i makiety')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {data.visualsTitle ??
                t('ProjectPage.visuals.title', 'Interfejs i przepływ systemu')}
            </h2>
          </div>
          {data.visualsSubtitle && (
            <p className="max-w-xl text-base text-muted-foreground">
              {data.visualsSubtitle}
            </p>
          )}
        </div>

        {/* Top showcase: Desktop Dashboard + Mobile Phone Frame side-by-side */}
        {(desktopVisuals.length > 0 || mobileVisuals.length > 0) && (
          <div className="grid gap-6 lg:grid-cols-12">
            {desktopVisuals.map((visual) => (
              <Card
                key={visual.id}
                className={`overflow-hidden border border-border/50 bg-muted/40 shadow-sm ${
                  mobileVisuals.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'
                }`}
              >
                <div className="flex items-center justify-between border-b border-border/50 bg-background/70 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-medium">
                      {visual.badge}
                    </Badge>
                    <span className="text-sm font-semibold">
                      {visual.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectVisual(visual)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <RiZoomInLine className="h-4 w-4" />
                    <span>{t('ProjectPage.zoomVisual', 'Powiększ')}</span>
                  </button>
                </div>
                <CardContent className="space-y-4 p-4 sm:p-6">
                  <button
                    type="button"
                    onClick={() => onSelectVisual(visual)}
                    className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-white shadow-xs"
                  >
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </button>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {visual.caption}
                  </p>
                </CardContent>
              </Card>
            ))}

            {mobileVisuals.map((visual) => (
              <Card
                key={visual.id}
                className={`flex flex-col justify-between overflow-hidden border border-border/50 bg-muted/40 shadow-sm ${
                  desktopVisuals.length > 0 ? 'lg:col-span-4' : 'lg:col-span-12'
                }`}
              >
                <div className="flex items-center justify-between border-b border-border/50 bg-background/70 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-medium">
                      {visual.badge}
                    </Badge>
                    <span className="truncate text-sm font-semibold">
                      {visual.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectVisual(visual)}
                    aria-label={t('ProjectPage.zoomVisual', 'Powiększ')}
                    className="inline-flex cursor-pointer items-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <RiZoomInLine className="h-4 w-4" />
                  </button>
                </div>
                <CardContent className="flex flex-1 flex-col items-center justify-between gap-4 p-5">
                  <button
                    type="button"
                    onClick={() => onSelectVisual(visual)}
                    className="group relative mx-auto block w-48 cursor-pointer overflow-hidden rounded-[1.75rem] border-4 border-zinc-900 bg-zinc-950 p-1.5 shadow-lg dark:border-zinc-700"
                  >
                    <div className="mx-auto mb-1.5 h-1.5 w-12 rounded-full bg-zinc-700" />
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      className="h-auto w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </button>
                  <p className="text-center text-sm leading-relaxed text-muted-foreground">
                    {visual.caption}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Full-width Diagram Cards */}
        {diagramVisuals.map((visual) => (
          <Card
            key={visual.id}
            className="overflow-hidden border border-border/50 bg-muted/40 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-border/50 bg-background/70 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Badge variant="outline" className="text-xs font-medium">
                  {visual.badge}
                </Badge>
                <span className="text-sm font-semibold sm:text-base">
                  {visual.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSelectVisual(visual)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <RiZoomInLine className="h-4 w-4" />
                <span>{t('ProjectPage.zoomVisual', 'Powiększ')}</span>
              </button>
            </div>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <button
                type="button"
                onClick={() => onSelectVisual(visual)}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-border/40 bg-[#faf6ee] p-3 shadow-xs sm:p-5"
              >
                <img
                  src={visual.src}
                  alt={visual.alt}
                  className="mx-auto h-auto max-h-115 w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </button>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {visual.caption}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ProjectFeatures({
  data,
  variant = 'sticky',
}: {
  data: ProjectPageData;
  variant?: 'sticky' | 'grid-2x2' | 'bento' | 'rows';
}) {
  if (variant === 'rows') {
    return (
      <section
        id="funkcjonalnosci"
        className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
      >
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-3">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                <RiStackLine className="mr-2 h-4 w-4" />
                {data.featuresBadge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {data.featuresTitle}
              </h2>
            </div>
            <p className="max-w-xl text-base text-muted-foreground">
              {data.featuresSubtitle}
            </p>
          </div>

          <Card className="overflow-hidden border border-border/50 bg-muted/40 py-0 shadow-sm">
            <div className="divide-y divide-border/50">
              {data.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="group grid items-start gap-4 p-6 transition-colors hover:bg-muted/70 md:grid-cols-12"
                  >
                    <div className="flex items-center gap-3 md:col-span-4">
                      <span className="font-mono text-sm font-bold text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className={iconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs font-medium">
                        {feature.badge}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 md:col-span-8">
                      <h3 className="text-lg font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (variant === 'grid-2x2' || variant === 'bento') {
    return (
      <section
        id="funkcjonalnosci"
        className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
      >
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col items-center space-y-3 text-center">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiStackLine className="mr-2 h-4 w-4" />
              {data.featuresBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {data.featuresTitle}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              {data.featuresSubtitle}
            </p>
          </div>

          <div
            className={`grid gap-5 ${
              variant === 'bento' ? 'md:grid-cols-12' : 'sm:grid-cols-2'
            }`}
          >
            {data.features.map((feature, index) => {
              const Icon = feature.icon;
              const isWide = index === 0 || index === 3;
              const spanClass =
                variant === 'bento'
                  ? isWide
                    ? 'md:col-span-7'
                    : 'md:col-span-5'
                  : '';

              return (
                <Card
                  key={feature.id}
                  className={`relative overflow-hidden ${cardClass} ${spanClass}`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-(image:--primary-gradient) opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className={iconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs font-medium">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
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

  return (
    <section
      id="funkcjonalnosci"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
    >
      <div className="grid items-start gap-8 lg:grid-cols-12">
        {/* Sticky Left Column */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:col-span-4">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            <RiStackLine className="mr-2 h-4 w-4" />
            {data.featuresBadge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {data.featuresTitle}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {data.featuresSubtitle}
          </p>
        </div>

        {/* Right 2x2 Cards with Top Gradient Accent */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {data.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className={`relative overflow-hidden ${cardClass}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-(image:--primary-gradient) opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className={iconBoxClass}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
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

export function ProjectArchitecture({
  data,
  variant = 'horizontal',
}: {
  data: ProjectPageData;
  variant?: 'horizontal' | 'vertical';
}) {
  if (variant === 'vertical') {
    return (
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:sticky lg:top-28 lg:col-span-5">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiCompass3Line className="mr-2 h-4 w-4" />
              {data.architectureBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {data.architectureTitle}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {data.architectureSubtitle}
            </p>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {data.architectureSteps.map((step) => (
              <NumberedStepCard
                key={step.step}
                step={step}
                iconBoxClassName={iconBoxClass}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col items-center space-y-3 text-center">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            <RiCompass3Line className="mr-2 h-4 w-4" />
            {data.architectureBadge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {data.architectureTitle}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            {data.architectureSubtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {data.architectureSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative flex flex-col">
                <Card className="relative h-full overflow-hidden border border-border/50 bg-muted/40 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={iconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-4xl font-black tracking-tighter text-blue-600/15 select-none dark:text-blue-400/15">
                        {step.step}
                      </span>
                    </div>
                    <CardTitle className="pt-2 text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {index < data.architectureSteps.length - 1 && (
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

export function ProjectTechStack({
  data,
  variant = 'sheet',
}: {
  data: ProjectPageData;
  variant?: 'sheet' | 'cards';
}) {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex flex-col space-y-8">
        <div
          className={
            variant === 'cards'
              ? 'flex flex-col items-center space-y-3 text-center'
              : 'flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'
          }
        >
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiCodeBoxLine className="mr-2 h-4 w-4" />
              {data.techBadge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {data.techTitle}
            </h2>
          </div>
          <p
            className={`text-base text-muted-foreground ${
              variant === 'cards' ? 'max-w-2xl' : 'max-w-xl'
            }`}
          >
            {data.techSubtitle}
          </p>
        </div>

        {variant === 'cards' ? (
          <div className="grid gap-6 md:grid-cols-3">
            {data.techGroups.map((group) => (
              <Card
                key={group.id}
                className="border border-border/50 bg-muted/40 shadow-sm"
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
                        className="border border-border/40 bg-background/80 px-2.5 py-1 font-mono text-xs font-medium"
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
          <TechGroupsMatrixSheet groups={data.techGroups} />
        )}
      </div>
    </section>
  );
}

export function ProjectRepositoriesSection({
  repositories,
  badge,
  title,
  subtitle,
}: {
  repositories: ProjectRepository[];
  badge?: string;
  title?: string;
  subtitle?: string;
}) {
  const { t } = useTranslation();

  const gridColsClass =
    repositories.length === 1
      ? 'mx-auto max-w-2xl grid-cols-1'
      : repositories.length === 3
        ? 'md:grid-cols-3'
        : 'md:grid-cols-2';

  return (
    <section
      id="repozytoria"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col items-center space-y-3 text-center">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            <RiGitBranchLine className="mr-2 h-4 w-4" />
            {badge ?? t('ProjectPage.repos.badge', 'Kod źródłowy')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title ?? t('ProjectPage.repos.title', 'Repozytoria na GitHubie')}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            {subtitle ??
              t(
                'ProjectPage.repos.subtitle',
                'Zobacz kod źródłowy, architekturę oraz postępy prac w oficjalnej organizacji KNPiMI.'
              )}
          </p>
        </div>

        <div className={`grid gap-6 ${gridColsClass}`}>
          {repositories.map((repo) => {
            const dotClass =
              (repo.language && LANGUAGE_DOT_COLOR[repo.language]) ||
              'bg-blue-500';
            return (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="block h-full"
              >
                <Card className={`flex flex-col justify-between ${cardClass}`}>
                  <div>
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <RiGithubFill className="h-4 w-4 text-foreground" />
                          <span className="font-mono">grupadotnet /</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {repo.language && (
                            <Badge
                              variant="outline"
                              className="gap-1.5 font-mono text-xs font-medium"
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${dotClass}`}
                              />
                              {repo.language}
                            </Badge>
                          )}
                          <RiArrowRightUpLine className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                        </div>
                      </div>
                      <CardTitle className="font-mono text-lg transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {repo.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {repo.description}
                      </CardDescription>
                    </CardContent>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProjectOtherAndCta({
  data,
  hideCta = false,
}: {
  data: ProjectPageData;
  hideCta?: boolean;
}) {
  const { t } = useTranslation();
  const otherProjects = projects.filter((p) => p.path !== data.projectPath);

  return (
    <section className="container mx-auto max-w-6xl space-y-12 px-4 pt-8 pb-20">
      {!hideCta && (
        <Card className="border border-border/50 bg-linear-to-br from-blue-500/10 via-muted/50 to-purple-500/10 p-6 shadow-sm md:p-10">
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
                      {t('ProjectPage.ctaContact', 'Skontaktuj się z nami')}
                    </span>
                  </Link>
                }
              />
              <Button
                variant="outline"
                nativeButton={false}
                className="cursor-pointer gap-2"
                render={
                  <Link to="/sections">
                    <RiStackLine className="h-4 w-4" />
                    <span>
                      {t('ProjectPage.ctaSections', 'Zobacz sekcje koła')}
                    </span>
                  </Link>
                }
              />
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {t('ProjectPage.otherProjects', 'Poznaj też inne projekty')}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="gap-1.5"
            render={
              <Link to="/projects">
                <span>{t('ProjectPage.allProjects', 'Wszystkie')}</span>
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            }
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {otherProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.path}
                to={`/projects/${project.path}`}
                className="block h-full"
              >
                <Card className={cardClass}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={iconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {t(
                            project.category.key,
                            project.category.translation
                          )}
                        </Badge>
                        <RiArrowRightLine className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                    </div>
                    <CardTitle className="mt-3 text-xl transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-muted-foreground">
                      {t(
                        project.description.key,
                        project.description.translation
                      )}
                    </p>
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

export function ProjectPageLayout({ data }: { data: ProjectPageData }) {
  const [lightboxVisual, setLightboxVisual] = useState<ProjectVisual | null>(
    null
  );

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero data={data} onSelectVisual={setLightboxVisual} />
      {data.visuals && data.visuals.length > 0 && (
        <ProjectVisualShowcase data={data} onSelectVisual={setLightboxVisual} />
      )}
      <ProjectFeatures data={data} />
      <ProjectArchitecture data={data} />
      <ProjectTechStack data={data} />
      {data.repositories && data.repositories.length > 0 && (
        <ProjectRepositoriesSection repositories={data.repositories} />
      )}
      <ProjectOtherAndCta data={data} />

      <Dialog
        open={Boolean(lightboxVisual)}
        onOpenChange={(open) => {
          if (!open) setLightboxVisual(null);
        }}
      >
        <DialogContent className="sm:max-w-5xl">
          {lightboxVisual && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {lightboxVisual.badge}
                  </Badge>
                </div>
                <DialogTitle>{lightboxVisual.title}</DialogTitle>
                <DialogDescription>{lightboxVisual.caption}</DialogDescription>
              </DialogHeader>
              <div className="overflow-hidden rounded-xl border border-border/50 bg-[#faf6ee] p-2 sm:p-4">
                <img
                  src={lightboxVisual.src}
                  alt={lightboxVisual.alt}
                  className="mx-auto max-h-[70dvh] w-auto max-w-full rounded-lg object-contain"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
