/* Plenix · Contacts (contacts/main.jsx): the application's page entry; build-app.js compiles it to contacts/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { ContactsScreen } from './contacts.jsx';

mountSuite('contacts', () => <ContactsScreen />);
