# Witbits

An image gallery and form app built with Vite, React 19 and TypeScript (React Router, TanStack Query, react-hook-form). A small Express server serves the JSON image feed.

## Getting started

```sh
npm ci
npm run dev:all   # runs the Express server and the Vite app together
```

## Scripts

- `npm run dev` – start the Vite dev server
- `npm run serve` – start the Express image server
- `npm test` – run tests (Vitest)
- `npm run type-check` – TypeScript check
- `npm run lint` – ESLint
- `npm run build` – production build

## Notes

### Memoization

Components are written as pure functions of their props, so atomic components with primitive props (`Image`, `Content`, `Text`, `Button` ...) are wrapped in `memo`.

### Concurrent fetching

The image API has variable latency, so `useImages` fires two requests at once: a small initial batch and the full set. Whichever resolves first is shown. React Query caches both with a 30 min staleTime.
