import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

export const useAdminOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
// this function is to fetch an order list from database and shows it to menu screen (Admin side)

export const useUserOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["orders", { UserId: id }],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
// this function is to fetch an order list from database and shows it to menu screen (User side)

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
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
// this function is to fetch order by id from database and shows order detail screen ([id])
