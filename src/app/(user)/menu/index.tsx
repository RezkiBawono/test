import { ActivityIndicator, FlatList, Text } from "react-native";
import ProductListItems from "@/api/ProductListItems";
import products from "../../../../assets/data/products";
import { useProductList } from "@/api/products";

export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  if (error) {
    return <Text>Cannot fetch the data...</Text>;
  }

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
