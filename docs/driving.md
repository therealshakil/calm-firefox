# Driving calm-firefox from the Claude CLI

How an assistant (or Shakil) drives this theme end to end from the terminal — build, live-reload, verify,
sign — and how the same machinery becomes the keeper agent (spec 003). Researched 2026-06-27.

## The toolchain (already on this machine)

- **Firefox** — `/Applications/Firefox.app` ✅
- **Node v20** ✅ — so [`web-ext`](https://github.com/mozilla/web-ext), Mozilla's official extension CLI,
  runs via `npx web-ext …` with nothing to install globally.
- **`screencapture`** + `osascript` — macOS built-ins, enough to verify the *chrome* visually (below).

## The drive loop — four stages

Each is one command (calm CLI conventions: absolute paths, one op per command, no chaining).

1. **Validate** — `npx web-ext lint --source-dir theme`. Catches manifest / colour-key mistakes before
   Firefox sees them.
2. **Run with live-reload** — `npx web-ext run --source-dir theme --keep-profile-changes`. Launches a
   **separate dev-profile Firefox** (never touches the main profile) with the theme pre-loaded, and
   **auto-reloads on every save** to `manifest.json` (built into `run`, Firefox 49+). This *is* the
   "auto-load updates" dev loop: the assistant edits a colour, the running window re-skins itself with no
   manual step. Run it as a background process so the assistant keeps working while it watches.
3. **Verify the chrome** — the catch with a *theme* is that page-screenshot tools (Playwright/Puppeteer)
   capture the web viewport, not the browser chrome. So verification is OS-level:
   - `osascript -e 'tell application "Firefox" to activate'` → bring it front.
   - `screencapture -x /…/scratchpad/calm-light.png` → grab the screen; the assistant `Read`s the PNG and
     eyeballs ink/paper, contrast, and that the accent shows only on a loading tab.
   - Toggle appearance and repeat: `osascript -e 'tell application "System Events" to tell appearance
     preferences to set dark mode to not dark mode'` → `screencapture … calm-dark.png`. The assistant can
     run the **whole light+dark check itself** — the verification that was "honestly yours" is now
     drivable.
4. **Sign for permanent install** — `npx web-ext sign --source-dir theme --channel=unlisted
   --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET`. Unlisted signing is an automated review
   (seconds) and returns a signed `.xpi`. The assistant runs this; **the AMO credentials are Shakil's**,
   supplied via env (or an untracked secrets file) — never in git (Article X).

## "Auto-loading updates" — the two senses

- **While iterating (dev):** `web-ext run` live-reload, above. Solved, native.
- **Keeping an installed build current:** each change = bump `version` in the manifest, re-sign, re-install
  the `.xpi`. For personal use that's a one-command script the assistant runs. (A self-hosted
  `update_url` + `updates.json` could make Firefox auto-pull new builds, but that's end-user distribution —
  overkill for a personal static theme, revisit only if it's ever publicly released.)

## How this becomes the keeper (spec 003)

The same machinery is the keeper agent's backbone, so spec 003 is mostly *wiring*, not new invention:

- **A scheduled Claude routine** (cron / scheduled agent) or a **SessionStart hook** checks the installed
  Firefox version against last-known-good — cheap, deterministic, **silent** when nothing changed
  (Amendment 4: reach for the LLM only when judgment is needed).
- On a version bump: re-`lint`, re-`run` a smoke check; for the **static theme** this is near-noise (stable
  documented API). For **spec 002's `userChrome.css`** it diffs the chrome selectors against the new
  Firefox and **drafts** a patch — recommends, never executes (Article VII).
- The keeper *relocates* the upgrade chore from Shakil to the machine; it stays calm only if it's tiny and
  deterministic-first (see [`research.md`](./research.md) → the keeper section).

## Honest limits

- **Launching Firefox is visible** — it opens a window on the real screen. The dev profile keeps it
  isolated, but it's an outward action; the assistant says it's doing it, doesn't do it silently.
- **Chrome verification is OS-level**, not headless — fine on this Mac, wouldn't port to a headless CI box
  without a display server.
- **Signing needs Shakil's AMO credentials once** — the one genuine human-supplied secret.

## Constitution Check

1. **Serves:** the working principles (calm tooling — silent, efficient, frugal; loose human / strict
   machine), IX (platform-native `web-ext`, no bespoke harness), VII (sign/keeper draft-not-execute).
2. **Violates:** none — credentials stay out of git (X); the keeper is deterministic-first, not a
   token-burning always-on agent (Amendment 4 / IX).
3. **Subtracts:** removes the manual load-eyeball-reload cycle and, via the keeper, the recurring upgrade
   chore — net subtraction of stress, not added machinery.
4. **Calm:** live-reload over manual reloads; visible actions announced, not silent; verification honest
   (the assistant looks, on both grounds).
