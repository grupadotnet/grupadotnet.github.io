import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { extractTranslation } from '@/lib/extractTranslation.tsx';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  RiPaletteLine,
  RiDownloadLine,
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
  RiShapesLine,
  RiCodeSSlashLine,
  RiCloseLine,
  RiShieldCheckLine,
  RiTerminalBoxLine,
  RiInformationLine,
  RiArtboardLine,
} from '@remixicon/react';

export const Route = createFileRoute('/identity/2026')({
  component: Identity2026,
  staticData: {
    titleData: extractTranslation(
      'Identity2026.navbarTitle',
      'Identyfikacja wizualna 2026'
    ),
    hideInNav: true,
    order: -1,
  },
});

interface LogoAsset {
  id: string;
  name: string;
  category: string;
  description: string;
  path: string;
  filename: string;
  previewBg: 'light' | 'dark';
  aspectRatio: string;
  format: string;
}

const logoAssets: LogoAsset[] = [
  {
    id: 'mark-gradient',
    name: 'Sygnet Podstawowy (Gradient)',
    category: 'Znak główny',
    description:
      'Główny znak koła z oficjalnym gradientem marki. Rekomendowany na jasne tła, do awatarów, ikon aplikacji oraz materiałów cyfrowych.',
    path: '/svg/KNPIMI/Logo_KNPiMI.svg',
    filename: 'Logo_KNPiMI.svg',
    previewBg: 'light',
    aspectRatio: '1:1 (Kwadrat)',
    format: 'SVG (Wektor)',
  },
  {
    id: 'mark-white',
    name: 'Sygnet Monochromatyczny (Biały)',
    category: 'Wersja inwersyjna',
    description:
      'Monochromatyczny wariant sygnetu. Dedykowany na ciemne jednolite tła, fotografie oraz materiały o nasyconych barwach.',
    path: '/svg/KNPIMI/Logo_KNPiMI_white.svg',
    filename: 'Logo_KNPiMI_white.svg',
    previewBg: 'dark',
    aspectRatio: '1:1 (Kwadrat)',
    format: 'SVG (Wektor)',
  },
  {
    id: 'full-dark',
    name: 'Logotyp Pełny (Wersja ciemna)',
    category: 'Logotyp horyzontalny',
    description:
      'Kompletny znak z sygnetem i typografią w kolorze grafitowym (#1D1D1B). Podstawowa forma reprezentacyjna na jasne tła i dokumenty.',
    path: '/svg/KNPIMI/Logo_KNPiMI_with_text.svg',
    filename: 'Logo_KNPiMI_with_text.svg',
    previewBg: 'light',
    aspectRatio: '3.4:1 (Horyzontalny)',
    format: 'SVG (Wektor)',
  },
  {
    id: 'full-white',
    name: 'Logotyp Pełny (Wersja biała)',
    category: 'Logotyp horyzontalny (Inwersja)',
    description:
      'Kompletny znak z sygnetem i białą typografią (#FFFFFF). Dedykowany do stron w trybie nocnym, ciemnych slajdów i banerów.',
    path: '/svg/KNPIMI/Logo_KNPiMI_white_with_text.svg',
    filename: 'Logo_KNPiMI_white_with_text.svg',
    previewBg: 'dark',
    aspectRatio: '3.4:1 (Horyzontalny)',
    format: 'SVG (Wektor)',
  },
];

interface ColorDef {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  description: string;
  badgeBg: string;
  textColor: string;
}

