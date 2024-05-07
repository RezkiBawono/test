import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const productDetailScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text> productDetailScreen : {id}</Text>
    </View>
  );
};

export default productDetailScreen;

const styles = StyleSheet.create({});
