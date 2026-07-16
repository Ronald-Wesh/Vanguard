# VANGUARD Hero Landing Page — Design

## Stack
Vite + React + TypeScript + Tailwind CSS v3. Icons: `lucide-react` (new dependency, approved).

## Structure
Single `src/App.tsx`. One `useState<boolean>` for mobile menu open/close. No routing, no other components/pages.

## Fonts
- `FSP DEMO - PODIUM Sharp 4.11` via `@font-face` (webfont URL below), Tailwind key `fontFamily.podium`, utility class `.font-podium`.
  `https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11`
- Inter (400/500/600/700) via Google Fonts `<link>` in `index.html`, Tailwind key `fontFamily.inter`.

## Background video
Fullscreen `<video autoPlay muted loop playsInline className="object-cover">` pointing at:
`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4`
Single viewport-height section (`h-screen`/`min-h-screen`), all content absolutely/relatively overlaid on top with a dark overlay div for text contrast (implied by white text on video — not separately specced, use a simple `bg-black/40` overlay layer).

## Layout pieces
1. Navbar — brand left, 4 nav links + CTA center/right (`md`+), hamburger (`<md`).
2. Mobile menu overlay — fixed fullscreen, staggered link/CTA entrance animation, closes on link click.
3. Hero content block — tagline, 3-line heading, subtext, CTA row, stats row — all staggered `animate-fade-up*`.

Exact classes, copy, icon choices, breakpoints, and animation timings are as given verbatim in the parent request — no deviation, no additions.

## CSS animations
`fade-up`, `fade-in`, `scale-in` keyframes in `index.css` under `@layer utilities`, plus delay variants `.animate-fade-up-delay-1..4` (0.2s increments) and `.animate-fade-in-delay`.

## Out of scope
No backend, no routing, no CMS, no additional pages/sections below the fold, no tests beyond a visual check in browser (this is a static marketing hero, no business logic to unit test).
