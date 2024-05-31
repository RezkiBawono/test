import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const IndexScreen = () => {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(auth)"} asChild>
        <Button text="Auth" />
      </Link>
    </View>
  );
};

export default IndexScreen;
