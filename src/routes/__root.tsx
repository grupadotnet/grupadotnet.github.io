import { Outlet, createRootRoute } from '@tanstack/react-router';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  staticData: {
    title: 'root',
    hideInNav: true,
    order: -1,
  },
});

function RootComponent() {
  return (
    <div className={'grid min-h-screen grid-rows-[auto_1fr_auto]'}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

},