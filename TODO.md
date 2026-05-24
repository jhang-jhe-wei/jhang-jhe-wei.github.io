# TODO

整理 SSG 改造完成後尚未處理的事項，按優先級排序。

---

## 高優先

### 拿掉 `next.config.js` 的 `ignoreBuildErrors` / `ignoreDuringBuilds`

目前 `next.config.js` 同時關閉 TypeScript 跟 ESLint build-time 檢查，破掉 type / lint 也能 deploy 上線。`fix(types)` commit (`764cd97`) 已把 tsc errors 清到 0，但 lint 還有 ~50 個既存 error，所以這個開關目前無法直接拿掉。

**步驟**：先做下方「修既存 lint errors」→ 再拿掉這兩個 flag。

---

## 中優先

### 修既存 ~50 個 lint errors

`npm run lint` 列出的問題集中在 `components/`：
- `<img>` 改 `next/image`（多處，需要逐一加 width/height/alt）
- `==` → `===`（`components/portfolio/tags.tsx`、`components/timer.tsx`）
- `@typescript-eslint/explicit-function-return-type` 缺回傳型別（多處）
- `@typescript-eslint/strict-boolean-expressions` 對 nullable string 條件判斷
- `@typescript-eslint/no-floating-promises`（`components/nav/nav_icon_item.tsx`）

清完後就可以拿掉 `ignoreDuringBuilds`。

### 清死碼 `lib/postQuery.ts` + `/posts/[q]` route 殘跡

`lib/postQuery.ts` 設計給 `/posts/[q]` URL scheme（如 `/posts/page-1_`），但 pages 目錄裡並沒有 `[q].tsx`，實際 pagination 用 `/posts/page/[page]` 路由（見 `components/blog/pagination.tsx`）。整個 `postQuery.ts` 跟相關提示都是死碼，移除可降低未來踩雷機率。

### 清 `next-i18next.config.js` 的 `localePath`

Vercel build 出現 warning：

```
⚠ Invalid next.config.js options detected:
⚠   Unrecognized key(s) in object: 'localePath' at "i18n"
```

Next.js 15 把 `i18n` 物件的 keys 鎖死成官方支援的 subset，`localePath` 是 next-i18next 自己用的，被混在一起傳給 Next 就會跳這個 warning。把 `localePath` 從 `next-i18next.config.js` 的 `i18n` 物件搬到 `i18n` 物件外即可（next-i18next 會自己讀）。

### 修 `@screen` Tailwind 4 不認的 CSS

Build log 持續出現 PostCSS warning：

```
@screen sm { ... }    ^-- Unknown at rule: @screen
@screen xl { ... }    ^-- Unknown at rule: @screen
```

Tailwind 4 移除了 `@screen` 指令，要改寫成 `@media (min-width: theme('breakpoint-sm')) { ... }` 或 raw `@media (min-width: 640px)`。Grep `@screen` 找到所有出現位置就能批次處理。

---

## 低優先

### 升 ESLint 8 → 9（清 npm deprecated warnings）

`npm install` 跳的這批：

```
npm warn deprecated eslint@8.57.1: This version is no longer supported.
npm warn deprecated rimraf@3.0.2 / inflight@1.0.6 / glob@7.1.7 / ...
```

都是 ESLint 8 的 transitive deps。升 9 要同時動：
- `eslint-config-next` 已支援 9
- `eslint-config-standard-with-typescript` 已 deprecated → 換 `eslint-config-love`
- `@typescript-eslint/*` 跟著升

注意 ESLint 9 預設用 flat config (`eslint.config.js`)，可能需要連帶轉換現有 `.eslintrc.*`。

### `react-syntax-highlighter` 換輕量替代

Vercel build 時間瓶頸幾乎都在 `react-syntax-highlighter`（單篇文章 build 平均 10s+）。Vercel 上總體 build ~1 分鐘，本機則 8 分鐘。

替代方案：
- **`shiki`**（推薦）— build time 渲染，0 runtime cost、語法高亮品質高，唯一缺點是 chunk 略大
- **`prism-react-renderer`** — 比 react-syntax-highlighter 輕量很多，runtime 渲染

兩種都不需要動 ReactMarkdown 結構，換掉 `code` renderer 即可。

### 文章內圖片改 `next/image`

目前文章 markdown 的 `<img>` 是固定 800×800 + 直連 GitHub user-attachments CDN。改 `next/image` 可獲得：
- 自動 lazy load
- AVIF/WebP 轉換
- 多解析度（srcset）

需在 `next.config.js` 加 `images.remotePatterns` 允許 `user-images.githubusercontent.com` 跟 `github.com/.../assets/...`。
