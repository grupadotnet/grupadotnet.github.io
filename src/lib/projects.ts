import {
  RiBarcodeBoxLine,
  RiBuilding2Line,
  RiDropLine,
  RiMapPin2Line,
  RiStethoscopeLine,
} from '@remixicon/react';
import { extractTranslation } from './extractTranslation.tsx';
import type { FileRouteTypes } from '@/routeTree.gen';

export type ProjectPath = FileRouteTypes['to'] extends infer T
  ? T extends `/projects/${infer P}`
    ? P
    : never
  : never;

export interface Project {
  title: string;
  path: ProjectPath;
  icon: typeof RiStethoscopeLine;
  category: ReturnType<typeof extractTranslation>;
  description: ReturnType<typeof extractTranslation>;
  techPreview: string[];
  id: number;
}

export const projects: Project[] = [
  {
    // i18next-instrument-ignore-next-line
    title: 'VetLink',
    path: 'vetlink',
    icon: RiStethoscopeLine,
    category: extractTranslation('Projects.vetlink.category', 'Web & Mobile'),
    description: extractTranslation(
      'Projects.vetlink.description',
      'Inteligentny system opieki nad psem oraz zarządzania danymi weterynaryjnymi, prezentowany na Wydziałowej Sesji Kół Naukowych PK.'
    ),
    techPreview: ['.NET', 'REST API', 'TypeScript'],
    id: 1,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'AquaSharp',
    path: 'aquasharp',
    icon: RiDropLine,
    category: extractTranslation('Projects.aquasharp.category', 'IoT & Web'),
    description: extractTranslation(
      'Projects.aquasharp.description',
      'Inteligentny komputer akwarystyczny łączący czujniki Arduino/C++, brokera MQTT, backend w C#/.NET oraz panel telemetryczny w React.'
    ),
    techPreview: ['C# / .NET', 'React', 'C++ / IoT'],
    id: 2,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'CodeWarehouse',
    path: 'codewarehouse',
    icon: RiBarcodeBoxLine,
    category: extractTranslation(
      'Projects.codewarehouse.category',
      'Full-Stack & Mobile'
    ),
    description: extractTranslation(
      'Projects.codewarehouse.description',
      'System zarządzania magazynem ze skanerem kodów kreskowych (Kotlin + Jetpack Compose), API w Spring Boot 3, panelem w React i prognozami Prophet.'
    ),
    techPreview: ['React + TS', 'Spring Boot', 'Jetpack Compose'],
    id: 3,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'e-Akademik',
    path: 'e-akademik',
    icon: RiBuilding2Line,
    category: extractTranslation(
      'Projects.eAkademik.category',
      'Mobile & Backend'
    ),
    description: extractTranslation(
      'Projects.eAkademik.description',
      'Platforma digitalizująca codzienną obsługę domów studenckich — zgłoszenia, komunikacja z administracją i aplikacja mobilna w Expo.'
    ),
    techPreview: ['React Native', 'Expo', 'Java / C#'],
    id: 4,
  },
  {
    // i18next-instrument-ignore-next-line
    title: 'PKWMmap',
    path: 'pkwmmap',
    icon: RiMapPin2Line,
    category: extractTranslation(
      'Projects.pkwmmap.category',
      'KMP & Indoor BLE'
    ),
    description: extractTranslation(
      'Projects.pkwmmap.description',
      'Interaktywna mapa nawigacji wewnątrzbudynkowej dla Wydziału Mechanicznego PK oparta o beacony BLE iNode, Kotlin Multiplatform i backend w Go.'
    ),
    techPreview: ['Kotlin Multiplatform', 'Go', 'BLE iNode'],
    id: 5,
  },
];