const brandColors: ColorDef[] = [
  {
    name: 'KNPiMI Blue',
    role: 'Główny kolor marki (Primary)',
    hex: '#2E64AE',
    rgb: 'rgb(46, 100, 174)',
    cmyk: 'C80 M50 Y0 K0',
    description:
      'Podstawowy błękit marki, symbolizujący inżynierię, technologię i tradycję akademicką Politechniki Krakowskiej.',
    badgeBg: 'bg-[#2E64AE]',
    textColor: 'text-white',
  },
  {
    name: 'KNPiMI Violet',
    role: 'Akcent gradientu (Accent)',
    hex: '#9F64A6',
    rgb: 'rgb(159, 100, 166)',
    cmyk: 'C35 M65 Y0 K0',
    description:
      'Kreatywny fiolet zamykający gradient znaku. Reprezentuje innowacyjność, otwartość i pasję członków koła.',
    badgeBg: 'bg-[#9F64A6]',
    textColor: 'text-white',
  },
  {
    name: 'Dark Graphite',
    role: 'Typografia logotypu',
    hex: '#1D1D1B',
    rgb: 'rgb(29, 29, 27)',
    cmyk: 'C0 M0 Y0 K90',
    description:
      'Kolor typografii logotypu "Koło Naukowe Programistów i Miłośników Informatyki" na jasnych tłach.',
    badgeBg: 'bg-[#1D1D1B]',
    textColor: 'text-white',
  },
  {
    name: 'Pure White',
    role: 'Kontrast & Wypełnienie',
    hex: '#FFFFFF',
    rgb: 'rgb(255, 255, 255)',
    cmyk: 'C0 M0 Y0 K0',
    description:
      'Wypełnienie terminala, znaczniki kodu oraz biel typografii w wariantach inwersyjnych logotypu.',
    badgeBg: 'bg-white border border-border/80',
    textColor: 'text-neutral-900',
  },
];

