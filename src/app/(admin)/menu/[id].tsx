import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Stack } from "expo-router/stack";

import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import products from "../../../../assets/data/products";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { UseCart } from "@/app/provider/CartContext";
import { PizzaSize } from "@/types";
import defaultImageLink from "@/constants/DefaultImage";

const pizzaSize: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { addItem } = UseCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((p) => p.id.toString() == id);
  // This function is to dynamically choose each object inside products

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product is not Found</Text>;
  }
  // This statement is to make sure that product is type safe i.e (product.name) not (product?.name)

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: product.name, headerTitleAlign: "center" }}
      />
      <Image
        style={styles.images}
        source={{ uri: product.image || defaultImageLink }}
      />

      <Text style={styles.names}>{product.name}</Text>
      <Text style={styles.prices}>${product.price}</Text>
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
    borderWidth: 2,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "400",
  },
  names: {
    fontSize: 20,
    fontWeight: "bold",
    margin: "auto",
    alignSelf: "center",
    marginTop: 20,
  },
  prices: {
    color: Colors.light.tint,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
  },
});
