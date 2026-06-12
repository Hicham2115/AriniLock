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

**Arini Lock** is a single-page product landing site for a Moroccan smart door lock. All content lives on one route (`app/page.tsx`), assembled from section components.

### Data layer — Shopify + mock fallback

`lib/shopify/client.ts` checks `isShopifyConfigured` (both `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` must be set). If either is missing, every Shopify function returns the mock objects from `lib/shopify/mock.ts` — the site is fully functional without a real store.

- `lib/shopify/products.ts` — `getMainProduct()`, `getAccessories()`
- `lib/shopify/cart.ts` — all cart mutations; cart ID persisted to `localStorage` (`arinilock-cart-id`)
- `lib/shopify/queries.ts` — raw GraphQL strings
- `types/shopify.ts` — Zod schemas for all Shopify responses; `formatMoney()` formats MAD prices in `fr-FR` locale

### Server state — TanStack Query

All data fetching goes through TanStack Query (staleTime 60 s, 2 retries). Query keys are centralised in `lib/query-keys.ts`. Custom hooks in `hooks/` wrap queries and mutations:

- `use-product.ts` — `useMainProduct()`, `useAccessories()`
- `use-cart.ts` — `useCart()`, `useAddToCart()`, `useUpdateCartLine()`, `useRemoveCartLine()`
- `use-newsletter.ts` — POSTs to `/api/newsletter`

### UI state — Zustand

`stores/ui-store.ts` holds ephemeral UI state: cart drawer open/close, selected variant ID, quantity counter, and loading screen completion flag.

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

### API route

`app/api/newsletter/route.ts` — validates a POST body `{ email }` with Zod and returns `{ ok: true, email }`. Wire a real email service (Resend, Klaviyo, etc.) here.

### Environment variables

See `.env.example`. Without Shopify vars the site runs in demo mode. `NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE` and `NEXT_PUBLIC_SHOPIFY_ACCESSORIES_QUERY` override the default product handle and accessories tag filter.
