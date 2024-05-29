import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router/stack";

const OrdersStack = () => {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Order" }} />
      <Stack.Screen name="[id]" options={{}} />
    </Stack>
  );
};

export default OrdersStack;

const styles = StyleSheet.create({});
