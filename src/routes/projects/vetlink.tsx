import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/vetlink')({
  component: RouteComponent,
  staticData: {
    title: 'Vetlink',
    hideInNav: false,
    order: 0,
  },
});

function RouteComponent() {
  return <div>Hello "/projects/vetlink"!</div>;
}
