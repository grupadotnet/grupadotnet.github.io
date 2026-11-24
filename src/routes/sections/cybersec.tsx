import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiBugLine,
  RiFlagLine,
  RiLockPasswordLine,
  RiRadarLine,
  RiSearchEyeLine,
  RiServerLine,
  RiShieldCheckLine,
  RiTerminalLine,
} from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import {
  SectionHero,
  SectionNextEventSection,
  SectionOtherAndCta,
  SectionPillars,
  SectionTechStack,
  SectionWorkflow,
  type SectionPageData,
} from '@/components/SectionPageLayout.tsx';

export const Route = createFileRoute('/sections/cybersec')({
  component: Cybersec,
  staticData: {
    titleData: extractTranslation('Cybersec.navbarTitle', 'CyberSec'),
    hideInNav: false,
    order: -1,
  },
});

function Cybersec() {
  const { t } = useTranslation();

  const data: SectionPageData = {
    sectionPath: 'cybersec',
    badge: t('Cybersec.hero.badge', 'Sekcja CyberSec'),
    titlePrefix: t('Cybersec.hero.titlePrefix', 'Ofensywne i defensywne'),
    titleHighlight: t('Cybersec.hero.titleHighlight', 'cyberbezpieczeństwo'),
    subtitle: t(
      'Cybersec.hero.subtitle',
      'Łączymy solidną wiedzę teoretyczną z praktyką — skupiamy się na testach penetracyjnych, działaniach Blue Team (SIEM/XDR z Wazuh), systemie Kali Linux, technikach OSINT oraz wspólnym rozwiązywaniu wyzwań CTF.'
    ),
    highlights: [
      {
        id: 'focus',
        label: t('Cybersec.highlights.focus.label', 'Główny profil'),
        value: t(
          'Cybersec.highlights.focus.value',
          'Red & Blue Team, Wazuh, OSINT & CTF'
        ),
      },
      {
        id: 'format',
        label: t('Cybersec.highlights.format.label', 'Forma zajęć'),
        value: t(
          'Cybersec.highlights.format.value',
          'Laby praktyczne & Walkthrough'
        ),
      },
      {
        id: 'level',
        label: t('Cybersec.highlights.level.label', 'Dla kogo'),
        value: t(
          'Cybersec.highlights.level.value',
          'Od podstaw Linuksa po CTF-y'
        ),
      },
    ],
    pillarsBadge: t('Cybersec.pillars.badge', 'Obszary specjalizacji'),
    pillarsTitle: t('Cybersec.pillars.title', 'Co robimy w sekcji CyberSec?'),
    pillarsSubtitle: t(
      'Cybersec.pillars.subtitle',
      'Uczymy się rozumieć podatności, aby skutecznie je wykrywać i budować bezpieczniejsze systemy informatyczne.'
    ),
    pillars: [
      {
        id: 'pentest',
        icon: RiBugLine,
        badge: t('Cybersec.pillars.pentest.badge', 'Web & Pentesting'),
        title: t(
          'Cybersec.pillars.pentest.title',
          'Testy Penetracyjne i OWASP'
        ),
        description: t(
          'Cybersec.pillars.pentest.description',
          'Analizujemy najczęstsze podatności aplikacji webowych (OWASP Top 10, SQLi, XSS, błędy autoryzacji) oraz uczymy się metodycznego przeprowadzania testów bezpieczeństwa.'
        ),
      },
      {
        id: 'osint',
        icon: RiSearchEyeLine,
        badge: t('Cybersec.pillars.osint.badge', 'Biały Wywiad'),
        title: t('Cybersec.pillars.osint.title', 'Techniki OSINT'),
        description: t(
          'Cybersec.pillars.osint.description',
          'Pozyskujemy i weryfikujemy informacje z otwartych źródeł, analizujemy metadane, infrastrukturę domenową oraz ślad cyfrowy w sieci.'
        ),
      },
      {
        id: 'systems',
        icon: RiServerLine,
        badge: t('Cybersec.pillars.systems.badge', 'Sieci & Linux'),
        title: t(
          'Cybersec.pillars.systems.title',
          'Kali Linux, Sieci i Hardening'
        ),
        description: t(
          'Cybersec.pillars.systems.description',
          'Pracujemy w środowisku Kali Linux, badamy ruch sieciowy, poznajemy protokoły, podstawy kryptografii oraz metody zabezpieczania serwerów.'
        ),
      },
      {
        id: 'blueteam',
        icon: RiRadarLine,
        badge: t('Cybersec.pillars.blueteam.badge', 'Blue Team & SIEM'),
        title: t(
          'Cybersec.pillars.blueteam.title',
          'Blue Team, Monitoring i Wazuh'
        ),
        description: t(
          'Cybersec.pillars.blueteam.description',
          'Wdrażamy i konfigurujemy platformę Wazuh (SIEM / XDR) do zbierania logów, detekcji zagrożeń, analizy podatności i monitorowania integralności plików (FIM) oraz ćwiczymy reagowanie na incydenty (Incident Response).'
        ),
      },
      {
        id: 'ctf',
        icon: RiFlagLine,
        badge: t('Cybersec.pillars.ctf.badge', 'Rywalizacja'),
        title: t('Cybersec.pillars.ctf.title', 'Turnieje CTF i Konferencje'),
        description: t(
          'Cybersec.pillars.ctf.description',
          'Wspólnie rozwiązujemy maszyny na platformach treningowych, startujemy w zawodach Capture The Flag i bierzemy udział w konferencjach oraz hackathonach.'
        ),
      },
    ],
    techBadge: t('Cybersec.tech.badge', 'Warsztat'),
    techTitle: t('Cybersec.tech.title', 'Narzędzia i platformy'),
    techSubtitle: t(
      'Cybersec.tech.subtitle',
      'Oprogramowanie, środowiska laboratoryjne i standardy, z którymi pracujemy wyłącznie w kontrolowanych i etycznych warunkach.'
    ),
    techGroups: [
      {
        id: 'pentest',
        title: t('Cybersec.tech.pentest.title', 'Narzędzia Pentestingowe'),
        description: t(
          'Cybersec.tech.pentest.description',
          'Analiza ruchu HTTP, rekonesans i automatyzacja testów bezpieczeństwa.'
        ),
        items: [
          'Burp Suite',
          'Nmap',
          'Gobuster / ffuf',
          'Metasploit',
          'SQLmap',
        ],
      },
      {
        id: 'analysis',
        title: t('Cybersec.tech.analysis.title', 'Systemy & Analiza'),
        description: t(
          'Cybersec.tech.analysis.description',
          'Środowiska operacyjne, monitoring SIEM/XDR, analiza pakietów i inżynieria wsteczna.'
        ),
        items: [
          'Kali Linux',
          'Wazuh (SIEM / XDR)',
          'Wireshark',
          'Bash & Python',
          'Ghidra',
          'Docker Labs',
        ],
      },
      {
        id: 'ctf',
        title: t('Cybersec.tech.ctf.title', 'Platformy CTF & Standardy'),
        description: t(
          'Cybersec.tech.ctf.description',
          'Trening praktycznych scenariuszy oraz klasyfikacja podatności.'
        ),
        items: [
          'Hack The Box',
          'TryHackMe',
          'OWASP Top 10',
          'PortSwigger Academy',
          'OSINT Framework',
        ],
      },
    ],
    workflowBadge: t('Cybersec.workflow.badge', 'Zasady i praktyka'),
    workflowTitle: t('Cybersec.workflow.title', 'Jak rozwijamy umiejętności'),
    workflowSubtitle: t(
      'Cybersec.workflow.subtitle',
      'Bezpieczna nauka w izolowanych laboratoriach, etyczne podejście i wsparcie doświadczonych członków sekcji.'
    ),
    workflowSteps: [
      {
        step: '01',
        icon: RiLockPasswordLine,
        title: t('Cybersec.workflow.step1.title', 'Izolowane laboratoria'),
        description: t(
          'Cybersec.workflow.step1.description',
          'Ćwiczymy wyłącznie na dedykowanych środowiskach testowych, kontenerach i legalnych platformach treningowych.'
        ),
      },
      {
        step: '02',
        icon: RiTerminalLine,
        title: t(
          'Cybersec.workflow.step2.title',
          'Wspólne Walkthrough i analiza'
        ),
        description: t(
          'Cybersec.workflow.step2.description',
          'Krok po kroku rozkładamy na czynniki pierwsze podatności webowe, alerty z Wazuh, zadania kryptograficzne oraz scenariusze OSINT.'
        ),
      },
      {
        step: '03',
        icon: RiShieldCheckLine,
        title: t('Cybersec.workflow.step3.title', 'Drużyna CTF i konferencje'),
        description: t(
          'Cybersec.workflow.step3.description',
          'Budujemy zespół na zawody Capture The Flag i jeździmy na konferencje bezpieczeństwa, wymieniając się wiedzą z branżą.'
        ),
      },
    ],
    ctaTitle: t(
      'Cybersec.cta.title',
      'Chcesz sprawdzić się w świecie CyberSec?'
    ),
    ctaDescription: t(
      'Cybersec.cta.description',
      'Dołącz do naszego kolejnego spotkania lub odezwij się na kanale sekcji na Discordzie KNPiMI — nie wymagamy wcześniejszego doświadczenia w sektorze cyberbezpieczeństwa.'
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <SectionHero data={data} variant="terminal" />
      <SectionNextEventSection sectionPath="cybersec" variant="split-row" />
      <SectionPillars data={data} variant="briefing" />
      <SectionWorkflow data={data} variant="checklist" />
      <SectionTechStack data={data} variant="terminal-grid" />
      <SectionOtherAndCta data={data} />
    </div>
  );
}
