import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router/stack";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

const AuthStack = () => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
