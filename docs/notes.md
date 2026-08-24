# Build journal — calm-firefox

*Field notes on building a calm Firefox skin, and on what it's like to work with the calm design system
itself. Kept for the article. Newest entries at the bottom; each dated.*

---

## 2026-06-27 — Day one: research, and adopting calm

We set out to build a *calmed* Firefox theme — the calm-by-default identity laid over the one app you
can't avoid all day. Before any building, two things: research the ground, and adopt calm properly.

Research landed in [`research.md`](./research.md): three theming layers (signed static theme → fragile
userChrome.css → full WebExtension), the ND evidence (reduce motion first, low-arousal desaturated, hide
clutter, legible type — all of which calm already *is*), and a layered recommendation. The Build Gate
fired (one-way door — new tool, inherits the suite identity), so we stopped before building and put the
scope question back to the person.

### What it's like working with the calm DS *(for the article)*

- **Adoption is genuinely two files.** Point a `CLAUDE.md` at the calm repo, copy `tokens.css`, done. The
  *entire* posture — palette, voice, the ten Articles, even how to behave while building — gets inherited
  without anyone restating it. Most design systems hand you components; calm hands you a *constitution*,
  and the components fall out of it.

- **The tokens ported with almost no friction.** `tokens.css` mapped onto a completely unrelated target —
  Firefox's ~40 chrome colour keys — nearly 1:1, light and dark. Because the tokens are *semantic*
  (`bg`/`fg`/`dim`/`line`/`card`/`accent`) rather than a swatch library, "what colour is a focused URL
  bar?" had an obvious answer. The constraint — monochrome ink-on-paper + exactly one clay accent — did
  the deciding; no colour-choice paralysis.

- **The constraints removed decisions instead of adding them.** This is the part worth the article. A
  normal DS gives you *options*; calm gives you *refusals* — no alarm-red, almost no motion, subtract by
  default, the accent is for time-bound things *only*. Counter-intuitively that made the work faster and
  calmer, not more restrictive.

- **It governs the *process*, not just the pixels.** The Build Gate made me classify this as a one-way
  door before touching anything, and hand the lock back to the person — the system actively resisted the
  action-bias toward shipping an artifact. A design system that tells the builder to *slow down* is
  unusual, and the most on-brand thing about calm: the guardrails obey the principles they guard.

- **The voice came through the work.** "Strict mode, but calm" is infectious — I wrote the recommendation
  in calm's own register (warm, low-arousal, recommends-never-executes) without trying. The identity
  isn't a stylesheet bolted on at the end; it shapes how the thing gets made.

- **One honest tension.** Article IX (*avoid future noise, prefer the platform*) and ND best-practice
  (*subtract chrome clutter*, which needs the fragile `userChrome.css`) pull against each other. The
  system didn't paper over it — it gave me the principle to *name* the tension and surface it rather than
  quietly pick. A DS that makes its own trade-offs visible is doing something most don't.

Late in the day, picked up calm's now-locked [`cli-conventions.md`](https://github.com/shakilclark/calm/blob/main/docs/specs/cli-conventions.md)
(suite-wide, 2026-06-25) and wired it into our pointer. Another article beat: the DS governs even the
*command line* — clickable `file://` links over bare paths, "minimal yes" (every confirmation is an
attention tax), one operation per command, no un-analysable shell that forces a permission prompt. The
calm reaches all the way down to how the terminal talks back to you.

### Later — the fragility question, and a very calm idea

Dug into what `userChrome.css` would actually buy us in *calm* terms (not just "more control"): chrome
typography in Atkinson Hyperlegible, killing Firefox's nag/info bars, quieting the URL mega-dropdown,
hiding tab/toolbar clutter, more whitespace. That's the *subtract-and-soften* half of calm — the half the
static theme literally cannot reach. So the fragility isn't avoidable by ignoring userChrome; it's the
price of the calmest parts.

Then the person asked the question that reframed the whole thing: *what if an agent handled the upgrade
breakage for us, calmly?* It lands exactly on calm's own grain — the Prompt Warden (a hook + script, ~0
tokens, notices after) and Amendment 4 (calm tooling owns host upkeep once and durably, loose human /
strict machine). The article beat here: calm didn't just have a *style* for the problem, it had a
*pattern* — "make the machine quietly own the recurring chore, surface only the judgment call." The
fragility cost doesn't vanish, it *relocates* from the person to a tiny deterministic keeper — and that
relocation is the whole point of Article IX (it guards *stress*, not moving parts).

Scope picture shifted from "safe core vs. fragile extra" to a three-layer build — **core → declutter →
keeper** — sequenced so each earns the next. Captured the userChrome calm-wins list, the fragility cost in
plain terms, and the keeper-agent concept into [`research.md`](./research.md).

