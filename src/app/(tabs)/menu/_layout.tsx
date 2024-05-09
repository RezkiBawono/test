import { Stack } from "expo-router/stack";
import products from "../../../../assets/data/products";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
      {/* <Stack.Screen name="[id]" options={{ title: `${product.name}` }} /> */}
    </Stack>
  );
}
