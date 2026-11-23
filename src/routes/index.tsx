import { createFileRoute } from '@tanstack/react-router';
import { Route as AboutRoute } from './about.tsx';
import { Route as SectionsRoute } from './sections.tsx';
import { Route as ProjectsRoute } from './projects.tsx';
import { Route as ContactRoute } from './contact.tsx';
import { Hello } from '../components/Hello.tsx';
import { extractTranslation } from '../lib/extractTranslation.tsx';
import { Route as ScheduleRoute } from '@/routes/schedule.tsx';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  staticData: {
    titleData: extractTranslation('Home.title', ''),
    hideInNav: true,
    order: -1,
  },
});

const About = AboutRoute.options.component!;
const Sections = SectionsRoute.options.component!;
const Projects = ProjectsRoute.options.component!;
const Contact = ContactRoute.options.component!;
const Schedule = ScheduleRoute.options.component!;

function RouteComponent() {
  //       <Partners />

  return (
    <>
      <Hello />
      <Schedule />
      <About />
      <Sections />
      <Projects />
      <Contact />
    </>
  );
}
