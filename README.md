# Elsewhere

A mobile-first personal playground. Five complete experiences, a shared progress system, and a small creature to bring along.

**Runs entirely on GitHub Pages. No build step, account, API key, subscription, database, or external runtime dependency.**

## Put it on GitHub Pages

1. Create a new GitHub repository, for example `elsewhere`. A public repository is the simplest option with GitHub Free.
2. Extract the downloaded ZIP on your computer.
3. Upload the **contents** of the extracted folder into your repository. `index.html` must be at the repository root, alongside `styles.css`, `js/` and `assets/`. Do not upload just the ZIP or just `index.html`.
4. Open the repository’s **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select **main** and **/(root)**, then **Save**.
7. Open the website URL GitHub shows after deployment finishes. A project repository normally uses `https://YOUR-USERNAME.github.io/elsewhere/`.

All asset paths, hash routes, install metadata and offline-cache paths are relative. The app works at a repository subpath as well as a domain root. Keep `.nojekyll` in the upload when possible.

Official GitHub instructions: [Configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Add it to a phone

- **iPhone / iPad:** open the deployed URL in Safari → Share → Add to Home Screen.
- **Android:** open the deployed URL in a modern browser → Install app / Add to Home screen. A browser install action is also shown in Elsewhere’s settings when supported.
- Visit the app online once and allow its files to finish loading. The core experiences then work offline. Research-source links and sending a share link still require connectivity.

## The five experiences

### 1. Rabbit holes

Six authored paths, each with six stages: wonder, understand, experiment, challenge, teach back, and keep going.

| Path | Interactive activity |
| --- | --- |
| At the edge of a black hole | Compare ideal clocks at different distances |
| A world without sunlight | Explore a simplified depth-pressure model |
| Can you trust your own mind? | Eight-trial colour-word attention activity |
| The hidden shape of sound | Adjustable waveform, frequency and optional quiet audio |
| The games behind your choices | Two-player payoff-table experiment |
| Light that bends your reality | Thin-lens image and magnification model |

Each path has four understanding checks, explanations for answers, original-source links, an explanation you write yourself and exportable notes. Completing a path records progress; it is not a certification of mastery.

**Your own obsession:** create any investigation, then work through a sharper question, initial beliefs, primary evidence, an experiment, a countercase and a teach-back. Notes save as you write and export as Markdown.

### 2. The other side

Eight arenas: comfort, loyalty, money, freedom, talent, privacy, forgiveness and instinct. You can also enter a custom claim.

Choose a curious friend, honest sceptic or cross-examiner. Work through five rounds, record confidence before and after, and save a revised position. Follow-up prompts respond to simple wording cues such as absolute claims or references to evidence. These are transparent local rules, not live AI reasoning.

Pause and resume an unfinished challenge. Review completed reflections and export the full written exchange. The final structure check looks for examples, uncertainty and tests; it does not assess factual truth or diagnose thinking ability.

### 3. Parallel lives

Three original worlds, **44 authored scenes and 12 reachable endings**:

- **The Last Signal:** captain a ship near a city trapped in a time loop.
- **A Table for Tomorrow:** decide what to preserve after inheriting a tiny restaurant.
- **The City That Forgot:** investigate a missing hour in an imagined near-future Chennai.

Choices affect courage, trust, insight, inventory and later options. Consequences appear after each choice. Progress saves automatically. Discovered endings remain in your collection when you restart. Download a life to preserve its full choice history before replaying it.

### 4. Your creature

Create an original fox-dragon companion with a name, one of four affinities and a curious, brave or gentle personality. The creature is part of this website, separate from ChatGPT’s desktop pets.

Feed, play, rest and cuddle; manage bond, energy and joy. Catch ten stars in an untimed tap game. Shared activities across the app grow the creature through Hatchling, Adventurer, Guardian and Celestial stages, unlocking habitats and adornments. Visual growth uses the original creature portrait with affinity colours, motion and unlocked accessories.

Care rewards are once per action per local day. Repeated care is still available. Nothing decays while the app is closed. All affinities are available from the beginning.

### 5. Made for someone

Four personalisable plans:

- A little treasure hunt, with four printable clue cards.
- A museum of shared memories.
- A themed evening together.
- A shared experience across a distance.

Use the recipient’s name, occasion, real memory, favourite things, personal note, budget, currency, time, date, meeting place and access preferences. The result includes a timeline, checklist, materials, budget allocations, fallback plan and recipient reveal card.

Save multiple plans, edit them, tick off preparation items, download a text plan, print to paper/PDF, or download an all-day calendar file. Budget numbers are planning allocations, not quotes from shops.

**Recipient cards:** preview the reveal, share a link, or download a self-contained HTML card. The public card includes only recipient, occasion, note and final reveal; the organiser’s budget and checklist stay out of it. The card link contains its content in the URL fragment and is readable by anyone who receives it. It is not password-protected or encrypted.

## Progress, privacy and backups

- All activity is stored in this browser’s `localStorage`, scoped to the app’s base path.
- No account, analytics, advertising or third-party requests are made by the core app.
- Data does **not** automatically sync between devices, browsers or different repository URLs.
- Use **Settings → Export backup** to keep a JSON copy, and **Import backup** to restore it on another device. Import replaces the current device’s state after confirmation.
- Clearing browser data or losing the device can remove local progress. Keep backups of writing you care about.
- Exported backups contain your private notes and plans. Do not commit them to a public repository.
- If storage is blocked or full, the app reports it and allows export of the current in-memory state.
- Research-source links open external sites only when you choose them.

## What runs locally, and what does not

This version is an authored, interactive application. Lessons, stories and challenge prompts are included in the source. It does not connect to GPT-6 Astra or generate unlimited new narrative chapters. GitHub Pages serves static files and cannot keep a secret API key or run a private AI backend. Never place a secret model API key in this public frontend.

The optional WebMCP hooks use feature detection. Supported browsers can read non-private progress counts and navigate between experiences; other browsers ignore them.

## Run it locally

Use a web server rather than double-clicking `index.html`, because browsers restrict ES modules on `file://` pages.

With Node.js installed:

```sh
npm start
```

Then open `http://localhost:4173/`. There is no `npm install` step. Alternatively, run `python3 -m http.server 8000` in the project folder and open `http://localhost:8000/`.

The supplied Node development server also serves a test-only mobile harness at `/__mobile-qa`, with 320, 390, 768 and 1024-pixel iframe widths. The harness is produced by the development server; it is not a production GitHub Pages page.

## Project map

| File | Purpose |
| --- | --- |
| `index.html` | App entrypoint |
| `styles.css` | Responsive theme, touch layouts, print styles and reduced motion |
| `js/app.js` | Navigation, actions, forms, saving, exports and sharing |
| `js/views.js` | All five experiences and the shared collection |
| `js/store.js` | State, backup validation and shared rewards |
| `js/explore-data.js` | Lessons, source links and custom investigation stages |
| `js/labs.js` | Six interactive experiments |
| `js/debate-data.js` | Arenas, questions and wording checks |
| `js/story-data.js` | Branching worlds, conditions, consequences and endings |
| `js/surprise-engine.js` | Plans, budgets, clues, reveal links and exports |
| `js/ui.js` | Shared UI helpers, icons and downloads |
| `sw.js` | Repository-scoped offline cache |
| `manifest.webmanifest` | Phone installation metadata |
| `assets/` | Original artwork and app icons, served locally |
| `tests/core.test.mjs` | State, logic, content and offline-cache checks |
| `dev-server.mjs` | Optional development server; not needed by GitHub Pages |

## Make it your own

- Change the name and colours in `index.html`, `styles.css` and `manifest.webmanifest`.
- Add an exploration path to `PATHS` with six stages and a supported lab type.
- Add story scenes to `WORLDS`; every choice must point to an existing node. Use the tests to check reachability and avoid dead ends.
- Change surprise experiences in `surprise-engine.js` and challenge questions in `debate-data.js`.
- After changing production files, increment the cache version in `sw.js` so returning devices receive the new assets. Keep the cache prefix scoped to the repository.
- Keep state version compatibility, or write an explicit migration before changing the backup shape.

## Verification

Run:

```sh
npm test
```

The suite checks all reachable story paths, locked choices, state round trips, malformed imports, reward limits, lesson answer keys, arena prompts, exact budget totals, Unicode reveal links, HTML escaping, calendar dates and the offline service-worker behaviour under a repository subpath.

See `QA.md` for the browser checks and their limits.

## Content and artwork

The fiction, questions, plans and interface were authored for this project. Two original generated raster assets are included: the portal landscape and the creature portrait. Scientific paths link to NASA, NOAA, the Exploratorium, the American Psychological Association and MIT OpenCourseWare for further reading. The short demonstrations have their assumptions and limits written next to their controls.
