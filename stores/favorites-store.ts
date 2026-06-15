import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/shopify";

interface FavoritesState {
  items: Product[];
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggle: (product: Product) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set({
          items: exists
            ? get().items.filter((p) => p.id !== product.id)
            : [...get().items, product],
        });
      },
      isFavorite: (id) => get().items.some((p) => p.id === id),
    }),
    { name: "arinilock-favorites" },
  ),
);
