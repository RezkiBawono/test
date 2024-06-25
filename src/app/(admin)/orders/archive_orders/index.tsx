import { StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import OrderListItems from "@/components/OrderListItems";
import { useAdminOrderList } from "@/api/orders";
import { useCreateOrderSubscription } from "@/api/orders/subscription";

const OrdersScreen = () => {
  const { data: orders, isLoading, isError } = useAdminOrderList();

  useCreateOrderSubscription();

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
