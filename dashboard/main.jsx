/* Plenix · Dashboard (dashboard/main.jsx): the application's page entry; build-app.js compiles it to dashboard/app.js. */
import { appPage, mountSuite } from '../suite/suite.jsx';
import { leavePage } from 'plenix-platform';
import { Dashboard } from './dashboard.jsx';
import { ProjectDetail, projectScreen } from '../projects/projects.jsx';

// the home page: the widgets; a project opens here (#/project/<id>/<capability>, a history entry); every other
// application opens its page
function Home({ prefs, screen }) {
  const { proj } = projectScreen(screen);
  if (proj) return <ProjectDetail key={proj.id} proj={proj} screen={screen} />;
  return <Dashboard prefs={prefs} setProject={(p) => screen.open(['project', p.id, 'home'])} setSection={(s) => { if (s !== 'project-detail') leavePage(appPage(s)); }} />;
}
mountSuite('home', ({ prefs, screen }) => <Home prefs={prefs} screen={screen} />, { page: 'dashboard' });
