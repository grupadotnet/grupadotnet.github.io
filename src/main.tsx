import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Link, RouterProvider } from '@tanstack/react-router';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './components/theme-provider.tsx';
import { Button } from './components/ui/button.tsx';
import i18next from 'i18next';
import './i18n';

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    title: string;
    hideInNav: boolean;
    order: number;
    icon?: string;
  }

  interface Register {
    router: typeof router;
  }
}
export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <div className="flex items-center justify-center bg-background text-foreground px-4">
        <div className="w-full max-w-sm space-y-6 text-center border border-border/40 bg-card/40 p-8 rounded-xl backdrop-blur-sm shadow-2xl shadow-black/5">
          {/* Subtle low-key badge */}
          <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground tracking-wide">
            404
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-medium tracking-tight">
              {i18next.t('NotFound.title', 'Ajć! Coś poszło nie tak!')}
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {i18next.t(
                'NotFound.paragraph',
                'O nie!! Tej strony jeszcze nie zrobiliśmy, i najprawdoppodobniej nie zrobimy XD'
              )}
            </p>
          </div>

          <Link to={'/'}>
            <Button variant={'default'}>
              <span>
                {i18next.t('NotFound.returnButton', 'Powróć do Głównej')}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    );
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
