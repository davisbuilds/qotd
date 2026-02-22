# CLAUDE.md

Quote of the Day web app — Next.js (App Router), TypeScript, Tailwind CSS, dark mode default.

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Dev server with hot reload
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # ESLint
```

## Architecture

- **App Router** with `app/` directory
- **Main page** (`app/page.tsx`): Client component with quote state, auto-refresh (2 min), favorites
- **API route** (`app/api/quotes/random/route.ts`): Returns random quote from `data/quotes.json` (`force-dynamic`, no-cache headers)
- **Components**: `QuoteDisplay`, `FavoriteButton`, `FavoritesView`, `ThemeToggle`, `ThemeProvider`
- **Favorites hook** (`hooks/useFavorites.ts`): localStorage persistence with key `qotd-favorites`
- **Quote data**: `data/quotes.json` — each entry has `id`, `quote`, `author`
- **Quote type**: `types/quote.ts`
- **Theme**: next-themes, defaults to dark mode

## Gotchas

- **Hydration**: Uses `theme !== 'light'` pattern (not `=== 'dark'`) to default to dark during hydration
- **Quote edits**: Modify `data/quotes.json` directly — no CMS or database
- **Legacy Python app**: Archived in `old_python_app/` (CustomTkinter widget, uses `uv`). Not part of the active codebase.
