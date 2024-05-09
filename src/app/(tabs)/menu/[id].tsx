import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { PizzaSize } from "@/types";
import { Product } from "@/types";
import products from "../../../../assets/data/products";

const defaultImageLink =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

type ProductDetailItemProps = {
  product: Product;
};

const productDetailScreen = ({ product }: ProductDetailItemProps) => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Image style={styles.images} source={{ uri: defaultImageLink }} />
      <Text>pizza size</Text>
      <Text>price</Text>
      <Text>add to cart</Text>
    </View>
  );
};

export default productDetailScreen;

const styles = StyleSheet.create({
  images: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
});
