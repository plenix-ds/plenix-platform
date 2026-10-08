/* Plenix · Files (files/main.jsx): the application's page entry; build-app.js compiles it to files/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { FilesScreen } from './files.jsx';

mountSuite('files', () => <FilesScreen />);
