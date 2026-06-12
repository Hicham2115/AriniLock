export const queryKeys = {
  product: (handle: string) => ["product", handle] as const,
  accessories: ["accessories"] as const,
  cart: ["cart"] as const,
};
