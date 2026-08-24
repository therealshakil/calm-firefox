# Research — calming Firefox

*What's possible, what it costs, and what the evidence says. Researched before building, so no decision
here nags later.*

## Firefox theming — three layers, by power and by fragility

There is no single "theme" knob. There are three approaches, and they trade power against fragility —
which matters under Article IX (*stays small; dependencies admitted only when they won't become future
noise — a CVE, a breaking update, the thing that drags you back to an app meant to leave you alone*).

### 1. Static theme — `manifest.json` `theme` key *(the safe core)*
The official, signed, survives-updates path. A tiny add-on, no code — just colour. Restyles the whole
chrome and the new-tab page through ~40 named colour keys, with a separate `dark_theme` block so light
and dark map straight onto the calm tokens.

Key colour keys and the calm token each maps to:

| Firefox key | Controls | calm token |
|---|---|---|
| `frame`, `frame_inactive` | window header background | `--calm-bg` |
| `toolbar` | nav bar, bookmarks bar, find bar, selected tab | `--calm-bg` (or `--calm-card`) |
| `toolbar_text` / `bookmark_text` / `icons` | toolbar text + icons | `--calm-fg` |
| `toolbar_field`, `ntp_card_background` | URL bar, find field, new-tab cards | `--calm-card` |
| `toolbar_field_text` | URL bar text | `--calm-fg` |
| `toolbar_field_border` | URL bar border | `--calm-line` |
| `tab_background_text` | inactive tab text | `--calm-dim` |
| `tab_text` | active tab text | `--calm-fg` |
| `tab_selected` | selected tab background | `--calm-card` |
| `tab_line`, `icons_attention`, `tab_loading` | live / time-bound indicators | `--calm-accent` |
| `popup`, `popup_text`, `popup_border` | URL dropdown, arrow panels | `--calm-card` / `--calm-fg` / `--calm-line` |
| `popup_highlight`, `*_field_highlight` | selection backgrounds | `--calm-sel` |
| `sidebar`, `sidebar_text`, `sidebar_border` | sidebar | `--calm-bg` / `--calm-fg` / `--calm-line` |
| `ntp_background`, `ntp_text` | new-tab page | `--calm-bg` / `--calm-fg` |

The accent (`--calm-accent`, clay) is used **only** where something is genuinely live — a loading tab, an
attention icon — never as decoration and never as alarm-red (Article VI).

**What it cannot do:** hide or move anything, change layout, touch web-page content, or reduce motion.
Colour-only. Must be **signed** (true since 2019). **Desktop-only** — Firefox for Android themes don't
take custom colours.

### 2. `userChrome.css` / `userContent.css` *(the power layer — and the fragile one)*
Real CSS over the browser's own UI. This is where *subtraction* and *softening* live — the half of calm
the static theme can't reach. Enabled via `toolkit.legacyUserProfileCustomizations.stylesheets` in
`about:config`, then a `userChrome.css` file in the profile's `chrome/` folder.

**What it adds in calm terms** (Articles I, VI, VIII; the ND research's *hide clutter, reduce motion,
legible type*):

- **Chrome typography = Atkinson Hyperlegible.** The static theme cannot set the UI font; userChrome can
  put calm's legible body face into tabs, URL bar, and menus — the chrome itself becomes ND-friendly, not
  just its colours. Quietly the biggest win.
- **Kill the nag / info bars.** "Make Firefox default," "you've been signed out," save-to-Pocket,
  breach-monitor, update banners — textbook *nag* and *manufactured urgency* (Articles IV, VI). Removed.
- **Quiet the URL mega-dropdown.** Shrink the expanding suggestions panel; strip the sponsored "Firefox
  Suggest" rows — less motion, no ads in the address bar.
- **Subtract toolbar / tab clutter.** Per-tab close buttons (noise + misclicks), Pocket button, extensions
  puzzle piece, account avatar, new-tab Pocket "stories" — hide what isn't used.
- **Lower density, more whitespace.** Increase chrome padding, soften separators to the `--calm-line`
  hairline, calm the tab shapes. Whitespace is the ND research's headline ask; the static theme has no
  lever for it.
- **Stop residual motion.** The tab-close burst, download bounce, loading throbber — beyond what
  `prefers-reduced-motion` catches.

**The catch, and it's real for calm — the fragility cost in plain terms:** the static theme writes to a
small, documented, stable colour API. userChrome instead reaches into Firefox's *internal* UI markup —
element IDs, classes, toolbar nesting — which Mozilla treats as private and refactors freely. There is no
contract.

