/* Plenix · Dashboard (dashboard/main.jsx): the application's page entry; build-app.js compiles it to dashboard/app.js. */
import { appPage, mountSuite } from '../suite/suite.jsx';
import { Dashboard } from './dashboard.jsx';
import { ProjectDetail } from '../projects/projects.jsx';
const { useState } = React;

// the home page: the widgets; a project opens here; every other application opens its page
function Home({ prefs }) {
  const [project, setProject] = useState(null);
  if (project) return <ProjectDetail proj={project} />;
  return <Dashboard prefs={prefs} setProject={setProject} setSection={(s) => { if (s !== 'project-detail') location.href = appPage(s); }} />;
}
mountSuite('home', ({ prefs }) => <Home prefs={prefs} />, { page: 'dashboard' });
