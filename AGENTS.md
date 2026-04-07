# AGENTS.md

Guidance for coding agents working in this repository.

Quote of the Day single-page app with auto-refresh, favorites, and dark-mode-first theming. Next.js 14, TypeScript, Tailwind CSS.

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # dev server with hot reload
pnpm build     # production build
pnpm start     # production server
pnpm lint      # eslint
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

**Pre-push check**: Before pushing updates to the remote, run `pnpm lint` and `pnpm build`.

**TDD**: Use red/green TDD for new features and major changes.

## Implementation Gotchas

1. **Hydration: use `theme !== 'light'`, never `=== 'dark'`**: During hydration, `theme` is `undefined`. Since `defaultTheme` is `"dark"`, `undefined !== 'light'` correctly defaults to dark styling and prevents hydration mismatch. This pattern is used in 5 components — maintain it in any new component that reads theme.

2. **Mounted guard before rendering theme-dependent UI**: `app/page.tsx` and `ThemeToggle.tsx` gate on a `mounted` state to render a skeleton during SSR, preventing hydration mismatch with next-themes. New components that depend on theme must follow the same pattern.

3. **Intentional fetch transition delays**: `fetchQuote()` has a 400ms pre-fetch delay and 100ms post-fetch delay for smooth fade transitions. These are intentional UX choices, not bugs.

4. **Favorites stored as full objects**: `useFavorites` persists entire quote objects (not just IDs) to localStorage. The `isLoaded` gate in the save effect prevents overwriting localStorage with empty state during SSR hydration.

5. **Legacy Python app**: `old_python_app/` is archived and not part of the active codebase.