Working-with-calm note: the person also said *auto-save research and journal automatically* — which is
itself calm's "minimal yes" in practice. The DS keeps pushing the same way: stop asking permission for the
quiet, reversible upkeep; just keep the trail clean and report after.

### Scope locked — three layers, core first

The person locked scope: **core → declutter → keeper**, built in that order. Drafted
[`specs/001-core-theme.md`](./specs/001-core-theme.md) (the static-theme core) on calm's spec template and
seeded the [spec index](./specs/README.md) with 002/003 as placeholders.

Working-with-calm note: the lock/draft split is doing real work here. I *drafted* the spec but left it
`draft` — calm's Amendment 3 says the person, not the machine, moves a spec to `ready`. It's a small
ceremony that keeps authorship honest: the doc is mine, the *settling* is theirs. Most "spec-driven"
setups let whoever writes the doc also bless it; calm deliberately splits the pen from the lock.

### Built the core

Spec 001 locked ("all yours" → all three leans taken), Build Gate cleared, built the core:
[`theme/manifest.json`](./../theme/manifest.json) (full light + dark colour maps),
[`docs/calm-switches.md`](./calm-switches.md), and the [README](./../README.md) with dev-load + signing
steps. Manifest validates as JSON.

What it was like, building on calm at this stage:

- **The token→key map wrote itself.** Because `tokens.css` is semantic, transcribing it onto Firefox's ~40
  chrome keys was almost mechanical — `frame`/`toolbar` = bg, fields/cards = card, text/icons = fg, dim
  tab text = dim, separators = line, selection = sel. The only *design* decisions left were the handful
  the constraints don't pre-answer: where the accent is allowed (live indicators only) and what a focus
  ring should be (chose `--calm-dim`, not the accent — focus is a UI state, not time-bound urgency, and
  Article VI keeps the accent rare). The DS narrowed a 40-cell grid down to ~3 real choices.
- **Flat-by-default fell out of the palette.** I made `frame` and `toolbar` the same bg rather than
  tiering them — calm's whole register is low-contrast, low-hierarchy, so "blend them" was the obvious
  read. The system makes the calm choice the path of least resistance.
- **Honest about the hand-off seam.** The one thing the machine *can't* finish: signing the `.xpi` (needs
  the person's AMO/`web-ext` creds) and the visual eyeball in a real Firefox. Calm's "recommends, never
  executes" and "loose human / strict machine" made that boundary feel natural to state rather than fudge
  — I left task 6 as ⏳ and the spec at `building`, not `shipped`. Verification is the person's, honestly.

### Spec 001 shipped, and a way to drive the whole thing

Shakil said *lgtm* → spec 001 shipped. Then: *research a way you can drive this, including auto-loading
updates, via the Claude CLI.* Wrote it up in [`driving.md`](./driving.md). The toolchain's already here —
Firefox.app + Node 20, so Mozilla's `web-ext` runs via `npx` with nothing to install. The loop: `lint` →
`run` (launches an isolated dev-profile Firefox that **live-reloads on every save**) → verify → `sign`.

The verification bit is the satisfying part for the article. Last turn I called the light/dark eyeball
"honestly yours" because I couldn't see the chrome. Turns out I *can* drive it: `web-ext run` to load it,
`osascript` to toggle macOS dark mode, `screencapture` the window, and `Read` the PNG back to look at it
myself. The handoff seam moved — what was the person's manual check became something the machine can do,
which is exactly the calm pattern ("loose human, strict machine; the assistant owns the upkeep").

And the nicest find: the drive loop *is* the keeper (spec 003) in miniature — a scheduled check + re-lint +
draft-a-patch. So spec 003 turns out to be mostly wiring existing machinery, not new invention. Building on
calm keeps doing this — each layer's tooling turns out to already imply the next.

One thing I held to: launching a GUI Firefox is a *visible* action, so I wrote it as announce-don't-silently
-do, and didn't auto-launch it as part of "research." Minimal-yes, but not zero-yes when something appears
on the person's actual screen.

### Spec 002 drafted — declutter

Drafted [`specs/002-declutter.md`](./specs/002-declutter.md) for the `userChrome.css` layer. Grounded the
fragile selectors with research first (close buttons, Pocket, unified-extensions, chrome font, urlbar
dropdown) — captured in [`research.md`](./research.md).

Two calm refinements fell out of the research, both worth the article:

