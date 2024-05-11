import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UseCart } from "./provider/CartContext";

const CartScreen = () => {
  const { items } = UseCart();

  return (
    <View>
      <Text>Cart Screen</Text>
      <Text>Cart length : {items.length}</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
