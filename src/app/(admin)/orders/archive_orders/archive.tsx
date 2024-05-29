import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import OrderListItems from "@/components/OrderListItems";
import orders from "../../../../../assets/data/orders";

const ArchiveScreen = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItems order={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ArchiveScreen;

const styles = StyleSheet.create({});
