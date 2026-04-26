import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) =>
                set((state) => {
                    const exists = state.items.find((i) => i._id === product._id);
                    if (exists) return state;
                    return { items: [...state.items, product] };
                }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((i) => i._id !== productId),
                })),
            toggleItem: (product) =>
                set((state) => {
                    const exists = state.items.find((i) => i._id === product._id);
                    if (exists) {
                        return { items: state.items.filter((i) => i._id !== product._id) };
                    }
                    return { items: [...state.items, product] };
                }),
            isInWishlist: (productId) =>
                get().items.some((i) => i._id === productId),
            clearWishlist: () => set({ items: [] }),
            getItemCount: () => get().items.length,
        }),
        { name: 'wishlist-store' }
    )
);

export default useWishlistStore;
