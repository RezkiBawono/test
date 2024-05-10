import { createContext, useContext, PropsWithChildren } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({ children }: PropsWithChildren) {
  return (
    <CartContext.Provider value={{ item: [], addItem: () => {} }}>
      {children}
    </CartContext.Provider>
  );
}

// export const useCart = useContext(CartContext);
