# VANGUARD Hero Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-viewport VANGUARD hero landing page (React + Tailwind + Vite) with looping background video, animated nav/hero content, and a mobile menu overlay, exactly matching the locked spec.

**Architecture:** Vite scaffold, Tailwind v3 for styling, one `src/App.tsx` component holding all markup and a single `useState` for mobile menu state. No routing, no sub-components, no backend.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v3, lucide-react (icons).

## Global Constraints

- Video URL (verbatim): `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4`
- Podium font URL (verbatim): `https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11`
- Inter font: Google Fonts, weights 400/500/600/700
- Icons: `lucide-react` only — `ArrowUpRight`, `Award`, `Crown`, `X`
- Single `src/App.tsx`, single `useState` for menu toggle — no other components/files for markup
- Breakpoints: mobile-first, `sm` 640px / `md` 768px / `lg` 1024px, exactly as spec'd class-by-class
- No new dependency beyond `lucide-react` (already approved)
- No unit test framework — this is a static marketing page with no business logic; verification is done via the browser preview tools (dev server + screenshot/inspect/snapshot), per project convention of verifying UI in-browser before moving to the next piece

---

### Task 1: Scaffold project, install Tailwind + lucide-react

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css` (via `npm create vite`)
- Create: `tailwind.config.js`, `postcss.config.js` (via `npx tailwindcss init -p`)

**Interfaces:**
- Produces: a running Vite dev server on a free port serving a blank React root, Tailwind directives wired into `src/index.css`, `lucide-react` importable.

- [ ] **Step 1: Scaffold Vite React-TS app in place**

```bash
cd /home/ronald/Desktop/Personal-Projects/NinjaTurtle
npm create vite@latest . -- --template react-ts
```

If prompted about a non-empty directory (the `docs/` folder already exists), confirm to proceed.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
```

- [ ] **Step 3: Init Tailwind config files**

```bash
npx tailwindcss init -p
```

Expected: creates `tailwind.config.js` and `postcss.config.js` in project root.

- [ ] **Step 4: Verify dev server boots**

```bash
npm run dev -- --port 5173
```

Then in the assistant's preview tool: `preview_start` with a `launch.json` config `{"name":"vanguard","runtimeExecutable":"npm","runtimeArgs":["run","dev"],"port":5173}`, then `preview_screenshot`. Expected: default Vite+React starter page renders with no console errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.node.json index.html src tailwind.config.js postcss.config.js .gitignore
git commit -m "chore: scaffold VANGUARD hero project with Vite, React, TS, Tailwind"
```

---

### Task 2: Configure Tailwind content globs, fonts, base CSS

**Files:**
- Modify: `tailwind.config.js` (full replace)
- Modify: `src/index.css` (full replace, Tailwind directives + `@font-face`)
- Modify: `index.html` (add Google Fonts `<link>`, set `<title>`)

**Interfaces:**
- Produces: `font-podium` and `font-inter` Tailwind utility classes (Tailwind auto-generates `font-{key}` utilities from any `theme.fontFamily` key, so registering `podium`/`inter` there is sufficient — no extra manual utility class needed).

- [ ] **Step 1: Replace `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        podium: ['"PODIUM Sharp"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Replace `src/index.css` with Tailwind directives + font-face**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'PODIUM Sharp';
  src: url('https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11');
  font-weight: normal;
  font-style: normal;
}

html, body, #root {
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 3: Update `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>VANGUARD</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Verify fonts load**

Reload the dev server preview. Use `preview_eval` with:
```js
getComputedStyle(document.body).fontFamily
```
Expected: no console 404s for the font URLs (check with `preview_console_logs`, `level: "error"`).

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js src/index.css index.html
git commit -m "feat: configure Tailwind fonts (Podium, Inter) for VANGUARD hero"
```

---

### Task 3: Add fade animation utilities

**Files:**
- Modify: `src/index.css` (append `@layer utilities` block)

**Interfaces:**
- Produces: `.animate-fade-up`, `.animate-fade-up-delay-1..4`, `.animate-fade-in`, `.animate-fade-in-delay` classes, each starting at `opacity: 0` and animating to visible, `animation-fill-mode: forwards`.

- [ ] **Step 1: Append animation utilities to `src/index.css`**

```css
@layer utilities {
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  .animate-fade-up {
    opacity: 0;
    animation: fade-up 0.8s ease-out forwards;
  }
  .animate-fade-up-delay-1 {
    opacity: 0;
    animation: fade-up 0.8s ease-out 0.2s forwards;
  }
  .animate-fade-up-delay-2 {
    opacity: 0;
    animation: fade-up 0.8s ease-out 0.4s forwards;
  }
  .animate-fade-up-delay-3 {
    opacity: 0;
    animation: fade-up 0.8s ease-out 0.6s forwards;
  }
  .animate-fade-up-delay-4 {
    opacity: 0;
    animation: fade-up 0.8s ease-out 0.8s forwards;
  }
  .animate-fade-in {
    opacity: 0;
    animation: fade-in 0.8s ease-out forwards;
  }
  .animate-fade-in-delay {
    opacity: 0;
    animation: fade-in 0.8s ease-out 0.3s forwards;
  }
}
```

