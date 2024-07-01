import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TestComponents = () => {
  return (
    <View>
      <Text style={styles.text}>This is a TestComponents</Text>
    </View>
  );
};

export default TestComponents;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
