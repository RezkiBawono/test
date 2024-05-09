import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Stack } from "expo-router/stack";

import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import products from "../../../../assets/data/products";
import Colors from "@/constants/Colors";

const defaultImageLink =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

const pizzaSize = ["S", "M", "L", "Xl"];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((p) => p.id.toString() == id);
  // This function is to dynamically choose each object inside products

  if (!product) {
    return <Text>Product is not Found</Text>;
  }
  // This statement is to make sure that product is type safe i.e (product.name) not (product?.name)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name || defaultImageLink }} />
      <Image style={styles.images} source={{ uri: product.image }} />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {pizzaSize.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size); // This function is to choose between pizzaSize
            }}
            style={[
              styles.sizeTextContainer,
              { backgroundColor: selectedSize == size ? "grey" : "white" },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize == size ? "white" : "black",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
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
    width: "80%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  select: {},
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sizeTextContainer: {
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
    margin: "auto",
  },
  prices: { color: Colors.light.tint, fontSize: 20, fontWeight: "bold" },
});
