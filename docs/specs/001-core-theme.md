# Spec 001 — Core theme (calm static Firefox theme)

**Status:** shipped (lgtm by Shakil, 2026-06-27) · **Date:** 2026-06-27 · **App:** calm-firefox

A signed, static Firefox theme that recolours the whole browser chrome and new-tab page to calm's
ink-on-paper palette — light and dark — plus a one-time `about:config` "calm switches" note. Zero upkeep,
survives updates. The first of three layers (core → declutter → keeper).

## Why

Firefox is the one app you can't avoid looking at all day; its default chrome is bright, busy, and
motion-y. The core lays calm's low-arousal identity over it with the *safest* mechanism Firefox offers — a
signed static theme against a documented, stable colour API — so it's useful immediately and never becomes
maintenance noise. Advances **VI** (calm over alarm — desaturated, warm, never alarm-red), **IX** (platform
-native, zero future noise), and the calm-by-default principle (any surface inherits the suite skin).

## What it does

- **Happy:** install the theme; the window frame, toolbars, tabs, URL bar, popups, sidebar, and new-tab
  page take calm's paper-and-ink colours. It follows the OS light/dark setting automatically (a `theme`
  block for light, a `dark_theme` block for dark). The one clay accent appears *only* on genuinely live
  things — a loading tab, an attention icon — never as decoration, never as alarm.
- **Quiet & empty:** a fresh new tab is calm paper with ink text and nothing shouting — no sponsored
  tiles or stories (the `about:config` note turns those off; the theme colours the surface that remains).
- **When it fails:** Firefox requires themes to be **signed** — an unsigned theme silently won't load.
  Honest path: load it temporarily via `about:debugging` for development; for permanent install, sign it
  (AMO) and install the signed package. The spec says this plainly rather than letting install fail
  mysteriously.

## Not this (non-goals)

- **No `userChrome.css`** — hiding clutter, chrome typography, density, nag-bar removal are **spec 002
  (declutter)**. The core is colour-only.
- **No web-page content** — that's calm-flix, out of scope for this tool entirely.
- **No layout, hiding, or motion changes** — a static theme can't, and we don't pretend it can.
- **No chrome font change** — the static theme cannot set the UI font; Atkinson Hyperlegible in the chrome
  waits for spec 002.
- **No Android** — Firefox for Android doesn't take custom theme colours.
- **The `about:config` switches recommend, never execute** (Article VII) — a documented list the person
  applies, not an automated change.

## Research

- [`research.md`](../research.md) — the three theming layers, the full token→colour-key mapping, the ND
  evidence (low-arousal, reduced motion, legible type), and why the static theme is the zero-fragility core.
- Token values: [`tokens.css`](../../tokens.css) — canonical; never hard-code colour.

## How (the plan)

1. **`manifest.json`** with `manifest_version` 2, a `theme` block (light) and a `dark_theme` block (dark),
   and `browser_specific_settings.gecko.id` for signing.
2. **Map the calm tokens to the colour keys** per the table in `research.md` — `frame`/`toolbar` →
   `--calm-bg`; fields/cards → `--calm-card`; text/icons → `--calm-fg`; dim tab text → `--calm-dim`;
   borders/separators → `--calm-line`; selection → `--calm-sel`; `tab_line`/`tab_loading`/`icons_attention`
   → `--calm-accent`; new-tab → `--calm-bg`/`--calm-text`. Light from the `:root` values, dark from the
   dark block. (Static themes take literal colours, not CSS vars — transcribe the token values in, sourced
   from `tokens.css`.)
3. **A `calm-switches.md`** (recommends-never-executes): `ui.prefersReducedMotion = 1` (headline — calms
   Firefox's own motion *and* makes every site honour reduced-motion), `toolkit.cosmeticAnimations.enabled
   = false`, and the new-tab toggles (sponsored shortcuts / stories / recent activity off).
4. **Distribution:** decide listed-AMO vs. self-signed unlisted `.xpi` (open question). Dev loop uses
   `about:debugging` → "Load Temporary Add-on".

## Decided (was open)

- **Distribution & signing:** unlisted / personal first — dev via `about:debugging`, permanent install via
  a self-signed unlisted `.xpi`. Public AMO release stays behind calm's publishing gate, decided later.
- **Accent use:** the clay accent is allowed in chrome **only** on the genuinely-live indicators
  (`tab_line`, `tab_loading`, `icons_attention`) — nowhere decorative.
- **New-tab text:** `ntp_text` → `--calm-fg`.

## Tasks

1. ✅ Write `manifest.json` light `theme` block — [`theme/manifest.json`](../../theme/manifest.json).
2. ✅ Add the `dark_theme` block (full dark token set).
3. ✅ Map accent (live indicators only) + selection + popup/sidebar/new-tab keys.
4. ✅ Write [`calm-switches.md`](../calm-switches.md).
5. ✅ Document dev-load + signing path in the [README](../../README.md). *(Signing the `.xpi` itself is a
   manual step for Shakil — needs `web-ext`/AMO credentials.)*
6. ⏳ **Visual check** — load via `about:debugging`, eyeball against `tokens.css` on light **and** dark,
   confirm contrast and that the accent only shows on live indicators. Moves the spec to `shipped`.

## Constitution Check

1. **Serves:** VI (calm, low-arousal, never alarm-red), IX (documented stable API — zero future noise),
   calm-by-default (the suite skin laid over the browser).
2. **Violates:** none — confirmed vs. Articles + Banned patterns. Public release stays behind calm's
   publishing gate (open question keeps it personal/unlisted by default).
3. **Subtracts:** scopes out userChrome, web-content, layout, and Android — the core does one thing.
4. **Calm:** follows OS light/dark honestly; the `about:config` note's headline *is* reduced-motion;
   `about:config` changes recommend-never-execute (VII); happy / quiet-empty / fail paths all specified.
