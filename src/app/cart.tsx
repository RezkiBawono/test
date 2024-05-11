import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { UseCart } from "./provider/CartContext";
import CartListItem from "./CartListItem";

const CartScreen = () => {
  const { items } = UseCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
