import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { Link, Redirect } from "expo-router";

const Profile = () => {
  return (
    <View>
      <Text>Welcome</Text>
      <Link href="/" asChild>
        <Text>Back to app index</Text>
      </Link>

      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
