import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "@/components/Button";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Link href={"/sign-in"} asChild>
        <Button text="Create an Account" />
      </Link>
      <Link href={"/sign-out"} asChild>
        <Button text="Log Out" />
      </Link>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
});
