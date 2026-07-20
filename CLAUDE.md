# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## Commands

```bash
npm run dev      # start dev server on port 3000
npm run build    # production build
npm start        # serve production build
npm run lint     # ESLint (eslint.config.mjs, next config)
```

There are no tests configured in this project.

---

## Architecture Overview

**AriniLock** is a product site for a Moroccan smart door lock. The original single-page landing (`app/page.tsx`) has grown into a small multi-route store: dynamic product pages, a cart-based checkout flow, and a quick-buy (cash-on-delivery) form — all in French/English/Arabic.

### Routes

- `app/page.tsx` — main landing page (sections)
- `app/produits/page.tsx` — product listing
- `app/produits/[handle]/page.tsx` — generic Shopify product page (`ProductPageClient`), `generateMetadata` per handle
- `app/produits/i-60/`, `app/produits/m1-pro/` — dedicated landing pages for the two flagship models, each with its own client component (quick-buy form lives here)
- `app/checkout/page.tsx` — cart checkout (`checkout-client.tsx`)
- `app/contact/`, `app/conditions-utilisation/`, `app/politique-de-confidentialite/` — static/legal pages (`lib/legal-content.tsx`)

### Data layer — Shopify + mock fallback

`lib/shopify/client.ts` (Storefront API) checks `isShopifyConfigured` (both `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` must be set). If either is missing, every Shopify function returns the mock objects from `lib/shopify/mock.ts` — the site is fully functional without a real store.

- `lib/shopify/products.ts` — `getMainProduct()`, `getProductByHandle()`, `getAccessories()` — all locale-aware (`Locale` from `stores/language-store.ts`), each falls back to mock data on error so a product page never 404s
- `lib/shopify/cart.ts` — all cart mutations; cart ID persisted to `localStorage` (`arinilock-cart-id`)
- `lib/shopify/queries.ts` — raw GraphQL strings (Storefront API)
- `types/shopify.ts` — Zod schemas for all Shopify responses; `formatMoney()` formats MAD prices in `fr-FR` locale

#### Admin API — order creation (`lib/shopify/admin.ts`, `lib/shopify/orders.ts`)

Separate from the Storefront client: `shopifyAdminFetch()` authenticates with `SHOPIFY_ADMIN_CLIENT_ID` / `SHOPIFY_ADMIN_CLIENT_SECRET` via OAuth client-credentials (token cached until near-expiry) and hits the Admin GraphQL API. `isShopifyAdminConfigured` gates whether real orders can be created.

- `createQuickOrder()` / `createOrderFromCart()` both call a shared `orderCreate` mutation, tagging orders `achat-rapide`/`cod` or `panier`/`cod`
- `options: { inventoryBehaviour: "DECREMENT_OBEYING_POLICY" }` is required on every call — omitting it silently bypasses inventory tracking
- Shopify's `orderCreate` silently drops the shipping/billing address when `lastName` is empty (no `userErrors`) — `splitName()` always sends a non-empty `lastName`, using a zero-width-space placeholder (`NO_LAST_NAME_PLACEHOLDER`) for single-word names

### Order flow + Google Sheets logging

Two entry points create orders: `POST /api/orders` (quick-buy, single item) and `POST /api/checkout` (cart, multiple items) — both Zod-validate the body (Moroccan phone regex, Shopify GID regex) before calling the Admin API.

- If Shopify Admin isn't configured, both routes fall back to logging a `DEMO-<timestamp>` order directly to Sheets instead of failing.
- If Admin **is** configured, the routes do *not* log to Sheets themselves — `app/api/webhooks/shopify-orders/route.ts` (an `orders/create` Shopify webhook) does that for every order, real or otherwise, one row per line item.
- The webhook verifies `X-Shopify-Hmac-Sha256` (`crypto.timingSafeEqual`), de-dupes retried deliveries via `X-Shopify-Webhook-Id` (in-memory `Set`, capped at 500), and defers the actual Sheets logging to `after()` so a slow Sheets round-trip can't blow Shopify's response-time budget and trigger a duplicate retry.
- `lib/google-sheets.ts` — `logOrderToSheet()` posts to a Google Apps Script webhook (`GOOGLE_SHEETS_WEBHOOK_URL` + `GOOGLE_SHEETS_WEBHOOK_SECRET`); failures are swallowed (logged, not thrown) so a Sheets outage never blocks a real order.

### AI chat (`app/api/chat/route.ts`)

