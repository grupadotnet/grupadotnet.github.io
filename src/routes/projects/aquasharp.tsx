import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/aquasharp')({
  component: RouteComponent,
  staticData: {
    title: 'Aquasharp',
    hideInNav: false,
    order: 0,
  },
});

function RouteComponent() {
  return <div>Hello "/projects/aquasharp"!</div>;
}
