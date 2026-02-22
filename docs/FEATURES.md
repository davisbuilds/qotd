# Features

Product-surface reference for Quote of the Day.

## Quote Display

- Large hero typography (2xl-5xl) with font-light weight.
- Decorative Georgia serif quotation marks.
- 700ms fade transitions with scale and translate effects.
- Author attribution with visual separator.

## Auto-Refresh and Manual Refresh

- Quotes auto-refresh every 2 minutes (configurable in `lib/constants.ts`).
- Manual refresh via circular button with rotation animation.
- Loading shimmer animation during fetch.

## Favorites

- Save quotes with star button toggle.
- View saved favorites in full-screen modal overlay.
- Remove individual favorites or clear all.
- Badge counter in top-right showing saved count.
- Persisted in `localStorage` with key `qotd-favorites`.
- Hydration-safe: `isLoaded` flag prevents initial render mismatches.

## Dark Mode

- Dark mode is the default theme.
- Toggle between dark and light via Sun/Moon button.
- Theme persisted in `localStorage` by next-themes.
- Refined glassmorphism adapts to both modes (40px blur, layered shadows).
- Muted gradient backgrounds with subtle pulse animation.

## Responsive Design

- Mobile-first with breakpoints scaling up to desktop.
- Circular buttons with elegant hover effects.
- Typography scales from 2xl (mobile) to 5xl (desktop).

## API

| Endpoint | Method | Response |
|----------|--------|----------|
| `/api/quotes/random` | GET | `{ id, quote, author }` |

- `force-dynamic` prevents static optimization.
- No-cache headers ensure random selection on every request.
