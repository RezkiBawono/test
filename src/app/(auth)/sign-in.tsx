import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

type FormData = {
  email: string;
  password: string;
};

const AuthScreen = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const signInWithEmail = async (data: FormData) => {
    // this function is to log in using email password to the database

    setLoading(false);
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(true);

    console.log(data);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.scrollView}>
        <Text style={styles.text}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Please enter your email" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[
                styles.input,
                keyboardVisible && styles.inputWithKeyboard,
              ]}
              placeholder="john@gmail.com"
            />
          )}
        />
        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        )}

        <Text style={styles.text}>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Please enter your password" }}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[
                styles.input,
                keyboardVisible && styles.inputWithKeyboard,
              ]}
              placeholder=""
            />
          )}
        />
        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password.message}</Text>
        )}

        <Link href={"/sign-in"} asChild>
          <Button
            text="Sign In"
            disabled={loading}
            onPress={handleSubmit(signInWithEmail)}
          />
        </Link>
        <Link href={"/sign-up"} asChild>
          <Button text="Create an Account" />
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  keyboard: {},
  scrollView: { marginHorizontal: 20 },
  image: {
    width: "70%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  text: {
    margin: 4,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 6,
    padding: 8,
  },
  inputWithKeyboard: {
    paddingBottom: 10,
  },
  errorText: {},
  submittedContainer: {
    padding: 14,
  },
  submittedTitle: {
    margin: 4,
  },
});
