import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import orders from "../../../../assets/data/orders";
import OrderListItems from "@/components/OrderListItems";

const OrdersScreen = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItems order={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
