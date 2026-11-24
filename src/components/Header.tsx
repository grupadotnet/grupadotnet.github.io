import knpimi from '/svg/KNPIMI/Logo_KNPiMI.svg';
import knpimi_text from '/svg/KNPIMI/Logo_KNPiMI_with_text.svg';

import knpimi_w from '/svg/KNPIMI/Logo_KNPiMI_white.svg';
import knpimi_w_text from '/svg/KNPIMI/Logo_KNPiMI_white_with_text.svg';

import pkSygnet from '/svg/PK/PK_SYGNET_RGB.svg';
import pkSygnet_w from '/svg/PK/PK_SYGNET_RGB_inwersyjny.svg';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { type AnyRoute, Link, useLocation } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen.ts';
import { useScrollAndWidth } from '@/lib/useScrollAndWidth.tsx';
import { RiMoonFill, RiSunFill, RiMenuLine } from '@remixicon/react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useTheme, type Theme } from '@/components/theme-provider.tsx';

// title: string;
// to: string;
// isVisible?: boolean;
// subItems?: navbarItem[];

// State key format: `${isDark}${isIndex}${isMobile}${isScrolled}`
const knpimiLogos: Record<string, string> = {
  '0000': knpimi_text,
  '0010': knpimi,
  '0001': knpimi_text,
  '0011': knpimi,
  '0100': knpimi_w_text,
  '0110': knpimi_w,
  '0101': knpimi_text,
  '0111': knpimi,
  '1000': knpimi_w_text,
  '1010': knpimi_w,
  '1001': knpimi_w_text,
  '1011': knpimi_w,
  '1100': knpimi_w_text,
  '1110': knpimi_w,
  '1101': knpimi_w_text,
  '1111': knpimi_w,
};

const pkLogos: Record<string, string> = {
  '0000': pkSygnet,
  '0010': pkSygnet,
  '0001': pkSygnet,
  '0011': pkSygnet,
  '0100': pkSygnet_w,
  '0110': pkSygnet_w,
  '0101': pkSygnet,
  '0111': pkSygnet,
  '1000': pkSygnet_w,
  '1010': pkSygnet_w,
  '1001': pkSygnet_w,
  '1011': pkSygnet_w,
  '1100': pkSygnet_w,
  '1110': pkSygnet_w,
  '1101': pkSygnet_w,
  '1111': pkSygnet_w,
};

// i18next-instrument-ignore-next-line
const themes: Theme[] = ['light', 'dark', 'system'];

function getRouteInfo(route: AnyRoute) {
  const path = route.fullPath || route.path || route.id;
  // Fallback to capitalizing the path if staticData.title is missing
  const title =
    route.options?.staticData?.titleData.translation ||
    (path === '/' ? 'Home' : path.replace('/', ''));
  const titleKey = route.options?.staticData?.titleData.key;
  return { path, title, titleKey };
}

