# calm-firefox

A calm, low-arousal skin for Firefox — monochrome ink-on-paper with one clay accent, light and dark. The
calm suite's identity, laid over the one app you can't avoid all day.

Part of the [calm suite](https://github.com/shakilclark/calm). Built in layers:

- **Layer 1 — core** (shipped): a signed static theme + a one-time `about:config` pass.
- **Layer 2 — declutter** (built; pin against **Firefox ESR**): a `userChrome.css` that adds chrome
  typography, hides clutter, and gives room to breathe.
- **Layer 3 — keeper** (specced): a calm agent that re-pins the declutter when ESR updates.

## Install

**Try it now (this session, no signing):**

1. Open `about:debugging#/runtime/this-firefox`.
2. **Load Temporary Add-on…** → pick [`theme/manifest.json`](./theme/manifest.json).
3. The chrome turns to paper-and-ink, following your OS light/dark. (Temporary add-ons clear on restart.)

**Keep it (permanent):** Firefox requires themes to be signed. Sign the `theme/` folder as an unlisted
add-on (via `web-ext sign` / AMO), then install the resulting `.xpi`. See
[`docs/specs/001-core-theme.md`](./docs/specs/001-core-theme.md) for the distribution decision.

**Then run the calm switches once:** [`docs/calm-switches.md`](./docs/calm-switches.md) — the
reduced-motion pass the theme can't do on its own. Recommends, never executes.

### Layer 2 — declutter (`userChrome.css`)

1. **Install the font** so the chrome can use it: get [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible)
   and install it on macOS (Font Book, or `brew install --cask font-atkinson-hyperlegible`).
2. **Enable + the declutter prefs:** link or copy [`user.js`](./user.js) to `<your-profile>/user.js`.
   It flips `toolkit.legacyUserProfileCustomizations.stylesheets` on and holds every calm pref
   (still motion, no AI, no nags, a quiet new tab, compact chrome). Prefer to flip them by hand?
   The same switches are in [`docs/calm-switches.md`](./docs/calm-switches.md).
3. **Copy the stylesheet** into your profile: put [`chrome/userChrome.css`](./chrome/userChrome.css) at
   `~/Library/Application Support/Firefox/Profiles/<your-profile>/chrome/userChrome.css`.
4. **Restart Firefox** (userChrome only applies on restart). Opt-in hides (extensions button, account
   avatar, Firefox View) are commented blocks in the file.

> Selectors are pinned against **Firefox ESR** and verified per release; a stale one fails safe (it just
> stops applying). Layer 3 (the keeper) will re-pin them automatically.

## Use

On Linux, [calm-desktop](https://github.com/therealshakil/calm-desktop) links all of this into the
profile for you.

There's nothing to operate — it's a skin. Install, and Firefox is calm. It follows your OS light/dark
automatically. The one clay accent appears only on genuinely live things (a loading tab), never as
decoration or alarm.

## Licence

Part of the calm suite — see [CONSTITUTION.md](https://github.com/shakilclark/calm/blob/main/CONSTITUTION.md).
