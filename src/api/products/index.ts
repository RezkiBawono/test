import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useProductList = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
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
