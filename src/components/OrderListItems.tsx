import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import { Href, Link, useSegments } from "expo-router";
import defaultImageLink from "@/constants/DefaultImage";
import { Order } from "@/types";

import React from "react";

type OrderListItemsProps = {
  order: Order;
};

const OrderListItems = ({ order }: OrderListItemsProps) => {
  return (
    <View>
      <Text>OrderListItems</Text>
    </View>
  );
};

export default OrderListItems;

const styles = StyleSheet.create({});
