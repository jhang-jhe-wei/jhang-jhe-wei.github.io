# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next dev server (port 3000)
- `npm run build` — production build; `postbuild` automatically runs `next-sitemap`
- `npm run lint` — `next lint` (must be run manually; the build does not enforce it — see Gotchas)
- `npm run start` — serve the production build locally
- No test runner is configured.
- Deploy: `.github/workflows/deploy.yml` runs `next build` → `next export` → upload to GitHub Pages (only via `workflow_dispatch` — see Gotchas).

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

### Static export to GitHub Pages
CI runs `next build` then `next export` into `./out`, then `actions/upload-pages-artifact` + `actions/deploy-pages`. Site URL in `next-sitemap.config.js` is `https://wells.tw`. There is no server-side runtime — anything that requires SSR or per-request data will break the export.

## Gotchas

- **`next.config.js` silences both TS and ESLint errors at build time** (`typescript.ignoreBuildErrors: true`, `eslint.ignoreDuringBuilds: true`). Builds and CI deploys will pass with broken types. Run `npm run lint` and `npx tsc --noEmit` manually before declaring a change green.
- **Node version mismatch**: `.nvmrc` pins `18.12.1`, but `.github/workflows/deploy.yml` uses Node `20`. Match CI (20) when reproducing build issues.
- **Two lockfiles** (`package-lock.json` and `yarn.lock`) both exist. The CI `detect-package-manager` step picks **yarn** first because `yarn.lock` is present. Keep them in sync when changing deps.
- **Deploy workflow trigger is `branches: [$default-branch]`** — the literal GitHub template placeholder, not a real branch name. Push to `master` will NOT trigger a deploy; it only runs via `workflow_dispatch`.
- **`next export` is removed in Next 14.** This repo is pinned at 13.4 partly because of that. A Next upgrade requires migrating to `output: 'export'` in `next.config.js` and dropping the `next export` step from CI.
- **`@mui/x-charts` is in `transpilePackages`** because it ships untranspiled ESM. Keep it there if you bump the version.
