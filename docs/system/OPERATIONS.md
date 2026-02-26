# Operations

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Useful Commands

```bash
pnpm dev            # Dev server with hot reload
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # ESLint
```

## Environment Variables

No environment variables are required. The app runs entirely with local data.

## CI

No CI pipeline. Quality gates are manual:

- `pnpm lint`
- `pnpm build`

## Editing Quotes

Modify `data/quotes.json` directly. Each entry requires:

```json
{
  "id": 123,
  "quote": "Your quote text here",
  "author": "Author Name"
}
```

Ensure valid JSON after editing. Rebuild the application to pick up changes in production.

## Deployment

- Target platform: Vercel (zero-config).
- Also compatible with Netlify or any Node.js host.
- No environment variables needed for deployment.
