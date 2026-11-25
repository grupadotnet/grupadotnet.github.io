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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { type AnyRoute, Link, useLocation } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen.ts';
import { useScrollAndWidth } from '@/lib/useScrollAndWidth.tsx';
import {
  RiArrowDownSLine,
  RiCloseLine,
  RiComputerLine,
  RiMenuLine,
  RiMoonFill,
  RiMoonLine,
  RiSunFill,
  RiSunLine,
} from '@remixicon/react';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { useTheme, type Theme } from '@/components/theme-provider.tsx';
import { cn } from '@/lib/utils';
import { sectionColorsByPath, type SectionPath } from '@/lib/sections';

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

const HERO_HEADER_GRADIENT =
  'linear-gradient(to bottom, rgb(0 0 0 / 0.45) 0%, rgb(0 0 0 / 0.3) 45%, rgb(0 0 0 / 0.14) 72%, rgb(0 0 0 / 0.04) 88%, transparent 100%)';

const themeIcons: Record<Theme, typeof RiSunLine> = {
  light: RiSunLine,
  dark: RiMoonLine,
  system: RiComputerLine,
};

interface MobileNavProps {
  navRoutes: AnyRoute[];
  location: string;
  actualTheme: 'light' | 'dark';
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isSolidHeader: boolean;
  quickThemeLabel: string;
}