A product-advisor chatbot backed by Groq (`llama-3.1-8b-instant`). System prompt is assembled from `lib/chatbot/knowledge.md` at request time (with the placeholder handle swapped for `MAIN_PRODUCT_HANDLE`). Hardened with: 20 req/min per-IP in-memory rate limiting, Zod-validated/length-capped messages, control-character stripping, a locked conversation flow (2-question qualification, no off-topic questions), a system-prompt-leak guard, and heuristic reply-language detection (mirrors the user's last message language — fr/en/ar/es) with retry-with-backoff on transient Groq errors.

### i18n — fr/en/ar

`stores/language-store.ts` — Zustand store (`useLanguageStore`, persisted as `arinilock-locale`) holding the active `Locale` (`"fr" | "en" | "ar"`); also exports `SHOPIFY_LANG` to map locales to Shopify's `LanguageCode`. `lib/translations.ts` holds the copy per locale; `hooks/use-t.ts` (`useT()`) reads the active locale's translation object. Product fetches (`getMainProduct`, `getProductByHandle`, `getAccessories`) take `locale` as a parameter and are keyed accordingly in `lib/query-keys.ts`.

### Server state — TanStack Query

All data fetching goes through TanStack Query (staleTime 60 s, 2 retries). Query keys are centralised in `lib/query-keys.ts` (product/accessories keys are locale-aware). Custom hooks in `hooks/` wrap queries and mutations:

- `use-product.ts` — `useMainProduct()`, `useAccessories()`
- `use-cart.ts` — `useCart()`, `useAddToCart()`, `useUpdateCartLine()`, `useRemoveCartLine()`, `useClearCart()`
- `use-newsletter.ts` — POSTs to `/api/newsletter`
- `use-format-money.ts`, `use-t.ts` — locale-aware formatting/translation helpers

### UI state — Zustand

- `stores/ui-store.ts` — ephemeral UI state: cart drawer open/close, selected variant ID, quantity counter, and loading screen completion flag
- `stores/language-store.ts` — active locale (persisted)
- `stores/favorites-store.ts` — favorited products list + drawer open state (persisted as `arinilock-favorites`)

### Providers (`app/providers.tsx`)

Wraps the app (client component) with `QueryClientProvider` → `LenisProvider` → `LoadingScreen`. Sonner `<Toaster>` is rendered here. `LoadingScreen` unmounts itself (via `finishLoadingScreen()` on the Zustand store) after its exit animation.

### Smooth scroll

`components/lenis-provider.tsx` initialises Lenis and hooks it into GSAP's ticker so ScrollTrigger stays in sync. Note: the project uses **Framer Motion** (not GSAP) for most component animations — check the actual component before adding a new animation library.

### Design system

Tailwind v4 inline theme in `app/globals.css` (`@theme inline { … }`). Custom tokens:

| Token | Value |
|---|---|
| `--color-gold` | `#c49a65` — primary brand colour |
| `--color-ink` | `#1a1714` — body text |
| `--color-cream` | `#f7f3ec` — background surfaces |
| `--font-display` | Lato — section headlines |
| `--font-display2` | Cormorant Garamond — luxury editorial accents |
| `--font-script` | Caveat — handwritten decoration |

Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for conditional class composition.

### shadcn/ui

Configured with the `new-york` style, CSS variables, no prefix. Add components with `npx shadcn@latest add <component>` — they land in `components/ui/`.

### API routes

- `app/api/newsletter/route.ts` — validates a POST body `{ email }` with Zod and returns `{ ok: true, email }`. Wire a real email service (Resend, Klaviyo, etc.) here.
- `app/api/orders/route.ts` — quick-buy order (single item, cash-on-delivery)
- `app/api/checkout/route.ts` — cart checkout order (multiple items)
- `app/api/webhooks/shopify-orders/route.ts` — Shopify `orders/create` webhook; the source of truth for Sheets logging (see Order flow above)
- `app/api/chat/route.ts` — Groq-backed product chatbot

### Environment variables

Without `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` / `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` the site runs in demo mode. `NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE` and `NEXT_PUBLIC_SHOPIFY_ACCESSORIES_QUERY` override the default product handle and accessories tag filter. Additional vars introduced by the order/chat flows:

| Var | Purpose |
|---|---|
| `SHOPIFY_ADMIN_CLIENT_ID` / `SHOPIFY_ADMIN_CLIENT_SECRET` | Admin API OAuth (order creation, webhook HMAC verification) |
| `NEXT_PUBLIC_SHOPIFY_API_VERSION` | Admin API version, defaults to `2025-04` |
| `GOOGLE_SHEETS_WEBHOOK_URL` / `GOOGLE_SHEETS_WEBHOOK_SECRET` | Order logging to Google Sheets (Apps Script webhook) |
| `GROQ_API_KEY` | Enables `/api/chat`; without it the route returns a 500 |
