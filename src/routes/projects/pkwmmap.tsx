import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiArrowRightLine,
  RiBluetoothLine,
  RiBuilding2Line,
  RiMapPin2Line,
  RiRouteLine,
  RiSearchLine,
  RiServerLine,
  RiSmartphoneLine,
  RiVolumeUpLine,
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

export const Route = createFileRoute('/projects/pkwmmap')({
  component: PkwmMap,
  staticData: {
    titleData: extractTranslation('PKWMmap.navbarTitle', 'PKWMmap'),
    hideInNav: false,
    order: 4,
  },
});

const CAMPUS_BUILDINGS = [
  { code: 'A', floors: 7, key: 'a', fallback: 'Budynek główny • 7 pięter' },
  { code: 'B', floors: 3, key: 'b', fallback: 'Sale & biura • 3 piętra' },
  { code: 'C', floors: 3, key: 'c', fallback: 'Dydaktyka • 3 piętra' },
  { code: 'D', floors: 3, key: 'd', fallback: 'Łączniki • 3 piętra' },
  { code: 'E', floors: 1, key: 'e', fallback: 'Pawilon • 1 piętro' },
  { code: 'G', floors: 2, key: 'g', fallback: 'Pracownie • 2 piętra' },
  { code: 'J', floors: 3, key: 'j', fallback: 'Laboratoria • 3 piętra' },
  { code: 'K', floors: 3, key: 'k', fallback: 'Instytuty • 3 piętra' },
];

