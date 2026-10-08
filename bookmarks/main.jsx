/* Plenix · Bookmarks (bookmarks/main.jsx): the application's page entry; build-app.js compiles it to bookmarks/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { BookmarksScreen } from './bookmarks.jsx';

mountSuite('bookmarks', () => <BookmarksScreen />);
