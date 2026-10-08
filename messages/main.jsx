/* Plenix · Messages (messages/main.jsx): the application's page entry; build-app.js compiles it to messages/app.js. */
import { mountSuite } from '../suite/suite.jsx';
import { MessagingScreen } from './messaging.jsx';
const { useState } = React;

// the conversation: #t-<id> opens one (a search result links here)
function Messages() {
  const [thread, setThread] = useState(() => { const m = /^#t-(\d+)$/.exec(location.hash); return m ? +m[1] : 1; });
  return <MessagingScreen thread={thread} setThread={setThread} />;
}
mountSuite('messaging', () => <Messages />);
