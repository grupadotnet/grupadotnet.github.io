import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiBarcodeBoxLine,
  RiDatabase2Line,
  RiDiscordFill,
  RiFilter3Line,
  RiGithubFill,
  RiLayoutMasonryLine,
  RiLineChartLine,
  RiPrinterLine,
  RiServerLine,
  RiSmartphoneLine,
  RiStackLine,
  RiZoomInLine,
} from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import {
  ProjectOtherAndCta,
  type ProjectPageData,
  type ProjectVisual,
} from '@/components/ProjectPageLayout.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';

export const Route = createFileRoute('/projects/codewarehouse')({
  component: CodeWarehouse,
  staticData: {
    titleData: extractTranslation('CodeWarehouse.navbarTitle', 'CodeWarehouse'),
    hideInNav: false,
    order: 2,
  },
});

const neoCard =
  'border-2 border-zinc-950 bg-white shadow-[5px_5px_0_0_#09090b] dark:border-zinc-200 dark:bg-zinc-900 dark:shadow-[5px_5px_0_0_#e4e4e7]';

const neoInteractiveCard =
  'border-2 border-zinc-950 bg-white shadow-[5px_5px_0_0_#09090b] transition-[translate,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#09090b] dark:border-zinc-200 dark:bg-zinc-900 dark:shadow-[5px_5px_0_0_#e4e4e7] dark:hover:shadow-[2px_2px_0_0_#e4e4e7]';

const REPO_BADGE_STYLE: Record<string, string> = {
  TypeScript: 'bg-[#00b7f1] text-zinc-950',
  Java: 'bg-[#ef5343] text-white',
  Kotlin: 'bg-[#f5cf2b] text-zinc-950',
};

