import LogoBotland from '/logo_botland_kn.png';
import LogoBotlandW from '/white-logo-botland.png';
import LogoPK from '/svg/PK/PK_POZIOM_CMYK.svg';
import LogoPK_w from '/svg/PK/PK_POZIOM_CMYK_w.svg';
import LogoWM from '/svg/PK/PK_WM_CMYK.svg';
import LogoWM_w from '/svg/PK/PK_WM_CMYK_w.svg';

import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiDiscordFill,
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
  RiMailSendLine,
  RiMastodonLine,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
//import { useScrollAndWidth } from '@/lib/useScrollAndWidth.tsx';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/theme-provider.tsx';
import { Map, Marker, NavigationControl, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel.tsx';

setWorkerUrl(workerUrl);

function MatrixIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 3H4v18h3" />
      <path d="M17 3h3v18h-3" />
      <path d="M8 15V9l4 4 4-4v6" />
    </svg>
  );
}

interface Social {
  href: string;
  icon: React.ElementType;
  name: string;
  me?: boolean;
}

const socials: Social[] = [
  {
    href: 'mailto:dot.net.group.pk@gmail.com',
    icon: RiMailSendLine,
    name: 'E-mail',
  },
  {
    href: 'https://discord.gg/XQwaABveDb',
    icon: RiDiscordFill,
    name: 'Discord',
  },
  {
    href: 'https://www.facebook.com/grupa.pk.net',
    icon: RiFacebookBoxLine,
    name: 'Facebook',
  },
  {
    href: 'https://matrix.to/#/@knpimi:matrix.org',
    icon: MatrixIcon,
    name: 'Matrix',
  },
  {
    href: 'https://mastodon.social/@knpimi',
    icon: RiMastodonLine,
    name: 'Mastodon',
    me: true,
  },
  {
    href: 'https://www.linkedin.com/company/knpimi-politechnika-krakowska',
    icon: RiLinkedinBoxLine,
    name: 'LinkedIn',
  },
];

const lightStyle =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const darkStyle =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const coords = [50.076039972227136, 19.99445118155016].toReversed() as [
  number,
  number,
];

// Moved to module scope so it's created once and reused across renders
type Partner = {
  name: string;
  url: string;
  logos: {
    light: string;
    dark: string;
  };
};

const footerPartners: Partner[] = [
  {
    name: 'Politechnika Krakowska',
    url: 'https://www.pk.edu.pl',
    logos: { light: LogoPK, dark: LogoPK_w },
  },
  {
    name: 'Wydział Mechaniczny PK',
    url: 'https://mech.pk.edu.pl/',
    logos: { light: LogoWM, dark: LogoWM_w },
  },
  {
    name: 'Botland',
    url: 'https://botland.com.pl/',
    logos: { light: LogoBotland, dark: LogoBotlandW },
  },
];

function PartnerCarouselControls({ isPaused }: { isPaused: boolean }) {
  const { api, scrollPrev, scrollNext } = useCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayTick, setAutoplayTick] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    const onPointerDown = () => setIsDragging(true);
    const onSettle = () => setIsDragging(false);

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    api.on('pointerDown', onPointerDown);
    api.on('pointerUp', onSettle);
    api.on('settle', onSettle);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
      api.off('pointerDown', onPointerDown);
      api.off('pointerUp', onSettle);
      api.off('settle', onSettle);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isPaused || isDragging) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timerId = setTimeout(() => {
      api.scrollNext();
    }, 3500);

    return () => {
      clearTimeout(timerId);
    };
  }, [api, currentSlide, autoplayTick, isPaused, isDragging]);

  const handlePrev = () => {
    scrollPrev();
    setAutoplayTick((tick) => tick + 1);
  };

  const handleNext = () => {
    scrollNext();
    setAutoplayTick((tick) => tick + 1);
  };

  return (
    <div className="mt-2 flex items-center justify-center gap-0.5 md:mt-3 md:gap-1.5">
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous slide"
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring md:h-7 md:w-7"
      >
        <RiArrowLeftSLine className="h-5 w-5 md:h-4 md:w-4" />
      </button>

      <div className="flex items-center justify-center">
        {footerPartners.map(({ name }, index) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              api?.scrollTo(index);
              setAutoplayTick((tick) => tick + 1);
            }}
            aria-label={`Go to slide ${index + 1}: ${name}`}
            aria-current={currentSlide === index ? 'true' : undefined}
            className="group flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full px-1 focus-visible:outline-2 focus-visible:outline-ring md:min-h-6 md:min-w-6"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-muted-foreground/55 group-hover:bg-muted-foreground/85'
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring md:h-7 md:w-7"
      >
        <RiArrowRightSLine className="h-5 w-5 md:h-4 md:w-4" />
      </button>
    </div>
  );
}

function PartnerCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Carousel
      opts={{ loop: true, align: 'center' }}
      className="w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <CarouselContent>
        {footerPartners.map(({ logos, url, name }) => (
          <CarouselItem key={url} className="flex items-center justify-center">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="flex h-24 w-full max-w-80 items-center justify-center rounded-lg px-2 py-2 transition-opacity duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-28"
            >
              <div className="relative flex size-full items-center justify-center">
                <img
                  src={logos.light}
                  alt={name}
                  draggable={false}
                  className="max-h-full max-w-full h-auto w-auto object-contain opacity-100 transition-opacity duration-(--theme-transition-duration) ease-(--theme-transition-easing) dark:opacity-0"
                />
                <img
                  src={logos.dark}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute inset-0 m-auto max-h-full max-w-full h-auto w-auto object-contain opacity-0 transition-opacity duration-(--theme-transition-duration) ease-(--theme-transition-easing) dark:opacity-100"
                />
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <PartnerCarouselControls isPaused={isPaused} />
    </Carousel>
  );
}

export default function Footer() {
  const { actualTheme } = useTheme();

  const { t } = useTranslation();
  // const { isMobile } = useScrollAndWidth(useRef(null), '', 1024);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const initialThemeRef = useRef(actualTheme);
  const appliedMapThemeRef = useRef(actualTheme);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if container has valid size (width > 0 && height > 0)
    const rect = mapContainerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn(
        'Map container has no dimensions. WebGL context might be lost.'
      );
      return;
    }

    const map = new Map({
      container: mapContainerRef.current,
      style: initialThemeRef.current === 'dark' ? darkStyle : lightStyle,
      center: coords,
      zoom: 12,
    });
    mapInstanceRef.current = map;

    map.addControl(new NavigationControl(), 'top-right');
    const marker = new Marker().setLngLat(coords).addTo(map);

    marker.getElement().style.cursor = 'pointer';

    const handleMarkerClick = () => {
      const win = window as Window & {
        opera?: string;
        MSStream?: unknown;
      };

      // coords[1] is Lat, coords[0] is Lng because of your .toReversed() array
      const lat = coords[1];
      const lng = coords[0];
      const userAgent =
        navigator.userAgent || navigator.vendor || win.opera || '';

      // 1. iOS Detection -> Apple Maps
      if (/iPad|iPhone|iPod/.test(userAgent) && !win.MSStream) {
        window.open(
          `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`,
          '_blank',
          'noopener,noreferrer'
        );
      }
      // 2. Android Detection -> OS App Chooser (Google Maps, Waze, etc.)
      else if (/android/i.test(userAgent)) {
        window.open(
          `geo:${lat},${lng}?q=${lat},${lng}(Politechnika+Krakowska)`,
          '_blank',
          'noopener,noreferrer'
        );
      }
      // 3. Fallback (Desktop/Other) -> Google Maps Web
      else {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
          '_blank',
          'noopener,noreferrer'
        );
      }
    };

    const markerEl = marker.getElement();
    markerEl.addEventListener('click', handleMarkerClick);

    return () => {
      markerEl.removeEventListener('click', handleMarkerClick);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || appliedMapThemeRef.current === actualTheme) return;

    appliedMapThemeRef.current = actualTheme;
    const newStyle = actualTheme === 'dark' ? darkStyle : lightStyle;
    const updateStyle = () => {
      map.setStyle(newStyle);
    };

    if (map.isStyleLoaded()) {
      updateStyle();
    } else {
      map.once('load', updateStyle);
      return () => {
        map.off('load', updateStyle);
      };
    }
  }, [actualTheme]);

  return (
    <footer
      className={' md:w-10/12 w-9/11 m-auto text-center *:my-20 text-white'}
    >
      <section
        className={
          'grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-3 justify-items-stretch content-stretch gap-5'
        }
      >
        <Card
          className={`flex flex-col items-center gap-8 py-8 sm:items-start bg-background w-full min-w-fit`}
        >
          <CardHeader>
            <CardTitle>
              <span className="text-foreground">
                {t('Footer.socialTitle', 'Znajdziesz nas też na')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <div className="grid grid-cols-3 justify-items-center gap-x-10 gap-y-6 sm:grid-cols-2 sm:justify-items-start lg:grid-cols-3 lg:gap-x-14 lg:gap-y-8">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel={social.me ? 'me noreferrer' : 'noreferrer'}
                  className="group flex items-center gap-4 text-foreground transition-colors duration-500"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 stroke-[1.5] " />

                  <span className="hidden text-[11px] font-light uppercase tracking-[0.2em] transition-transform duration-500 group-hover:translate-x-1 sm:block after:content-[''] relative after:absolute after:border-b-2 after:inset-0 after:scale-x-[0.01] after:opacity-0 group-hover:after:scale-x-100 group-hover:after:opacity-100 after:transition-[scale,opacity] after:duration-300 after:ease-in-out after-gradient-border">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className=" relative min-w-fit">
          <div
            ref={mapContainerRef}
            className="absolute size-full inset-0 rounded-xl"
          />
        </div>
        <Card className="bg-background w-full min-w-0 justify-center">
          <CardContent className="flex w-full flex-col items-center justify-center px-4 sm:px-6">
            <PartnerCarousel />
          </CardContent>
        </Card>
      </section>
      <span>
        {t(
          'Footer.copyright',
          '© 2025-2026 Koło Naukowe Programistów i Miłośników Informatyki na Politechnice Krakowskiej'
        )}
      </span>
    </footer>
  );
}
