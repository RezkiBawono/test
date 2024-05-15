import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import Button from "@/components/Button";
import defaultImageLink from "@/constants/DefaultImage";

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
  const [submittedData, setSubmittedData] = useState<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("submittedData :", data);
    setSubmittedData(data);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: defaultImageLink }} />
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
            placeholder="9.99"
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
