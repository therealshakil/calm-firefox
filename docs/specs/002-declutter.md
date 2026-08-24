# Spec 002 — Declutter (userChrome.css: subtract + soften)

**Status:** building (locked by Shakil, 2026-06-27) · **Date:** 2026-06-27 · **App:** calm-firefox

A small, well-blocked `userChrome.css` that does the calm the static theme can't reach: puts the chrome
into Atkinson Hyperlegible, hides clutter, adds whitespace, and stills the last bits of motion. Layer two
of three (core → **declutter** → keeper).

## Why

The static core recolours; it cannot change the UI font, hide a nag bar, or add breathing room. Those are
the ND research's headline asks (legible type, less clutter, whitespace, reduced motion) and calm's own
*subtract by default* (Articles I, VI, VIII). This layer adds them — accepting the userChrome fragility,
which layer three (the keeper) then defends.

## What it does

- **Happy:** the chrome reads in **Atkinson Hyperlegible** (tabs, URL bar, menus); the nag / info bars are
  gone; chosen clutter is hidden (see open questions for the default set); the chrome has more padding and
  breathing room; the tab-close burst and download bounce are stilled. It sits *with* the core theme — the
  colours are layer one's job, the shape and type are this layer's.
- **Quiet & empty:** with no notifications and a spare toolbar, the chrome is simply calm and uncluttered —
  the *absence* of buttons and bars is the feature, not an empty state to fill.
- **When it fails:** a Firefox update renames a selector → the styled bit quietly reverts (font, a hidden
  button reappears) or looks slightly off. It **fails safe** — a stale selector just stops matching; it
  never breaks the browser. Until the keeper (003) exists, the fix is a manual re-pin via the Browser
  Toolbox. The spec records the Firefox version the selectors were verified against (the keeper's
  last-known-good).

## Not this (non-goals)

- **No colour** — that's spec 001.
- **No web-page content** — that's calm-flix, out of scope.
- **No new UI elements** — CSS can only restyle/hide what exists, not add toolbars or buttons.
- **No extension** — this is a profile file, deliberately not packaged with the theme.
- **Not CSS where a pref does it better** — the default-browser nag and the URL-bar enlarge/suggestion
  noise have stable `about:config` levers; those go in [`calm-switches.md`](../calm-switches.md), not into
  fragile CSS. This layer reserves `userChrome.css` for what *only* CSS can do, to shrink the fragile
  surface (Article IX).

## Research

- [`research.md`](../research.md) → the userChrome calm-wins, the fragility cost, the **grounded selectors
  + prefer-pref refinement**, and the maintained upstream (black7375/Firefox-UI-Fix) the keeper can track.
- [`driving.md`](../driving.md) → the verification note: `web-ext run` can't live-reload userChrome;
  this layer's drive loop is restart-based.
- [`tokens.css`](../../tokens.css) → `--calm-font-body` (Atkinson Hyperlegible), `--calm-line` for softened
  separators. Never hard-code.

## How (the plan)

1. **`chrome/userChrome.css`** with the `@namespace` line, enabled by the `about:config` flag (add that
   flag to `calm-switches.md`).
2. **Small, named, commented blocks** — one per calm-win (Typography, Hide-clutter, Whitespace,
   Still-motion). So a broken selector is isolated and the keeper can patch one block without touching the
   rest.
3. **Pin exact selectors at build time** with the Browser Toolbox against the installed Firefox, and write
   the verified Firefox version at the top of the file.
4. **Prefer-pref split** — move the default-browser nag (`browser.shell.checkDefaultBrowser = false`) and
   the URL-bar prefs into `calm-switches.md`; keep CSS only for typography, hiding, whitespace, motion.
5. **Install & verify** — copy `chrome/` into the active profile, flag on, restart; verify via
   `screencapture` on light **and** dark. Document install in the README.

## Decided (was open)

- **Default hide-set:** Pocket + per-tab close buttons hidden by default; unified-extensions button,
  account/avatar, Firefox View left as easy-to-uncomment blocks. The new-tab Pocket region is **not** a
  userChrome job (it's in-content) — it's a new-tab pref in [`calm-switches.md`](../calm-switches.md).
- **Whitespace:** minimal chrome with room to breathe — gentle roominess, softened separators. We iterate.
- **Channel:** pin against **Firefox ESR** (changes ~yearly), so the fragility/keeper burden is far
  smaller. The CSS header records the exact ESR version selectors were verified against.

## Tasks

1. ✅ Create [`chrome/userChrome.css`](../../chrome/userChrome.css) with namespace + version header.
2. ✅ Typography block — Atkinson Hyperlegible across nav-bar, tabs, menus, popups.
3. ✅ Hide-clutter blocks — default (Pocket, per-tab close) + opt-in (extensions, account, Firefox View).
4. ✅ Room-to-breathe + still-motion blocks.
5. ✅ Prefer-pref split into [`calm-switches.md`](../calm-switches.md) (enable flag, default-browser nag,
   urlbar prefs); install steps in the [README](../../README.md).
6. ⏳ **Verify on ESR** — install/run Firefox ESR, apply the layer, `screencapture` light **and** dark,
   confirm typography lands and nothing looks off; write the verified ESR version into the CSS header.
   Moves the spec to `shipped`. *(Restart-based loop — see [`driving.md`](../driving.md).)*

## Constitution Check

1. **Serves:** VI (reduced motion, low-arousal), I & VIII (subtract chrome clutter), the ND research
   (legible type, whitespace).
2. **Violates:** none — the fragility is named and bounded (prefer-pref shrinks it; blocks isolate it;
   the keeper defends it). Fails safe. No extension, no dependency.
3. **Subtracts:** hides nag bars and clutter; pushes pref-able items out of fragile CSS — less fragile
   surface, not more.
4. **Calm:** honest fail path (selector drift → safe revert + re-pin); `prefers-reduced-motion` already
   covered by the core's switches and reinforced here; happy / quiet-empty / fail all specified.
