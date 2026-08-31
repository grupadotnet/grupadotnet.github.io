import { createFileRoute } from '@tanstack/react-router';
import { About } from './about.tsx';
import { Sections } from './sections.tsx';
import { Hello } from '../components/Hello.tsx';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  staticData: {
    title: 'Home',
    hideInNav: true,
    order: -1,
  },
});

function RouteComponent() {
  //       <Projects />
  //       <Partners />
  //       <Contact />

  return (
    <>
      <Hello />
      <About />
      <Sections />
    </>
  );
}
