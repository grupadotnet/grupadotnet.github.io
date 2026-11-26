import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';

const THEME_TRANSITION_DURATION_MS = 650;

export type Theme = 'dark' | 'light' | 'system';
export type ActualTheme = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: ActualTheme;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  actualTheme: 'light',
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function getSystemTheme(): ActualTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyRootThemeClass(resolvedTheme: ActualTheme) {
  if (typeof window === 'undefined') return;
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolvedTheme);
}

function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  // Track the raw system preference in state
  const [systemTheme, setSystemTheme] = useState<ActualTheme>(getSystemTheme);

  const actualTheme = theme === 'system' ? systemTheme : theme;

  const themeRef = useRef<Theme>(theme);
  const actualThemeRef = useRef<ActualTheme>(actualTheme);
  const transitionIdRef = useRef(0);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    themeRef.current = theme;
    actualThemeRef.current = actualTheme;
  }, [theme, actualTheme]);

  useEffect(() => {
    applyRootThemeClass(actualTheme);
  }, [actualTheme]);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove(
          'theme-view-transition',
          'theme-transitioning'
        );
      }
    };
  }, []);

  const runSyncedThemeTransition = useCallback(
    (updateState: () => void, nextActual: ActualTheme) => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        updateState();
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        applyRootThemeClass(nextActual);
        updateState();
        return;
      }

      const id = ++transitionIdRef.current;
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }

      const root = document.documentElement;

      if (typeof document.startViewTransition === 'function') {
        root.classList.remove('theme-transitioning');
        root.classList.add('theme-view-transition');

        const transition = document.startViewTransition(() => {
          flushSync(() => {
            updateState();
          });
          applyRootThemeClass(nextActual);
        });

        void transition.finished
          .catch(() => {})
          .finally(() => {
            if (transitionIdRef.current === id) {
              root.classList.remove('theme-view-transition');
            }
          });
        return;
      }

      root.classList.add('theme-transitioning');
      void root.offsetWidth;
      applyRootThemeClass(nextActual);
      updateState();

      fallbackTimerRef.current = window.setTimeout(() => {
        if (transitionIdRef.current === id) {
          root.classList.remove('theme-transitioning');
          fallbackTimerRef.current = null;
        }
      }, THEME_TRANSITION_DURATION_MS + 50);
    },
    []
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const listener = (e: MediaQueryListEvent) => {
      const nextSystem: ActualTheme = e.matches ? 'dark' : 'light';
      if (
        themeRef.current === 'system' &&
        nextSystem !== actualThemeRef.current
      ) {
        runSyncedThemeTransition(() => setSystemTheme(nextSystem), nextSystem);
      } else {
        setSystemTheme(nextSystem);
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [runSyncedThemeTransition]);

  const handleSetTheme = useCallback(
    (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      const nextActual: ActualTheme =
        newTheme === 'system' ? getSystemTheme() : newTheme;

      if (nextActual === actualThemeRef.current) {
        setTheme(newTheme);
        return;
      }

      runSyncedThemeTransition(() => setTheme(newTheme), nextActual);
    },
    [storageKey, runSyncedThemeTransition]
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme: handleSetTheme,
      actualTheme,
    }),
    [theme, handleSetTheme, actualTheme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

const useTheme = () => {
  const context = use(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export { useTheme, ThemeProvider };
