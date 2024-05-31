import { createContext, useContext, PropsWithChildren, useState } from "react";
import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";

type CartProvider = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartProvider>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});
// This variable is a default and adress to TS standart

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItems = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItems) {
      updateQuantity(existingItems.id, 1);
      return;
    }
    // This function is to add existing item by one if already in the cart

    const newItemCart: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newItemCart, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id == itemId ? { ...item, quantity: item.quantity + amount } : item
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };
  // This function is used to update an item in the cart

  const totalString = items
    .reduce((sum, item) => (sum += item.product.price * item.quantity), 0)
    // This function is to add total of prices in cart
    .toFixed(2);
  // rounded the number of decimal by 2 ( but make it string)
  const total = parseFloat(totalString);
  // convert from string to number

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const UseCart = () => useContext(CartContext);
