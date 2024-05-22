import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router/stack";

const AuthStack = () => {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-out" options={{ title: "Sign Out" }} />
    </Stack>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
