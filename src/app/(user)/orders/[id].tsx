import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItems from "@/components/OrderListItems";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() == id);

  if (!order) {
    return <Text>Order is not Found</Text>;
  }

  <OrderListItems order={order} />;

  return (
    <FlatList
      data={order.order_items}
      renderItem={({ item }) => <OrderItemListItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