function PkwmMap() {
  const { t } = useTranslation();

  const data: ProjectPageData = {
    projectPath: 'pkwmmap',
    badge: t('PKWMmap.hero.badge', 'Projekt PKWMmap'),
    status: t('PKWMmap.hero.status', 'KMP • Go • 25 planów pięter'),
    titlePrefix: t('PKWMmap.hero.titlePrefix', 'Nawigacja wewnątrz'),
    titleHighlight: t(
      'PKWMmap.hero.titleHighlight',
      'Wydziału Mechanicznego PK'
    ),
    subtitle: t(
      'PKWMmap.hero.subtitle',
      'Interaktywny system nawigacji wewnątrzbudynkowej i kampusowej dla Wydziału Mechanicznego Politechniki Krakowskiej. Wykorzystuje sieć nadajników BLE iNode, wieloplatformową aplikację mobilną w Kotlin Multiplatform (Android & iOS) oraz wydajny backend w języku Go.'
    ),
    highlights: [
      {
        id: 'coverage',
        label: t('PKWMmap.highlights.coverage.label', 'Zasięg mapy'),
        value: t(
          'PKWMmap.highlights.coverage.value',
          '8 budynków (A–K), 25 planów pięter'
        ),
      },
      {
        id: 'positioning',
        label: t('PKWMmap.highlights.positioning.label', 'Pozycjonowanie'),
        value: t(
          'PKWMmap.highlights.positioning.value',
          'Beacony iNode BLE (RSSI)'
        ),
      },
      {
        id: 'stack',
        label: t('PKWMmap.highlights.stack.label', 'Technologia'),
        value: t('PKWMmap.highlights.stack.value', 'Kotlin Multiplatform + Go'),
      },
    ],
    featuresBadge: t('PKWMmap.features.badge', 'Możliwości nawigacji'),
    featuresTitle: t('PKWMmap.features.title', 'Jak pomaga PKWMmap?'),
    featuresSubtitle: t(
      'PKWMmap.features.subtitle',
      'Od wyznaczania aktualnej pozycji w budynku po prowadzenie do konkretnej sali, dziekanatu czy konsultacji prowadzącego.'
    ),
    features: [
      {
        id: 'ble',
        icon: RiBluetoothLine,
        badge: t('PKWMmap.features.ble.badge', 'iNode BLE'),
        title: t(
          'PKWMmap.features.ble.title',
          'Lokalizacja Wewnątrzbudynkowa BLE'
        ),
        description: t(
          'PKWMmap.features.ble.description',
          'Aplikacja skanuje pobliskie nadajniki Bluetooth Low Energy iNode (ID/MAC, RSSI) i wyznacza współrzędne użytkownika (x, y) w czasie rzeczywistym.'
        ),
      },
      {
        id: 'routing',
        icon: RiRouteLine,
        badge: t('PKWMmap.features.routing.badge', 'Graf tras'),
        title: t(
          'PKWMmap.features.routing.title',
          'Nawigacja Między Piętrami i Budynkami'
        ),
        description: t(
          'PKWMmap.features.routing.description',
          'Backend przechowuje graf korytarzy, klatek schodowych, wind, łączników na 1. piętrze i przejść zewnętrznych, wyznaczając najkrótszą ścieżkę dla budynków A, B, C, D, E, G, J i K.'
        ),
      },
      {
        id: 'search',
        icon: RiSearchLine,
        badge: t('PKWMmap.features.search.badge', 'Baza sal'),
        title: t(
          'PKWMmap.features.search.title',
          'Wyszukiwarka Sal, Biur i Harmonogramów'
        ),
        description: t(
          'PKWMmap.features.search.description',
          'Podgląd szczegółów pomieszczeń: typ sali zajęciowej, osoby urzędujące w pokoju, godziny otwarcia jednostek oraz rozkłady zajęć i konsultacji.'
        ),
      },
      {
        id: 'accessibility',
        icon: RiVolumeUpLine,
        badge: t('PKWMmap.features.accessibility.badge', 'Dostępność'),
        title: t(
          'PKWMmap.features.accessibility.title',
          'Wsparcie Nawigacji Głosowej (TTS)'
        ),
        description: t(
          'PKWMmap.features.accessibility.description',
          'Projekt zakłada natywne komunikaty głosowe Text-to-Speech na Androidzie i iOS, ułatwiające poruszanie się po kampusie osobom z problemami wzroku.'
        ),
      },
    ],
    techBadge: t('PKWMmap.tech.badge', 'Technologie'),
    techTitle: t('PKWMmap.tech.title', 'Architektura KMP, Compose i Go'),
    techSubtitle: t(
      'PKWMmap.tech.subtitle',
      'Współdzielona logika biznesowa i UI dla obu platform mobilnych połączona z lekkim serwerem grafowym w Go.'
    ),
    techGroups: [
      {
        id: 'mobile',
        title: t('PKWMmap.tech.mobile.title', 'Frontend Mobilny (KMP)'),
        description: t(
          'PKWMmap.tech.mobile.description',
          'Współdzielony interfejs oraz natywne moduły Bluetooth i TTS.'
        ),
        items: [
          'Kotlin Multiplatform',
          'Compose Multiplatform',
          'Ktor Client',
          'Android BLE',
          'iOS CoreBluetooth',
        ],
      },
      {
        id: 'backend',
        title: t('PKWMmap.tech.backend.title', 'Backend & Algorytmy'),
        description: t(
          'PKWMmap.tech.backend.description',
          'REST API, baza beaconów, plany pięter i wyznaczanie tras.'
        ),
        items: ['Go (Golang)', 'REST API', 'Routing Graph', 'Docker'],
      },
      {
        id: 'hardware',
        title: t('PKWMmap.tech.hardware.title', 'Infrastruktura & Mapy'),
        description: t(
          'PKWMmap.tech.hardware.description',
          'Fizyczna sieć nadajników oraz 25 schematów pięter kampusu Czyżyny.'
        ),
        items: [
          'iNode BLE Beacons',
          '25 Floor Schemas',
          'Buildings A–K',
          'API Contract Specs',
        ],
      },
    ],
    architectureBadge: t('PKWMmap.architecture.badge', 'Jak to działa'),
    architectureTitle: t(
      'PKWMmap.architecture.title',
      'Od sygnału radiowego BLE do trasy na planie piętra'
    ),
    architectureSubtitle: t(
      'PKWMmap.architecture.subtitle',
      'Architektura thin-client przenosi obliczenia tras i dane kampusowe na serwer, zapewniając płynne działanie na smartfonach.'
    ),
    architectureSteps: [
      {
        step: '01',
        icon: RiSmartphoneLine,
        title: t(
          'PKWMmap.architecture.step1.title',
          'Skanowanie beaconów iNode'
        ),
        description: t(
          'PKWMmap.architecture.step1.description',
          'Moduły natywne Android/iOS odbierają pakiety BLE i na podstawie siły sygnału RSSI wyznaczają pozycję (x, y) na aktualnym piętrze.'
        ),
      },
      {
        step: '02',
        icon: RiServerLine,
        title: t(
          'PKWMmap.architecture.step2.title',
          'Wyznaczenie trasy w Go API'
        ),
        description: t(
          'PKWMmap.architecture.step2.description',
          'Klient Ktor odpytuje backend (GET /route), który oblicza najkrótszą drogę przez korytarze, windy, schody i łączniki międzybudynkowe.'
        ),
      },
      {
        step: '03',
        icon: RiBuilding2Line,
        title: t(
          'PKWMmap.architecture.step3.title',
          'Prowadzenie po 25 planach pięter'
        ),
        description: t(
          'PKWMmap.architecture.step3.description',
          'Compose Multiplatform rysuje ścieżkę bezpośrednio na wyciętych schematach budynków A, B, C, D, E, G, J i K.'
        ),
      },
    ],
    repositories: [
      {
        name: 'PKWMmap',
        description: t(
          'PKWMmap.repos.main.description',
          'Monorepo zawierające aplikację Kotlin Multiplatform, backend w Go, 25 planów pięter budynków WM PK oraz pełną specyfikację REST API.'
        ),
        url: 'https://github.com/grupadotnet/PKWMmap',
        language: 'KMP / Go',
      },
    ],
    ctaTitle: t(
      'PKWMmap.cta.title',
      'Chcesz współtworzyć mapę Wydziału Mechanicznego?'
    ),
    ctaDescription: t(
      'PKWMmap.cta.description',
      'Zajrzyj do repozytorium PKWMmap na GitHubie — rozwijamy aplikację w Kotlin Multiplatform, backend w Go oraz mapowanie kolejnych sal i beaconów.'
    ),
  };

  const wayfindingRoutePill = (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 font-mono text-xs text-muted-foreground">
      <RiMapPin2Line className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
      <span className="font-semibold text-foreground">
        {t('PKWMmap.hero.routeStart', 'Budynek A')}
      </span>
      <RiArrowRightLine className="h-3.5 w-3.5" />
      <span>{t('PKWMmap.hero.routeConnector', 'Łącznik 1P')}</span>
      <RiArrowRightLine className="h-3.5 w-3.5" />
      <span className="font-semibold text-blue-600 dark:text-blue-400">
        {t('PKWMmap.hero.routeEnd', 'Sala G121')}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero
        data={data}
        variant="centered"
        topSlot={wayfindingRoutePill}
      />

      {/* Unique Campus Atlas Floor-Plan Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <Card className="overflow-hidden border border-border/50 bg-muted/35 p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                <RiBuilding2Line className="mr-1.5 h-3.5 w-3.5" />
                {t('PKWMmap.atlas.badge', 'Mapa kampusu Czyżyny')}
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {t(
                  'PKWMmap.atlas.title',
                  '8 budynków, 25 odwzorowanych kondygnacji'
                )}
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              {t(
                'PKWMmap.atlas.subtitle',
                'Każdy budynek WM PK ma własne plany pięter spięte wspólnym grafem przejść wewnętrznych i zewnętrznych.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {CAMPUS_BUILDINGS.map((b) => (
              <Card
                key={b.code}
                className="border border-border/50 bg-background/80 shadow-xs transition-colors hover:border-blue-500/40"
              >
                <CardContent className="space-y-1 p-4 text-center">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 font-mono text-base font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    {b.code}
                  </span>
                  <p className="pt-1 font-mono text-xs font-semibold text-foreground">
                    {b.floors}{' '}
                    {t(
                      b.floors === 1
                        ? 'PKWMmap.atlas.floorSingular'
                        : 'PKWMmap.atlas.floorPlural',
                      b.floors === 1 ? 'plan' : 'plany'
                    )}
                  </p>
                  <p className="text-[11px] leading-snug text-muted-foreground">
                    {t(`PKWMmap.atlas.b_${b.key}`, b.fallback)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      <ProjectFeatures data={data} variant="bento" />
      <ProjectArchitecture data={data} variant="vertical" />
      <ProjectTechStack data={data} variant="cards" />
      {data.repositories && (
        <ProjectRepositoriesSection repositories={data.repositories} />
      )}
      <ProjectOtherAndCta data={data} />
    </div>
  );
}
