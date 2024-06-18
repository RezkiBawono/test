import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import OrderListItems from "@/components/OrderListItems";
import { useUserOrderList } from "@/api/orders";

const OrdersScreen = () => {
  const { data: orders, isLoading, isError } = useUserOrderList();

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (isError) {
    return <Text>Cannot fetch the data...</Text>;
  }

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
