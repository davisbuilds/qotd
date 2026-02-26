# Architecture

## High-Level Flow

1. Root layout (`app/layout.tsx`) wraps the app in `ThemeProvider` with dark mode default.
2. Main page (`app/page.tsx`) is a client component managing quote state, auto-refresh, and favorites.
3. API route (`/api/quotes/random`) reads `data/quotes.json` and returns a random quote.
4. Components handle display, interaction, and theming as isolated units.
5. Favorites persist in `localStorage` via the `useFavorites` hook.

## App Router Structure

- `app/layout.tsx`: Root layout with `ThemeProvider` (next-themes, default dark).
- `app/page.tsx`: Client component — fetches quote, manages refresh timer (2 min), renders UI.
- `app/api/quotes/random/route.ts`: `force-dynamic` GET handler, no-cache headers, singleton quote array.
- `app/globals.css`: Custom animations, glassmorphism classes, and theme-aware backgrounds.

## Components

| Component | File | Role |
|-----------|------|------|
| `QuoteDisplay` | `components/QuoteDisplay.tsx` | Renders quote text with decorative marks and 700ms fade transitions |
| `FavoriteButton` | `components/FavoriteButton.tsx` | Star icon toggle for favoriting quotes |
| `RefreshButton` | `components/RefreshButton.tsx` | Circular button with rotation animation |
| `FavoritesView` | `components/FavoritesView.tsx` | Full-screen modal listing saved favorites |
| `ThemeToggle` | `components/ThemeToggle.tsx` | Sun/Moon toggle for dark/light mode |
| `ThemeProvider` | `components/ThemeProvider.tsx` | Wrapper around next-themes provider |

## Hooks

- `useFavorites` (`hooks/useFavorites.ts`): Manages favorites array in `localStorage` (key: `qotd-favorites`). Returns `favorites`, `toggleFavorite`, `removeFavorite`, `clearFavorites`, `isFavorite`, `isLoaded`.

## Data

- `data/quotes.json`: 200+ quotes, each with `id` (number), `quote` (string), `author` (string).
- Loaded once into memory by the API route (singleton pattern).
- To edit quotes, modify `data/quotes.json` directly.

## Styling

- Tailwind CSS with `darkMode: ['class']`.
- Custom CSS classes in `globals.css`:
  - `elegant-bg-dark` / `elegant-bg-light`: Gradient backgrounds with subtle pulse.
  - `refined-glass-dark` / `refined-glass-light`: 40px blur glassmorphism with layered shadows.
  - `quote-mark`: Georgia serif decorative marks.
  - `elegant-hover`: Cubic-bezier translateY hover effect.
- Responsive typography: 2xl to 5xl with font-light weight.

## Hydration Pattern

Uses `theme !== 'light'` (not `=== 'dark'`) so the app defaults to dark during SSR hydration without flash.

## Directory Map

```text
app/                      # Routes, API, layout, global styles
components/               # UI components (6) + ui/ primitives (2)
hooks/                    # useFavorites custom hook
data/                     # quotes.json (200+ entries)
types/                    # Quote type definition
lib/                      # Constants and utilities
old_python_app/           # Archived legacy Python widget
```
