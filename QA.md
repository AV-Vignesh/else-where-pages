# Elsewhere 1.0 — verification notes

Verified on 14 September 2026. All browser entries used disposable, synthetic test data; none is included in the project.

## Automated checks

`npm test` passes **22 tests, with no failures or skipped tests**.

- Every story choice targets an existing scene. Exhaustive traversal finds all 12 endings, with no unreachable ending, looping path or dead end. Locked choices do not change the saved state.
- Story names, inventory and choice history survive backup validation.
- Saved state round trips correctly. Corrupt data, blocked storage and quota failures are handled. Imports exclude prototype keys and retain long-lived reward histories and collections.
- Completion rewards are idempotent. Creature care honours cooldowns, daily rewards, energy requirements and growth thresholds.
- All six learning paths have sources and valid answer keys. All eight debate arenas have five distinct prompts; wording follow-ups respond to the documented cues.
- All four surprise templates allocate the exact entered budget, including zero and very small amounts, and keep their timelines within the selected duration.
- Recipient cards retain Unicode text and exclude private preparation details. Malformed links fail intentionally. Standalone card markup escapes hostile text.
- Calendar exports handle year boundaries and reject impossible dates.
- The service worker is exercised with an offline cache simulation under a GitHub-style repository subpath. It preserves unrelated applications’ caches.

All JavaScript files pass `node --check`. Every module import and precached asset exists. The manifest parses successfully. Included artwork and icons total about 350 KiB.

## Browser journeys

Chrome was used through a supervised local preview. The application was served at `/repo-test/` to exercise relative URLs under a repository path. Desktop and phone screenshots were inspected.

| Area | Checks completed |
| --- | --- |
| Layout | Desktop, 390-pixel phone, 320-pixel small phone and 768-pixel tablet layouts. No horizontal overflow in the measured home, investigation, debate, creature and surprise views. Settings remain accessible at 320 pixels. |
| Curated learning | Completed all six black-hole stages; moved the clock slider; checked the incorrect-answer gate and all four correct answers; wrote a teach-back and field note; received the completion reward. |
| Custom investigation | Created an original question, wrote notes in two stages, reloaded, reopened it and verified the exact saved text. |
| Interactive game theory | Viewed the full payoff table at 320 pixels and changed both players’ moves. The displayed result updated to mutual defection correctly. |
| Debate | Started a cross-examination, paused, resumed with the draft intact, completed all five rounds, changed confidence and reviewed the saved reflection. |
| Fiction | Played The City That Forgot to The Hour Returned. Verified an unavailable choice was disabled and an earned alternative was available. Ending and rewards were saved. |
| Creature | Created a named creature with a chosen affinity and temperament, fed it, completed the ten-star tap game and inspected growth. Affinity changes retain the selected temperament during creation. |
| Surprise | Generated a personalised hunt with a real-memory-style input, currency, budget, date, access preferences and Tamil/emoji text. Inspected the timeline, exact budget, four clues, saved checklist and recipient reveal. Checklist state survived navigation and reload. |
| Restore | Imported a JSON fixture through the file picker, confirmed replacement, then reloaded and verified restored name, sparks and creature. |
| Errors | No application-origin console errors were reported in the exercised journeys. |

## Limits of this verification

- Phone widths were simulated with an iframe in Chrome. This is not a physical iPhone/Android or Safari certification.
- No GitHub account/repository was connected. The project is prepared for GitHub Pages; an actual GitHub deployment has not been performed.
- Home-screen installation and offline use on a real HTTPS deployment remain to be confirmed after publishing. Offline cache behaviour was tested in the automated simulation, not with a physical device in airplane mode.
- The browser environment did not report Blob download events when the HTML-card and JSON-backup download controls were exercised. Their native file-saving behaviour could not be confirmed there. Generated reveal markup, JSON restoration and calendar payloads were checked independently. Verify downloads in the deployed phone browser.
- Native share-sheet delivery, sending to a real recipient and an external calendar import were not performed.
- Optional WebMCP was unavailable in this browser. The integration uses feature detection and the app continued normally.

## A short check after publishing

Open the GitHub Pages URL on your phone. Create a creature, reload, and confirm it remains. Export a backup. Open a recipient-card preview and save its HTML file. Add the site to the home screen, open it once online, then confirm a lesson and story still open offline. These checks cover the device and hosting behaviours that the local preview cannot establish.
