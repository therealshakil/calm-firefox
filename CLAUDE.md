# Working calm — calm-firefox

calm-firefox opts in to full calm (calm's Constitution, Amendment 7): it takes calm as law and does
not restate the rules. Scoped exceptions: none.

## Governing law lives elsewhere

- **github.com/therealshakil/calm** — the source of calm:
  - CONSTITUTION.md — the ten Articles + banned patterns. Supreme.
  - docs/identity.md — the look: monochrome ink on paper + one clay accent, the locked typefaces, almost no motion.
  - docs/calm-language.md — the voice.
  - docs/specs/cli-conventions.md — how the CLI + dev surfaces stay calm (clickable links, minimal-yes, command mechanics, commits).
  - CLAUDE.md — how to be while you build.

When a choice here conflicts with the calm Constitution, the choice loses — not the Constitution.

## How we work here

- Build Gate (Amendment 2): classify before building — two-way (proceed, report) vs one-way (spec first; the person locks).
- Specs are co-authored; the person locks (Amendment 3).
- Mechanics: absolute paths and tool dir-flags (git -C), never cd; one operation per command; no command
  substitution, shell variables, or chained commands; push after every commit.

## This project

calm-firefox is a calm skin for the Firefox browser chrome — the calm-by-default identity laid over the
one app you can't avoid looking at all day. Research and a running build journal live in `docs/`.