export default function Header() {
  const { t } = useTranslation();
  const routes = (routeTree.children || []) as AnyRoute[];
  const { actualTheme, theme, setTheme } = useTheme();

  const ref = useRef(null);

  const { isMobile, isScrolled } = useScrollAndWidth(ref, 'hero-section', 1024);
  const location = useLocation().pathname;
  const isIndex = location === '/';

  // i18next-instrument-ignore-next-line
  const stateString = `${actualTheme === 'light' ? '0' : '1'}${Number(isIndex)}${Number(isMobile)}${Number(isScrolled)}`;

  // i18next-instrument-ignore-next-line
  const locationHighlight = (path: string) => {
    return location === path
      ? 'after:[border-image:var(--primary-gradient)_1] bg-(image:--primary-gradient) bg-clip-text text-transparent svg_helper'
      : '';
  };

  const currentLogo = knpimiLogos[stateString] ?? knpimi_text;
  const currentPkSygnet = pkLogos[stateString] ?? pkSygnet;

  // 1. Filter top-level routes
  const navRoutes = routes
    .filter((route) => {
      const isDynamic = route.path?.includes('$');
      const isHidden = route.options?.staticData?.hideInNav;
      return !isDynamic && !isHidden;
    })
    .sort(
      (a, b) => a.options?.staticData?.order - b.options?.staticData?.order
    );

  return (
    <header
      className={`z-15 sticky top-0 ${isScrolled || !isIndex ? 'bg-background text-foreground shadow-lg/10' : 'text-white bg-none'} transition-all ease-in-out shadow-foreground`}
      ref={ref}
    >
      <nav className="flex items-center justify-between p-4 w-11/12 mx-auto ">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <a
            href="https://www.pk.edu.pl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('Header.pkLogoAlt', 'Politechnika Krakowska')}
            className="shrink-0"
          >
            <img
              src={currentPkSygnet}
              alt={t('Header.pkLogoAlt', 'Politechnika Krakowska')}
              className="h-24 w-auto"
            />
          </a>
          <Link to={'/'} className="shrink-0">
            <picture>
              <source srcSet={currentLogo} />
              <img
                srcSet={currentLogo}
                src={currentLogo}
                alt={t('Header.logoAlt', 'KNPiMI Logo')}
                className="h-24 w-auto"
              />
            </picture>
          </Link>
        </div>

        {isMobile ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <RiMenuLine />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul>
                    {navRoutes.map((route) => {
                      const { path, title, titleKey } = getRouteInfo(route);

                      return (
                        <li key={path}>
                          <NavigationMenuLink
                            render={
                              <Link to={path}>
                                <span
                                  className={`uppercase ${locationHighlight(path)} `}
                                >
                                  {t(titleKey, title) as string}
                                </span>{' '}
                              </Link>
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={'mr-0 after:content-none cursor-pointer'}
                  render={
                    <button
                      type="button"
                      className={`uppercase ${isScrolled || !isIndex ? 'text-primary' : ''}`}
                      onClick={() =>
                        setTheme(actualTheme === 'light' ? 'dark' : 'light')
                      }
                      aria-label={t('Header.theme', 'THEME')}
                    >
                      {actualTheme === 'dark' ? <RiMoonFill /> : <RiSunFill />}
                    </button>
                  }
                ></NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              {navRoutes.map((route) => {
                const { path, title, titleKey } = getRouteInfo(route);

                // 2. Extract and filter children (capped at 1 step deep)
                const validChildren = (route.children || []).filter(
                  (child: AnyRoute) => {
                    const childDynamic = child.path?.includes('$');
                    const childHidden = child.options?.staticData?.hideInNav;
                    return !childDynamic && !childHidden;
                  }
                );

                // Base Case: No valid child routes (Standard Link)
                if (validChildren.length === 0) {
                  return (
                    <NavigationMenuItem key={`${path}`}>
                      <NavigationMenuLink
                        className={`uppercase ${locationHighlight(path)}`}
                        render={
                          <Link
                            to={path}
                            className={''}
                            activeProps={{
                              className: '',
                            }}
                          >
                            {t(titleKey, title) as string}
                          </Link>
                        }
                      />
                    </NavigationMenuItem>
                  );
                }

                // Dropdown Case: Has children (Capped at 1 step)
                return (
                  <NavigationMenuItem key={`${path}`}>
                    <Link to={path} className={``}>
                      <NavigationMenuTrigger
                        className={`uppercase ${locationHighlight(path)}`}
                      >
                        <span>{t(titleKey, title) as string}</span>
                      </NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      {/* shadcn dropdowns need a container to dictate their width/layout */}
                      <ul className="z-20">
                        {validChildren.map((child: AnyRoute) => {
                          const childInfo = getRouteInfo(child);

                          return (
                            <li key={`${childInfo.path}`}>
                              <NavigationMenuLink
                                render={
                                  <Link
                                    to={childInfo.path}
                                    className={''}
                                    activeProps={{
                                      className: '',
                                    }}
                                  >
                                    <span
                                      className={`${locationHighlight(childInfo.path)} `}
                                    >
                                      {
                                        t(
                                          childInfo.titleKey,
                                          childInfo.title
                                        ) as string
                                      }
                                    </span>
                                  </Link>
                                }
                              ></NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={'mr-0 after:content-none cursor-pointer'}
                  render={
                    <button
                      type="button"
                      className={`uppercase ${isScrolled || !isIndex ? 'text-primary' : ''}`}
                      onClick={() =>
                        setTheme(actualTheme === 'light' ? 'dark' : 'light')
                      }
                      aria-label={t('Header.theme', 'THEME')}
                    >
                      {actualTheme === 'dark' ? <RiMoonFill /> : <RiSunFill />}
                    </button>
                  }
                ></NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`ml-2 uppercase`}>
                  <span>{t('Header.theme', 'THEME')}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul>
                    {themes.map((possibleTheme) => (
                      <li key={possibleTheme}>
                        <NavigationMenuLink
                          render={
                            <button
                              type="button"
                              className={`cursor-pointer ${
                                theme === possibleTheme
                                  ? 'after:[border-image:var(--primary-gradient)_1] bg-(image:--primary-gradient) bg-clip-text text-transparent'
                                  : ''
                              }`}
                              onClick={() => setTheme(possibleTheme)}
                            >
                              {t(`Header.${possibleTheme}`)}
                            </button>
                          }
                        ></NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </nav>
    </header>
  );
}
