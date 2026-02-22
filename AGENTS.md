# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project Summary
- Next.js 14 web app for a "quote of the day" experience.
- Uses TypeScript, Tailwind CSS, and the `app/` directory.
- Quotes are stored in `data/quotes.json` and served by an API route.

## Package Manager
- Use `pnpm` for all installs and scripts.
- Install: `pnpm install`
- Development: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`

## Code Structure
- `app/` contains Next.js routes and pages.
- `components/` holds reusable UI components.
- `hooks/` holds custom React hooks.
- `lib/` contains utilities.
- `data/` contains static data files such as `quotes.json`.

## Development Notes
- Prefer small, focused components with clear props.
- Keep styling in Tailwind classes where practical.
- Update `README.md` if user-facing commands or setup steps change.

## When Changing Quotes
- Edit `data/quotes.json`.
- Ensure JSON remains valid and sorted only if a change requires it.

## Checks
- Run `pnpm lint` before finishing.
- If changing build or config, also run `pnpm build`.
