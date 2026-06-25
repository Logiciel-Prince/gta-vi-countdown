# GTA VI Countdown — Vice City Awaits 🌴

A premium, frontend-only fan website counting down to **Grand Theft Auto VI**. Live countdown, neon Vice City aesthetics, three themes, PWA-installable, and fully responsive.

> ⚠️ Unofficial, non-commercial fan project. Not affiliated with or endorsed by Rockstar Games / Take-Two Interactive. No official assets are used — all artwork is generated CSS/SVG placeholders.

## ✨ Features

- **Live countdown** — Years / Months / Days / Hours / Minutes / Seconds, updating every second with animated digit transitions, in the user's auto-detected timezone.
- **Progress bar** — how far we've come from announcement → launch (live %).
- **Three themes** — ☀ Light, 🌙 Dark, 🎮 **Vice** (pink/purple/orange/neon-blue, palms, 80s glow, scanlines). Persisted to `localStorage`.
- **Sections** — Hero, Countdown card, Latest Info, Features, Trailer (YouTube), Media Gallery (modal), scroll-animated Timeline, Fun Facts, Random Wallpaper, Quotes, FAQ.
- **Bonus** — share countdown, copy release date, favorite, random wallpaper, live local clock, keyboard shortcuts.
- **PWA** — installable, offline support, manifest + icons + service worker.
- **SEO** — meta, OpenGraph, Twitter cards, JSON-LD structured data, sitemap, robots.

### ⌨️ Keyboard shortcuts

| Key | Action |
| --- | --- |
| `V` | Toggle Vice Mode |
| `R` | Show a random fun fact |

## 🧱 Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · React Icons · `vite-plugin-pwa`. No backend, no database — all content lives in static JSON under `src/data/`.

## 🚀 Getting started

```bash
npm install
npm run dev        # start dev server
npm run build      # type-check + production build
npm run preview    # preview the production build
npm run icons      # regenerate PWA PNG icons from public/favicon.svg
```

## 🛠️ Editing content

Everything is data-driven — edit the JSON, no code changes needed:

| File | Controls |
| --- | --- |
| `src/data/release.json` | **Release date**, platforms, characters, trailer ID, etc. |
| `src/data/facts.json` | Fun facts |
| `src/data/timeline.json` | Timeline milestones |
| `src/data/faq.json` | FAQ entries |
| `src/data/gallery.json` | Gallery tiles (placeholders + video IDs) |
| `src/data/features.json` | Feature cards |
| `src/data/quotes.json` | Loading-screen quotes |
| `src/data/wallpapers.json` | Random wallpaper palettes |
| `src/data/news.json` | News items |

To change the **target date**, edit `releaseDateISO` in `src/data/release.json`. When it passes, the timer auto-swaps to “🎉 GTA VI is out now!”.

## ▲ Deploying to Vercel

The repo ships with `vercel.json` (Vite preset, SPA rewrite, immutable asset caching, and a non-cached service worker so PWA updates propagate). Build settings are auto-detected; no dashboard config needed.

**Option A — Dashboard (recommended):**
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel → **Add New → Project**, import the repo.
3. Framework: **Vite** · Build: `npm run build` · Output: `dist` (all auto-detected). Click **Deploy**.

**Option B — CLI:**
```bash
npm i -g vercel
vercel login
vercel          # preview deploy
vercel --prod   # production deploy
```

After your first deploy, update the absolute URLs in `index.html` (OpenGraph/Twitter/canonical), `public/sitemap.xml`, and `public/robots.txt` from `https://gta6-countdown.example.com` to your real Vercel domain so social cards and SEO resolve correctly.

## 📁 Structure

```
src/
  components/   layout · sections · countdown · background · ui
  context/      ThemeContext · ToastContext
  hooks/        useCountdown · useClock · useLocalStorage · useKeyboardShortcuts · useMediaQuery
  data/         static JSON content
  utils/        time · share · format
  styles/       index.css (Tailwind + theme tokens)
  App.tsx · main.tsx
```
