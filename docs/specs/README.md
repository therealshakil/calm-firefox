# Specs — calm-firefox

The numbered specs for the calm Firefox skin. Scope locked 2026-06-27: a three-layer build, core first.
Each spec is co-authored and gated on the [Constitution](https://github.com/therealshakil/calm/blob/main/CONSTITUTION.md);
the person locks `draft → ready` (Amendment 3).

| # | Spec | Layer | Status |
|---|------|-------|--------|
| 001 | [Core theme](./001-core-theme.md) | static theme + `about:config` switches | shipped |
| 002 | [Declutter](./002-declutter.md) | `userChrome.css` (subtract + soften) | building (awaiting ESR verify) |
| 003 | Keeper | calm upgrade-keeper agent | not yet written |

Background: [`../research.md`](../research.md) · journal: [`../notes.md`](../notes.md).
