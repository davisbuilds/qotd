# AGENTS.md

Quote of the Day: a single-page Next.js app with auto-refresh, favorites, and
dark-mode-first theming. Quotes come from `data/quotes.json` (a flat array of
`{ id, quote, author }`, edited directly; no CMS) through one API route.

## Documentation Map

- `docs/system/ARCHITECTURE.md`: flow, components, hooks, data, styling, hydration pattern.
- `docs/system/FEATURES.md`: quote display, refresh, favorites, theming, API.
- `docs/system/OPERATIONS.md`: local dev, env vars, CI, editing quotes, deployment.
- `docs/project/ROADMAP.md`, `docs/project/BACKLOG.md`: direction and product scope; future-only follow-ups.
- `docs/project/GIT_HISTORY_POLICY.md`: merge settings, required checks, branch hygiene.

## Verification

Run the CI gate before pushing: `pnpm lint && pnpm test && pnpm build`
(`pnpm test` is the Vitest suite plus the dead-code check).

## Implementation Gotchas

1. **Hydration: use `theme !== 'light'`, never `=== 'dark'`.** During hydration `theme` is `undefined`; with `defaultTheme="dark"`, `undefined !== 'light'` defaults to dark styling and avoids a hydration mismatch. Keep this pattern in every component that reads theme.
2. **Mounted guard before theme-dependent UI.** `app/page.tsx` and `ThemeToggle.tsx` render a skeleton until `mounted`; new theme-dependent components must do the same.
3. **The fetch delays are intentional.** `fetchQuote()` waits 400 ms before and 100 ms after fetching for the fade transition. They are UX choices, not bugs.
4. **Favorites are stored as full quote objects**, not IDs. The `isLoaded` gate in `useFavorites`'s save effect stops hydration from overwriting localStorage with an empty list.

## Git

Squash-merge only, after the required `Lint, test, and build` and `check`
checks pass. **Merging to `main` deploys production on Vercel**, so a successful
Vercel preview deployment of the PR head is required before merging.

## Working Agreement

- **Clarify before building** when a request is vague, contradictory, or skips a
  key decision; clear, well-scoped requests need no interview.
- **Fix small issues now; backlog the rest.** Fix simple, quick, or blocking
  issues in this repo as part of the current change and call them out. Record in
  `docs/project/BACKLOG.md` only what can't be finished now or needs the
  maintainer's decision; don't open a branch or PR just for a backlog entry.
- **Keep docs current** when a change makes a documented contract, boundary,
  procedure, or direction stale.
- **Plan and hand off work.** Reuse clear task context. Save planning docs when
  decisions, acceptance, or coordination need persistence. Leave a brief
  handoff only when needed to resume unfinished work. Commit shared docs and
  keep status current. Before archiving, preserve lasting decisions and open
  work in maintained docs and repair links.
- **TDD:** red/green for features, major refactors and large changes; the red
  test must fail on the behavior, not on a missing symbol. For smaller edits, run
  the relevant existing checks.
- **Commit and push.** Commit coherent chunks, staging by explicit path. Push
  your task branch and open a PR once the work is complete and the local gate
  passes; don't push directly to `main`.
- **Merge** only under the standing merge authority in the maintainer's
  workspace instructions, or when the maintainer asks. Without those
  instructions in context, leave the PR for the maintainer.
- **Re-ground after compaction** in source, this file, the owning docs, and
  recent commits. A summary and your own earlier proposals are not user approval.
