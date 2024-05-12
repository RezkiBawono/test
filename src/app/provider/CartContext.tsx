import { createContext, useContext, PropsWithChildren, useState } from "react";
import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";

type CartProvider = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

export const CartContext = createContext<CartProvider>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});
//This variable is a default and adress to TS standart

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  //TODO : if an item already added then increment by 1

  const addItem = (product: Product, size: CartItem["size"]) => {
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
  //This function is used to update an item in the cart

  // TODO : update quantity

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const UseCart = () => useContext(CartContext);
