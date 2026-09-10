import { Outlet, createRootRoute } from '@tanstack/react-router';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { extractTitle } from '../lib/extractTitle.tsx';
import BackgroundSwirl from '@/components/swirl.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  staticData: {
    titleData: extractTitle('temp', 'temp'),
    hideInNav: true,
    order: -1,
  },
});

function RootComponent() {
  return (
    <>
      <BackgroundSwirl />
      <div className={'relative grid min-h-screen grid-rows-[auto_1fr_auto]'}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
