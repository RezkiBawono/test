import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router/stack";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import products from "../../../../assets/data/products";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { PizzaSize } from "@/types";
import defaultImageLink from "@/constants/DefaultImage";
import { useCreateProduct, useProduct, useUpdateProduct } from "@/api/products";

const pizzaSize: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);
  const { mutate: updateProduct } = useUpdateProduct(id);

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error || !product) {
    return <Text>Data fetch failed. Please try again.</Text>;
  }

  // const product = products.find((p) => p.id.toString() == id);
  // This function is to dynamically choose each object inside products - only use for local mock data and is commented when using database.

  // if (!product) {
  //   return <Text>Product is not Found</Text>;
  // }
  // This statement is to make sure that product is type safe i.e (product.name) not (product?.name). Is commented because is replaced by error statement.

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
      <Button text="Update Pizza" />
      <Button text="Delete Pizza" />
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
