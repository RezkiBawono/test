import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import orders from "../../../../assets/data/orders";

const OrdersScreen = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <Text> {item.created_at}</Text>}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
