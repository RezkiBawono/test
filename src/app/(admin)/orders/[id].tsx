import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItems from "@/components/OrderListItems";
import orders from "../../../../assets/data/orders";
import Colors from "@/constants/Colors";
import { OrderStatusList } from "@/types";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() == id);

  if (!order) {
    return <Text>Order is not Found</Text>;
  }
  <OrderListItems order={order} />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order # ${order.id}` }} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ fontWeight: "bold" }}>Status</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            onPress={() => console.warn("Update status")}
            style={{
              borderColor: Colors.light.tint,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
              backgroundColor:
                order.status === status ? Colors.light.tint : "transparent",
            }}
          >
            <Text
              style={{
                color: order.status === status ? "white" : Colors.light.tint,
              }}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
});