- Firefox auto-updates roughly **every 4 weeks**; a release can rename or re-nest an element, and a
  selector silently stops matching.
- **It fails silently** — no "incompatible" notice like a signed add-on gets. You discover it by noticing
  the browser looks wrong one morning.
- Fixing it is a small investigation each time (Browser Toolbox → find the new selector → patch),
  realistically 15–60 min, a few times a year. Community CSS sets (e.g. Aris-t2) ship a **new version per
  Firefox release** — the tell that breakage is routine.
- It lives outside the signed-add-on system: needs the `about:config` flag, sits in a profile folder,
  doesn't sync across machines, isn't a clean shareable install.

This is precisely the *future noise* Article IX warns against — not "dependencies are bad," but *stress*:
a declutter layer whose upkeep periodically un-calms you. Named honestly, not hidden. See the keeper agent
below for the calm answer to it.

**Grounded selectors + the prefer-pref refinement (for spec 002).** Setup: enable
`toolkit.legacyUserProfileCustomizations.stylesheets`, put `userChrome.css` (with the `@namespace` line) in
the profile's `chrome/` folder, restart. Confirmed selectors:

- Tab close buttons → `.tabbrowser-tab .tab-close-button { display:none !important }`
- Unified extensions button → `#unified-extensions-button`; Pocket → `#save-to-pocket-button`
- Chrome UI font → `#nav-bar { font-family: … }` and broader (`#main-window`, tabs, menus); finicky,
  needs testing per-region — this is the Atkinson-Hyperlegible win
- URL dropdown → `#urlbar-results` / `#PopupAutoCompleteRichResult`

**But — prefer the pref where one exists** (less fragile, Article IX). Several "declutter" wins have a
stable `about:config` lever and should *not* be fragile CSS:

- Default-browser nag → `browser.shell.checkDefaultBrowser = false` (kills the worst nag with a pref, no CSS)
- Enlarged URL bar on focus / suggestion noise → `browser.urlbar.*` prefs (`openViewOnFocus`,
  `maxRichResults`, `suggest.*`), not CSS

So spec 002 reserves `userChrome.css` for what *only* CSS can do — chrome typography, hiding specific
buttons, whitespace/density, residual motion — and pushes the rest into [`calm-switches.md`](./calm-switches.md).
This deliberately shrinks the fragile surface, which is the keeper's workload.

A maintained upstream worth tracking (for the keeper): **black7375/Firefox-UI-Fix** — a large userChrome
project that already chases selector churn per release; the keeper can watch it rather than diff
mozilla-central directly.

**Verification note (affects driving):** `web-ext run` cannot live-reload `userChrome.css` — it's a profile
file, not an extension, and applying changes needs a Firefox **restart**. So spec 002's drive loop is
restart-based and slower than spec 001's: edit `chrome/userChrome.css` in the dev profile → restart →
`screencapture`. Honest, and a reason to keep the CSS small and well-blocked.

### 3. A custom WebExtension *(calming web *content*, not the chrome)*
The calm-flix / "Low Stim" territory already parked in calm's `Calm.md`: pause autoplay, strip
recommendation rows and urgency badges, dim and reduce motion *inside pages*. Powerful, but a different
job from theming the browser, and a much larger surface to own. **Out of scope here — that's calm-flix.**

### Plus — zero-code calm wins (setup, no fragility)
- `ui.prefersReducedMotion = 1` — kills Firefox's own UI animation *and* makes every website honour
  reduced-motion. The single highest-leverage switch.
- `toolkit.cosmeticAnimations.enabled = false` — stops tab/chrome motion.
- New-tab: turn off sponsored shortcuts, stories, and recent activity.

## The upgrade-keeper agent — the calm answer to userChrome fragility

An agent that owns the userChrome upkeep changes the Article IX calculus. It is the **same pattern calm
already uses**: the Prompt Warden (a hook + script, ~0 tokens, *notices after*) and Amendment 4 (*calm
tooling — silent, efficient, frugal; ease, don't pre-empt; the assistant owns host upkeep once and
durably, loose human / strict machine*).

- **Detect, so the person doesn't.** A deterministic check compares installed Firefox version to
  last-known-good. Most months it finds nothing — **silent**, no LLM, ~0 tokens. The silent-breakage cost
  was *the person* being the detector; the agent takes that job.
- **Track upstream, not the machine.** Firefox is open source — watch mozilla-central UI diffs between
  version tags, or a maintained community set (Aris-t2) that already tracks selector churn, and adapt our
  small ruleset to it.
