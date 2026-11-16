# Witbits

A Vite + React 19 + TypeScript app (React Router, TanStack Query, react-hook-form) backed by Supabase.

## Getting started

1. Install dependencies:

   ```sh
   npm ci
   ```

2. Copy `.env.example` to `.env.local` and fill in the values from your Supabase project (Project Settings → API):

   ```sh
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

3. Set up the database by running `supabase/schema.sql`, then `supabase/seed.sql` for sample data, in the Supabase SQL editor.

4. Start the dev server:

   ```sh
   npm run dev
   ```

## Scripts

- `npm run dev` – start the Vite dev server
- `npm test` – run tests (Vitest)
- `npm run type-check` – TypeScript check
- `npm run lint` – ESLint
- `npm run build` – production build

## Notes

### Memoization

Components are written as pure functions of their props, so atomic components with primitive props (`Image`, `Content`, `Text`, `Button` ...) are wrapped in `memo`.

### Caching

TanStack Query caches Supabase responses with a 30 min staleTime.
