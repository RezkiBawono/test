import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItems from "@/components/OrderListItems";
import { useDeleteOrder, useOrderDetails } from "@/api/orders";
import Colors from "@/constants/Colors";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);
  const { mutate: deleteOrder } = useDeleteOrder();

  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error || !order) {
    return <Text>Data fetch failed. Please try again.</Text>;
  }

  const onDelete = () => {
    deleteOrder(id, {
      onSuccess() {
        router.back();
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this order", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View>
      <Stack.Screen options={{ title: `Order # ${order.id}` }} />

      <OrderListItems order={order} />

      <Pressable onPress={confirmDelete} style={styles.delete}>
        <Text style={styles.textDelete}>Delete Order</Text>
      </Pressable>

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
  delete: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  textDelete: {
    color: "white",
    fontSize: 16,
  },
});
