import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItems from "@/components/OrderListItems";
import { useOrderDetails } from "@/api/orders";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error || !order) {
    return <Text>Data fetch failed. Please try again.</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Order # ${order.id}` }} />

      <OrderListItems order={order} />

      <FlatList
        data={order}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
