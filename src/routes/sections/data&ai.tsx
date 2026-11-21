import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  RiBrainLine,
  RiCpuLine,
  RiDatabase2Line,
  RiEyeLine,
  RiFlaskLine,
  RiLineChartLine,
  RiSparklingLine,
} from '@remixicon/react';

import { extractTranslation } from '@/lib/extractTranslation.tsx';
import {
  SectionPageLayout,
  type SectionPageData,
} from '@/components/SectionPageLayout.tsx';

export const Route = createFileRoute('/sections/data&ai')({
  component: DataAndAi,
  staticData: {
    titleData: extractTranslation('Data&Ai.navbarTitle', 'Data&Ai'),
    hideInNav: false,
    order: -1,
  },
});

function DataAndAi() {
  const { t } = useTranslation();

  const data: SectionPageData = {
    sectionPath: 'data&ai',
    badge: t('DataAndAi.hero.badge', 'Sekcja Data&AI'),
    titlePrefix: t('DataAndAi.hero.titlePrefix', 'Zamieniamy dane i AI w'),
    titleHighlight: t('DataAndAi.hero.titleHighlight', 'innowacyjne prototypy'),
    subtitle: t(
      'DataAndAi.hero.subtitle',
      'Przekuwamy teoretyczną wiedzę z uczenia maszynowego, analizy danych i sztucznej inteligencji w praktyczne projekty badawcze oraz przemysłowe.'
    ),
    highlights: [
      {
        id: 'focus',
        label: t('DataAndAi.highlights.focus.label', 'Główny profil'),
        value: t(
          'DataAndAi.highlights.focus.value',
          'ML, Deep Learning & Data Science'
        ),
      },
      {
        id: 'format',
        label: t('DataAndAi.highlights.format.label', 'Forma zajęć'),
        value: t(
          'DataAndAi.highlights.format.value',
          'Notebooki + Projekty R&D'
        ),
      },
      {
        id: 'level',
        label: t('DataAndAi.highlights.level.label', 'Dla kogo'),
        value: t(
          'DataAndAi.highlights.level.value',
          'Dla początkujących i pasjonatów ML'
        ),
      },
    ],
    pillarsBadge: t('DataAndAi.pillars.badge', 'Obszary badawcze'),
    pillarsTitle: t('DataAndAi.pillars.title', 'Czym zajmujemy się w Data&AI?'),
    pillarsSubtitle: t(
      'DataAndAi.pillars.subtitle',
      'Od eksploracyjnej analizy danych i klasycznych algorytmów ML po współczesne sieci neuronowe, Computer Vision i modele językowe.'
    ),
    pillars: [
      {
        id: 'ml',
        icon: RiBrainLine,
        badge: t('DataAndAi.pillars.ml.badge', 'ML & Deep Learning'),
        title: t(
          'DataAndAi.pillars.ml.title',
          'Uczenie Maszynowe i Sieci Neuronowe'
        ),
        description: t(
          'DataAndAi.pillars.ml.description',
          'Uczymy się budować, trenować i ewaluować modele klasyfikacji, regresji oraz głębokie architektury neuronowe w PyTorch i Scikit-learn.'
        ),
      },
      {
        id: 'cv',
        icon: RiEyeLine,
        badge: t('DataAndAi.pillars.cv.badge', 'Computer Vision'),
        title: t(
          'DataAndAi.pillars.cv.title',
          'Wizja Komputerowa i Analiza Obrazu'
        ),
        description: t(
          'DataAndAi.pillars.cv.description',
          'Realizujemy projekty detekcji obiektów, segmentacji oraz przetwarzania obrazu w czasie rzeczywistym z wykorzystaniem OpenCV i modeli YOLO.'
        ),
      },
      {
        id: 'llm',
        icon: RiSparklingLine,
        badge: t('DataAndAi.pillars.llm.badge', 'NLP & LLM'),
        title: t(
          'DataAndAi.pillars.llm.title',
          'Przetwarzanie Języka i Modele LLM'
        ),
        description: t(
          'DataAndAi.pillars.llm.description',
          'Eksperymentujemy z transformerami, osadzeniami wektorowymi, systemami RAG oraz lokalnym uruchamianiem otwartych modeli językowych.'
        ),
      },
      {
        id: 'data',
        icon: RiDatabase2Line,
        badge: t('DataAndAi.pillars.data.badge', 'Data Science'),
        title: t(
          'DataAndAi.pillars.data.title',
          'Analiza Danych i Inżynieria Cech'
        ),
        description: t(
          'DataAndAi.pillars.data.description',
          'Czyścimy zbiory danych, prowadzimy analizę eksploracyjną (EDA), tworzymy czytelne wizualizacje i przygotowujemy powtarzalne pipeline’y.'
        ),
      },
    ],
    techBadge: t('DataAndAi.tech.badge', 'Narzędzia i biblioteki'),
    techTitle: t('DataAndAi.tech.title', 'Ekosystem Data & AI'),
    techSubtitle: t(
      'DataAndAi.tech.subtitle',
      'Technologie, w których powstają nasze eksperymenty, analizy oraz działające prototypy.'
    ),
    techGroups: [
      {
        id: 'ai',
        title: t('DataAndAi.tech.ai.title', 'AI & Deep Learning'),
        description: t(
          'DataAndAi.tech.ai.description',
          'Frameworki do trenowania sieci neuronowych, wizji komputerowej i NLP.'
        ),
        items: [
          'Python',
          'PyTorch',
          'Scikit-learn',
          'Hugging Face',
          'OpenCV',
          'YOLO',
        ],
      },
      {
        id: 'data',
        title: t('DataAndAi.tech.data.title', 'Data Science & Analiza'),
        description: t(
          'DataAndAi.tech.data.description',
          'Przetwarzanie tabel, obliczenia numeryczne oraz wizualizacja wyników.'
        ),
        items: ['Pandas', 'NumPy', 'Polars', 'Matplotlib', 'Seaborn', 'SQL'],
      },
      {
        id: 'mlops',
        title: t('DataAndAi.tech.mlops.title', 'Środowiska & Eksperymenty'),
        description: t(
          'DataAndAi.tech.mlops.description',
          'Praca z notebookami, śledzenie metryk i wdrażanie modeli.'
        ),
        items: ['Jupyter', 'Google Colab', 'Docker', 'FastAPI', 'Git & DVC'],
      },
    ],
    workflowBadge: t('DataAndAi.workflow.badge', 'Ścieżka rozwoju'),
    workflowTitle: t('DataAndAi.workflow.title', 'Od hipotezy do prototypu'),
    workflowSubtitle: t(
      'DataAndAi.workflow.subtitle',
      'Stawiamy na zrozumienie działania modeli od środka oraz weryfikację pomysłów na realnych zbiorach danych.'
    ),
    workflowSteps: [
      {
        step: '01',
        icon: RiLineChartLine,
        title: t('DataAndAi.workflow.step1.title', 'Teoria w notebookach'),
        description: t(
          'DataAndAi.workflow.step1.description',
          'Omawiamy intuicję matematyczną i od razu przekładamy ją na interaktywne ćwiczenia w Pythonie oraz Jupyter Notebooku.'
        ),
      },
      {
        step: '02',
        icon: RiCpuLine,
        title: t(
          'DataAndAi.workflow.step2.title',
          'Prototypy i projekty badawcze'
        ),
        description: t(
          'DataAndAi.workflow.step2.description',
          'Łączymy się w małe zespoły, tworząc autorskie rozwiązania z pogranicza mechaniki, informatyki i sztucznej inteligencji.'
        ),
      },
      {
        step: '03',
        icon: RiFlaskLine,
        title: t(
          'DataAndAi.workflow.step3.title',
          'Konferencje, Kaggle i hackathony'
        ),
        description: t(
          'DataAndAi.workflow.step3.description',
          'Prezentujemy wyniki naszych prac na konferencjach naukowych oraz sprawdzamy się w konkursach analizy danych i hackathonach AI.'
        ),
      },
    ],
    ctaTitle: t(
      'DataAndAi.cta.title',
      'Interesuje Cię uczenie maszynowe i analiza danych?'
    ),
    ctaDescription: t(
      'DataAndAi.cta.description',
      'Dołącz do najbliższego spotkania sekcji Data&AI lub napisz do nas na Discordzie — pokażemy Ci aktualne projekty i pomożemy zacząć.'
    ),
  };

  return <SectionPageLayout data={data} />;
}
