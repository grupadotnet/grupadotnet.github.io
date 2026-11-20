import {
  createFileRoute,
  Outlet,
  useLocation,
  Navigate,
} from '@tanstack/react-router';
import { extractTranslation } from '@/lib/extractTranslation.tsx';

export const Route = createFileRoute('/identity')({
  component: IdentityLayout,
  staticData: {
    titleData: extractTranslation(
      'Identity.navbarTitle',
      'Identyfikacja wizualna'
    ),
    hideInNav: true,
    order: -1,
  },
});

function IdentityLayout() {
  const location = useLocation().pathname;
  if (location === '/identity' || location === '/identity/') {
    return <Navigate to="/identity/2026" replace />;
  }
  return <Outlet />;
}
