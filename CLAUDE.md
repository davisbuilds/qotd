# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running and Development Commands

### Running the Application (Next.js Web App)

```bash
# Development server
npm run dev

# Production build and start
npm run build
npm start

# Linting
npm run lint
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
npm install

# For Python app development (archived)
cd old_python_app && uv sync
```

## Architecture Overview

This is a **Next.js 14 web application** that displays inspirational quotes with modern UI and smooth animations. The original Python CustomTkinter desktop widget has been completely refactored into this web app.

### Core Next.js App Structure

**Main Page (`app/page.tsx`)**
- Client-side React component managing quote state and auto-refresh
- Implements 1-minute auto-refresh interval (60,000ms)
- Handles loading states, error handling, and smooth transitions
- Integrates QuoteDisplay, RefreshButton, FavoriteButton, FavoritesView, and ThemeToggle components
- Manages favorites state using the useFavorites hook

**API Route (`app/api/quotes/random/route.ts`)**
- Next.js API route returning random quotes from JSON data
- Loads quotes from `data/quotes.json` (100+ inspirational quotes)
- Provides error handling for missing/corrupted data
- Returns JSON response with id/quote/author structure
- Implements `force-dynamic` to prevent static optimization
- Includes no-cache headers to ensure truly random quotes on each request

**Quote Display System (`components/QuoteDisplay.tsx`)**
- Animated quote presentation with fade transitions
- Typography scaling for mobile/desktop responsiveness
- Blockquote styling with proper semantic HTML

**Theme System (`components/ThemeProvider.tsx`, `components/ThemeToggle.tsx`)**
- Dark/light mode with localStorage persistence
- Uses next-themes for seamless theme switching
- Integrates with Tailwind CSS custom properties

**Favorites System (`components/FavoriteButton.tsx`, `components/FavoritesView.tsx`, `hooks/useFavorites.ts`)**
- Heart button to add/remove quotes from favorites
- localStorage persistence for favorite quotes
- Favorites view modal displaying all saved quotes
- Badge showing favorites count in the top-right corner
- Ability to remove individual favorites or clear all at once

### Data Management

- **Quote Source**: `data/quotes.json` contains 100+ curated quotes
- **Quote Type**: TypeScript interface defined in `types/quote.ts`
- **Data Structure**: Each quote has `id` (number), `quote` (string), and `author` (string) fields
- **API Access**: RESTful endpoint at `/api/quotes/random`
- **Persistence**: Favorites stored in browser localStorage with key `qotd-favorites`

### Technology Stack

- **Framework**: Next.js 14 with App Router and TypeScript
- **UI**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **State**: React hooks for client-side state management
- **Deployment**: Vercel-optimized with zero configuration

### Key Features Implementation

- **Auto-refresh**: 1-minute interval using `setInterval` in `useEffect` (60,000ms)
- **Manual Refresh**: Button triggers immediate new quote fetch with animations
- **Favorites**: Save and manage favorite quotes with localStorage persistence
- **Favorites Badge**: Visual counter showing number of saved favorites
- **Smooth Transitions**: 300ms fade animations coordinated between components
- **Theme Persistence**: localStorage integration via next-themes
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
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

- Use `npm run dev` for development with hot reload
- Run `npm run lint` before committing changes
- Quote data modifications require editing `data/quotes.json`
- Component changes automatically reflected due to React Fast Refresh
- Build verification with `npm run build` before deployment
