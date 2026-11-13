# KNPiMI — Website (`grupadotnet.github.io`)

Official website for **Koło Naukowe Programistów i Miłośników Informatyki (KNPiMI)** at the Faculty of Mechanical Engineering, Cracow University of Technology (_Wydział Mechaniczny Politechniki Krakowskiej_).

## Tech Stack

- **Framework & Build:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 8](https://vite.dev/)
- **Routing & Data:** [TanStack Router](https://tanstack.com/router) (file-based routes in `src/routes/`) & [TanStack Query](https://tanstack.com/query)
- **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (`base-maia` / `@base-ui/react`), [Remix Icon](https://remixicon.com/)
- **Maps & Carousels:** [MapLibre GL](https://maplibre.org/), [Embla Carousel](https://www.embla-carousel.com/)
- **Internationalization:** [i18next](https://www.i18next.com/) / `react-i18next` / `i18next-cli` (`pl`, `en`, `ua` configured; Polish default) + [Crowdin](https://crowdin.com/) (`crowdin.yml`)
- **Tooling:** ESLint, Prettier, [React Doctor](https://github.com/millionco/react-doctor)

## Features & Routes

- **`/`** — Landing page combining the hero section, schedule, about, sections, and contact
- **`/about`** — Overview of the club and its activities
- **`/sections`** — Club tracks (`WebDev`, `Data&AI`, `CyberSec`) and section subpages (e.g. `/sections/Webdev`)
- **`/schedule`** — Upcoming meetings fetched from Google Calendar (via Google Apps Script) with one-click event export and calendar subscription (Google Calendar, Apple Calendar, Outlook.com, Outlook 365, `.ics`)
- **`/contact`** — Direct communication channels (Email, Discord, Facebook, Matrix, Mastodon, LinkedIn)
- **`/identity/2026`** (`/identity` redirects here) — Brand & visual identity guidelines with downloadable SVG logo assets
- **Theme & Footer** — Light/dark/system theme switcher, interactive MapLibre location map, and partner logos carousel

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 24 (matches CI) and `npm` (a `bun.lock` is also present if you use [Bun](https://bun.sh/))

### Installation & Development

```bash
npm install
npm run dev
```

`vite.config.ts` binds the dev server with `server.host: true` and optionally reads comma-separated hostnames from `TAILSCALE_HOSTS` in `.env` for Tailscale access.

### Available Scripts

| Script                 | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Start the Vite development server                              |
| `npm run build`        | Type-check (`tsc -b`) and build production assets into `dist/` |
| `npm run preview`      | Preview the production build locally                           |
| `npm run lint`         | Run ESLint across the repository                               |
| `npm run format`       | Format files with Prettier                                     |
| `npm run format:check` | Check formatting with Prettier                                 |
| `npm run doctor`       | Run `react-doctor` health/lint audit                           |

> During `vite build`, a custom plugin copies `dist/index.html` to `dist/404.html` so client-side routes work on GitHub Pages.

## Project Structure

```text
├── .github/workflows/   # CI checks (Prettier, ESLint, React Doctor), CodeQL, GitHub Pages deploy
├── public/              # Static assets (favicon, partner logos, KNPiMI & PK SVG brand marks)
├── src/
│   ├── components/      # Shared components (Header, Footer, Hello, theme-provider, ui/)
│   ├── lib/             # Utilities, calendar link builders, section definitions, custom hooks
│   ├── locales/         # i18n translation files (pl, en, ua)
│   ├── routes/          # TanStack Router file-based routes
│   ├── i18n.ts          # i18next initialization
│   ├── index.css        # Tailwind CSS v4 & theme variables
│   └── main.tsx         # App entry point
├── components.json      # shadcn/ui configuration
├── crowdin.yml          # Crowdin localization sync config
├── i18next.config.ts    # i18next-cli extraction config
└── vite.config.ts       # Vite, TanStack Router, Tailwind, and GitHub Pages 404 plugin config
```

## CI/CD & Deployment

- **Pull Requests (`.github/workflows/main.yml`):** Runs Prettier formatting checks, ESLint, and React Doctor on changed files.
- **Deploy & Release (`.github/workflows/deploy.yml`):** Pushes to `main` build `dist/`, deploy to GitHub Pages, and publish a tagged GitHub Release (`v1.0.<run_number>`) with `release-build.zip`.
- **Security (`.github/workflows/codeql.yml`):** Runs CodeQL analysis.
