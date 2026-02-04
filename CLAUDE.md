# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running and Development Commands

### Running the Application (Next.js Web App)

```bash
# Development server
pnpm run dev

# Production build and start
pnpm run build
pnpm start

# Linting
pnpm run lint
```

### Legacy Python App Commands (Archived)

The original Python desktop widget is archived in `old_python_app/`. To work with it:

```bash
# Navigate to archived app
cd old_python_app

# Setup Python environment
uv sync
uv shell

# Run the Python desktop widget
uv run quote-of-day
uv run qotd

# Run Python tests
python -m unittest tests/test_quote_manager.py
python -m unittest discover tests/
```

### Environment Setup

```bash
# Install Node.js dependencies
pnpm install

# For Python app development (archived)
cd old_python_app && uv sync
```

## Architecture Overview

This is a **Next.js 14 web application** that displays inspirational quotes with an **elegant minimalist design** and smooth animations. The original Python CustomTkinter desktop widget has been completely refactored into this web app.

### Design Philosophy

The application features a sophisticated, minimalist aesthetic with:
- **Elegant Backgrounds**: Muted gradient backgrounds with subtle pulse animations
- **Refined Glassmorphism**: Enhanced 40px blur with layered shadows for depth
- **Minimalist Buttons**: Circular design with elegant hover effects and subtle rings
- **Large Typography**: Hero-sized quote text (2xl-5xl) with font-light weight
- **Decorative Elements**: Georgia serif quotation marks for visual interest
- **Dark Mode First**: Defaults to dark mode with seamless light mode toggle

### Core Next.js App Structure

**Main Page (`app/page.tsx`)**
- Client-side React component managing quote state and auto-refresh
- Implements 2-minute auto-refresh interval (120,000ms)
- Handles loading states, error handling, and smooth transitions
- Elegant minimalist layout with centered content and refined glass card
- Integrates QuoteDisplay, RefreshButton, FavoriteButton, FavoritesView, and ThemeToggle components
- Manages favorites state using the useFavorites hook
- Uses `theme !== 'light'` pattern to default to dark mode during hydration

**API Route (`app/api/quotes/random/route.ts`)**
- Next.js API route returning random quotes from JSON data
- Loads quotes from `data/quotes.json` (100+ inspirational quotes)
- Provides error handling for missing/corrupted data
- Returns JSON response with id/quote/author structure
- Implements `force-dynamic` to prevent static optimization
- Includes no-cache headers to ensure truly random quotes on each request

**Quote Display System (`components/QuoteDisplay.tsx`)**
- Animated quote presentation with 700ms fade transitions
- Decorative quotation marks in Georgia serif font
- Large responsive typography (2xl to 5xl breakpoints)
- Visual separator line between quote and author
- Font-light weight for elegant appearance
- Proper semantic HTML with blockquote elements

**Theme System (`components/ThemeProvider.tsx`, `components/ThemeToggle.tsx`)**
- Dark/light mode with localStorage persistence (defaults to dark)
- Uses next-themes for seamless theme switching
- Circular minimalist toggle with animated icon transitions
- Hydration-safe with `theme !== 'light'` pattern
- Integrates with Tailwind CSS custom properties

**Favorites System (`components/FavoriteButton.tsx`, `components/FavoritesView.tsx`, `hooks/useFavorites.ts`)**
- Star button to add/remove quotes from favorites (circular minimalist design)
- localStorage persistence for favorite quotes
- Favorites view modal displaying all saved quotes
- Heart icon badge showing favorites count in the top-right corner
- Ability to remove individual favorites or clear all at once
- Integrated into main card footer alongside refresh button

### Data Management

- **Quote Source**: `data/quotes.json` contains 200+ curated quotes
- **Quote Type**: TypeScript interface defined in `types/quote.ts`
- **Data Structure**: Each quote has `id` (number), `quote` (string), and `author` (string) fields
- **API Access**: RESTful endpoint at `/api/quotes/random`
- **Persistence**: Favorites stored in browser localStorage with key `qotd-favorites`

### Technology Stack

- **Framework**: Next.js 14 with App Router and TypeScript
- **UI**: Custom components with minimalist circular button design
- **Styling**: Tailwind CSS with custom elegant backgrounds and refined glassmorphism
- **Icons**: Lucide React (RotateCw, Star, Heart, Moon, Sun, Sparkles)
- **State**: React hooks for client-side state management
- **Theme**: next-themes with dark mode default
- **Deployment**: Vercel-optimized with zero configuration

### Key Features Implementation

- **Auto-refresh**: 2-minute interval using `setInterval` in `useEffect` (120,000ms)
- **Manual Refresh**: Circular button with RotateCw icon triggers immediate new quote fetch
- **Favorites**: Star button to save and manage favorite quotes with localStorage persistence
- **Favorites Badge**: Heart icon in top-right with visual counter showing saved count
- **Smooth Transitions**: 700ms fade animations with scale and translate effects
- **Elegant Hover Effects**: Subtle translateY(-2px) on hover with cubic-bezier easing
- **Theme Persistence**: localStorage integration via next-themes, defaults to dark mode
- **Hydration Safe**: Uses `theme !== 'light'` pattern to prevent flash on load
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints (md, lg, xl)
- **Loading States**: "Gathering wisdom..." with shimmer animation
- **Error Handling**: Graceful fallbacks for API failures and loading states
- **Cache Prevention**: API configured with `force-dynamic` and no-cache headers

## Migration Notes

The codebase was migrated from a Python CustomTkinter desktop widget to a Next.js web application:

- **Legacy Code**: Original Python app preserved in `old_python_app/`
- **Data Migration**: CSV quotes converted to JSON format
- **UI Modernization**: CustomTkinter → React + Tailwind CSS
- **Platform Expansion**: Desktop-only → Cross-platform web app
- **Architecture**: Local Python → Next.js API routes + client components

## Development Workflow

- Use `pnpm run dev` for development with hot reload
- Run `pnpm run lint` before committing changes
- Quote data modifications require editing `data/quotes.json`
- Component changes automatically reflected due to React Fast Refresh
- Build verification with `pnpm run build` before deployment
