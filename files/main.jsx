/* Plenix · Files (files/main.jsx): the application's page entry; build-app.js compiles it to files/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { DataTable } from 'plenix-platform';
import { FilesScreen } from './files.jsx';

// the file list is a table: start loading its engine while the page draws (batch 237)
DataTable.preload();

mountSuite('files', () => <FilesScreen />);
