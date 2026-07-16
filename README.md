# VANGUARD

Fullscreen hero landing page for a creative agency — looping background video, animated nav, and a staggered-entrance hero built with React, Tailwind CSS, and Vite.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- [lucide-react] for icons
## Features

- Fullscreen looping background video with dark overlay
- Custom typography: PODIUM Sharp display font + Inter for body/UI
- Responsive navbar with mobile hamburger menu and animated overlay
- Staggered fade-up entrance animations on load
- Fully responsive (mobile / tablet / desktop breakpoints)

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build   # production build to dist/
```

## Structure

Single-page, single-viewport hero. All markup lives in `src/App.tsx` with one `useState` controlling the mobile menu. No routing.

- `src/App.tsx` — navbar, mobile menu overlay, hero content (tagline, heading, subtext, CTA, stats)
- `src/index.css` — Tailwind directives, `PODIUM Sharp` `@font-face`, fade-up/fade-in animation utilities
- `tailwind.config.js` — `font-podium` / `font-inter` font families

## Design docs

Full spec and implementation plan: [`docs/superpowers/specs/`](docs/superpowers/specs/) and [`docs/superpowers/plans/`](docs/superpowers/plans/).
