import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiCpuLine,
  RiDashboard3Line,
  RiDatabase2Line,
  RiNotification3Line,
  RiPulseLine,
  RiSensorLine,
  RiServerLine,
  RiWifiLine,
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

export const Route = createFileRoute('/projects/aquasharp')({
  component: AquaSharp,
  staticData: {
    titleData: extractTranslation('AquaSharp.navbarTitle', 'AquaSharp'),
    hideInNav: false,
    order: 1,
  },
});

function useAquaSharpData(): ProjectPageData {
  const { t } = useTranslation();

  return {
    projectPath: 'aquasharp',
    badge: t('AquaSharp.hero.badge', 'Projekt AquaSharp'),
    status: t('AquaSharp.hero.status', 'IoT • .NET • React • C++'),
    titlePrefix: t('AquaSharp.hero.titlePrefix', 'Inteligentny komputer'),
    titleHighlight: t('AquaSharp.hero.titleHighlight', 'akwarystyczny IoT'),
    subtitle: t(
      'AquaSharp.hero.subtitle',
      'Kompleksowy system do monitorowania i sterowania akwarium łączący elektronikę opartą o mikrokontrolery C++/Arduino, komunikację MQTT, backend w C#/.NET z SignalR oraz webowy panel wizualizacji danych w React.'
    ),
    highlights: [
      {
        id: 'domain',
        label: t('AquaSharp.highlights.domain.label', 'Profil projektu'),
        value: t(
          'AquaSharp.highlights.domain.value',
          'IoT, Embedded & Web Telemetry'
        ),
      },
      {
        id: 'presentation',
        label: t('AquaSharp.highlights.presentation.label', 'Prezentacja'),
        value: t(
          'AquaSharp.highlights.presentation.value',
          'Sesja Kół Naukowych WM PK'
        ),
      },
      {
        id: 'modules',
        label: t('AquaSharp.highlights.modules.label', 'Architektura'),
        value: t(
          'AquaSharp.highlights.modules.value',
          'Embedded + .NET API + React UI'
        ),
      },
    ],
    featuresBadge: t('AquaSharp.features.badge', 'Możliwości systemu'),
    featuresTitle: t('AquaSharp.features.title', 'Co potrafi AquaSharp?'),
    featuresSubtitle: t(
      'AquaSharp.features.subtitle',
      'Automatyzacja opieki nad zbiornikiem wodnym dzięki ciągłym pomiarom parametrów i zdalnemu podglądowi na żywo.'
    ),
    features: [
      {
        id: 'sensors',
        icon: RiSensorLine,
        badge: t('AquaSharp.features.sensors.badge', 'Hardware & TDS'),
        title: t(
          'AquaSharp.features.sensors.title',
          'Pomiary Jakości Wody w Czasie Rzeczywistym'
        ),
        description: t(
          'AquaSharp.features.sensors.description',
          'Moduł embedded w C++ odczytuje kluczowe parametry wody (m.in. przewodność / TDS oraz temperaturę) bezpośrednio z czujników zanurzonych w akwarium.'
        ),
      },
      {
        id: 'realtime',
        icon: RiPulseLine,
        badge: t('AquaSharp.features.realtime.badge', 'MQTT & SignalR'),
        title: t(
          'AquaSharp.features.realtime.title',
          'Strumieniowanie Danych Na Żywo'
        ),
        description: t(
          'AquaSharp.features.realtime.description',
          'Broker Eclipse Mosquitto i połączenia SignalR błyskawicznie przekazują odczyty z urządzenia do backendu oraz przeglądarki użytkownika.'
        ),
      },
      {
        id: 'dashboard',
        icon: RiDashboard3Line,
        badge: t('AquaSharp.features.dashboard.badge', 'Frontend'),
        title: t(
          'AquaSharp.features.dashboard.title',
          'Wykresy Historyczne i Panel Sterowania'
        ),
        description: t(
          'AquaSharp.features.dashboard.description',
          'Aplikacja w React i Chart.js prezentuje trendy parametrów, stan urządzeń akwariowych oraz umożliwia wielojęzyczną obsługę (i18next).'
        ),
      },
      {
        id: 'docker',
        icon: RiNotification3Line,
        badge: t('AquaSharp.features.docker.badge', 'Orkiestracja'),
        title: t(
          'AquaSharp.features.docker.title',
          'Kontenerowe Środowisko Uruchomieniowe'
        ),
        description: t(
          'AquaSharp.features.docker.description',
          'Cały stos — baza danych, broker MQTT oraz API w .NET wraz z testami jednostkowymi — uruchamia się spójnie jednym poleceniem Docker Compose.'
        ),
      },
    ],
    techBadge: t('AquaSharp.tech.badge', 'Technologie'),
    techTitle: t('AquaSharp.tech.title', 'Wielowarstwowy stack technologiczny'),
    techSubtitle: t(
      'AquaSharp.tech.subtitle',
      'Połączenie programowania niskopoziomowego, usług w .NET oraz nowoczesnego frontendu.'
    ),
    techGroups: [
      {
        id: 'embedded',
        title: t('AquaSharp.tech.embedded.title', 'Embedded & IoT'),
        description: t(
          'AquaSharp.tech.embedded.description',
          'Firmware mikrokontrolera, obsługa przetworników oraz transmisja telemetryczna.'
        ),
        items: ['C++ / Arduino', 'TDS Sensor', 'MQTT (Mosquitto)', 'Wi-Fi IoT'],
      },
      {
        id: 'backend',
        title: t('AquaSharp.tech.backend.title', 'Backend & Testy'),
        description: t(
          'AquaSharp.tech.backend.description',
          'Przetwarzanie danych z czujników, API oraz powiadomienia real-time.'
        ),
        items: [
          'C# / .NET',
          'ASP.NET Core',
          'SignalR',
          'Unit Tests',
          'Docker Compose',
        ],
      },
      {
        id: 'frontend',
        title: t('AquaSharp.tech.frontend.title', 'Frontend Web'),
        description: t(
          'AquaSharp.tech.frontend.description',
          'Interfejs operatora z wykresami czasu rzeczywistego i wsparciem i18n.'
        ),
        items: [
          'React 18',
          'TypeScript',
          'Vite',
          'Chart.js',
          'React Bootstrap',
          'Vitest',
        ],
      },
    ],
    architectureBadge: t('AquaSharp.architecture.badge', 'Przepływ danych'),
    architectureTitle: t(
      'AquaSharp.architecture.title',
      'Od czujnika w akwarium do wykresu w przeglądarce'
    ),
    architectureSubtitle: t(
      'AquaSharp.architecture.subtitle',
      'Trzy współpracujące warstwy rozdzielone na dedykowane repozytoria w organizacji grupadotnet.'
    ),
    architectureSteps: [
      {
        step: '01',
        icon: RiCpuLine,
        title: t(
          'AquaSharp.architecture.step1.title',
          'Odczyt z czujników (C++)'
        ),
        description: t(
          'AquaSharp.architecture.step1.description',
          'Mikrokontroler z firmware Aqua-Sharp-Embedded cyklicznie próbkuje wodę i publikuje pomiary do brokera MQTT.'
        ),
      },
      {
        step: '02',
        icon: RiServerLine,
        title: t(
          'AquaSharp.architecture.step2.title',
          'Agregacja i API (.NET)'
        ),
        description: t(
          'AquaSharp.architecture.step2.description',
          'Backend w C# zapisuje historię w bazie danych i rozsyła aktualizacje do klientów przez SignalR.'
        ),
      },
      {
        step: '03',
        icon: RiDatabase2Line,
        title: t('AquaSharp.architecture.step3.title', 'Wizualizacja (React)'),
        description: t(
          'AquaSharp.architecture.step3.description',
          'Dashboard webowy rysuje wykresy zmian parametrów i pozwala kontrolować konfigurację komputera akwarystycznego.'
        ),
      },
    ],
    repositories: [
      {
        name: 'Aqua-Sharp',
        description: t(
          'AquaSharp.repos.core.description',
          'Główne repozytorium projektu z konfiguracją Docker Compose (baza danych, Eclipse Mosquitto, backend).'
        ),
        url: 'https://github.com/grupadotnet/Aqua-Sharp',
        language: 'Docker',
      },
      {
        name: 'Aqua-Sharp-Backend',
        description: t(
          'AquaSharp.repos.backend.description',
          'Serwer API w C# / .NET wraz z modelami domenowymi i testami jednostkowymi kontrolerów oraz serwisów.'
        ),
        url: 'https://github.com/grupadotnet/Aqua-Sharp-Backend',
        language: 'C#',
      },
      {
        name: 'Aqua-Sharp-Frontend',
        description: t(
          'AquaSharp.repos.frontend.description',
          'Aplikacja webowa w React + TypeScript + Vite z wykresami Chart.js i komunikacją SignalR.'
        ),
        url: 'https://github.com/grupadotnet/Aqua-Sharp-Frontend',
        language: 'TypeScript',
      },
      {
        name: 'Aqua-Sharp-Embedded',
        description: t(
          'AquaSharp.repos.embedded.description',
          'Oprogramowanie wbudowane dla mikrokontrolera (Arduino/C++) obsługujące m.in. czujnik TDS.'
        ),
        url: 'https://github.com/grupadotnet/Aqua-Sharp-Embedded',
        language: 'C++',
      },
    ],
    ctaTitle: t(
      'AquaSharp.cta.title',
      'Interesuje Cię połączenie IoT, C# i Reacta?'
    ),
    ctaDescription: t(
      'AquaSharp.cta.description',
      'Sprawdź kod źródłowy AquaSharp na GitHubie i porozmawiaj z nami na Discordzie KNPiMI o projektach łączących software z elektroniką.'
    ),
  };
}

