import { FlatList } from "react-native";

import ProductListItems from "@/api/ProductListItems";
import products from "../../../../assets/data/products";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TabOneScreen() {
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      console.log(data);
      console.log(error);
    };
    fetchProducts();
  }, []);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItems product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
