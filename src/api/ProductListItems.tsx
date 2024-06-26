import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

import { Product } from "@/types";
import Colors from "@/constants/Colors";
import { Href, Link, useSegments } from "expo-router";
import defaultImageLink from "@/constants/DefaultImage";
import RemoteImage from "@/components/RemoteImage";

type ProductListItemsProps = {
  product: {
    created_at: string;
    id: number;
    image: string | undefined;
    name: string | null;
    price: number | null;
  };
};

const ProductListItems = ({ product }: ProductListItemsProps) => {
  const segments = useSegments();

  return (
    <Link
      href={{
        pathname: `/${segments[0]}/menu/[id]` as Href<string>,
        params: { id: `${product.id}` as Href<string> },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <RemoteImage
          fallback={defaultImageLink}
          path={product.image}
          style={styles.images}
          resizeMode="contain"
        />
        <Text style={styles.names}>{product.name}</Text>
        <Text style={styles.prices}>$ {product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    flex: 1,
    maxWidth: "50%",
    overflow: "hidden",
  },
  images: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  names: {
    fontSize: 20,
    fontWeight: "bold",
  },
  prices: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
