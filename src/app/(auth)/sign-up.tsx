import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SignOutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign-out</Text>
    </View>
  );
};

export default SignOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    borderWidth: 10,
    borderColor: "black",
  },
});
