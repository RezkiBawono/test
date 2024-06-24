import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

const Profile = () => {
  const route = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome 'user'</Text>
      </View>
      <View style={styles.button}>
        <Button text="Back to App" onPress={() => route.navigate("/")} />
        <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  button: {
    marginTop: "auto",
  },
});
