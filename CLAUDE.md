# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next dev server (port 3000)
- `npm run build` — production build; `postbuild` automatically runs `next-sitemap`
- `npm run lint` — `next lint` (must be run manually; the build does not enforce it — see Gotchas)
- `npm run start` — serve the production build locally
- No test runner is configured.
- Deploy: **Vercel, zero-config** — connected to this GitHub repo, every push to `master` is auto-deployed to https://wells.tw. There is no deploy workflow in this repo (an old GitHub Pages workflow used to live at `.github/workflows/deploy.yml` but was removed; it was never the production path).

## Tech Stack

Next.js 13.4 (Pages Router) · TypeScript · Tailwind 3 (dark mode via `class`) · Redux Toolkit · next-i18next · MUI 5 + MUI X Charts · next-seo · next-sitemap · react-markdown (remark/rehype) · gray-matter for YAML.

Path alias: `@/*` → repo root (`tsconfig.json`).

## Architecture

### i18n & content — two separate surfaces
Default locale `zh-TW`, other `en` (`next-i18next.config.js`).

- **UI strings** live in `public/locales/{en,zh-TW}/*.json`, consumed via `useTranslation()` / `appWithTranslation`.
- **Page content** (about, portfolio) lives in `data/{en,zh-TW}/*.yml`, parsed server-side via gray-matter and passed as page props.

Adding a string or content item means editing BOTH locale variants.

### Pages Router (`pages/`)
`_app.tsx` composition order: Redux `Provider` → next-seo `DefaultSeo` → next-i18next HOC → GA `gtag` on `routeChangeComplete` → `ModeEffect` writes the Redux `mode` value to `<html class>` so Tailwind dark mode picks it up.

`posts/[id].tsx` + `posts/page/` use a **custom pagination URL scheme** (`lib/postQuery.ts`): page 0 → `/`, otherwise `/posts/page-N_`. Do not casually replace this with `?page=N` — the format is encoded in `genQuery` / `parseQuery` and referenced by link generation.

### Redux (`reducers/`) — UI chrome only
Slices: `mode` (dark/light), `light`, `figure`, `neonsign`, `locale_slice`. No server state and no data fetching here. `store.ts` exports typed `useAppSelector` / `useAppDispatch` hooks.

### Hosting on Vercel
Vercel builds with `next build` (no static export) and runs the result with full Next.js SSR/SSG support, so `getStaticProps`, `getServerSideProps`, and next-i18next's built-in i18n routing all work as written. Site URL in `next-sitemap.config.js` is `https://wells.tw`.

## Gotchas

- **`next.config.js` silences both TS and ESLint errors at build time** (`typescript.ignoreBuildErrors: true`, `eslint.ignoreDuringBuilds: true`). The Vercel deploy will pass with broken types or lint errors. Run `npm run lint` and `npx tsc --noEmit` manually before declaring a change green.
- **`@mui/x-charts` is in `transpilePackages`** because it ships untranspiled ESM. Keep it there if you bump the version.
