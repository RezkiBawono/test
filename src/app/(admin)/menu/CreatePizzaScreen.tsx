import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button";
import defaultImageLink from "@/constants/DefaultImage";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { useCreateProduct } from "@/api/products";
import { router } from "expo-router";

// TODO : create a simple error handling - DONE
// TODO : make sure the keyboard doesnt obstruct the form - DONE
// TODO : fix the form when u have time
// TODO : make a reset feature after you submit the form
// TODO : create a simple form validation - DONE

type FormData = {
  name: string;
  price: string;
  image: string | null;
};

const CreatePizzaScreen = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<FormData>();

  const {
    control,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();
  const { mutate: createProduct } = useCreateProduct();

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

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    setSubmittedData(data);
    console.log("submittedData :", data);

    // creating a product in database
    createProduct(
      { ...data },
      {
        onSuccess() {
          reset();
          router.back();
        },
      }
    );
  };
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, submittedData, reset]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.image}
          source={{ uri: image || defaultImageLink }}
          resizeMode="contain"
        />
        <Text onPress={pickImage} style={styles.textButton}>
          Select Image
        </Text>

        <Text style={styles.text}>Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Please enter the name of the pizza" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[
                styles.input,
                keyboardVisible && styles.inputWithKeyboard,
              ]}
              placeholder="Margarita.."
            />
          )}
        />
        {errors.name && (
          <Text style={{ color: "red" }}>{errors.name.message}</Text>
        )}

        <Text style={styles.text}>Price</Text>
        <Controller
          control={control}
          name="price"
          rules={{ required: "Please enter the price of the pizza" }}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[
                styles.input,
                keyboardVisible && styles.inputWithKeyboard,
              ]}
              placeholder="$9.99"
            />
          )}
        />
        {errors.price && (
          <Text style={{ color: "red" }}>{errors.price.message}</Text>
        )}

        <Button text="Create a Pizza" onPress={handleSubmit(onSubmit)} />

        {/* {errors.name && <Text style={styles.errorText}>{errors.name}</Text>} */}
        {submittedData && (
          <View style={styles.submittedContainer}>
            <Text style={styles.submittedTitle}>Submitted Data:</Text>
            <Text>Name: {submittedData.name}</Text>
            <Text>Price: {submittedData.price}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePizzaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
