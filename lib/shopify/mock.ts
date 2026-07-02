import type { Cart, CartLine, Product, ProductVariant } from "@/types/shopify";

/**
 * Données de démonstration utilisées quand les variables d'environnement
 * Shopify ne sont pas définies — permet de lancer le site sans boutique.
 */

const mad = (amount: number) => ({
  amount: amount.toFixed(2),
  currencyCode: "MAD",
});

const img = (seed: string, w = 900, h = 900) => ({
  url: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  altText: null,
  width: w,
  height: h,
});

export const MOCK_PRODUCT: Product = {
  id: "gid://mock/Product/arinilock-smart-lock",
  handle: "poignee-connectee-smart-door-lock",
  title: "Poignée connectée — Smart Door Lock",
  description:
    "La poignée connectée qui s'ouvre par empreinte digitale, code secret ou smartphone — sans clé qui traîne, sans compromis sur le style.",
  images: [
    img("serrux-main", 900, 1100),
    img("serrux-side", 900, 1100),
    img("serrux-app", 900, 1100),
    img("serrux-detail", 900, 1100),
  ],
  variants: [
    {
      id: "gid://mock/ProductVariant/noir-mat",
      title: "Noir Mat",
      availableForSale: true,
      price: mad(1290),
      compareAtPrice: mad(1590),
      image: img("serrux-main", 900, 1100),
      selectedOptions: [{ name: "Finition", value: "Noir Mat" }],
    },
    {
      id: "gid://mock/ProductVariant/argent",
      title: "Argent",
      availableForSale: true,
      price: mad(1290),
      compareAtPrice: mad(1590),
      image: img("serrux-side", 900, 1100),
      selectedOptions: [{ name: "Finition", value: "Argent" }],
    },
    {
      id: "gid://mock/ProductVariant/or",
      title: "Or",
      availableForSale: true,
      price: mad(1290),
      compareAtPrice: mad(1590),
      image: img("serrux-detail", 900, 1100),
      selectedOptions: [{ name: "Finition", value: "Or" }],
    },
  ],
};

export const MOCK_ACCESSORIES: Product[] = [
  {
    id: "gid://mock/Product/piles",
    handle: "lot-piles-longue-duree",
    title: "Lot de piles longue durée",
    description: "4x piles AA premium — 12 mois d'autonomie",
    images: [img("serrux-batteries", 500, 500)],
    variants: [
      {
        id: "gid://mock/ProductVariant/piles",
        title: "Default",
        availableForSale: true,
        price: mad(89),
        compareAtPrice: null,
        image: img("serrux-batteries", 500, 500),
        selectedOptions: [],
      },
    ],
  },
  {
    id: "gid://mock/Product/plaque",
    handle: "plaque-finition-supplementaire",
    title: "Plaque de finition supplémentaire",
    description: "Pour personnaliser une seconde porte",
    images: [img("serrux-plate", 500, 500)],
    variants: [
      {
        id: "gid://mock/ProductVariant/plaque",
        title: "Default",
        availableForSale: true,
        price: mad(149),
        compareAtPrice: null,
        image: img("serrux-plate", 500, 500),
        selectedOptions: [],
      },
    ],
  },
  {
    id: "gid://mock/Product/cartes-rfid",
    handle: "lot-2-cartes-rfid",
    title: "Lot de 2 cartes RFID",
    description: "Accès rapide pour vos invités",
    images: [img("serrux-cards", 500, 500)],
    variants: [
      {
        id: "gid://mock/ProductVariant/cartes-rfid",
        title: "Default",
        availableForSale: true,
        price: mad(99),
        compareAtPrice: null,
        image: img("serrux-cards", 500, 500),
        selectedOptions: [],
      },
    ],
  },
];

const ALL_VARIANTS: { variant: ProductVariant; productTitle: string; handle: string }[] =
  [MOCK_PRODUCT, ...MOCK_ACCESSORIES].flatMap((product) =>
    product.variants.map((variant) => ({
      variant,
      productTitle: product.title,
      handle: product.handle,
    })),
  );

const MOCK_CART_STORAGE_KEY = "arinilock-mock-cart";

interface StoredLine {
  merchandiseId: string;
  quantity: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function readStoredLines(): StoredLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(MOCK_CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredLine[]) : [];
  } catch {
    return [];
  }
}

function writeStoredLines(lines: StoredLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MOCK_CART_STORAGE_KEY, JSON.stringify(lines));
}

function buildCart(stored: StoredLine[]): Cart {
  const lines: CartLine[] = stored.flatMap((line) => {
    const match = ALL_VARIANTS.find((v) => v.variant.id === line.merchandiseId);
    if (!match) return [];
    return [
      {
        id: `line-${line.merchandiseId}`,
        quantity: line.quantity,
        merchandise: {
          id: match.variant.id,
          title: match.variant.title,
          price: match.variant.price,
          image: match.variant.image,
          product: { title: match.productTitle, handle: match.handle },
        },
      },
    ];
  });

  const subtotal = lines.reduce(
    (sum, line) =>
      sum + Number.parseFloat(line.merchandise.price.amount) * line.quantity,
    0,
  );

  return {
    id: "gid://mock/Cart/arinilock",
    checkoutUrl: "#produit",
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    lines,
    cost: { subtotalAmount: mad(subtotal) },
  };
}

export const mockCartApi = {
  async getCart(): Promise<Cart> {
    await delay(250);
    return buildCart(readStoredLines());
  },

  async addLines(
    lines: { merchandiseId: string; quantity: number }[],
  ): Promise<Cart> {
    await delay(350);
    const stored = readStoredLines();
    for (const line of lines) {
      const existing = stored.find(
        (s) => s.merchandiseId === line.merchandiseId,
      );
      if (existing) existing.quantity += line.quantity;
      else stored.push({ ...line });
    }
    writeStoredLines(stored);
    return buildCart(stored);
  },

  async updateLine(lineId: string, quantity: number): Promise<Cart> {
    await delay(300);
    const merchandiseId = lineId.replace(/^line-/, "");
    let stored = readStoredLines();
    if (quantity <= 0) {
      stored = stored.filter((s) => s.merchandiseId !== merchandiseId);
    } else {
      const existing = stored.find((s) => s.merchandiseId === merchandiseId);
      if (existing) existing.quantity = quantity;
    }
    writeStoredLines(stored);
    return buildCart(stored);
  },

  async removeLines(lineIds: string[]): Promise<Cart> {
    await delay(300);
    const ids = lineIds.map((id) => id.replace(/^line-/, ""));
    const stored = readStoredLines().filter(
      (s) => !ids.includes(s.merchandiseId),
    );
    writeStoredLines(stored);
    return buildCart(stored);
  },
};
