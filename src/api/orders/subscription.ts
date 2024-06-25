import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

// the purpose of this component is to listening for real time database and fetch it as soon as the function is called

export const useCreateOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orderSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Order has been created", payload);
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
      )
      .subscribe();

    return () => {
      orderSubscription.unsubscribe();
      // this function is to prevent memory leak
    };
  }, []);
};
