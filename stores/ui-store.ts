import { create } from "zustand";

interface UiState {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;

  selectedVariantId: string | null;
  setSelectedVariantId: (id: string) => void;

  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  resetQuantity: () => void;

  loadingScreenDone: boolean;
  finishLoadingScreen: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  setCartOpen: (open) => set({ cartOpen: open }),

  selectedVariantId: null,
  setSelectedVariantId: (id) => set({ selectedVariantId: id }),

  quantity: 1,
  incrementQuantity: () => set((s) => ({ quantity: s.quantity + 1 })),
  decrementQuantity: () =>
    set((s) => ({ quantity: Math.max(1, s.quantity - 1) })),
  resetQuantity: () => set({ quantity: 1 }),

  loadingScreenDone: false,
  finishLoadingScreen: () => set({ loadingScreenDone: true }),
}));
