import LogoBotland from '/logo_botland_kn.png';
import LogoBotlandW from '/white-logo-botland.png';
import LogoPK from '/svg/PK_POZIOM_CMYK.svg';
// import LogoPK_eng from '/svg/PK_POZIOM_CMYK_w.svg';
import LogoPK_w from '/svg/PK_POZIOM_CMYK_w.svg';
// import LogoPK_eng_w from '/PK_POZIOM_INVERT.png';
import LogoWM from '/svg/PK_WM_CMYK.svg';
import LogoWM_w from '/svg/PK_WM_CMYK_w.svg';
// import LogoWM_eng from '/PK_WM.png';
// import LogoWM_eng_w from '/PK_WM.png';

import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { useScrollAndWidth } from '@/lib/useScrollAndWidth.tsx';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useTheme } from '@/components/theme-provider.tsx';

interface Social {
  href: string;
  icon: React.ElementType;
  name: string;
}

const socials: Social[] = [
  {
    href: 'https://facebook.com',
    icon: RiFacebookCircleLine,
    name: 'Facebook',
  },
  {
    href: 'https://instagram.com',
    icon: RiInstagramLine,
    name: 'Instagram',
  },
  {
    href: 'https://twitter.com',
    icon: RiTwitterXLine,
    name: 'Twitter',
  },
  {
    href: 'https://youtube.com',
    icon: RiYoutubeLine,
    name: 'YouTube',
  },
];

// Moved to module scope so it's created once and reused across renders
const footerLogos: Record<string, string[]> = {
  light: [LogoPK, LogoWM, LogoBotland],
  dark: [LogoPK_w, LogoWM_w, LogoBotlandW],
};

export default function Footer() {
  const { t } = useTranslation();
  const { isMobile } = useScrollAndWidth(useRef(null), '', 1024);

  const footerURLs: string[] = [
    'https://www.pk.edu.pl',
    'https://mech.pk.edu.pl/',
  ];

  const { actualTheme } = useTheme();

  return (
    <footer className={' w-11/12 m-auto text-center *:my-20 text-white'}>
      <section
        className={
          'grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 grid-rows-4  justify-items-center content-center'
        }
      >
        <div className={'md:col-span-3'}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.7595064495235!2d19.99434218133859!3d50.07600006690038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165ad2e4488e25%3A0xa4ac37aaae919a61!2sAula%20G18%20Wydzia%C5%82%20Mechaniczny!5e0!3m2!1spl!2spl!4v1787851631322!5m2!1spl!2spl"
            allowFullScreen={false}
            title="Map showing Aula G18 Wydzia Mechaniczny at the University of Kraków"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
        <Card
          className={`flex flex-col items-center gap-8 py-8 sm:items-start bg-background ${!isMobile ? 'col-span-2' : ''}`}
        >
          <CardHeader>
            <CardTitle className={'justify-items-start'}>
              <span className="text-foreground">
                {t('Footer.social.title', 'Znajdziesz nas też na')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-10 sm:justify-start sm:gap-14">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
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
            {footerLogos[actualTheme].map((logo, i) => (
              <a
                href={footerURLs[i]}
                target="_blank"
                key={footerURLs[i]}
                rel="noreferrer"
              >
                <img
                  srcSet={logo}
                  src={logo}
                  alt=""
                  key={logo}
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
