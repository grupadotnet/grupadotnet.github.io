import { useEffect } from 'react';
import { Outlet, createRootRoute, useMatches } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { extractTranslation } from '../lib/extractTranslation.tsx';
import BackgroundSwirl from '@/components/swirl.tsx';

const BASE_DOCUMENT_TITLE = 'KN Programistów i Miłośników Informatyki';

export const Route = createRootRoute({
  component: RootComponent,
  staticData: {
    titleData: extractTranslation('temp', 'temp'),
    hideInNav: true,
    order: -1,
  },
});

function RootComponent() {
  const { t } = useTranslation();
  const matches = useMatches();

  const deepestTitleData = [...matches]
    .reverse()
    .map((m) => m.staticData?.titleData)
    .find(
      (td) =>
        td &&
        td.key !== 'temp' &&
        (td.translation.trim().length > 0 || td.key !== 'Home.title')
    );

  const pageTitle = deepestTitleData
    ? (t(deepestTitleData.key, deepestTitleData.translation) as string).trim()
    : '';

  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} — ${BASE_DOCUMENT_TITLE}`
      : BASE_DOCUMENT_TITLE;
  }, [pageTitle]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
      >
        {t('Common.skipToContent', 'Przejdź do treści głównej')}
      </a>
      <BackgroundSwirl />
      <div
        className={
          'relative grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto]'
        }
      >
        <Header />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