function MobileNav({
  navRoutes,
  location,
  actualTheme,
  theme,
  setTheme,
  isSolidHeader,
  quickThemeLabel,
}: MobileNavProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setExpandedGroups({});
    }
  };

  const closeDrawer = () => handleOpenChange(false);

  const headerButtonClass = cn(
    'inline-flex size-11 cursor-pointer items-center justify-center rounded-xl transition-colors focus-visible:ring-[3px] focus-visible:outline-none',
    isSolidHeader
      ? 'text-foreground hover:bg-muted active:bg-muted/80 focus-visible:ring-ring'
      : 'text-white hover:bg-white/15 active:bg-white/20 focus-visible:ring-white/90'
  );

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        className={headerButtonClass}
        onClick={() => setTheme(actualTheme === 'light' ? 'dark' : 'light')}
        aria-label={quickThemeLabel}
      >
        {actualTheme === 'dark' ? (
          <RiMoonFill aria-hidden="true" className="size-5" />
        ) : (
          <RiSunFill aria-hidden="true" className="size-5" />
        )}
      </button>

      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
        swipeDirection="right"
      >
        <DrawerTrigger
          type="button"
          aria-label={t('Header.openMenu', 'Otwórz menu nawigacji')}
          className={headerButtonClass}
        >
          <RiMenuLine aria-hidden="true" className="size-6" />
        </DrawerTrigger>

        <DrawerPopup side="right">
          <div
            aria-hidden="true"
            className="h-0.5 w-full shrink-0 bg-(image:--primary-gradient)"
          />

          <DrawerHeader className="flex items-center justify-between gap-3 border-b border-border/60 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                onClick={closeDrawer}
                aria-label={t('Header.homeLink', 'Strona główna KNPiMI')}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-muted/70"
              >
                <img
                  src={actualTheme === 'dark' ? knpimi_w : knpimi}
                  alt=""
                  className="h-9 w-auto"
                />
              </Link>
              <DrawerTitle>{t('Header.menuTitle', 'Nawigacja')}</DrawerTitle>
              <DrawerDescription className="sr-only">
                {t(
                  'Header.menuDescription',
                  'Menu nawigacji oraz wybór motywu strony'
                )}
              </DrawerDescription>
            </div>

            <DrawerClose
              type="button"
              aria-label={t('Header.closeMenu', 'Zamknij menu nawigacji')}
              className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-none"
            >
              <RiCloseLine aria-hidden="true" className="size-6" />
            </DrawerClose>
          </DrawerHeader>

          <DrawerContent className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            <nav aria-label={t('Header.mobileNav', 'Menu główne')}>
              <ul className="flex flex-col gap-1.5">
                {navRoutes.map((route) => {
                  const { path, title, titleKey } = getRouteInfo(route);
                  const validChildren = getValidChildren(route);
                  const label = t(titleKey, title) as string;
                  const isExactActive = location === path;

                  if (validChildren.length === 0) {
                    return (
                      <li key={path}>
                        <Link
                          to={path}
                          onClick={closeDrawer}
                          aria-current={isExactActive ? 'page' : undefined}
                          className={cn(
                            'flex min-h-12 items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium transition-colors',
                            isExactActive
                              ? 'bg-muted/75'
                              : 'text-foreground hover:bg-muted/60 active:bg-muted'
                          )}
                        >
                          <span
                            className={cn(
                              'uppercase tracking-wide',
                              isExactActive &&
                                'bg-(image:--primary-text-gradient) bg-clip-text font-semibold text-transparent'
                            )}
                          >
                            {label}
                          </span>
                          {isExactActive && (
                            <span
                              aria-hidden="true"
                              className="size-2 shrink-0 rounded-full bg-(image:--primary-gradient)"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  }

                  const hasActiveChild = validChildren.some(
                    (child) => getRouteInfo(child).path === location
                  );
                  const isExpanded =
                    expandedGroups[path] ?? (isExactActive || hasActiveChild);
                  const submenuId = `mobile-submenu-${path.replace(/[^a-z0-9]+/gi, '-')}`;

                  return (
                    <li key={path}>
                      <div
                        className={cn(
                          'flex items-center rounded-xl transition-colors',
                          isExactActive
                            ? 'bg-muted/75'
                            : hasActiveChild
                              ? 'bg-muted/45'
                              : 'hover:bg-muted/60'
                        )}
                      >
                        <Link
                          to={path}
                          onClick={closeDrawer}
                          aria-current={isExactActive ? 'page' : undefined}
                          className="flex min-h-12 flex-1 items-center gap-2 rounded-l-xl px-4 py-2.5 text-base font-medium"
                        >
                          <span
                            className={cn(
                              'uppercase tracking-wide',
                              isExactActive
                                ? 'bg-(image:--primary-text-gradient) bg-clip-text font-semibold text-transparent'
                                : hasActiveChild && 'font-semibold'
                            )}
                          >
                            {label}
                          </span>
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedGroups((prev) => ({
                              ...prev,
                              [path]: !isExpanded,
                            }))
                          }
                          aria-expanded={isExpanded}
                          aria-controls={submenuId}
                          aria-label={
                            isExpanded
                              ? t(
                                  'Header.collapseSubmenu',
                                  'Zwiń podmenu {{title}}',
                                  { title: label }
                                )
                              : t(
                                  'Header.expandSubmenu',
                                  'Rozwiń podmenu {{title}}',
                                  { title: label }
                                )
                          }
                          className="inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-r-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <RiArrowDownSLine
                            aria-hidden="true"
                            className={cn(
                              'size-5 transition-transform duration-200 motion-reduce:transition-none',
                              isExpanded && 'rotate-180'
                            )}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <ul
                          id={submenuId}
                          className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-border/70 pl-3"
                        >
                          {validChildren.map((child: AnyRoute) => {
                            const childInfo = getRouteInfo(child);
                            const isChildActive = location === childInfo.path;
                            const sectionDot = childInfo.path.startsWith(
                              '/sections/'
                            )
                              ? sectionColorsByPath[
                                  childInfo.path.slice(
                                    '/sections/'.length
                                  ) as SectionPath
                                ]?.dot
                              : undefined;

                            return (
                              <li key={childInfo.path}>
                                <Link
                                  to={childInfo.path}
                                  onClick={closeDrawer}
                                  aria-current={
                                    isChildActive ? 'page' : undefined
                                  }
                                  className={cn(
                                    'flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    isChildActive
                                      ? 'bg-muted/75'
                                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground active:bg-muted'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      'size-2 shrink-0 rounded-full',
                                      sectionDot ??
                                        (isChildActive
                                          ? 'bg-(image:--primary-gradient)'
                                          : 'bg-muted-foreground/45')
                                    )}
                                  />
                                  <span
                                    className={cn(
                                      isChildActive &&
                                        'bg-(image:--primary-text-gradient) bg-clip-text font-semibold text-transparent'
                                    )}
                                  >
                                    {
                                      t(
                                        childInfo.titleKey,
                                        childInfo.title
                                      ) as string
                                    }
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </DrawerContent>

          <DrawerFooter className="border-t border-border/60 bg-muted/25 px-4 pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <p
              id="mobile-theme-label"
              className="mb-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
            >
              {t('Header.theme', 'MOTYW')}
            </p>
            <div
              role="group"
              aria-labelledby="mobile-theme-label"
              className="grid grid-cols-3 gap-1.5 rounded-xl bg-muted/70 p-1"
            >
              {themes.map((possibleTheme) => {
                const isSelected = theme === possibleTheme;
                const ThemeIcon = themeIcons[possibleTheme];

                return (
                  <button
                    key={possibleTheme}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setTheme(possibleTheme)}
                    className={cn(
                      'flex min-h-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors',
                      isSelected
                        ? 'bg-background font-semibold text-foreground shadow-sm ring-1 ring-border'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <ThemeIcon aria-hidden="true" className="size-4" />
                    <span>{t(`Header.${possibleTheme}`)}</span>
                  </button>
                );
              })}
            </div>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    </div>
  );
}

function getValidChildren(route: AnyRoute): AnyRoute[] {
  return (route.children || []).filter((child: AnyRoute) => {
    const childDynamic = child.path?.includes('$');
    const childHidden = child.options?.staticData?.hideInNav;
    return !childDynamic && !childHidden;
  });
}

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
      ? 'after:[border-image:var(--primary-gradient)_1] bg-(image:--primary-text-gradient) bg-clip-text text-transparent svg_helper'
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

  const quickThemeLabel =
    actualTheme === 'dark'
      ? t('Header.switchToLight', 'Przełącz na motyw jasny')
      : t('Header.switchToDark', 'Przełącz na motyw ciemny');

  const isSolidHeader = isScrolled || !isIndex;

  return (
    <header
      className={cn(
        'sticky top-0 z-15 transition-all duration-300 ease-in-out motion-reduce:transition-none',
        isSolidHeader
          ? 'bg-background text-foreground shadow-lg/10 shadow-foreground'
          : 'text-white'
      )}
      ref={ref}
    >
      <div
        aria-hidden="true"
        style={{ backgroundImage: HERO_HEADER_GRADIENT }}
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -bottom-10 z-0 transition-opacity duration-300 ease-in-out motion-reduce:transition-none',
          isSolidHeader ? 'opacity-0' : 'opacity-100'
        )}
      />
      <nav className="relative z-10 mx-auto flex w-11/12 items-center justify-between p-4">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <a
            href="https://www.pk.edu.pl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('Header.pkLogoAlt', 'Politechnika Krakowska')} (${t('Common.opensInNewTab', 'otwiera się w nowej karcie')})`}
            className="shrink-0"
          >
            <img src={currentPkSygnet} alt="" className="h-24 w-auto" />
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
          <MobileNav
            navRoutes={navRoutes}
            location={location}
            actualTheme={actualTheme}
            theme={theme}
            setTheme={setTheme}
            isSolidHeader={isSolidHeader}
            quickThemeLabel={quickThemeLabel}
          />
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              {navRoutes.map((route) => {
                const { path, title, titleKey } = getRouteInfo(route);

                // 2. Extract and filter children (capped at 1 step deep)
                const validChildren = getValidChildren(route);

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
                    <NavigationMenuTrigger
                      className={`uppercase ${locationHighlight(path)}`}
                    >
                      <span>{t(titleKey, title) as string}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {/* shadcn dropdowns need a container to dictate their width/layout */}
                      <ul className="z-20">
                        <li className="mb-1 border-b border-border/50 pb-1">
                          <NavigationMenuLink
                            render={
                              <Link to={path}>
                                <span
                                  className={`font-semibold ${locationHighlight(path)}`}
                                >
                                  {t(titleKey, title) as string}
                                </span>
                              </Link>
                            }
                          />
                        </li>
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
                      className={`uppercase ${isSolidHeader ? 'text-primary' : ''}`}
                      onClick={() =>
                        setTheme(actualTheme === 'light' ? 'dark' : 'light')
                      }
                      aria-label={quickThemeLabel}
                    >
                      {actualTheme === 'dark' ? (
                        <RiMoonFill aria-hidden="true" />
                      ) : (
                        <RiSunFill aria-hidden="true" />
                      )}
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
                              aria-current={
                                theme === possibleTheme ? 'true' : undefined
                              }
                              className={`cursor-pointer ${
                                theme === possibleTheme
                                  ? 'after:[border-image:var(--primary-gradient)_1] bg-(image:--primary-text-gradient) bg-clip-text font-semibold text-transparent'
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
