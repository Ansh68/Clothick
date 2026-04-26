import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product._id === product._id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
            } else acc.push(item);
            return acc;
          }, []),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce((t, i) => t + (i.product.price ?? 0) * i.quantity, 0),
      getSubTotalPrice: () =>
        get().items.reduce((t, i) => {
          const price = i.product.price ?? 0;
          const discount = ((i.product.discount ?? 0) * price) / 100;
          return t + (price + discount) * i.quantity;
        }, 0),
      getItemCount: (productId) => {
        const item = get().items.find((i) => i.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    { name: 'cart-store' }
  )
);

export default useCartStore;
