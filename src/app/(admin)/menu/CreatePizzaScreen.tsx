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
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button";
import defaultImageLink from "@/constants/DefaultImage";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import {
  useCreateProduct,
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import { Database } from "@/database.types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import RemoteImage from "@/components/RemoteImage";

// TODO : create a simple error handling - DONE
// TODO : make sure the keyboard doesnt obstruct the form - DONE
// TODO : fix the form when u have time
// TODO : make a reset feature after you submit the form
// TODO : create a simple form validation - DONE

type FormData = {
  name: string | null;
  price: string | null;
  image: string | null;
};

const CreatePizzaScreen = (data: FormData) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: data.name,
      price: data.price,
      image: data.image,
    },
  });

  const router = useRouter();

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const isUpdating = !!id;

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: product } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  React.useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price !== null ? product.price.toString() : "");
      setValue("image", product.image);
    }
  }, [product, setValue]);

  console.log(product);

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

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    // this function is to create a random filename for an image so they don't collide/clash with the same filename on database
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  const onCreate = async (data: FormData) => {
    const imagePath = await uploadImage();

    createProduct(
      { ...data, image: imagePath },
      {
        onSuccess() {
          reset();
          router.back();
        },
      }
    );
  };

  const onUpdate = async (data: FormData) => {
    const imagePath = await uploadImage();

    updateProduct(
      { ...data, id, image: imagePath },
      {
        onSuccess() {
          reset();
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess() {
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  // React.useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [formState, reset]);

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    if (isUpdating) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
  };

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
      <Stack.Screen
        options={{ title: product ? "Update Pizza" : "Create Pizza" }}
      />

      <ScrollView style={styles.scrollView}>
        <RemoteImage
          fallback={defaultImageLink}
          path={product?.image ? product?.image : "Failed to show the pizza"}
          style={styles.image}
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
              value={value ?? undefined}
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
              value={value ?? undefined}
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

        <Button
          text={product ? "Update" : "Create a Pizza"}
          onPress={handleSubmit(onSubmit)}
        />
        {isUpdating && (
          <Pressable onPress={confirmDelete} style={styles.delete}>
            <Text>Delete</Text>
          </Pressable>
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
  delete: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
});
