/* Plenix · Projects (projects/main.jsx): the application's page entry; build-app.js compiles it to projects/app.js. */
import { mountSuite, settingsPage } from '../suite/suite.jsx';
import { ProjectsScreen } from './projects.jsx';

mountSuite('projects', () => <ProjectsScreen onSettings={() => { location.href = settingsPage('projects'); }} />);
