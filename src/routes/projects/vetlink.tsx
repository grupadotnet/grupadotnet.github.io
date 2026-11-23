import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiCalendar2Line,
  RiDatabase2Line,
  RiFileList3Line,
  RiHeartPulseLine,
  RiNotification3Line,
  RiServerLine,
  RiStethoscopeLine,
  RiUserHeartLine,
} from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import {
  ProjectArchitecture,
  ProjectFeatures,
  ProjectHero,
  ProjectOtherAndCta,
  ProjectTechStack,
  type ProjectPageData,
} from '@/components/ProjectPageLayout.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';

export const Route = createFileRoute('/projects/vetlink')({
  component: VetLink,
  staticData: {
    titleData: extractTranslation('VetLink.navbarTitle', 'VetLink'),
    hideInNav: false,
    order: 0,
  },
});

function VetLink() {
  const { t } = useTranslation();

  const data: ProjectPageData = {
    projectPath: 'vetlink',
    badge: t('VetLink.hero.badge', 'Projekt VetLink'),
    status: t('VetLink.hero.status', 'Sesja Kół Naukowych PK 2025'),
    titlePrefix: t('VetLink.hero.titlePrefix', 'Inteligentny system'),
    titleHighlight: t('VetLink.hero.titleHighlight', 'opieki i danych vet'),
    subtitle: t(
      'VetLink.hero.subtitle',
      'VetLink to aplikacja wspierająca zarządzanie danymi weterynaryjnymi oraz codzienną opiekę nad psem — łącząca historię leczenia, przypomnienia profilaktyczne i komunikację na linii opiekun–lekarz. Projekt został zaprezentowany na Wydziałowej Sesji Kół Naukowych PK.'
    ),
    highlights: [
      {
        id: 'domain',
        label: t('VetLink.highlights.domain.label', 'Dziedzina'),
        value: t(
          'VetLink.highlights.domain.value',
          'PetTech & Dane Weterynaryjne'
        ),
      },
      {
        id: 'presentation',
        label: t('VetLink.highlights.presentation.label', 'Wyróżnienie'),
        value: t(
          'VetLink.highlights.presentation.value',
          'Sesja Kół Naukowych WM PK'
        ),
      },
      {
        id: 'scope',
        label: t('VetLink.highlights.scope.label', 'Zakres'),
        value: t(
          'VetLink.highlights.scope.value',
          'Karta pacjenta, wizyty & profilaktyka'
        ),
      },
    ],
    featuresBadge: t('VetLink.features.badge', 'Funkcjonalności'),
    featuresTitle: t('VetLink.features.title', 'Co oferuje VetLink?'),
    featuresSubtitle: t(
      'VetLink.features.subtitle',
      'Zaprojektowany z myślą o uporządkowaniu dokumentacji medycznej zwierząt i ułatwieniu systematycznej opieki.'
    ),
    features: [
      {
        id: 'records',
        icon: RiFileList3Line,
        badge: t('VetLink.features.records.badge', 'Dokumentacja'),
        title: t(
          'VetLink.features.records.title',
          'Cyfrowa Karta Zdrowia Zwierzęcia'
        ),
        description: t(
          'VetLink.features.records.description',
          'Centralne miejsce na historię wizyt, wyniki badań, przebyte zabiegi, alergie oraz aktualnie przyjmowane leki.'
        ),
      },
      {
        id: 'care',
        icon: RiHeartPulseLine,
        badge: t('VetLink.features.care.badge', 'Profilaktyka'),
        title: t(
          'VetLink.features.care.title',
          'Inteligentny Harmonogram Opieki'
        ),
        description: t(
          'VetLink.features.care.description',
          'Śledzenie szczepień, odrobaczania, wagi oraz codziennej aktywności z automatycznymi powiadomieniami dla opiekuna.'
        ),
      },
      {
        id: 'visits',
        icon: RiCalendar2Line,
        badge: t('VetLink.features.visits.badge', 'Wizyty'),
        title: t(
          'VetLink.features.visits.title',
          'Zarządzanie Wizytami i Zaleceniami'
        ),
        description: t(
          'VetLink.features.visits.description',
          'Przejrzyste zestawienie zaplanowanych konsultacji oraz zaleceń pozabiegowych dostępnych w jednym widoku.'
        ),
      },
      {
        id: 'sharing',
        icon: RiUserHeartLine,
        badge: t('VetLink.features.sharing.badge', 'Współpraca'),
        title: t(
          'VetLink.features.sharing.title',
          'Szybki Dostęp dla Gabinetu'
        ),
        description: t(
          'VetLink.features.sharing.description',
          'Ułatwione udostępnianie kompletnej historii medycznej psa lekarzowi weterynarii podczas nagłej lub kolejnej wizyty.'
        ),
      },
    ],
    techBadge: t('VetLink.tech.badge', 'Technologie'),
    techTitle: t('VetLink.tech.title', 'Stos technologiczny projektu'),
    techSubtitle: t(
      'VetLink.tech.subtitle',
      'Architektura projektowana przez członków koła z naciskiem na niezawodność danych i czytelny interfejs.'
    ),
    techGroups: [
      {
        id: 'backend',
        title: t('VetLink.tech.backend.title', 'Backend & Logika'),
        description: t(
          'VetLink.tech.backend.description',
          'Warstwa API odpowiedzialna za bezpieczne przechowywanie kartotek i logikę przypomnień.'
        ),
        items: ['.NET / ASP.NET Core', 'C#', 'REST API', 'Entity Framework'],
      },
      {
        id: 'frontend',
        title: t('VetLink.tech.frontend.title', 'Interfejs Użytkownika'),
        description: t(
          'VetLink.tech.frontend.description',
          'Responsywny widok dla opiekunów zwierząt oraz panel zarządzania danymi.'
        ),
        items: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
      },
      {
        id: 'data',
        title: t('VetLink.tech.data.title', 'Dane & Środowisko'),
        description: t(
          'VetLink.tech.data.description',
          'Modelowanie relacyjnych danych medycznych oraz konteneryzacja usług.'
        ),
        items: ['SQL / PostgreSQL', 'Docker', 'Git & GitHub', 'Swagger'],
      },
    ],
    architectureBadge: t('VetLink.architecture.badge', 'Przepływ pracy'),
    architectureTitle: t(
      'VetLink.architecture.title',
      'Jak działa ekosystem VetLink'
    ),
    architectureSubtitle: t(
      'VetLink.architecture.subtitle',
      'Od wprowadzenia profilu pupila po inteligentne wsparcie w codziennej opiece i kontakt z weterynarzem.'
    ),
    architectureSteps: [
      {
        step: '01',
        icon: RiDatabase2Line,
        title: t(
          'VetLink.architecture.step1.title',
          'Profil i historia danych'
        ),
        description: t(
          'VetLink.architecture.step1.description',
          'Opiekun lub gabinet tworzy ustrukturyzowany profil psa z kompletem wpisów o szczepieniach, lekach i przebytych konsultacjach.'
        ),
      },
      {
        step: '02',
        icon: RiNotification3Line,
        title: t('VetLink.architecture.step2.title', 'Monitoring i alerty'),
        description: t(
          'VetLink.architecture.step2.description',
          'System pilnuje terminów profilaktyki oraz analizuje wprowadzane parametry, przypominając o nadchodzących działaniach.'
        ),
      },
      {
        step: '03',
        icon: RiServerLine,
        title: t('VetLink.architecture.step3.title', 'Współdzielona wiedza'),
        description: t(
          'VetLink.architecture.step3.description',
          'Podczas wizyty weterynarz otrzymuje spójny kontekst zdrowotny pacjenta bez konieczności przeszukiwania papierowych książeczek.'
        ),
      },
    ],
    ctaTitle: t(
      'VetLink.cta.title',
      'Chcesz współtworzyć projekt VetLink w KNPiMI?'
    ),
    ctaDescription: t(
      'VetLink.cta.description',
      'Odezwij się na Discordzie KNPiMI lub przyjdź na spotkanie sekcji WebDev — opowiemy o aktualnych zadaniach i planach rozwoju.'
    ),
  };

  const patientDossierCard = (
    <Card className="overflow-hidden border border-border/60 bg-muted/40 py-0 shadow-md">
      <div className="flex items-center justify-between border-b border-border/50 bg-background/85 px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold">
          <RiStethoscopeLine className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>{t('VetLink.hero.dossierTitle', 'karta-pacjenta.schema')}</span>
        </div>
        <Badge variant="secondary" className="font-mono text-[10px]">
          WM PK 2025
        </Badge>
      </div>
      <CardContent className="space-y-3 p-5">
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {[
            {
              key: 'vaccines',
              title: t('VetLink.hero.fieldVaccines', 'Szczepienia'),
              meta: t('VetLink.hero.fieldVaccinesMeta', 'Alerty cykliczne'),
            },
            {
              key: 'labs',
              title: t('VetLink.hero.fieldLabs', 'Wyniki badań'),
              meta: t('VetLink.hero.fieldLabsMeta', 'Historia leczenia'),
            },
            {
              key: 'meds',
              title: t('VetLink.hero.fieldMeds', 'Leki i alergie'),
              meta: t('VetLink.hero.fieldMedsMeta', 'Dawkowanie'),
            },
            {
              key: 'clinic',
              title: t('VetLink.hero.fieldClinic', 'Wgląd gabinetu'),
              meta: t('VetLink.hero.fieldClinicMeta', 'Wizyta i zalecenia'),
            },
          ].map((entry) => (
            <div
              key={entry.key}
              className="rounded-xl border border-border/50 bg-background/80 p-3"
            >
              <p className="font-semibold text-foreground">{entry.title}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {entry.meta}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-3.5 py-2.5 text-xs text-muted-foreground">
          {t(
            'VetLink.hero.dossierNote',
            'Wystąpienie na Wydziałowej Sesji Kół Naukowych PK.'
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero data={data} variant="split" rightSlot={patientDossierCard} />
      <ProjectFeatures data={data} variant="rows" />
      <ProjectArchitecture data={data} variant="vertical" />
      <ProjectTechStack data={data} variant="cards" />
      <ProjectOtherAndCta data={data} />
    </div>
  );
}
