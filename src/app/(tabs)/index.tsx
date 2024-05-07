import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import ProductListItems from "@/api/ProductListItems";
import products from "../../../assets/data/products";

export default function TabOneScreen() {
  return (
    <View>
      <ProductListItems product={products[0]} />
      <ProductListItems product={products[1]} />
      <ProductListItems product={products[2]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