- [ ] **Step 2: Verify class exists**

`preview_eval`: `getComputedStyle(document.createElement('div')).animationName` is not directly useful; instead sanity-check by grep:
```bash
grep -c "animate-fade-up-delay-4" /home/ronald/Desktop/Personal-Projects/NinjaTurtle/src/index.css
```
Expected: `1` (or more).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add fade-up/fade-in animation utilities"
```

---

### Task 4: Base layout shell — fullscreen video + overlay + App skeleton

**Files:**
- Modify: `src/App.tsx` (full replace)

**Interfaces:**
- Consumes: Tailwind classes from Tasks 2-3.
- Produces: `App` default export, a `h-screen` root div containing the background `<video>`, a dark overlay, and empty `<nav>`/hero containers that later tasks fill in.

- [ ] **Step 1: Replace `src/App.tsx` with the shell**

```tsx
import { useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col">
        <nav />
        <div className="flex flex-1 flex-col justify-center px-6 sm:px-10 lg:px-16" />
      </div>

      <div className="fixed inset-0 z-50 hidden">
        {menuOpen && null}
      </div>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Verify video renders fullscreen with dark overlay**

`preview_screenshot`. Expected: fullscreen video visible, darkened. `preview_console_logs` level `error`: no video load errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add fullscreen background video shell for VANGUARD hero"
```

---

### Task 5: Navbar (desktop links + CTA + hamburger)

**Files:**
- Modify: `src/App.tsx` (replace the empty `<nav />` with full navbar markup)

**Interfaces:**
- Consumes: `menuOpen`, `setMenuOpen` from Task 4's `useState`.
- Produces: hamburger button wired to `setMenuOpen(true)`, used by Task 6's overlay.

- [ ] **Step 1: Replace imports and `<nav />` in `src/App.tsx`**

Change the import line to:
```tsx
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
```

Replace `<nav />` with:
```tsx
<nav className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
  <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
    VANGUARD
  </span>

  <div className="hidden items-center gap-10 md:flex">
    {NAV_LINKS.map((link) => (
      <a
        key={link}
        href="#"
        className="font-inter text-sm uppercase tracking-widest text-white/80 transition hover:text-white"
      >
        {link}
      </a>
    ))}
  </div>

  <a
    href="#"
    className="hidden items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 md:flex"
  >
    Get in Touch
    <ArrowUpRight className="h-4 w-4" />
  </a>

  <button
    className="flex flex-col space-y-1.5 md:hidden"
    onClick={() => setMenuOpen(true)}
    aria-label="Open menu"
  >
    <div className="h-0.5 w-6 bg-white" />
    <div className="h-0.5 w-6 bg-white" />
    <div className="h-0.5 w-4 bg-white" />
  </button>
</nav>
```

Add above `function App()`:
```tsx
const NAV_LINKS = ['Projects', 'Studio', 'Offerings', 'Inquire'];
```

- [ ] **Step 2: Verify navbar at desktop and mobile widths**

`preview_resize` to `desktop` preset, `preview_screenshot` — expect brand left, 4 links + CTA button visible. `preview_resize` to `mobile` preset, `preview_screenshot` — expect brand left, 3-bar hamburger right, links/CTA hidden. Click hamburger with `preview_click` on `button[aria-label="Open menu"]` — `menuOpen` state should flip (verify via `preview_eval`: React state isn't directly readable, so just confirm no console errors and the click handler fires without throwing).

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add VANGUARD navbar with nav links, CTA, and hamburger"
```

---

### Task 6: Mobile menu overlay

**Files:**
- Modify: `src/App.tsx` (replace the placeholder `<div className="fixed inset-0 z-50 hidden">` block)

**Interfaces:**
- Consumes: `menuOpen`, `setMenuOpen`, `NAV_LINKS` from Task 5.
- Produces: fullscreen overlay that closes via `X` icon or any nav link click.

- [ ] **Step 1: Update import**

```tsx
import { ArrowUpRight, X } from 'lucide-react';
```

- [ ] **Step 2: Replace the placeholder overlay div**

```tsx
<div
  className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
    menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
  }`}
