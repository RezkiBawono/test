import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Stack } from "expo-router/stack";

import React from "react";
import { useLocalSearchParams } from "expo-router";
import products from "../../../../assets/data/products";
import Colors from "@/constants/Colors";

const defaultImageLink =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

// type ProductDetailItemProps = {
//   product: Product;
// };

const pizzaSize = ["S", "M", "L", "Xl"];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() == id);

  // This statement is to make sure that product is type safe i.e (product.name) not (product?.name)
  if (!product) {
    return <Text>Product is not Found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image style={styles.images} source={{ uri: product.image }} />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {pizzaSize.map((size) => (
          <View style={styles.size} key={size}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.names}>{product.name}</Text>
      <Text style={styles.prices}>{product.price}</Text>
      <Text>Add to Cart</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  images: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  select: {},
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "grey",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "400",
  },
  names: {
    fontSize: 20,
    fontWeight: "bold",
  },
  prices: { color: Colors.light.tint, fontSize: 20, fontWeight: "bold" },
});
