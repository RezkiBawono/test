import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";

const Profile = () => {
  return (
    <View>
      <Text>Welcome</Text>
      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
