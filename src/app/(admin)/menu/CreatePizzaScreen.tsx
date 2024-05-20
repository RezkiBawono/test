import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/Button";
import defaultImageLink from "@/constants/DefaultImage";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

type FormData = {
  name: string;
  price: string;
};

const CreatePizzaScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [image, setImage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("submittedData :", data);
    setSubmittedData(data);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder="Margarita.."
          />
        )}
        name="name"
      />

      <Text style={styles.text}>Price</Text>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder="$9.99"
          />
        )}
        name="price"
      />
      <Button text="Create a Pizza" onPress={handleSubmit(onSubmit)} />
      {/* {errors.name && <Text style={styles.errorText}>{errors.name}</Text>} */}
      {submittedData && (
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedTitle}>Submitted Data:</Text>
          <Text>Name: {submittedData.name}</Text>
          <Text>Price: {submittedData.price}</Text>
        </View>
      )}
    </View>
  );
};

// TODO : create error handling
// TODO : make sure the keyboard doesnt obstruct the form
// TODO : make a feature to go back after you submit the form

export default CreatePizzaScreen;

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
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
    marginBottom: 10,
    padding: 8,
  },
  errorText: {},
  submittedContainer: {
    padding: 14,
  },
  submittedTitle: {
    margin: 4,
  },
});