function Identity2026() {
  const { t } = useTranslation();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            <RiPaletteLine className="mr-2 h-4 w-4 text-blue-500" />
            {t('Identity2026.badge', 'Księga Znaku & Identyfikacja Wizualna')}
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-balance">
            {t('Identity2026.titlePrefix', 'Identyfikacja Wizualna')}{' '}
            <span className="bg-(image:--primary-gradient) bg-clip-text text-transparent">
              2026
            </span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
            {t(
              'Identity2026.subtitle',
              'Oficjalny przewodnik po identyfikacji wizualnej Koła Naukowego Programistów i Miłośników Informatyki działającego przy Wydziale Mechanicznym Politechniki Krakowskiej. Poznaj zasady kompozycji, oficjalne kolory i pobierz aktualne pliki wektorowe SVG.'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="#pliki-logo">
              <Button className="cursor-pointer gap-2">
                <RiDownloadLine className="h-4 w-4" />
                {t('Identity2026.heroCta', 'Pobierz pliki logo')}
              </Button>
            </a>
            <a href="#kolorystyka">
              <Button variant="outline" className="cursor-pointer gap-2">
                <RiPaletteLine className="h-4 w-4" />
                {t('Identity2026.heroColors', 'Kolorystyka & Kody')}
              </Button>
            </a>
            <a href="#zasady">
              <Button variant="secondary" className="cursor-pointer gap-2">
                <RiShieldCheckLine className="h-4 w-4" />
                {t('Identity2026.heroRules', 'Zasady stosowania')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Logo Files Grid */}
      <section
        id="pliki-logo"
        className="container mx-auto max-w-6xl px-4 py-12 md:py-16 scroll-mt-20"
      >
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiArtboardLine className="mr-2 h-4 w-4" />
              {t('Identity2026.logosSection.badge', 'Zasoby Wektorowe')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t(
                'Identity2026.logosSection.title',
                'Oficjalne Warianty Logotypu'
              )}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              {t(
                'Identity2026.logosSection.paragraph',
                'Zbiór oficjalnych wektorowych plików znaku KNPiMI. Każdy wariant został zoptymalizowany pod kątem skalowalności i precyzji renderowania na ekranie oraz w druku.'
              )}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {logoAssets.map((asset) => {
              const isCopied = copiedKey === asset.id;
              const isDarkContainer = asset.previewBg === 'dark';

              return (
                <Card
                  key={asset.id}
                  className="group flex flex-col justify-between border-none bg-muted/50 shadow-sm transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:bg-muted/70 overflow-hidden"
                >
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold"
                      >
                        {asset.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {asset.format}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {asset.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {asset.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Visual Preview Container */}
                    <div
                      className={`relative flex min-h-[220px] w-full items-center justify-center rounded-xl p-8 transition-colors ${
                        isDarkContainer
                          ? 'bg-[#0f172a] border border-slate-800'
                          : 'bg-white border border-neutral-200 dark:border-neutral-800'
                      }`}
                    >
                      {/* Pattern grid lines for design canvas feeling */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.06] text-foreground pointer-events-none" />

                      <img
                        src={asset.path}
                        alt={asset.name}
                        className="relative z-10 max-h-36 max-w-full object-contain drop-shadow-xs"
                      />

                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isDarkContainer
                              ? 'bg-slate-800 text-slate-300'
                              : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
                          }`}
                        >
                          {isDarkContainer ? 'Tło ciemne' : 'Tło jasne'}
                        </span>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-2 pt-1">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="font-semibold text-foreground">
                          Plik:
                        </span>
                        <span>{asset.filename}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="font-semibold text-foreground">
                          Proporcje:
                        </span>
                        <span>{asset.aspectRatio}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
                    <a
                      href={asset.path}
                      download={asset.filename}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full cursor-pointer gap-1.5"
                      >
                        <RiDownloadLine className="h-4 w-4" />
                        <span>
                          {t('Identity2026.downloadSvg', 'Pobierz SVG')}
                        </span>
                      </Button>
                    </a>

                    <a
                      href={asset.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer gap-1.5"
                        title={t(
                          'Identity2026.openInTab',
                          'Otwórz w nowej karcie'
                        )}
                      >
                        <RiExternalLinkLine className="h-4 w-4" />
                        <span className="hidden sm:inline">Podgląd</span>
                      </Button>
                    </a>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopy(asset.path, asset.id)}
                      className="cursor-pointer gap-1.5"
                      title={t(
                        'Identity2026.copyPath',
                        'Kopiuj ścieżkę do pliku'
                      )}
                    >
                      {isCopied ? (
                        <>
                          <RiCheckLine className="h-4 w-4 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">
                            Skopiowano!
                          </span>
                        </>
                      ) : (
                        <>
                          <RiFileCopyLine className="h-4 w-4" />
                          <span>Kopiuj URL</span>
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section
        id="kolorystyka"
        className="container mx-auto max-w-6xl px-4 py-12 md:py-16 scroll-mt-20"
      >
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col items-center text-center space-y-3">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiPaletteLine className="mr-2 h-4 w-4" />
              {t('Identity2026.colorsSection.badge', 'Kolorystyka Marki')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Identity2026.colorsSection.title', 'Oficjalna Paleta Barw')}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              {t(
                'Identity2026.colorsSection.paragraph',
                'Barwy identyfikacji wizualnej oparte są o charakterystyczny gradient przechodzący z inżynieryjnego błękitu w kreatywny fiolet.'
              )}
            </p>
          </div>

          {/* Primary Gradient Highlight Banner */}
          <Card className="border-none bg-muted/50 shadow-sm overflow-hidden p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Kluczowy gradient znaku
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  KNPiMI Brand Gradient
                </h3>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Gradient łączący błękit (#2E64AE) oraz fiolet (#9F64A6) pod
                  kątem 201°, stanowiący główny motyw wizualny koła.
                </p>
              </div>

              {/* Gradient Preview Bar */}
              <div className="flex flex-col items-center sm:items-end gap-3 w-full lg:w-auto">
                <div className="h-14 w-full sm:w-80 rounded-xl shadow-inner bg-(image:--primary-gradient) border border-white/20" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleCopy(
                      'linear-gradient(201deg, #9F64A6 0%, #2E64AE 100%)',
                      'css-gradient'
                    )
                  }
                  className="cursor-pointer gap-2 font-mono text-xs"
                >
                  {copiedKey === 'css-gradient' ? (
                    <>
                      <RiCheckLine className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">
                        Skopiowano kod CSS!
                      </span>
                    </>
                  ) : (
                    <>
                      <RiFileCopyLine className="h-3.5 w-3.5" />
                      <span>Kopiuj CSS Gradient</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Color Swatches Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {brandColors.map((color) => {
              const hexCopied = copiedKey === `hex-${color.hex}`;

              return (
                <Card
                  key={color.name}
                  className="border-none bg-muted/50 shadow-sm transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Color Swatch Block */}
                    <div
                      className={`h-32 w-full rounded-t-xl ${color.badgeBg} p-4 flex flex-col justify-between`}
                    >
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded-md backdrop-blur-md bg-black/20 w-fit ${color.textColor}`}
                      >
                        {color.hex}
                      </span>
                    </div>

                    <CardContent className="p-5 space-y-4">
                      <div>
                        <h4 className="font-bold text-lg">{color.name}</h4>
                        <p className="text-xs text-muted-foreground font-medium">
                          {color.role}
                        </p>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {color.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-border/40 font-mono text-xs">
                        <div className="flex justify-between py-0.5">
                          <span className="text-muted-foreground">HEX:</span>
                          <span className="font-semibold">{color.hex}</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-muted-foreground">RGB:</span>
                          <span className="font-semibold">{color.rgb}</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-muted-foreground">CMYK:</span>
                          <span className="font-semibold">{color.cmyk}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  <CardFooter className="p-5 pt-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopy(color.hex, `hex-${color.hex}`)}
                      className="w-full cursor-pointer gap-1.5 font-mono text-xs"
                    >
                      {hexCopied ? (
                        <>
                          <RiCheckLine className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">
                            Skopiowano HEX!
                          </span>
                        </>
                      ) : (
                        <>
                          <RiFileCopyLine className="h-3.5 w-3.5" />
                          <span>Kopiuj HEX ({color.hex})</span>
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiCodeSSlashLine className="mr-2 h-4 w-4" />
              {t('Identity2026.typography.badge', 'Typografia')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Identity2026.typography.title', 'Kroje Pisma & Hierarchia')}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              {t(
                'Identity2026.typography.paragraph',
                'Wybrane kroje pisma odzwierciedlają techniczny, a zarazem przystępny charakter koła programistycznego.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Primary Brand Font: Poppins */}
            <Card className="border-none bg-muted/50 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Font Logotypu
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  Google Fonts
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Poppins</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Krój geometryczny o czystych liniach, wykorzystywany w
                  oficjalnym napisie znaku KNPiMI.
                </p>
              </div>
              <div className="space-y-3 rounded-lg bg-background p-4 border border-border/40">
                <div>
                  <span className="text-xs text-muted-foreground font-mono block">
                    Poppins Bold (700):
                  </span>
                  <span className="text-lg font-bold tracking-tight">
                    Koło Naukowe Programistów
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-mono block">
                    Poppins Medium (500):
                  </span>
                  <span className="text-base font-medium">
                    i Miłośników Informatyki
                  </span>
                </div>
              </div>
            </Card>

            {/* UI & Code Fonts: Inter & JetBrains Mono */}
            <Card className="border-none bg-muted/50 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Interfejs & Kod
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  System & Monospace
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Inter & JetBrains Mono
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Kombinacja bezszeryfowego fontu do treści czytanych oraz
                  monospace dedykowanego fragmentom kodu i parametrom
                  technicznym.
                </p>
              </div>
              <div className="space-y-3 rounded-lg bg-background p-4 border border-border/40">
                <div>
                  <span className="text-xs text-muted-foreground font-mono block">
                    Inter Variable (Body & Headings):
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Nowoczesny, czytelny font zoptymalizowany pod kątem ekranów
                    cyfrowych.
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-mono block">
                    JetBrains Mono (Kod & Terminal):
                  </span>
                  <code className="text-xs font-mono text-blue-500 dark:text-blue-400">
                    knpimi --version 2026.1 --status active
                  </code>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Anatomy and Symbolism Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Card className="border-none bg-muted/50 shadow-sm p-8 md:p-12">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                <RiShapesLine className="mr-2 h-4 w-4" />
                {t('Identity2026.anatomy.badge', 'Anatomia Znaku')}
              </Badge>
            </div>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Identity2026.anatomy.title', 'Symbolika & Konstrukcja')}
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3 rounded-xl bg-background/60 p-5 border border-border/40">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <RiArtboardLine className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-base">Baszta Krakowska</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Zewnętrzny kontur zębatych murów obronnych nawiązuje do
                  heraldyki miasta Krakowa oraz tradycji Politechniki
                  Krakowskiej.
                </p>
              </div>

              <div className="space-y-3 rounded-xl bg-background/60 p-5 border border-border/40">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <RiTerminalBoxLine className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-base">Monitor i Sprzęt</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wewnętrzna ramka z podstawką stanowi sylwetkę monitora
                  komputerowego, odzwierciedlając pracę inżynierską i
                  technologię.
                </p>
              </div>

              <div className="space-y-3 rounded-xl bg-background/60 p-5 border border-border/40">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <RiCodeSSlashLine className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-base">Składnia i Kod `&gt; _`</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nawiasy ostrokątne oraz ukośnik na ekranie symbolizują pisanie
                  kodu, terminal poleceń i zamiłowanie do programowania.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Rules & Guidelines: Do's and Don'ts */}
      <section
        id="zasady"
        className="container mx-auto max-w-6xl px-4 py-12 md:py-20 scroll-mt-20"
      >
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium"
            >
              <RiShieldCheckLine className="mr-2 h-4 w-4" />
              {t('Identity2026.rules.badge', 'Dobre Praktyki')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('Identity2026.rules.title', 'Zasady Stosowania Znaku')}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              {t(
                'Identity2026.rules.paragraph',
                'Aby zachować spójność wizualną marki KNPiMI, prosimy o przestrzeganie poniższych reguł.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Poprawne użycie */}
            <Card className="border-none bg-emerald-950/10 border-l-4 border-l-emerald-500 shadow-sm p-6 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <RiCheckLine className="h-5 w-5" />
                <h3 className="font-bold text-lg">
                  Zalecane Stosowanie (Do's)
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <RiCheckLine className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Stosuj oryginalne pliki wektorowe SVG gwarantujące najwyższą
                    ostrość na dowolnym nośniku.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiCheckLine className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Wybieraj wersję białą (inwersyjną) na ciemnych tłach lub
                    tłach fotograficznych o niskim kontraście.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiCheckLine className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Zachowaj pole ochronne wokół znaku równe co najmniej
                    szerokości pojedynczego zęba korony baszty.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiCheckLine className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Dbaj o minimalną czytelność: nie zmniejszaj sygnetu poniżej
                    24×24 pikseli na ekranie.
                  </span>
                </li>
              </ul>
            </Card>

            {/* Niedozwolone użycie */}
            <Card className="border-none bg-rose-950/10 border-l-4 border-l-rose-500 shadow-sm p-6 space-y-4">
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
                <RiCloseLine className="h-5 w-5" />
                <h3 className="font-bold text-lg">
                  Niedozwolone Modyfikacje (Don'ts)
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <RiCloseLine className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Nie zmieniaj kolorów, składowych ani kąta nachylenia
                    oficjalnego gradientu znaku.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiCloseLine className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Nie deformuj proporcji znaku (niedopuszczalne jest
                    rozciąganie horyzontalne lub wertykalne).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiCloseLine className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Nie dodawaj sztucznych cieni, obrysów, filtrów 3D ani
                    gradientów innego typu.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <RiCloseLine className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Nie umieszczaj ciemnego logotypu na ciemnym tle, ani białego
                    na jasnym tle bez odpowiedniego kontrastu.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Affiliation / PK Reference Banner */}
      <section className="container mx-auto max-w-6xl px-4 pb-20">
        <Card className="border-none bg-muted/40 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <RiInformationLine className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">
                Politechnika Krakowska & Wydział Mechaniczny
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                KNPiMI działa przy Wydziale Mechanicznym Politechniki
                Krakowskiej. W materiałach partnerskich dopuszcza się
                współwystępowanie znaku KNPiMI ze znakami Politechniki
                Krakowskiej.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/svg/PK/PK_WM_CMYK.svg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5 text-xs"
              >
                <RiExternalLinkLine className="h-3.5 w-3.5" />
                <span>Logo WM PK</span>
              </Button>
            </a>
            <a
              href="/svg/PK/PK_POZIOM_CMYK.svg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5 text-xs"
              >
                <RiExternalLinkLine className="h-3.5 w-3.5" />
                <span>Logo PK</span>
              </Button>
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
