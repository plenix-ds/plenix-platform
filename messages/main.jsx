/* Plenix · Messages (messages/main.jsx): the application's page entry; build-app.js compiles it to messages/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { MessagingScreen } from './messaging.jsx';

// the conversation: #/thread/<id> opens one (a search result links here); the older #t-<id> opens the same screen
const legacy = (hash) => { const m = /^#t-(\d+)$/.exec(hash); return m ? '/thread/' + m[1] : null; };
mountSuite('messaging', ({ screen }) => <MessagingScreen screen={screen} />, { legacy });
