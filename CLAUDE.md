# CLAUDE.md

## Project

**Witbits** is a Vite + React 19 + TypeScript app (React Router, TanStack Query, react-hook-form) backed by Supabase, styled with Tailwind CSS v4 and CSS Modules.

Scripts: `npm run dev`, `npm test`, `npm run type-check`, `npm run lint`, `npm run build`.

## Styling

Tailwind CSS v4 via `@tailwindcss/vite`. Theme tokens live in `src/index.css` inside `@theme`:

- Colours: `primary`, `dark`, `subtle`, `muted`, `border`, `surface`, `background`, `error`, `accent`
- Font: `--font-sans`

Each token generates utilities (`bg-primary`, `text-dark`, `border-border`…) and a CSS variable (`var(--color-primary)`).
Global defaults (body, headings, focus ring) are in `@layer base` in `src/index.css`, so module classes always override them.

Components use CSS Modules with Tailwind:

- Every `*.module.css` starts with `@reference` pointing to `src/index.css` (relative path — adjust depth to the file's location).
- Do NOT apply Tailwind classes directly in JSX unless it's a single class. When an element needs multiple classes, combine them into a named CSS Module class using `@apply`.
- Write flat selectors, not nested ones. Prefer one class per element (`.title`, not `.dialog .header .title`) — CSS Modules already scope class names.
- Combine selectors only when it means something: a state or variant on the same element (`.button.primary`, `.button:focus-visible`), an element that can't take a class (`.header a`), or extra specificity to override another module's class on the same element (comment why).
- Animations from `@apply` need their keyframes generated globally (CSS Modules hash `@keyframes` names) — add them to `@source inline(...)` in `src/index.css`.

## Component structure

Components in `src/components/views` and `src/shared/components` use one folder per component:

```
Button/
- index.ts            export { default } from "./Button";
- Button.tsx
- Button.module.css
```

Import components by folder: `@/shared/components/Button`.
