/* Plenix · Notes (notes/main.jsx): the application's page entry; build-app.js compiles it to notes/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { NotesScreen } from './notes.jsx';

mountSuite('notes', () => <NotesScreen />);