function useCodeWarehouseData(): ProjectPageData {
  const { t } = useTranslation();

  return {
    projectPath: 'codewarehouse',
    badge: t('CodeWarehouse.hero.badge', 'Projekt CodeWarehouse'),
    status: t(
      'CodeWarehouse.hero.status',
      '3 zespoły: Backend • Frontend • Mobile'
    ),
    titlePrefix: t('CodeWarehouse.hero.titlePrefix', 'System zarządzania'),
    titleHighlight: t(
      'CodeWarehouse.hero.titleHighlight',
      'magazynem i kodami'
    ),
    subtitle: t(
      'CodeWarehouse.hero.subtitle',
      'Intuicyjny system klasy WMS do zarządzania produktami i ich lokalizacją w przestrzeni magazynowej z wykorzystaniem kodów kreskowych. Łączy aplikację skanera na Androida (Kotlin + Jetpack Compose), serwer REST API w Java Spring Boot 3, panel administratora w React i TypeScript oraz prognozowanie Prophet.'
    ),
    highlights: [
      {
        id: 'domain',
        label: t('CodeWarehouse.highlights.domain.label', 'Profil systemu'),
        value: t(
          'CodeWarehouse.highlights.domain.value',
          'WMS, Barcode & Prognozy Prophet'
        ),
      },
      {
        id: 'platforms',
        label: t('CodeWarehouse.highlights.platforms.label', 'Platformy'),
        value: t(
          'CodeWarehouse.highlights.platforms.value',
          'Web Admin + Jetpack Compose + API'
        ),
      },
      {
        id: 'auth',
        label: t('CodeWarehouse.highlights.auth.label', 'Dostęp i etykiety'),
        value: t(
          'CodeWarehouse.highlights.auth.value',
          'Karta NFC / Hasło & Druk etykiet'
        ),
      },
    ],
    visualsBadge: t(
      'CodeWarehouse.visuals.badge',
      'Wizualizacje z prezentacji'
    ),
    visualsTitle: t(
      'CodeWarehouse.visuals.title',
      'Interfejs użytkownika i schemat systemu'
    ),
    visualsSubtitle: t(
      'CodeWarehouse.visuals.subtitle',
      'Makiety panelu administratora, aplikacji mobilnej skanera oraz kompletny przepływ operacji między halą magazynową a biurem. Kliknij dowolny widok, aby powiększyć.'
    ),
    visuals: [
      {
        id: 'admin-ui',
        src: '/projects/codewarehouse/admin-ui.png',
        alt: t(
          'CodeWarehouse.visuals.adminUi.alt',
          'Makieta głównego interfejsu administratora CodeWarehouse z tabelą produktów, filtrami oraz szufladą edycji rekordu'
        ),
        badge: t('CodeWarehouse.visuals.adminUi.badge', 'Web Admin UI'),
        title: t(
          'CodeWarehouse.visuals.adminUi.title',
          'Główny interfejs administratora'
        ),
        caption: t(
          'CodeWarehouse.visuals.adminUi.caption',
          'Panel webowy w React i TypeScript z wyszukiwarką na żywo, wielokryterialnym panelem filtrów (producent, lokalizacja, kategoria), sortowalną tabelą SKU z paginacją oraz wysuwaną szufladą edycji produktu.'
        ),
        variant: 'desktop',
      },
      {
        id: 'scanner-ui',
        src: '/projects/codewarehouse/scanner-ui.png',
        alt: t(
          'CodeWarehouse.visuals.scannerUi.alt',
          'Makieta aplikacji mobilnej skanera kodów kreskowych CodeWarehouse z celownikiem kamery i przyciskiem latarki oraz wprowadzania ręcznego'
        ),
        badge: t('CodeWarehouse.visuals.scannerUi.badge', 'Mobile Scanner'),
        title: t(
          'CodeWarehouse.visuals.scannerUi.title',
          'Interfejs aplikacji skanera'
        ),
        caption: t(
          'CodeWarehouse.visuals.scannerUi.caption',
          'Natywny ekran skanowania na Androida (Kotlin + Jetpack Compose) z podglądem kamery, celownikiem barcode, przełącznikiem latarki oraz ręcznym wprowadzaniem kodu.'
        ),
        variant: 'mobile',
      },
      {
        id: 'system-flow',
        src: '/projects/codewarehouse/system-flow.png',
        alt: t(
          'CodeWarehouse.visuals.systemFlow.alt',
          'Schemat działania systemu CodeWarehouse łączący logowanie kartą NFC lub hasłem, pracę na hali magazynowej i widok kierownika w biurze'
        ),
        badge: t('CodeWarehouse.visuals.systemFlow.badge', 'Schemat systemu'),
        title: t(
          'CodeWarehouse.visuals.systemFlow.title',
          'Schemat działania systemu'
        ),
        caption: t(
          'CodeWarehouse.visuals.systemFlow.caption',
          'Kompletny przepływ: logowanie kartą NFC lub hasłem, skanowanie na hali (zmiana ilości/przeniesienie lub druk nowej etykiety, gdy produktu brak w bazie), synchronizacja z bazą API oraz tabela Live i prognozy Prophet dla kierownika.'
        ),
        variant: 'diagram',
      },
    ],
    featuresBadge: t('CodeWarehouse.features.badge', 'Kluczowe moduły'),
    featuresTitle: t(
      'CodeWarehouse.features.title',
      'Funkcjonalności CodeWarehouse'
    ),
    featuresSubtitle: t(
      'CodeWarehouse.features.subtitle',
      'Kompletne narzędzie dla pracowników hali i kierowników biura: od skanowania produktów oraz druku etykiet po analizę stanów i prognozy.'
    ),
    features: [
      {
        id: 'scanner',
        icon: RiBarcodeBoxLine,
        badge: t('CodeWarehouse.features.scanner.badge', 'Hala & Mobile'),
        title: t(
          'CodeWarehouse.features.scanner.title',
          'Skanowanie Barcode i Druk Etykiet'
        ),
        description: t(
          'CodeWarehouse.features.scanner.description',
          'Po zalogowaniu kartą NFC lub hasłem pracownik skanuje kod produktu: zmienia ilość, przenosi towar między sekcjami albo drukuje nową etykietę, jeśli produktu nie ma jeszcze w bazie.'
        ),
      },
      {
        id: 'table',
        icon: RiLayoutMasonryLine,
        badge: t('CodeWarehouse.features.table.badge', 'Panel Web'),
        title: t(
          'CodeWarehouse.features.table.title',
          'Tabela Produktów Live i Edycja Inline'
        ),
        description: t(
          'CodeWarehouse.features.table.description',
          'Dashboard w React oferuje paginację, sortowanie kolumn (SKU, nazwa, kategoria, ilość, status), wyszukiwanie na żywo oraz wysuwany panel boczny do szybkiej edycji.'
        ),
      },
      {
        id: 'filtering',
        icon: RiFilter3Line,
        badge: t('CodeWarehouse.features.filtering.badge', 'Filtrowanie'),
        title: t(
          'CodeWarehouse.features.filtering.title',
          'Wielokryterialne Filtrowanie Zasobów'
        ),
        description: t(
          'CodeWarehouse.features.filtering.description',
          'Panel boczny z listami wielokrotnego wyboru pozwala filtrować stany według producenta, lokalizacji (np. Section C) oraz kategorii produktów.'
        ),
      },
      {
        id: 'security',
        icon: RiLineChartLine,
        badge: t('CodeWarehouse.features.security.badge', 'API & Prognozy'),
        title: t(
          'CodeWarehouse.features.security.title',
          'Spring Boot API, JWT i Prognozy Prophet'
        ),
        description: t(
          'CodeWarehouse.features.security.description',
          'Backend w Javie zapewnia uwierzytelnianie JWT, dokumentację Swagger i bazę MySQL/H2, a moduł analityczny wspiera kierownika prognozami zapotrzebowania Prophet.'
        ),
      },
    ],
    techBadge: t('CodeWarehouse.tech.badge', 'Technologie'),
    techTitle: t(
      'CodeWarehouse.tech.title',
      'Stack webowy, mobilny i serwerowy'
    ),
    techSubtitle: t(
      'CodeWarehouse.tech.subtitle',
      'Projekt realizowany równolegle przez trzy zespoły — Backend, Frontend i Mobile — spięte wspólnym kontraktem REST API.'
    ),
    techGroups: [
      {
        id: 'frontend',
        title: t('CodeWarehouse.tech.frontend.title', 'Zespół Frontend (Web)'),
        description: t(
          'CodeWarehouse.tech.frontend.description',
          'Panel administracyjny kierownika z tabelą Live, filtrami i szufladą edycji.'
        ),
        items: ['TypeScript', 'React', 'Vite', 'REST Client'],
      },
      {
        id: 'mobile',
        title: t('CodeWarehouse.tech.mobile.title', 'Zespół Mobile (Android)'),
        description: t(
          'CodeWarehouse.tech.mobile.description',
          'Aplikacja pracownika hali do skanowania kodów kreskowych i obsługi operacji.'
        ),
        items: [
          'Kotlin',
          'Jetpack Compose',
          'Clean Architecture',
          'MVVM',
          'Hilt DI',
          'Retrofit',
        ],
      },
      {
        id: 'backend',
        title: t(
          'CodeWarehouse.tech.backend.title',
          'Zespół Backend & Analityka'
        ),
        description: t(
          'CodeWarehouse.tech.backend.description',
          'Aplikacja serwerowa, uwierzytelnianie JWT, baza danych oraz prognozowanie.'
        ),
        items: [
          'Java 17',
          'Spring Boot 3',
          'Spring Security + JWT',
          'MySQL / H2',
          'Swagger / OpenAPI',
          'Docker',
          'Prophet',
        ],
      },
    ],
    architectureBadge: t('CodeWarehouse.architecture.badge', 'Architektura'),
    architectureTitle: t(
      'CodeWarehouse.architecture.title',
      'Od hali magazynowej do biura kierownika'
    ),
    architectureSubtitle: t(
      'CodeWarehouse.architecture.subtitle',
      'Praca nad CodeWarehouse odwzorowuje realny podział ról w zespołach produktowych — od mobile po backend i analitykę.'
    ),
    architectureSteps: [
      {
        step: '01',
        icon: RiSmartphoneLine,
        title: t(
          'CodeWarehouse.architecture.step1.title',
          'Hala: NFC i Skanowanie (Compose)'
        ),
        description: t(
          'CodeWarehouse.architecture.step1.description',
          'Pracownik loguje się kartą NFC lub hasłem i skanuje barcode. Istniejące produkty aktualizuje lub przenosi, a dla nowych zleca druk etykiety.'
        ),
      },
      {
        step: '02',
        icon: RiServerLine,
        title: t(
          'CodeWarehouse.architecture.step2.title',
          'API i Baza Danych (Spring Boot)'
        ),
        description: t(
          'CodeWarehouse.architecture.step2.description',
          'Backend w Javie weryfikuje token JWT, zapisuje ruchy magazynowe w MySQL i udostępnia udokumentowane endpointy Swagger.'
        ),
      },
      {
        step: '03',
        icon: RiDatabase2Line,
        title: t(
          'CodeWarehouse.architecture.step3.title',
          'Biuro: Panel Live i Prophet'
        ),
        description: t(
          'CodeWarehouse.architecture.step3.description',
          'Kierownik w panelu React śledzi tabelę produktów na żywo, filtruje stany, edytuje rekordy i przegląda prognozy Prophet.'
        ),
      },
    ],
    repositories: [
      {
        name: 'code-warehouse-frontend',
        description: t(
          'CodeWarehouse.repos.frontend.description',
          'Webowy panel administracyjny w React + TypeScript + Vite z tabelą danych, filtrowaniem i edycją w szufladzie bocznej.'
        ),
        url: 'https://github.com/grupadotnet/code-warehouse-frontend',
        language: 'TypeScript',
      },
      {
        name: 'code-warehouse-backend',
        description: t(
          'CodeWarehouse.repos.backend.description',
          'REST API w Java 17 i Spring Boot 3 z JWT, obsługą MySQL/H2, Swaggerem oraz Docker Compose.'
        ),
        url: 'https://github.com/grupadotnet/code-warehouse-backend',
        language: 'Java',
      },
      {
        name: 'code-warehouse-mobile',
        description: t(
          'CodeWarehouse.repos.mobile.description',
          'Aplikacja na Androida w Kotlinie i Jetpack Compose (Clean Architecture, MVVM, Hilt) do skanowania kodów kreskowych.'
        ),
        url: 'https://github.com/grupadotnet/code-warehouse-mobile',
        language: 'Kotlin',
      },
    ],
    ctaTitle: t(
      'CodeWarehouse.cta.title',
      'Chcesz rozwinąć swoje umiejętności w React, Javie lub Kotlinie?'
    ),
    ctaDescription: t(
      'CodeWarehouse.cta.description',
      'CodeWarehouse to świetny przykład zespołowego projektu full-stack. Zobacz repozytoria lub odezwij się na Discordzie KNPiMI.'
    ),
  };
}
function CodeWarehouseHero({ data }: { data: ProjectPageData }) {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto max-w-6xl px-4 pt-8 pb-12 md:pt-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/projects"
          className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs font-bold tracking-wider uppercase ${neoInteractiveCard}`}
        >
          <RiArrowLeftLine className="h-4 w-4" />
          <span>{t('ProjectPage.backToProjects', 'Wszystkie projekty')}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
          <span className="border-2 border-zinc-950 bg-[#f5cf2b] px-3 py-1.5 text-zinc-950 dark:border-zinc-200">
            SKU: CW-WMS-2025
          </span>
          <span className="inline-flex items-center gap-2 border-2 border-zinc-950 bg-white px-3 py-1.5 text-zinc-950 dark:border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100">
            <span className="h-2 w-2 bg-emerald-500" />
            {data.status}
          </span>
        </div>
      </div>

      <div className={`overflow-hidden ${neoCard}`}>
        {/* Crisp table-style top header matching admin-ui.png */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-950 bg-zinc-950 px-5 py-3 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
          <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-wider uppercase">
            <span className="inline-flex h-6 w-6 items-center justify-center bg-[#f5cf2b] text-zinc-950">
              <RiBarcodeBoxLine className="h-4 w-4" />
            </span>
            <span>{data.badge}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="border border-current/30 px-2 py-0.5">
              SECTION C
            </span>
            <span className="bg-[#ef5343] px-2 py-0.5 text-white">
              IN WAREHOUSE
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12">
          {/* Left 8 cols: Industrial Title & Controls */}
          <div className="space-y-6 p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <h1 className="text-4xl font-black tracking-tight text-balance uppercase sm:text-5xl lg:text-6xl">
              {data.titlePrefix}{' '}
              <span className="inline-block border-2 border-zinc-950 bg-[#f5cf2b] px-3 py-0.5 text-zinc-950 dark:border-zinc-950">
                {data.titleHighlight}
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-pretty text-zinc-700 sm:text-lg dark:text-zinc-300">
              {data.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#wizualizacje"
                className="inline-flex cursor-pointer items-center gap-2 border-2 border-zinc-950 bg-[#f5cf2b] px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-zinc-950 uppercase shadow-[4px_4px_0_0_#09090b] transition-[translate,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#09090b] dark:border-zinc-200 dark:shadow-[4px_4px_0_0_#e4e4e7]"
              >
                <RiLayoutMasonryLine className="h-4 w-4" />
                <span>
                  {t('ProjectPage.heroVisuals', 'Podgląd interfejsu')}
                </span>
              </a>
              <a
                href="#repozytoria"
                className={`inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold tracking-wider uppercase ${neoInteractiveCard}`}
              >
                <RiGithubFill className="h-4 w-4" />
                <span>{t('ProjectPage.heroRepos', 'Repozytoria GitHub')}</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex cursor-pointer items-center gap-2 border-2 border-zinc-950 bg-zinc-950 px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-white uppercase transition-opacity hover:opacity-90 dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950"
              >
                <RiDiscordFill className="h-4 w-4" />
                <span>{t('ProjectPage.heroJoin', 'Dołącz do projektu')}</span>
              </Link>
            </div>
          </div>

          {/* Right 4 cols: Inventory Control Spec Ledger */}
          <div className="flex flex-col justify-between divide-y-2 divide-zinc-950 border-t-2 border-zinc-950 bg-[#faf7f0] lg:col-span-4 lg:border-t-0 lg:border-l-2 dark:divide-zinc-200 dark:border-zinc-200 dark:bg-zinc-950/60">
            {data.highlights.map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-1 flex-col justify-center gap-1 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
                    {item.label}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-zinc-400">
                    0{idx + 1}
                  </span>
                </div>
                <p className="font-mono text-sm font-bold text-zinc-950 dark:text-zinc-100">
                  {item.value}
                </p>
              </div>
            ))}
            {/* Minimal visual barcode stripe */}
            <div className="flex items-center justify-between gap-3 bg-white px-5 py-3 dark:bg-zinc-900">
              <div
                aria-hidden="true"
                className="flex h-6 flex-1 items-stretch gap-0.5"
              >
                {[3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1].map(
                  (w, i) => (
                    <span
                      key={i}
                      className="bg-zinc-950 dark:bg-zinc-100"
                      style={{ width: `${w * 2}px` }}
                    />
                  )
                )}
              </div>
              <span className="font-mono text-[11px] font-bold tracking-widest text-zinc-700 dark:text-zinc-300">
                IT-MON-001
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeWarehouseVisualShowcase({
  data,
  adminVisual,
  scannerVisual,
  onSelectVisual,
}: {
  data: ProjectPageData;
  adminVisual?: ProjectVisual;
  scannerVisual?: ProjectVisual;
  onSelectVisual: (visual: ProjectVisual) => void;
}) {
  const { t } = useTranslation();

  return (
    <section
      id="wizualizacje"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-10 md:py-14"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <span className="inline-block border-2 border-zinc-950 bg-[#f5cf2b] px-3 py-1 font-mono text-xs font-bold tracking-wider text-zinc-950 uppercase dark:border-zinc-200">
            {data.visualsBadge}
          </span>
          <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
            {data.visualsTitle}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-zinc-700 md:text-base dark:text-zinc-300">
          {data.visualsSubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {adminVisual && (
          <div
            className={`flex flex-col overflow-hidden lg:col-span-8 ${neoCard}`}
          >
            <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-zinc-950 px-4 py-2.5 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
              <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase">
                <span className="bg-[#f5cf2b] px-2 py-0.5 text-zinc-950">
                  {adminVisual.badge}
                </span>
                <span>{adminVisual.title}</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectVisual(adminVisual)}
                className="inline-flex cursor-pointer items-center gap-1.5 border border-current/30 px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-colors hover:bg-[#f5cf2b] hover:text-zinc-950"
              >
                <RiZoomInLine className="h-3.5 w-3.5" />
                <span>{t('ProjectPage.zoomShort', 'Powiększ')}</span>
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-4 sm:p-6">
              <button
                type="button"
                onClick={() => onSelectVisual(adminVisual)}
                className="group relative block w-full cursor-pointer overflow-hidden border-2 border-zinc-950 bg-white dark:border-zinc-200"
              >
                <img
                  src={adminVisual.src}
                  alt={adminVisual.alt}
                  className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </button>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {adminVisual.caption}
              </p>
            </div>
          </div>
        )}

        {scannerVisual && (
          <div
            className={`flex flex-col overflow-hidden lg:col-span-4 ${neoCard}`}
          >
            <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-zinc-950 px-4 py-2.5 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase">
                <span className="bg-[#ef5343] px-2 py-0.5 text-white">
                  {scannerVisual.badge}
                </span>
                <span className="truncate">{scannerVisual.title}</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectVisual(scannerVisual)}
                aria-label={t('ProjectPage.zoomVisual', 'Powiększ')}
                className="inline-flex cursor-pointer items-center border border-current/30 p-1 transition-colors hover:bg-[#f5cf2b] hover:text-zinc-950"
              >
                <RiZoomInLine className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-between gap-4 p-5">
              <button
                type="button"
                onClick={() => onSelectVisual(scannerVisual)}
                className="group relative mx-auto block w-48 cursor-pointer border-4 border-zinc-950 bg-zinc-950 p-1.5 shadow-[4px_4px_0_0_#f5cf2b]"
              >
                <div className="mx-auto mb-1.5 h-1 w-12 bg-zinc-700" />
                <img
                  src={scannerVisual.src}
                  alt={scannerVisual.alt}
                  className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>
              <p className="text-center text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {scannerVisual.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CodeWarehouseSystemFlow({
  data,
  flowVisual,
  onSelectVisual,
}: {
  data: ProjectPageData;
  flowVisual?: ProjectVisual;
  onSelectVisual: (visual: ProjectVisual) => void;
}) {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
      {flowVisual && (
        <div className={`mb-8 overflow-hidden ${neoCard}`}>
          <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-zinc-950 px-4 py-2.5 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase">
              <span className="bg-[#00b7f1] px-2 py-0.5 text-zinc-950">
                {flowVisual.badge}
              </span>
              <span>{flowVisual.title}</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectVisual(flowVisual)}
              className="inline-flex cursor-pointer items-center gap-1.5 border border-current/30 px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-colors hover:bg-[#f5cf2b] hover:text-zinc-950"
            >
              <RiZoomInLine className="h-3.5 w-3.5" />
              <span>{t('ProjectPage.zoomShort', 'Powiększ')}</span>
            </button>
          </div>
          <div className="space-y-4 p-4 sm:p-6">
            <button
              type="button"
              onClick={() => onSelectVisual(flowVisual)}
              className="group block w-full cursor-pointer border-2 border-zinc-950 bg-[#faf6ee] p-3 sm:p-5 dark:border-zinc-200"
            >
              <img
                src={flowVisual.src}
                alt={flowVisual.alt}
                className="mx-auto h-auto max-h-115 w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </button>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {flowVisual.caption}
            </p>
          </div>
        </div>
      )}

      {/* 3-Zone Operational Breakdown directly mirroring the diagram */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className={`overflow-hidden ${neoCard}`}>
          <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-[#f5cf2b] px-5 py-3 text-zinc-950 dark:border-zinc-200">
            <span className="font-mono text-xs font-black tracking-wider uppercase">
              {t('CodeWarehouse.zones.hall.badge', '01 • Hala (Pracownik)')}
            </span>
            <RiPrinterLine className="h-4 w-4" />
          </div>
          <div className="space-y-3 p-5 text-sm">
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] font-bold">
              <span className="border border-zinc-950 px-2 py-0.5 dark:border-zinc-200">
                NFC / HASŁO
              </span>
              <RiArrowRightLine className="h-3.5 w-3.5" />
              <span className="border border-zinc-950 px-2 py-0.5 dark:border-zinc-200">
                BARCODE
              </span>
              <RiArrowRightLine className="h-3.5 w-3.5" />
              <span className="border border-zinc-950 bg-[#ef5343] px-2 py-0.5 text-white dark:border-zinc-200">
                DRUK ETYKIETY
              </span>
            </div>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {data.architectureSteps[0]?.description}
            </p>
          </div>
        </div>

        <div className={`overflow-hidden ${neoCard}`}>
          <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-[#00b7f1] px-5 py-3 text-zinc-950 dark:border-zinc-200">
            <span className="font-mono text-xs font-black tracking-wider uppercase">
              {t(
                'CodeWarehouse.zones.api.badge',
                '02 • Baza Danych & REST API'
              )}
            </span>
            <RiServerLine className="h-4 w-4" />
          </div>
          <div className="space-y-3 p-5 text-sm">
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] font-bold">
              <span className="border border-zinc-950 px-2 py-0.5 dark:border-zinc-200">
                SPRING BOOT 3
              </span>
              <RiArrowRightLine className="h-3.5 w-3.5" />
              <span className="border border-zinc-950 px-2 py-0.5 dark:border-zinc-200">
                JWT + MYSQL
              </span>
            </div>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {data.architectureSteps[1]?.description}
            </p>
          </div>
        </div>

        <div className={`overflow-hidden ${neoCard}`}>
          <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-zinc-950 px-5 py-3 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
            <span className="font-mono text-xs font-black tracking-wider uppercase">
              {t('CodeWarehouse.zones.office.badge', '03 • Biuro (Prophet)')}
            </span>
            <RiLineChartLine className="h-4 w-4 text-[#f5cf2b] dark:text-zinc-950" />
          </div>
          <div className="space-y-3 p-5 text-sm">
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] font-bold">
              <span className="border border-zinc-950 px-2 py-0.5 dark:border-zinc-200">
                TABELA LIVE
              </span>
              <RiArrowRightLine className="h-3.5 w-3.5" />
              <span className="border border-zinc-950 bg-[#f5cf2b] px-2 py-0.5 text-zinc-950 dark:border-zinc-200">
                PROGNOZY PROPHET
              </span>
            </div>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {data.architectureSteps[2]?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeWarehouseFeaturesSection({ data }: { data: ProjectPageData }) {
  return (
    <section
      id="funkcjonalnosci"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-10 md:py-14"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <span className="inline-block border-2 border-zinc-950 bg-zinc-950 px-3 py-1 font-mono text-xs font-bold tracking-wider text-white uppercase dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
            {data.featuresBadge}
          </span>
          <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
            {data.featuresTitle}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-zinc-700 md:text-base dark:text-zinc-300">
          {data.featuresSubtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {data.features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className={`overflow-hidden ${neoCard}`}>
              <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-zinc-950 px-4 py-2 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
                <span className="font-mono text-xs font-bold uppercase">
                  MOD-{String(index + 1).padStart(2, '0')} // {feature.badge}
                </span>
                <span className="h-2.5 w-2.5 bg-[#f5cf2b]" />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-zinc-950 bg-[#f5cf2b] text-zinc-950 dark:border-zinc-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CodeWarehouseTeamsSection({ data }: { data: ProjectPageData }) {
  const { t } = useTranslation();

  return (
    <section
      id="repozytoria"
      className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-10 md:py-14"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <span className="inline-block border-2 border-zinc-950 bg-[#f5cf2b] px-3 py-1 font-mono text-xs font-bold tracking-wider text-zinc-950 uppercase dark:border-zinc-200">
            {data.techBadge} & {t('ProjectPage.repos.badge', 'Kod źródłowy')}
          </span>
          <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
            {data.techTitle}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-zinc-700 md:text-base dark:text-zinc-300">
          {data.techSubtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {data.techGroups.map((group, idx) => {
          const repo = data.repositories?.[idx];
          const langClass =
            (repo?.language && REPO_BADGE_STYLE[repo.language]) ||
            'bg-[#f5cf2b] text-zinc-950';

          return (
            <div
              key={group.id}
              className={`flex flex-col justify-between overflow-hidden ${neoCard}`}
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-zinc-950 bg-zinc-950 px-4 py-2.5 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950">
                  <span className="font-mono text-xs font-bold uppercase">
                    TEAM 0{idx + 1}
                  </span>
                  {repo?.language && (
                    <span
                      className={`px-2 py-0.5 font-mono text-[11px] font-bold uppercase ${langClass}`}
                    >
                      {repo.language}
                    </span>
                  )}
                </div>

                <div className="space-y-4 p-5">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold">{group.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {group.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="border border-zinc-950 bg-[#faf7f0] px-2 py-0.5 font-mono text-xs font-semibold text-zinc-950 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {repo && (
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-t-2 border-zinc-950 bg-[#faf7f0] px-4 py-3 font-mono text-xs font-bold transition-colors hover:bg-[#f5cf2b] hover:text-zinc-950 dark:border-zinc-200 dark:bg-zinc-950/60 dark:hover:bg-[#f5cf2b] dark:hover:text-zinc-950"
                >
                  <span className="flex items-center gap-2 truncate">
                    <RiGithubFill className="h-4 w-4 shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </span>
                  <RiArrowRightUpLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CodeWarehouseCta({ data }: { data: ProjectPageData }) {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto max-w-6xl px-4 pt-6 pb-8">
      <div className={`overflow-hidden ${neoCard}`}>
        <div className="grid items-center gap-6 bg-[#f5cf2b] p-6 text-zinc-950 md:grid-cols-12 md:p-8">
          <div className="space-y-2 md:col-span-8">
            <h2 className="text-2xl font-black tracking-tight uppercase md:text-3xl">
              {data.ctaTitle}
            </h2>
            <p className="text-sm leading-relaxed font-medium text-zinc-900 md:text-base">
              {data.ctaDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-zinc-950 bg-zinc-950 px-4 py-2.5 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-[3px_3px_0_0_#ffffff] transition-[translate,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <RiDiscordFill className="h-4 w-4" />
              <span>
                {t('ProjectPage.ctaContact', 'Skontaktuj się z nami')}
              </span>
            </Link>
            <Link
              to="/sections"
              className="inline-flex items-center gap-2 border-2 border-zinc-950 bg-white px-4 py-2.5 font-mono text-xs font-bold tracking-wider text-zinc-950 uppercase shadow-[3px_3px_0_0_#09090b] transition-[translate,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <RiStackLine className="h-4 w-4" />
              <span>{t('ProjectPage.ctaSections', 'Zobacz sekcje koła')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeWarehouseLightbox({
  visual,
  onClose,
}: {
  visual: ProjectVisual | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={Boolean(visual)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="rounded-none border-2 border-zinc-950 bg-[#faf7f0] text-zinc-950 shadow-[8px_8px_0_0_#09090b] sm:max-w-5xl dark:border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100">
        {visual && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="border-2 border-zinc-950 bg-[#f5cf2b] px-2.5 py-0.5 font-mono text-xs font-bold text-zinc-950 uppercase">
                  {visual.badge}
                </span>
              </div>
              <DialogTitle className="font-black uppercase">
                {visual.title}
              </DialogTitle>
              <DialogDescription className="text-zinc-700 dark:text-zinc-300">
                {visual.caption}
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-hidden border-2 border-zinc-950 bg-[#faf6ee] p-2 sm:p-4 dark:border-zinc-200">
              <img
                src={visual.src}
                alt={visual.alt}
                className="mx-auto max-h-[70dvh] w-auto max-w-full object-contain"
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CodeWarehouse() {
  const [lightboxVisual, setLightboxVisual] = useState<ProjectVisual | null>(
    null
  );
  const data = useCodeWarehouseData();

  const adminVisual = data.visuals?.[0];
  const scannerVisual = data.visuals?.[1];
  const flowVisual = data.visuals?.[2];

  return (
    <div className="relative min-h-screen bg-[#faf7f0] text-zinc-950 dark:bg-[#111216] dark:text-zinc-100">
      {/* Subtle dotted blueprint pattern inspired directly by CodeWarehouse UI & slides */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-45 dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(#9ca3af 1.15px, transparent 1.15px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10">
        <CodeWarehouseHero data={data} />
        <CodeWarehouseVisualShowcase
          data={data}
          adminVisual={adminVisual}
          scannerVisual={scannerVisual}
          onSelectVisual={setLightboxVisual}
        />
        <CodeWarehouseSystemFlow
          data={data}
          flowVisual={flowVisual}
          onSelectVisual={setLightboxVisual}
        />
        <CodeWarehouseFeaturesSection data={data} />
        <CodeWarehouseTeamsSection data={data} />
        <CodeWarehouseCta data={data} />
        <ProjectOtherAndCta data={data} hideCta />
      </div>

      <CodeWarehouseLightbox
        visual={lightboxVisual}
        onClose={() => setLightboxVisual(null)}
      />
    </div>
  );
}