function AquaSharpTelemetryCard() {
  const { t } = useTranslation();

  const layers = [
    {
      layer: t('AquaSharp.hero.busSensor', 'Czujnik TDS / Temp'),
      proto: 'C++ / Arduino',
    },
    {
      layer: t('AquaSharp.hero.busBroker', 'Broker Kolejkowy'),
      proto: 'Eclipse Mosquitto',
    },
    {
      layer: t('AquaSharp.hero.busApi', 'Serwer & Real-Time'),
      proto: 'C# .NET + SignalR',
    },
    {
      layer: t('AquaSharp.hero.busUi', 'Panel Wykresów'),
      proto: 'React 18 + Chart.js',
    },
  ];

  return (
    <Card className="overflow-hidden border border-border/60 bg-muted/40 py-0 shadow-md">
      <div className="flex items-center justify-between border-b border-border/50 bg-background/85 px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold">
          <RiWifiLine className="h-4 w-4 text-cyan-500" />
          <span>{t('AquaSharp.hero.busTitle', 'aquasharp-telemetry.bus')}</span>
        </div>
        <Badge variant="outline" className="font-mono text-[10px]">
          MQTT + SignalR
        </Badge>
      </div>
      <CardContent className="space-y-2.5 p-5">
        {layers.map((node) => (
          <div
            key={node.proto}
            className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/80 px-3.5 py-2.5 text-xs"
          >
            <span className="font-semibold text-foreground">{node.layer}</span>
            <span className="font-mono text-muted-foreground">
              {node.proto}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AquaSharp() {
  const { t } = useTranslation();
  const data = useAquaSharpData();

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero
        data={data}
        variant="split"
        rightSlot={<AquaSharpTelemetryCard />}
      />
      <ProjectArchitecture data={data} variant="horizontal" />
      {data.repositories && (
        <ProjectRepositoriesSection
          repositories={data.repositories}
          badge={t('AquaSharp.repos.badge', 'Ekosystem 4 repozytoriów')}
          title={t(
            'AquaSharp.repos.title',
            'Modułowa architektura na GitHubie'
          )}
          subtitle={t(
            'AquaSharp.repos.subtitle',
            'Firmware embedded, orkiestracja Docker, backend C#/.NET oraz dashboard React rozwijane są w czterech współpracujących repozytoriach.'
          )}
        />
      )}
      <ProjectFeatures data={data} variant="grid-2x2" />
      <ProjectTechStack data={data} variant="sheet" />
      <ProjectOtherAndCta data={data} />
    </div>
  );
}
