"use client";

import { useUserData } from "@/hooks/useUserData";
import axiosApi from "@/libs/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function FavoriteSync() {
  const { status, currentUser } = useUserData();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === "authenticated" && currentUser) {
      const localFavs = JSON.parse(
        localStorage.getItem("local_favorites") || "[]",
      );

      if (localFavs.length > 0) {
        const syncFavorites = async () => {
          try {
            const res = await axiosApi.post("/items/favorites/sync", {
              productIds: localFavs,
            });

            if (res.data.success) {
              localStorage.removeItem("local_favorites");
              queryClient.invalidateQueries({ queryKey: ["favorites"] });
              queryClient.invalidateQueries({ queryKey: ["current-user"] });
              toast.success("Synced local favorites!");
            }
          } catch (error) {
            console.error("Failed to sync favorites:", error);
          }
        };

        syncFavorites();
      }
    }
  }, [status, currentUser, queryClient]);

  return null; // This component doesn't render anything
}
