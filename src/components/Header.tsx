import Logo_text from '/Logo_KNPiMI_with_text.svg';
import Logo_w_text from '/Logo_KNPiMI_white_with_text.svg';
import Logo from '/Logo_KNPiMI.svg';
import Logo_w from '/Logo_KNPiMI_white.svg';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // @ts-expect-error: unrepairable
} from '@/components/ui/navigation-menu';
import { type AnyRoute, Link, useLocation } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen.ts';
import { useScrollAndWidth } from '../lib/useScrollAndWidth.tsx';
import { type Theme, useTheme } from './theme-provider.tsx';
import { RiMoonFill, RiSunFill, RiMenuLine } from '@remixicon/react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

// title: string;
// to: string;
// isVisible?: boolean;
// subItems?: navbarItem[];

function getRouteInfo(route: AnyRoute) {
  const path = route.fullPath || route.path || route.id;
  // Fallback to capitalizing the path if staticData.title is missing
  const title =
    route.options?.staticData?.title ||
    (path === '/' ? 'Home' : path.replace('/', ''));
  return { path, title };
}

export default function Header() {
  const { t } = useTranslation();
  const routes = (routeTree.children || []) as AnyRoute[];

  const ref = useRef(null);

  const { isMobile, isScrolled } = useScrollAndWidth(ref, 'hero-section', 1024);
  const location = useLocation().pathname;
  const isIndex = location === '/';

  // i18next-instrument-ignore-next-line
  const stateString = `${Number(isIndex)}${Number(isMobile)}${Number(isScrolled)}`;

  // i18next-instrument-ignore-next-line
  const locationHighlight = (path: string) => {
    return location === path
      ? 'after:[border-image:var(--primary)_1] bg-(image:--primary) bg-clip-text text-transparent svg_helper'
      : '';
  };

  // Now you can use it in an object lookup or a switch!
  const images: Record<string, string> = {
    '000': Logo_text,
    '010': Logo,
    '001': Logo_text,
    '011': Logo,
    '100': Logo_w_text,
    '110': Logo_w,
    '101': Logo_text,
    '111': Logo,
  };

  const currentLogo = images[stateString];

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

  const { actualTheme, theme, setTheme } = useTheme();

  // i18next-instrument-ignore-next-line
  const themes = ['light', 'dark', 'system'];

  return (
    <header
      className={`z-15 sticky top-0 ${isScrolled || !isIndex ? 'bg-background shadow-lg/10' : 'text-white bg-none'} transition-all ease-in-out shadow-foreground`}
      ref={ref}
    >
      <nav className="flex items-center justify-between p-4 w-11/12 mx-auto ">
        <Link to={'/'}>
          <picture>
            <source srcSet={currentLogo} />
            <img
              srcSet={currentLogo}
              alt={t('Header.logo.alt', 'KNPiMI Logo')}
              className="h-24"
            />
          </picture>
        </Link>

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
                      const { path, title } = getRouteInfo(route);

                      return (
                        <li key={path + title}>
                          <NavigationMenuLink
                            render={
                              <Link to={path}>
                                <span
                                  className={`uppercase ${locationHighlight(path)} `}
                                >
                                  {title}
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
                    <span
                      className={`uppercase ${isScrolled ? 'text-primary' : ''}`}
                      onClick={() =>
                        setTheme(actualTheme === 'light' ? 'dark' : 'light')
                      }
                    >
                      {actualTheme === 'dark' ? <RiMoonFill /> : <RiSunFill />}
                    </span>
                  }
                ></NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              {navRoutes.map((route, i) => {
                const { path, title } = getRouteInfo(route);

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
                    <NavigationMenuItem key={`${path}-${i}`}>
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
                            <span>{title}</span>
                          </Link>
                        }
                      />
                    </NavigationMenuItem>
                  );
                }

                // Dropdown Case: Has children (Capped at 1 step)
                return (
                  <NavigationMenuItem key={`${path}-${i}`}>
                    <Link to={path} className={``}>
                      <NavigationMenuTrigger
                        className={`uppercase ${locationHighlight(path)}`}
                      >
                        <span>{title}</span>
                      </NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      {/* shadcn dropdowns need a container to dictate their width/layout */}
                      <ul className="z-20">
                        {validChildren.map((child: AnyRoute, j: number) => {
                          const childInfo = getRouteInfo(child);

                          return (
                            <li key={`${childInfo.path}-${j}`}>
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
                                      {childInfo.title}
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
                    <span
                      className={`uppercase ${isScrolled ? 'text-primary' : ''}`}
                      onClick={() =>
                        setTheme(actualTheme === 'light' ? 'dark' : 'light')
                      }
                    >
                      {actualTheme === 'dark' ? <RiMoonFill /> : <RiSunFill />}
                    </span>
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
                      <li>
                        <NavigationMenuLink
                          render={
                            <span
                              className={`${theme === (possibleTheme as Theme) ? 'scrolled' : ''}`}
                              onClick={() => setTheme(possibleTheme as Theme)}
                            >
                              {possibleTheme}
                            </span>
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
