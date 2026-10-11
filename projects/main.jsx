/* Plenix · Projects (projects/main.jsx): the application's page entry; build-app.js compiles it to projects/app.js. */
import { mountSuite, settingsPage } from '../suite/suite.jsx';
import { leavePage } from 'plenix-platform';
import { ProjectsScreen } from './projects.jsx';

mountSuite('projects', ({ screen }) => <ProjectsScreen screen={screen} onSettings={() => leavePage(settingsPage('projects'))} />);
