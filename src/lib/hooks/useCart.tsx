import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[]
  addItem: (data: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;

        const isExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );

        if (isExisting) {
          return toast("Item has already been added to cart");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item has been added to cart");
      },

      removeItem: (idToRemove: string) => {
        const newCartItems: CartItem[] = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        );
        set({ cartItems: newCartItems });
      },

      increaseQuantity: (idToIncrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });

        set({ cartItems: newCartItems });
        toast.success("Quantity has been increased");
      },
      decreaseQuantity: (idToDecrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          cartItem.item._id === idToDecrease
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem;
        });

        set({ cartItems: newCartItems });
        toast.success("Quantity has been decreased");
      },
      clearCart: () => {
        set({ cartItems: [] });
        toast.success("Cart has been cleared");
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