- **Prefer the pref over the CSS.** Some "declutter" wins have a stable `about:config` lever — the
  default-browser nag (`browser.shell.checkDefaultBrowser`), the enlarged/over-suggesting URL bar
  (`browser.urlbar.*`). Using fragile CSS for those would be daft when a stable pref exists. So the spec
  *reserves* userChrome.css for what only CSS can do (typography, hiding, whitespace, motion) and pushes
  the rest to calm-switches.md. That's Article IX (prefer the platform, shrink the fragile surface) doing
  active design work — it literally made the spec smaller and the keeper's future job lighter.
- **A drive-loop honesty.** I'd been quietly assuming the spec-001 drive loop carried over. It doesn't:
  `web-ext run` can't live-reload userChrome (it's a profile file, not an extension — needs a restart). So
  002's loop is restart-based and slower. Caught it while writing the Research/driving link rather than
  after building. Specs-first earning its keep.

Also surfaced an option I hadn't weighed: **pin against Firefox ESR, not release** — ESR changes ~yearly
vs ~monthly, so the whole fragility/keeper burden shrinks dramatically. Left as an open question for Shakil.

### Built the declutter layer

Shakil locked 002 (lean hide-set; minimal-but-roomy, iterate; **ESR**). Built
[`chrome/userChrome.css`](./../chrome/userChrome.css) as four small named blocks (typography, hide-clutter,
room-to-breathe, still-motion), pushed the pref-able bits into [`calm-switches.md`](./calm-switches.md),
and wrote the layer-2 install steps into the [README](./../README.md).

Working-with-calm beats from this one:

- **The prefer-pref principle kept paying out mid-build.** The default hide-set was going to include "hide
  the new-tab Pocket region" — but that region is *in-content* (about:newtab), not chrome, so userChrome
  can't touch it; it's a new-tab pref. Caught it while writing the CSS. So the same Article-IX instinct
  (don't use the fragile lever when a stable one exists) fired *again*, unprompted, and moved one more
  thing out of the fragile file. The DS doesn't just set a one-time direction — it keeps pruning as you go.
- **ESR turned a worry into a footnote.** Choosing ESR shrank the whole fragility story: selectors now
  drift ~yearly, the CSS header pins one version, the keeper's job becomes occasional rather than monthly.
  A single scope answer quietly de-stressed two later specs.
- **Honest "fails safe" everywhere.** Every fragile block is written so a stale selector just stops
  matching — never breaks the browser. Naming that in the CSS header and the spec felt like calm's voice:
  strict about the risk, calm about it.

The one thing left is genuinely physical: verifying on a real Firefox ESR (install it, apply the layer,
screenshot light + dark, confirm Atkinson lands). Restart-based loop, and ESR may not be installed yet —
so it's the next live step, not something I finished silently.

### Verify — drove it most of the way, hit a permission wall

Tried to drive the full verify from the CLI: built an isolated dev profile (userChrome + the calm prefs in
`user.js`), launched Firefox 152 over it with `npx web-ext run` loading the static theme as a temporary
add-on (no signing needed — that's the web-ext trick). **Both layers applied, live, in one window.** Then
the plan was `osascript` to toggle dark mode + `screencapture` each, and `Read` the PNGs myself.

`screencapture` failed: *could not create image from display* — the terminal process doesn't have macOS
**Screen Recording** permission. So the self-verify loop from [`driving.md`](./driving.md) is real but gated
on a one-time OS grant I can't give myself.

Two honest article beats here:

- **The drive loop worked right up to the OS boundary.** web-ext launching an unsigned theme over a
  custom profile is genuinely slick — colours *and* userChrome together, no signing, isolated profile. The
  machinery is sound; only the screenshot is walled.
- **Verification landed back with the human — but for a mundane reason, not a deep one.** Not "a machine
  can't judge calm," just "macOS won't let this process see the screen without a permission toggle." Very
  on-brand for the whole project: the friction is real, name it, and it eases once granted (Amendment 4 —
  *ease, don't pre-empt*; a permission is a one-time cost you notice and fix so it recurs less).
- Caveat recorded: this was **Firefox 152 release, not ESR**, and **Atkinson Hyperlegible isn't installed**
  — so typography fell back to system-ui. The colour + declutter verify is faithful; the type + ESR pin
  still want a proper pass.

**Result: "looks ok so far."** Shakil eyeballed the live window — colour + declutter read right on Firefox
152. A genuine partial pass: the two layers compose correctly in one window. Kept 002 at `building`, not
`shipped` — the faithful pass (ESR + Atkinson installed, so typography is real, not system-ui fallback) is
still owed. Honest status over an optimistic one.

*Next: install the font + Firefox ESR for the faithful pass → 002 shipped; or draft spec 003 (the keeper)
and circle back to the ESR pass.*
