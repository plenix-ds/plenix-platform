/* Plenix · Tasks (tasks/main.jsx): the application's page entry; build-app.js compiles it to tasks/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { TasksScreen } from './tasks.jsx';

mountSuite('tasks', ({ screen }) => <TasksScreen screen={screen} />);
