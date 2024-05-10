import { useContext } from "react";
import { CartContext } from "../provider/CartContext";

export default function useCart() {
  useContext(CartContext);
}
