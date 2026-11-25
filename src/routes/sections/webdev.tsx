import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiArrowRightLine,
  RiCodeSSlashLine,
  RiGitBranchLine,
  RiLayoutMasonryLine,
  RiRocketLine,
  RiServerLine,
  RiTeamLine,
  RiTerminalBoxLine,
} from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import { getSectionColors } from '@/lib/sections.ts';
import { cn } from '@/lib/utils';
import {
  SectionHero,
  SectionNextEventSection,
  SectionOtherAndCta,
  SectionPillars,
  SectionTechStack,
  SectionWorkflow,
  type SectionPageData,
} from '@/components/SectionPageLayout.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';

export const Route = createFileRoute('/sections/webdev')({
  component: Webdev,
  staticData: {
    titleData: extractTranslation('Webdev.navbarTitle', 'Webdev'),
    hideInNav: false,
    order: -1,
  },
});

function Webdev() {
  const { t } = useTranslation();

  const data: SectionPageData = {
    sectionPath: 'webdev',
    badge: t('Webdev.hero.badge', 'Sekcja WebDev'),
    titlePrefix: t('Webdev.hero.titlePrefix', 'Tworzymy nowoczesne'),
    titleHighlight: t('Webdev.hero.titleHighlight', 'aplikacje webowe'),
    subtitle: t(
      'Webdev.hero.subtitle',
      'W sekcji WebDev uczymy się praktycznego tworzenia aplikacji internetowych — od projektowania interfejsu i dostępności, przez backend oraz bazy danych, aż po wdrażanie projektów zespołowych w chmurze.'
    ),
    highlights: [
      {
        id: 'focus',
        label: t('Webdev.highlights.focus.label', 'Główny profil'),
        value: t(
          'Webdev.highlights.focus.value',
          'Full-stack & Architektura Web'
        ),
      },
      {
        id: 'format',
        label: t('Webdev.highlights.format.label', 'Forma zajęć'),
        value: t(
          'Webdev.highlights.format.value',
          'Warsztaty + Praca projektowa'
        ),
      },
      {
        id: 'level',
        label: t('Webdev.highlights.level.label', 'Dla kogo'),
        value: t(
          'Webdev.highlights.level.value',
          'Od podstaw HTML/JS po produkcję'
        ),
      },
    ],
    pillarsBadge: t('Webdev.pillars.badge', 'Czego się uczymy'),
    pillarsTitle: t('Webdev.pillars.title', 'Główne obszary sekcji WebDev'),
    pillarsSubtitle: t(
      'Webdev.pillars.subtitle',
      'Łączymy solidne podstawy inżynierii oprogramowania z narzędziami wykorzystywanymi w codziennej pracy zespołów produktowych.'
    ),
    pillars: [
      {
        id: 'frontend',
        icon: RiLayoutMasonryLine,
        badge: t('Webdev.pillars.frontend.badge', 'Frontend & UI'),
        title: t(
          'Webdev.pillars.frontend.title',
          'Nowoczesny Frontend i Dostępność'
        ),
        description: t(
          'Webdev.pillars.frontend.description',
          'Budujemy responsywne interfejsy w React i TypeScript z użyciem Tailwind CSS, dbając o zarządzanie stanem, routing oraz standardy WCAG.'
        ),
      },
      {
        id: 'backend',
        icon: RiServerLine,
        badge: t('Webdev.pillars.backend.badge', 'Backend & API'),
        title: t(
          'Webdev.pillars.backend.title',
          'Architektura API i Bazy Danych'
        ),
        description: t(
          'Webdev.pillars.backend.description',
          'Projektujemy wydajne usługi backendowe w .NET (C#) i Node.js, pracujemy z REST API, uwierzytelnianiem oraz relacyjnymi i dokumentowymi bazami danych.'
        ),
      },
      {
        id: 'devops',
        icon: RiGitBranchLine,
        badge: t('Webdev.pillars.devops.badge', 'Git & CI/CD'),
        title: t(
          'Webdev.pillars.devops.title',
          'Automatyzacja, Testy i Wdrożenia'
        ),
        description: t(
          'Webdev.pillars.devops.description',
          'Pracujemy na co dzień z Git Flow, Pull Requestami, Code Review, konteneryzacją w Dockerze oraz potokami GitHub Actions.'
        ),
      },
      {
        id: 'projects',
        icon: RiTeamLine,
        badge: t('Webdev.pillars.projects.badge', 'Zespół'),
        title: t('Webdev.pillars.projects.title', 'Realne Projekty Koła'),
        description: t(
          'Webdev.pillars.projects.description',
          'Rozwijamy własne aplikacje dla studentów i infrastrukturę koła naukowego, zdobywając doświadczenie w pracy zespołowej jak w prawdziwym software housie.'
        ),
      },
    ],
    techBadge: t('Webdev.tech.badge', 'Technologie'),
    techTitle: t('Webdev.tech.title', 'Nasz stos technologiczny'),
    techSubtitle: t(
      'Webdev.tech.subtitle',
      'Narzędzia i biblioteki, z których korzystamy podczas spotkań warsztatowych i w projektach koła.'
    ),
    techGroups: [
      {
        id: 'frontend',
        title: t('Webdev.tech.frontend.title', 'Frontend & UI'),
        description: t(
          'Webdev.tech.frontend.description',
          'Komponenty, typowanie statyczne i nowoczesny styling aplikacji przeglądarkowych.'
        ),
        items: [
          'React 19',
          'TypeScript',
          'Tailwind CSS',
          'TanStack Router',
          'TanStack Query',
          'Vite',
        ],
      },
      {
        id: 'backend',
        title: t('Webdev.tech.backend.title', 'Backend & Dane'),
        description: t(
          'Webdev.tech.backend.description',
          'Tworzenie API, logiki biznesowej oraz warstw dostępu do danych.'
        ),
        items: [
          '.NET / ASP.NET Core',
          'C#',
          'Node.js',
          'PostgreSQL',
          'REST API',
          'Entity Framework',
        ],
      },
      {
        id: 'tooling',
        title: t('Webdev.tech.tooling.title', 'Narzędzia & DevOps'),
        description: t(
          'Webdev.tech.tooling.description',
          'Współpraca nad kodem, kontrola jakości i ciągłe dostarczanie aplikacji.'
        ),
        items: [
          'Git & GitHub',
          'Docker',
          'GitHub Actions',
          'ESLint & Prettier',
          'Linux',
        ],
      },
    ],
    workflowBadge: t('Webdev.workflow.badge', 'Jak działamy'),
    workflowTitle: t(
      'Webdev.workflow.title',
      'Od pierwszych linii do produkcji'
    ),
    workflowSubtitle: t(
      'Webdev.workflow.subtitle',
      'Nie musisz znać wszystkich frameworków na start — liczy się chęć nauki i wspólnego budowania.'
    ),
    workflowSteps: [
      {
        step: '01',
        icon: RiTerminalBoxLine,
        title: t('Webdev.workflow.step1.title', 'Warsztaty i fundamenty'),
        description: t(
          'Webdev.workflow.step1.description',
          'Na cotygodniowych spotkaniach omawiamy konkretne zagadnienia na żywym kodzie i budujemy wspólne mini-aplikacje.'
        ),
      },
      {
        step: '02',
        icon: RiCodeSSlashLine,
        title: t('Webdev.workflow.step2.title', 'Praca w zespole projektowym'),
        description: t(
          'Webdev.workflow.step2.description',
          'Dołączasz do wybranego projektu koła, bierzesz zadania z tablicy i uczysz się pracy z GitHubem oraz Code Review.'
        ),
      },
      {
        step: '03',
        icon: RiRocketLine,
        title: t('Webdev.workflow.step3.title', 'Wdrożenia i hackathony'),
        description: t(
          'Webdev.workflow.step3.description',
          'Publikujemy gotowe rozwiązania, dzielimy się wiedzą na uczelni i wystawiamy drużyny na ogólnopolskich hackathonach.'
        ),
      },
    ],
    ctaTitle: t('Webdev.cta.title', 'Chcesz zbudować z nami kolejny projekt?'),
    ctaDescription: t(
      'Webdev.cta.description',
      'Wpadnij na najbliższe spotkanie sekcji WebDev lub odezwij się na Discordzie KNPiMI — pomożemy Ci wybrać pierwszy projekt i wdrożyć się w zespół.'
    ),
  };

  const stackFlowSlot = (
    <Card className="overflow-hidden border border-border/60 bg-muted/40 py-0 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/50 bg-background/80 px-4 py-2.5">
        <span className="font-mono text-xs font-semibold text-foreground">
          {t('Webdev.hero.pipelineHeader', 'webdev-stack.flow')}
        </span>
        <span
          className={cn(
            'font-mono text-[11px]',
            getSectionColors('webdev').textAccent
          )}
        >
          CI/CD Ready
        </span>
      </div>
      <CardContent className="space-y-2.5 p-4">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-background/70 px-3 py-2 text-xs">
          <span className="font-mono font-semibold">React + TypeScript</span>
          <span className="text-muted-foreground">UI / WCAG</span>
        </div>
        <div className="flex justify-center text-muted-foreground">
          <RiArrowRightLine className="h-3.5 w-3.5 rotate-90" />
        </div>
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-background/70 px-3 py-2 text-xs">
          <span className="font-mono font-semibold">.NET / Node.js</span>
          <span className="text-muted-foreground">REST API + SQL</span>
        </div>
        <div className="flex justify-center text-muted-foreground">
          <RiArrowRightLine className="h-3.5 w-3.5 rotate-90" />
        </div>
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-background/70 px-3 py-2 text-xs">
          <span className="font-mono font-semibold">Docker + Actions</span>
          <span className="text-muted-foreground">Deploy</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <SectionHero data={data} variant="split" rightSlot={stackFlowSlot} />
      <SectionPillars data={data} variant="bento" />
      <SectionTechStack data={data} variant="matrix" />
      <SectionWorkflow data={data} variant="card-3" />
      <SectionNextEventSection sectionPath="webdev" variant="split-row" />
      <SectionOtherAndCta data={data} />
    </div>
  );
}
