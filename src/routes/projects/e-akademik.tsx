import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiArrowRightLine,
  RiBuilding2Line,
  RiCalendar2Line,
  RiChatSmile2Line,
  RiDatabase2Line,
  RiFileList3Line,
  RiServerLine,
  RiSmartphoneLine,
} from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import {
  ProjectArchitecture,
  ProjectFeatures,
  ProjectHero,
  ProjectOtherAndCta,
  ProjectRepositoriesSection,
  ProjectTechStack,
  type ProjectPageData,
} from '@/components/ProjectPageLayout.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';

export const Route = createFileRoute('/projects/e-akademik')({
  component: EAkademik,
  staticData: {
    titleData: extractTranslation('EAkademik.navbarTitle', 'e-Akademik'),
    hideInNav: false,
    order: 3,
  },
});

function EAkademik() {
  const { t } = useTranslation();

  const data: ProjectPageData = {
    projectPath: 'e-akademik',
    badge: t('EAkademik.hero.badge', 'Projekt e-Akademik'),
    status: t('EAkademik.hero.status', 'Expo Mobile • Java Backend'),
    titlePrefix: t('EAkademik.hero.titlePrefix', 'Cyfrowa obsługa'),
    titleHighlight: t('EAkademik.hero.titleHighlight', 'domów studenckich'),
    subtitle: t(
      'EAkademik.hero.subtitle',
      'System digitalizujący codzienną pracę akademików i ułatwiający życie mieszkańcom — od obsługi zgłoszeń oraz spraw administracyjnych po wieloplatformową aplikację mobilną tworzoną w React Native i Expo.'
    ),
    highlights: [
      {
        id: 'domain',
        label: t('EAkademik.highlights.domain.label', 'Cel projektu'),
        value: t(
          'EAkademik.highlights.domain.value',
          'Digitalizacja Domów Studenckich'
        ),
      },
      {
        id: 'clients',
        label: t('EAkademik.highlights.clients.label', 'Aplikacja'),
        value: t(
          'EAkademik.highlights.clients.value',
          'Expo / React Native (iOS, Android, Web)'
        ),
      },
      {
        id: 'backend',
        label: t('EAkademik.highlights.backend.label', 'Zaplecze'),
        value: t(
          'EAkademik.highlights.backend.value',
          'Backend Java & Prototyp C#'
        ),
      },
    ],
    featuresBadge: t('EAkademik.features.badge', 'Obszary systemu'),
    featuresTitle: t('EAkademik.features.title', 'Co usprawnia e-Akademik?'),
    featuresSubtitle: t(
      'EAkademik.features.subtitle',
      'Zastępujemy papierowe obiegi i rozproszone komunikaty jednym narzędziem dostępnym w kieszeni każdego studenta.'
    ),
    features: [
      {
        id: 'mobile',
        icon: RiSmartphoneLine,
        badge: t('EAkademik.features.mobile.badge', 'Mobile First'),
        title: t(
          'EAkademik.features.mobile.title',
          'Aplikacja Mieszkańca w Expo'
        ),
        description: t(
          'EAkademik.features.mobile.description',
          'Nowoczesny klient mobilny oparty o React Native, Expo Router i TypeScript działający na Androidzie, iOS oraz w przeglądarce.'
        ),
      },
      {
        id: 'requests',
        icon: RiFileList3Line,
        badge: t('EAkademik.features.requests.badge', 'Zgłoszenia'),
        title: t(
          'EAkademik.features.requests.title',
          'Elektroniczny Obieg Spraw i Usterek'
        ),
        description: t(
          'EAkademik.features.requests.description',
          'Szybkie zgłaszanie spraw technicznych i formalności administracyjnych bez konieczności osobistych wizyt w portierni lub biurze.'
        ),
      },
      {
        id: 'reservations',
        icon: RiCalendar2Line,
        badge: t('EAkademik.features.reservations.badge', 'Zasoby wspólne'),
        title: t(
          'EAkademik.features.reservations.title',
          'Organizacja Przestrzeni i Harmonogramów'
        ),
        description: t(
          'EAkademik.features.reservations.description',
          'Uporządkowanie dostępu do wspólnych pomieszczeń, ogłoszeń rady mieszkańców oraz informacji organizacyjnych akademika.'
        ),
      },
      {
        id: 'communication',
        icon: RiChatSmile2Line,
        badge: t('EAkademik.features.communication.badge', 'Komunikacja'),
        title: t(
          'EAkademik.features.communication.title',
          'Sprawny Kontakt z Administracją'
        ),
        description: t(
          'EAkademik.features.communication.description',
          'Bezpośredni kanał informacyjny między mieszkańcami a obsługą domu studenckiego z przejrzystym statusem spraw.'
        ),
      },
    ],
    techBadge: t('EAkademik.tech.badge', 'Technologie'),
    techTitle: t(
      'EAkademik.tech.title',
      'Wykorzystywane narzędzia i frameworki'
    ),
    techSubtitle: t(
      'EAkademik.tech.subtitle',
      'Projekt rozwijany etapowo — od pierwszego systemu w C# po aktualną architekturę Java + React Native Expo.'
    ),
    techGroups: [
      {
        id: 'mobile',
        title: t('EAkademik.tech.mobile.title', 'Aplikacja Mobilna'),
        description: t(
          'EAkademik.tech.mobile.description',
          'Wieloplatformowy interfejs użytkownika w ekosystemie Expo.'
        ),
        items: [
          'React Native',
          'Expo & Expo Router',
          'TypeScript',
          'Reanimated',
          'Jest',
        ],
      },
      {
        id: 'backend',
        title: t('EAkademik.tech.backend.title', 'Backend & API'),
        description: t(
          'EAkademik.tech.backend.description',
          'Logika biznesowa, obsługa użytkowników i baza danych systemu.'
        ),
        items: ['Java', 'C# / .NET (v1)', 'REST API', 'SQL'],
      },
      {
        id: 'tooling',
        title: t('EAkademik.tech.tooling.title', 'Jakość & Współpraca'),
        description: t(
          'EAkademik.tech.tooling.description',
          'Monorepo łączące aplikację mobilną z backendem oraz automatyzacją CI.'
        ),
        items: ['GitHub Actions', 'ESLint', 'React Testing Library', 'Git'],
      },
    ],
    architectureBadge: t('EAkademik.architecture.badge', 'Ewolucja projektu'),
    architectureTitle: t(
      'EAkademik.architecture.title',
      'Od idei studenckiej po nowoczesne monorepo'
    ),
    architectureSubtitle: t(
      'EAkademik.architecture.subtitle',
      'e-Akademik pokazuje, jak projekty koła rozwijają się wraz z kolejnymi rocznikami studentów.'
    ),
    architectureSteps: [
      {
        step: '01',
        icon: RiBuilding2Line,
        title: t(
          'EAkademik.architecture.step1.title',
          'Pierwsza wersja (eAkademik C#)'
        ),
        description: t(
          'EAkademik.architecture.step1.description',
          'Pierwotna koncepcja systemu digitalizującego pracę akademików powstała w kole jako aplikacja w C# i backend/frontend.'
        ),
      },
      {
        step: '02',
        icon: RiServerLine,
        title: t('EAkademik.architecture.step2.title', 'Nowy backend w Javie'),
        description: t(
          'EAkademik.architecture.step2.description',
          'Rozbudowa warstwy serwerowej w katalogu backend/ nowego repozytorium e-akademik pod obsługę klientów mobilnych.'
        ),
      },
      {
        step: '03',
        icon: RiDatabase2Line,
        title: t('EAkademik.architecture.step3.title', 'Klient mobilny Expo'),
        description: t(
          'EAkademik.architecture.step3.description',
          'Wspólny kod w React Native + Expo Router pozwala jednocześnie dostarczać aplikację na Androida, iOS oraz web.'
        ),
      },
    ],
    repositories: [
      {
        name: 'e-akademik',
        description: t(
          'EAkademik.repos.current.description',
          'Aktualne monorepo projektu łączące backend w Javie oraz aplikację mobilną w React Native / Expo.'
        ),
        url: 'https://github.com/grupadotnet/e-akademik',
        language: 'Java / Expo',
      },
      {
        name: 'eAkademik',
        description: t(
          'EAkademik.repos.legacy.description',
          'Pierwsza wersja systemu digitalizującego pracę akademików przygotowana w C#.'
        ),
        url: 'https://github.com/grupadotnet/eAkademik',
        language: 'C#',
      },
    ],
    ctaTitle: t(
      'EAkademik.cta.title',
      'Mieszkasz w akademiku i masz pomysł na nową funkcję?'
    ),
    ctaDescription: t(
      'EAkademik.cta.description',
      'Dołącz do zespołu e-Akademika w KNPiMI — rozwijamy zarówno warstwę mobilną w React Native/Expo, jak i backend API.'
    ),
  };

  const evolutionCard = (
    <Card className="overflow-hidden border border-border/60 bg-muted/40 py-0 shadow-md">
      <div className="flex items-center justify-between border-b border-border/50 bg-background/85 px-4 py-2.5">
        <span className="font-mono text-xs font-semibold">
          {t('EAkademik.hero.evolutionHeader', 'e-akademik // v1 → v2')}
        </span>
        <Badge variant="outline" className="font-mono text-[10px]">
          Monorepo
        </Badge>
      </div>
      <CardContent className="space-y-3 p-5">
        <div className="rounded-xl border border-border/50 bg-background/70 p-3.5 text-xs">
          <p className="font-mono text-[11px] font-semibold text-muted-foreground">
            {t('EAkademik.hero.v1Label', 'Wersja 1.0 • Prototyp')}
          </p>
          <p className="mt-1 font-semibold text-foreground">
            grupadotnet/eAkademik (C#)
          </p>
        </div>

        <div className="flex justify-center text-muted-foreground">
          <RiArrowRightLine className="h-4 w-4 rotate-90" />
        </div>

        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3.5 text-xs">
          <p className="font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            {t('EAkademik.hero.v2Label', 'Wersja 2.0 • Aktualna')}
          </p>
          <p className="mt-1 font-semibold text-foreground">
            grupadotnet/e-akademik
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="font-mono text-[10px]">
              mobile/ Expo
            </Badge>
            <Badge variant="secondary" className="font-mono text-[10px]">
              backend/ Java
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero data={data} variant="split" rightSlot={evolutionCard} />
      {data.repositories && (
        <ProjectRepositoriesSection
          repositories={data.repositories}
          badge={t('EAkademik.repos.badge', 'Ewolucja kodu')}
          title={t(
            'EAkademik.repos.title',
            'Od prototypu C# do monorepo Java + Expo'
          )}
          subtitle={t(
            'EAkademik.repos.subtitle',
            'Porównaj historyczną pierwszą edycję systemu z aktualnym repozytorium rozwijanym przez obecny zespół.'
          )}
        />
      )}
      <ProjectFeatures data={data} variant="sticky" />
      <ProjectArchitecture data={data} variant="horizontal" />
      <ProjectTechStack data={data} variant="cards" />
      <ProjectOtherAndCta data={data} />
    </div>
  );
}
