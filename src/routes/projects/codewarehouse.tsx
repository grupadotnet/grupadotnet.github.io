import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/codewarehouse')({
  component: RouteComponent,
  staticData: {
    title: 'CodeWarehouse',
    hideInNav: false,
    order: 0,
  },
});

function RouteComponent() {
  return <div>Hello "/projects/codewarehouse"!</div>;
}
