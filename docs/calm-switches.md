# Calm switches — a one-time `about:config` pass

The static theme recolours Firefox; these few settings do the rest of the *core* calm that a theme can't
reach — mostly **stilling motion**. This is a list you apply once, by hand. It **recommends, never
executes** (Article VII): nothing here changes anything for you — you decide and type.

Open a new tab, go to `about:config`, accept the warning, and set each.

### Core — still the motion (spec 001)

| Setting | Value | What it does |
|---|---|---|
| `ui.prefersReducedMotion` | `1` | The headline. Stills Firefox's own UI motion **and** makes every website honour reduced-motion. Create it as a **Number** if it isn't there. |
| `toolkit.cosmeticAnimations.enabled` | `false` | Stops tab open/close and other chrome animations. |

### Declutter — prefer the pref over fragile CSS (spec 002)

These do declutter work that has a *stable* pref, so we use the pref instead of brittle `userChrome.css`.

| Setting | Value | What it does |
|---|---|---|
| `toolkit.legacyUserProfileCustomizations.stylesheets` | `true` | Enables `userChrome.css` (the declutter layer). Restart after. |
| `browser.shell.checkDefaultBrowser` | `false` | Kills the "Make Firefox your default" nag at the source. |
| `browser.urlbar.openViewOnFocus` | `false` | Stops the address bar ballooning open the moment you click it. |
| `browser.urlbar.suggest.quicksuggest.sponsored` | `false` | No sponsored "Firefox Suggest" rows in the address bar. |
| `browser.urlbar.suggest.quicksuggest.nonsponsored` | `false` | No Firefox-Suggest rows at all. |

Then, on the new-tab page, open its **gear / settings** (top-right) and turn **off**:

- Sponsored shortcuts
- Recommended stories / Pocket
- Recent activity / sponsored content

That leaves a quiet paper new tab — which the theme has already coloured.

> Reversible: set the two prefs back (`0` and `true`), or right-click → Reset, and re-enable the new-tab
> sections. Nothing here is permanent.

The deeper subtraction that *only* CSS can do — chrome typography (Atkinson Hyperlegible), hiding
buttons, whitespace — lives in [`../chrome/userChrome.css`](../chrome/userChrome.css) (spec 002), installed
once via the README.
