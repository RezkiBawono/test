import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "@/components/Button";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Link href={"/sign-in"} asChild>
        <Button text="Sign In" />
      </Link>
      <Link href={"/sign-up"} asChild>
        <Button text="Create an Account" />
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