>
  <div className="flex items-center justify-between px-6 py-5 sm:px-10">
    <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
      VANGUARD
    </span>
    <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
      <X className="h-7 w-7 text-white" />
    </button>
  </div>

  <div className="flex h-[calc(100%-88px)] flex-col items-center justify-center gap-6">
    {NAV_LINKS.map((link, i) => (
      <a
        key={link}
        href="#"
        onClick={() => setMenuOpen(false)}
        className="font-podium text-4xl uppercase text-white transition-all duration-500 sm:text-5xl"
        style={{
          transitionDelay: `${i * 80 + 100}ms`,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        {link}
      </a>
    ))}

    <a
      href="#"
      onClick={() => setMenuOpen(false)}
      className="mt-4 flex items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition-all duration-500 hover:border-white/60"
      style={{
        transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      Get in Touch
      <ArrowUpRight className="h-4 w-4" />
    </a>
  </div>
</div>
```

- [ ] **Step 3: Verify open/close + stagger**

`preview_resize` mobile. `preview_click` on `button[aria-label="Open menu"]`. `preview_screenshot` — expect fullscreen dark overlay with 4 stacked links + CTA, staggered in. `preview_click` on `button[aria-label="Close menu"]`. `preview_screenshot` — expect overlay gone (invisible/opacity-0).

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add staggered mobile menu overlay"
```

---

### Task 7: Hero content — tagline, heading, subtext, CTA row, stats row

**Files:**
- Modify: `src/App.tsx` (fill the empty hero content div from Task 4, add `Award`/`Crown` imports and `STATS` constant)

**Interfaces:**
- Consumes: animation utility classes from Task 3.
- Produces: complete hero visual — nothing downstream depends on this task.

- [ ] **Step 1: Update import**

```tsx
import { ArrowUpRight, Award, Crown, X } from 'lucide-react';
```

- [ ] **Step 2: Add `STATS` constant below `NAV_LINKS`**

```tsx
const STATS = [
  { value: '250+', label: 'Brands Transformed' },
  { value: '95%', label: 'Client Retention' },
  { value: '10+', label: 'Years in the Game' },
];
```

- [ ] **Step 3: Fill the hero content div**

Replace `<div className="flex flex-1 flex-col justify-center px-6 sm:px-10 lg:px-16" />` with:

```tsx
<div className="flex flex-1 flex-col justify-center px-6 sm:px-10 lg:px-16">
  <div className="mb-6 flex animate-fade-up items-center gap-2 lg:mb-8">
    <Crown className="h-4 w-4 text-white/70" />
    <span className="font-inter text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
      World-Class Digital Collective
    </span>
  </div>

  <h1 className="animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-tight text-white">
    <span className="block text-[clamp(2.8rem,8vw,7rem)]">Design.</span>
    <span className="block text-[clamp(2.8rem,8vw,7rem)]">Disrupt.</span>
    <span className="block text-[clamp(2.8rem,8vw,7rem)]">Conquer.</span>
  </h1>

  <p className="animate-fade-up-delay-2 mt-6 max-w-md font-inter text-sm leading-relaxed text-white/70 sm:text-base lg:mt-8">
    We build fierce brand identities
    <br />
    that don't just turn heads — <span className="font-bold text-white">they lead.</span>
  </p>

  <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10">
    <button className="group flex items-center gap-2 bg-black px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition hover:bg-neutral-900 sm:px-7 sm:py-4 sm:text-xs">
      See Our Work
      <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>

    <div className="hidden items-center gap-3 sm:flex">
      <Award className="h-8 w-8 text-white/50" />
      <div className="font-inter text-xs uppercase tracking-wider text-white/60">
        <div>Top-Rated</div>
        <div>Brand Studio</div>
      </div>
    </div>
  </div>

  <div className="animate-fade-up-delay-4 mt-8 flex flex-wrap gap-6 sm:mt-10 sm:gap-12 lg:mt-14 lg:gap-16">
    {STATS.map((stat) => (
      <div key={stat.label}>
        <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {stat.value}
        </div>
        <div className="mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Verify full hero at 3 breakpoints**

`preview_resize` to `mobile`, `tablet`, `desktop` presets in turn; `preview_screenshot` at each. Expect: tagline → heading → subtext → CTA row → stats row all visible, staggered fade-up on load, no horizontal overflow (check `document.documentElement.scrollWidth <= window.innerWidth` via `preview_eval`).

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add VANGUARD hero content (tagline, heading, subtext, CTA, stats)"
```

---

### Task 8: Final cross-breakpoint verification pass

**Files:** none (verification only)

**Interfaces:** none — final gate before calling the feature done.

- [ ] **Step 1: Full-page check at mobile (375x812)**

`preview_resize` width 375 height 812. `preview_screenshot`. Confirm: hamburger visible, nav links/CTA hidden, Award badge hidden, stats wrap without overflow.

- [ ] **Step 2: Full-page check at tablet (768x1024)**

`preview_resize` preset `tablet`. `preview_screenshot`. Confirm: nav links + CTA visible (at `md`), hamburger hidden.

- [ ] **Step 3: Full-page check at desktop (1280x800)**

`preview_resize` preset `desktop`. `preview_screenshot`. Confirm: full layout, Award badge visible, stats in one row.

- [ ] **Step 4: Console error check**

`preview_console_logs` level `error`. Expected: empty (no font/video 404s, no React warnings).

- [ ] **Step 5: Commit (if any fixes were needed during this pass)**

```bash
git add src/App.tsx src/index.css
git commit -m "fix: responsive polish after cross-breakpoint verification"
```

(Skip if no changes were needed.)
