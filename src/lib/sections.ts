import {
  RiCodeBoxLine,
  RiBrainLine,
  RiShieldCheckLine,
} from '@remixicon/react';
import { extractTranslation } from './extractTranslation.tsx';

export const sections = [
  {
    // i18next-instrument-ignore-next-line
    title: 'WebDev',
    path: 'webdev',
    icon: RiCodeBoxLine,
    description: extractTranslation(
      'Sections.webdev.description',
      'W sekcji Webdev zajmujemy się praktycznym tworzeniem nowoczesnych aplikacji internetowych. Podczas wspólnej pracy nad projektami na bieżąco uczymy się nowych narzędzi oraz wykorzystujemy sprawdzone w przemyśle rozwiązania.'
    ),
    id: 1,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'Data&AI',
    path: 'data&ai',
    icon: RiBrainLine,
    description: extractTranslation(
      'Sections.data&ai.description',
      'Przekuwamy teoretyczną wiedzę z AI, Machine Learning i Data Science w innowacyjne projekty prototypowe o znaczeniu przemysłowym i badawczym.'
    ),
    id: 2,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'CyberSec',
    path: 'cybersec',
    icon: RiShieldCheckLine,
    description: extractTranslation(
      'Sections.cybersec.description',
      'W sekcji cyberbezpieczeństwa łączymy solidną wiedzę teoretyczną z praktyką, skupiając się na testach penetracyjnych, systemie Kali Linux oraz technikach OSINT. Rozwijamy nasze umiejętności, biorąc udział w konferencjach i hackathonach.'
    ),
    id: 3,
  },
];