- **Repair as a draft, never silently.** When a selector genuinely moved — the rare moment judgment is
  needed — spin up the LLM, find the new selector, **draft** the patch as a diff to accept (Article VII).
- **Honest state.** "Firefox 142 landed — checking our rules… one selector drifted, here's the one-line
  patch."

**What it fixes vs. relocates (honest, per Article IX):** it converts the cost from *your problem, silent,
recurring* into *the machine's problem, surfaced, handled* — a real reduction in stress, which is what
Article IX actually guards. It does **not** make the cost zero: it relocates it into a small standing
mechanism that itself must stay calm ("building it is governed too"). So the keeper must be **tiny and
deterministic-first** — a version-check hook + a curated selector map, LLM only for the rare moved-selector
call. Built heavyweight, it would be the bloat we're removing. Small residual latency (a day or two between
update and patch) is acceptable, and the agent says so.

The keeper is interesting enough to be **its own calm tool** — a "calm-keeper" sibling to the Prompt
Warden — not just plumbing for this repo.

## Firefox theming for ND

The ND guidance (low-stim browser extensions, sensory-design writing) and calm's own Article VI point the
same way:

- **Low arousal, desaturated, warm.** Avoid bright / high-saturation; *never* alarm-red. calm's
  ink-on-paper + one clay accent already is this.
- **Reduce motion first.** Movement is the most common sensory trigger; `prefers-reduced-motion` honoured
  is non-negotiable (Article VI).
- **Subtract clutter, add whitespace.** Hide non-essential UI; breathing room over density. The standard
  "Calm/Focus mode = hide sidebars, dim colour, remove decoration" is almost verbatim calm.
- **Legible type.** ND-friendly type = clear letter differentiation and generous spacing. calm's body
  face, **Atkinson Hyperlegible**, is engineered for exactly this — use it where Firefox allows (limited
  in native chrome, fuller via userChrome + new-tab).
- **Predictability.** No surprises, no autoplay, media off by default.

## Recommendation

A layered **Calm Firefox**, built the calm way — core first, each layer earning the next:

1. **Core — ship first.** A signed static theme mapping the calm tokens to all chrome + new-tab colour
   keys, light & dark, plus a one-time `about:config` "calm switches" doc (reduced motion the headline;
   recommends-never-executes, Article VII). Survives updates, zero maintenance, useful immediately.
2. **Declutter.** A `userChrome.css` layer for the subtract-and-soften wins (chrome typography, kill nag
   bars, quiet the URL dropdown, hide clutter, whitespace). The half of calm the core can't reach.
3. **Keeper.** A small, deterministic-first agent that owns layer 2's upkeep — so the one real objection
   to userChrome (silent update breakage) is handled the calm way, not carried by the person.

**Sequencing, not direction:** build the core first (done-able, useful now), prove the declutter you
actually want, *then* build the keeper to defend it. Don't build all three before the core has earned it.

**Out of scope (for now):** web-*content* calming — that's calm-flix's job. Subtract by default; don't
fold two tools into one.

## Sources

- [theme — MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/theme)
- [Use themes to change the look of Firefox — Mozilla Support](https://support.mozilla.org/en-US/kb/use-themes-change-look-of-firefox)
- [Firefox Color](https://color.firefox.com/) · [Themes — Firefox Extension Workshop](https://extensionworkshop.com/documentation/themes/)
- [userChrome.org](https://www.userchrome.org/) · [Contributors guide on advanced customization — Mozilla Support](https://support.mozilla.org/en-US/kb/contributors-guide-firefox-advanced-customization)
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Low-stim extension — UW CSE](https://courses.cs.washington.edu/courses/cse443/26wi/projects/low-stim-extension/README.html) · [Sensory-friendly design — Tiimo](https://www.tiimoapp.com/resource-hub/sensory-design-neurodivergent-accessibility)

---

## Constitution Check

1. **Serves:** VI (calm over alarm — desaturated, reduced motion), I & VIII (subtract chrome noise),
   IX (the static-theme core is platform-native, zero future noise).
2. **Violates:** none — the one fragile path (userChrome) is named as a cost and kept opt-in, not shipped.
3. **Subtracts:** scopes web-content calming *out* (it's calm-flix), keeping this tool to one job.
4. **Calm:** reduced-motion is the headline switch; recommends-never-executes for all `about:config`
   changes (VII); honest about the userChrome fragility trade-off.
