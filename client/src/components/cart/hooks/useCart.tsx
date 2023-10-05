import { create } from "zustand";
import { IProductId } from "@/components/productsPage/hooks/useAllProducts";
import { persist } from "zustand/middleware";
export interface IProductCart extends IProductId {
  quantity: number;
}
interface useCart {
  items: IProductCart[];
  addItem: (item: IProductCart) => void;
  removeItem: (id: string) => void;
  totalPrice: () => number;
  cartCount: () => number;
  updateQuantity: (id: string, action: "increase" | "decrease") => void;
}
export const useCart = create<useCart>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (addItem: IProductCart) => {
        const getCart = get().items;
        const findProduct = getCart.find((item) => item._id === addItem._id);
        if (findProduct) {
          findProduct.quantity! += addItem.quantity;
        } else {
          getCart.push(addItem);
        }
        set({ items: getCart });
      },
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        })),
      totalPrice: () =>
        get().items.reduce((total, item) => total + item.price, 0),
      cartCount: () => get().items.length,
      updateQuantity: (id: string, action: "increase" | "decrease") => {
        const getCart = get().items;
        const findProduct = getCart.find((item) => item._id === id);
        if (findProduct) {
          if (action === "decrease") {
            findProduct.quantity =
              findProduct.quantity! > 1
                ? findProduct.quantity! - 1
                : findProduct.quantity!;
          } else {
            findProduct.quantity! += 1;
          }
        }
        set({ items: getCart });
      },
    }),
    { name: "cart" },
  ),
);
