import Logo_w_text from '/Logo_KNPiMI_white_with_text.svg';
import LogoPK from '/svg/PK_POZIOM_CMYK.svg';
// import LogoPK_eng from '/svg/PK_POZIOM_CMYK_w.svg';
import LogoPK_w from '/svg/PK_POZIOM_CMYK_w.svg';
// import LogoPK_eng_w from '/PK_POZIOM_INVERT.png';
import LogoWM from '/svg/PK_WM_CMYK.svg';
import LogoWM_w from '/svg/PK_WM_CMYK_w.svg';
// import LogoWM_eng from '/PK_WM.png';
// import LogoWM_eng_w from '/PK_WM.png';

// @ts-expect-error: unrepairable
import { Button } from '@/components/ui/button';
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { useTheme } from './theme-provider.tsx';
import { useScrollAndWidth } from '../lib/useScrollAndWidth.tsx';
import { useTranslation } from 'react-i18next';

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

export default function Footer() {
  const { t } = useTranslation();
  const { isMobile } = useScrollAndWidth(1024);

  const footerLogos: Record<string, string[]> = {
    light: [LogoPK, LogoWM],
    dark: [LogoPK_w, LogoWM_w],
  };
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
        <picture>
          <source srcSet={Logo_w_text} />
          <img
            srcSet={Logo_w_text}
            alt={t('Footer.logo.alt', 'KNPiMI Logo')}
            className="h-24"
          />
        </picture>
        {!isMobile && <div className={'col-span-2'}></div>}
        <Card className="flex flex-col items-center gap-8 py-8 sm:items-start bg-background ">
          <CardHeader>
            <CardTitle>
              <p className="text-foreground">
                {t('Footer.social.title', 'Znajdziesz nas też na')}
              </p>
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

                  <span className="hidden text-[11px] font-light uppercase tracking-[0.2em] transition-transform duration-500 group-hover:translate-x-1 sm:block after:content-[''] relative after:absolute after:border-b-2 after:inset-0 after:scale-x-0 group-hover:after:scale-x-100 after:transition-all after:duration-300 after:ease-in-out after-gradient-border">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.7595064495235!2d19.99434218133859!3d50.07600006690038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165ad2e4488e25%3A0xa4ac37aaae919a61!2sAula%20G18%20Wydzia%C5%82%20Mechaniczny!5e0!3m2!1spl!2spl!4v1787851631322!5m2!1spl!2spl"
            className={'size-full'}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
        <Card className={'bg-background  '}>
          <CardContent>
            {footerLogos[actualTheme].map((logo, i) => (
              <a href={footerURLs[i]} target={'_blank'} key={footerURLs[i]}>
                <img
                  srcSet={logo}
                  alt={''}
                  key={logo}
                  className={'h-21.75 w-[288px] my-1.5'}
                />
              </a>
            ))}
          </CardContent>
        </Card>
      </section>
      <span>
        {t(
          'Footer.copyright',
          '© 2025-2026 Koło Naukowe Programistów i Miłośników Informatyki na\n        Politechnice Krakowskiej'
        )}
      </span>
    </footer>
  );
}
