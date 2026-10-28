import LogoBotland from '/logo_botland_kn.png';
import LogoBotlandW from '/white-logo-botland.png';
import LogoPK from '/svg/PK/PK_POZIOM_CMYK.svg';
import LogoPK_w from '/svg/PK/PK_POZIOM_CMYK_w.svg';
import LogoWM from '/svg/PK/PK_WM_CMYK.svg';
import LogoWM_w from '/svg/PK/PK_WM_CMYK_w.svg';

import {
  RiDiscordFill,
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
  RiMailSendLine,
  RiMastodonLine,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { useScrollAndWidth } from '@/lib/useScrollAndWidth.tsx';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme-provider.tsx';
import { Map, Marker, NavigationControl, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

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
  rel?: string;
}

const socials: Social[] = [
  {
    href: 'mailto:knpimi@pk.edu.pl',
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
    rel: 'me noreferrer',
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
  url: string;
  logos: {
    light: string;
    dark: string;
  };
};

const footerPartners: Partner[] = [
  {
    url: 'https://www.pk.edu.pl',
    logos: { light: LogoPK, dark: LogoPK_w },
  },
  {
    url: 'https://mech.pk.edu.pl/',
    logos: { light: LogoWM, dark: LogoWM_w },
  },
  {
    url: 'https://botland.com.pl/',
    logos: { light: LogoBotland, dark: LogoBotlandW },
  },
];

export default function Footer() {
  const { actualTheme } = useTheme();

  const { t } = useTranslation();
  const { isMobile } = useScrollAndWidth(useRef(null), '', 1024);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);

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
      style: actualTheme === 'dark' ? darkStyle : lightStyle,
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
          '_blank'
        );
      }
      // 2. Android Detection -> OS App Chooser (Google Maps, Waze, etc.)
      else if (/android/i.test(userAgent)) {
        window.open(
          `geo:${lat},${lng}?q=${lat},${lng}(Politechnika+Krakowska)`,
          '_blank'
        );
      }
      // 3. Fallback (Desktop/Other) -> Google Maps Web
      else {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
          '_blank'
        );
      }
    };

    const markerEl = marker.getElement();
    markerEl.addEventListener('click', handleMarkerClick);

    return () => {
      markerEl.removeEventListener('click', handleMarkerClick);
    };
  });

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const newStyle = actualTheme === 'dark' ? darkStyle : lightStyle;
    const updateStyle = () => {
      map.setStyle(newStyle);
    };

    if (map.isStyleLoaded()) {
      updateStyle();
    } else {
      map.once('load', updateStyle);
    }
  }, [actualTheme]);

  return (
    <footer className={' w-11/12 m-auto text-center *:my-20 text-white'}>
      <section
        className={
          'grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 grid-rows-4  justify-items-center content-center gap-5'
        }
      >
        <div className="md:col-span-3 relative h-full md:w-1/2 w-full">
          <div
            ref={mapContainerRef}
            className="absolute size-full inset-0 rounded-xl"
          />
        </div>
        <Card
          className={`flex flex-col items-center gap-8 py-8 sm:items-start bg-background ${!isMobile ? 'col-span-2' : ''} min-w-2/5`}
        >
          <CardHeader>
            <CardTitle className="text-left w-full">
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
                  rel={social.rel ?? 'noreferrer'}
                  className="group flex items-center gap-4 text-foreground transition-colors duration-500"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 stroke-[1.5] " />

                  <span className="hidden text-[11px] font-light uppercase tracking-[0.2em] transition-transform duration-500 group-hover:translate-x-1 sm:block after:content-[''] relative after:absolute after:border-b-2 after:inset-0 after:scale-x-[0.01] after:opacity-0 group-hover:after:scale-x-100 group-hover:after:opacity-100 after:transition-all after:duration-300 after:ease-in-out after-gradient-border">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className={'bg-background  '}>
          <CardContent>
            {footerPartners.map(({ logos, url }) => (
              <a href={url} target="_blank" key={url} rel="noreferrer">
                <img
                  srcSet={logos[actualTheme]}
                  src={logos[actualTheme]}
                  alt=""
                  key={logos[actualTheme]}
                  className={'h-15 my-1.5'}
                />
              </a>
            ))}
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
