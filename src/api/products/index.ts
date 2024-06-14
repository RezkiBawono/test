import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
// this function is to fetch product(pizza) list from database and shows it to menu screen

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
// this function is to fetch product(pizza) by id from database and shows it to pizza detail screen ([id])

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(dataProduct: any) {
      const { error } = await supabase.from("products").insert({
        name: dataProduct.name,
        price: dataProduct.price,
        image: dataProduct.image,
      });
      if (error) {
        throw error;
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
// this function is to create a pizza from admin createscreen to database by using name, price and image.

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(dataProduct: any) {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: dataProduct.name,
          price: dataProduct.price,
          image: dataProduct.image,
        })
        .eq("id", dataProduct.id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["products", id] });
    },
  });
};

// this function is to update the product detail to the database

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
