import { createContext, useContext, PropsWithChildren, useState } from "react";
import { CartItem } from "@/types";
import { randomUUID } from "expo-crypto";
import { useCreateOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { Tables } from "@/database.types";

type Product = Tables<"products">;

type CartProvider = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

export const CartContext = createContext<CartProvider>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});
// This variable is a default and adress to TS standart

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: createOrder } = useCreateOrder();

  const router = useRouter();

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

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    createOrder(
      { total },
      {
        onSuccess(data) {
          clearCart(), router.push(`/(user)/menu/${data.id}`);
          console.log(data);
        },
      }
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const UseCart = () => useContext(CartContext);
