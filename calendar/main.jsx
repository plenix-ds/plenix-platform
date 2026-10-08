/* Plenix · Calendar (calendar/main.jsx): the application's page entry; build-app.js compiles it to calendar/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { CalendarScreen } from './calendar.jsx';

mountSuite('calendar', () => <CalendarScreen />);
