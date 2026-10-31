### Fixed
- Tests (#768): chat-s1-637's check of your own message's colors read the wrong element. The drawing area and the third message shared the id "c", so the check measured the first message. The Chat colors were right and are unchanged; the area now has its own id.
- Tests (#768): layout.test.js runs every child test even after one fails, then lists the failed children at the end and fails. One red child no longer hides the 38 after it.
