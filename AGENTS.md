# AGENTS.md

Guidance for coding agents working in this repository.

Quote of the Day single-page app with auto-refresh, favorites, and dark-mode-first theming. Next.js 14, TypeScript, Tailwind CSS.

## Documentation Map

- `docs/system/ARCHITECTURE.md` — high-level flow, App Router structure, components, hooks, data, styling, hydration pattern, directory map.
- `docs/system/FEATURES.md` — quote display, auto-refresh + manual refresh, favorites, dark mode, responsive design, API.
- `docs/system/OPERATIONS.md` — local dev, commands, env vars, CI, editing quotes, deployment.
- `docs/project/ROADMAP.md` — completed highlights and open areas.
- `docs/project/GIT_HISTORY_POLICY.md` — merge strategy and branch hygiene.

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # dev server with hot reload
pnpm build     # production build
pnpm start     # production server
pnpm lint      # eslint
pnpm test      # vitest unit suite + dead-code check
```

## Key Files Reference

| Purpose | Location |
|---------|----------|
| Main page (quote state, fetch, auto-refresh, favorites) | `app/page.tsx` |
| Random quote API (reads `quotes.json`, no-cache headers) | `app/api/quotes/random/route.ts` |
| Quote data (single source of truth) | `data/quotes.json` |
| Favorites hook (localStorage persistence) | `hooks/useFavorites.ts` |
| Quote display with fade transitions | `components/QuoteDisplay.tsx` |
| Favorites modal | `components/FavoritesView.tsx` |
| Theme toggle | `components/ThemeToggle.tsx` |
| Theme provider (next-themes wrapper) | `components/ThemeProvider.tsx` |
| Timing constants and storage keys | `lib/constants.ts` |
| Quote type definition | `types/quote.ts` |

## Architecture

- **Single client page** (`app/page.tsx`) orchestrates everything: fetch, state, favorites, auto-refresh (2 min interval)
- **API route** returns a random quote from `data/quotes.json` with `force-dynamic` and explicit no-cache headers
- **Favorites** stored as full quote objects in localStorage under `qotd-favorites`
- **Theme**: next-themes with `defaultTheme="dark"` and system detection enabled
- **Quote data**: flat JSON array of `{ id, quote, author }` — edit the file directly, no CMS

## Testing

**Pre-push check**: Before pushing updates to the remote, run `pnpm lint`, `pnpm test`, and `pnpm build`.

**TDD**: Use red/green TDD for new features and major changes.

## Implementation Gotchas

1. **Hydration: use `theme !== 'light'`, never `=== 'dark'`**: During hydration, `theme` is `undefined`. Since `defaultTheme` is `"dark"`, `undefined !== 'light'` correctly defaults to dark styling and prevents hydration mismatch. This pattern is used in 5 components — maintain it in any new component that reads theme.

2. **Mounted guard before rendering theme-dependent UI**: `app/page.tsx` and `ThemeToggle.tsx` gate on a `mounted` state to render a skeleton during SSR, preventing hydration mismatch with next-themes. New components that depend on theme must follow the same pattern.

3. **Intentional fetch transition delays**: `fetchQuote()` has a 400ms pre-fetch delay and 100ms post-fetch delay for smooth fade transitions. These are intentional UX choices, not bugs.

4. **Favorites stored as full objects**: `useFavorites` persists entire quote objects (not just IDs) to localStorage. The `isLoaded` gate in the save effect prevents overwriting localStorage with empty state during SSR hydration.

## Working Agreement

- **Push back before building.** If a request is incoherent or self-contradictory, or a spec/plan is vague or skips key decisions, stop and interview me — ask clarifying questions and confirm intent before writing code or changing files. Don't guess at scope or comply silently. (Clear, well-scoped requests don't need this.)
- **Keep docs current.** After a significant change, PR, or completed spec/plan, update any now-stale reference docs under `docs/system/` (and `docs/project/ROADMAP.md`) so they match shipped behavior. Skip this for trivial changes.
- **Commit logically.** Commit completed work in coherent chunks as you proceed. Push only when explicitly asked.
- **Log findings in `BACKLOG.md`.** Note design gaps, tech debt, or better approaches you spot mid-task in `docs/project/BACKLOG.md`; fix simple/quick ones inline and call them out.
- **Re-ground after compaction.** A compaction summary loses precise paths, context, and verification state — before continuing, re-read this project's `AGENTS.md`, its reference docs, and recent commits.
