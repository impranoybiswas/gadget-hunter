// hooks/useShopHooks.ts
import axiosApi from "@/libs/axiosInstance";
import { Product } from "@/types/product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/** =========================
 * ✅ Fetch all Favourite products for the current user
 ========================= */
export const useFavourites = () => {
  return useQuery<Product[], Error>({
    queryKey: ["Favourites"], // React Query cache key
    queryFn: async () => {
      const response = await axiosApi.get("/items/Favourites/all");
      return response.data.items as Product[];
    },
    refetchInterval: 1000, // auto refresh
    staleTime: 0,
    retry: 1,
  });
};

/** =========================
 * ✅ Toggle a product in Favourites (add/remove)
 ========================= */
export function useToggleFavourite() {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; action: "added" | "removed" },
    Error,
    string
  >({
    mutationFn: async (productId: string) => {
      const res = await axiosApi.post("/items/Favourites/toggle", { productId });
      return res.data;
    },
    onSuccess: (data) => {
      // Show toast depending on action
      toast.success(
        data.action === "added"
          ? "Added to Favourites!"
          : "Removed from Favourites!"
      );
      // Refresh Favourites query so UI updates
      queryClient.invalidateQueries({ queryKey: ["Favourites"] });
    },
    onError: () => {
      toast.error("Failed to update Favourites!");
    },
  });
}

/** =========================
 * ✅ Fetch all cart items for the current user
 ========================= */
export const useCarts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["carts"], // React Query cache key
    queryFn: async () => {
      const response = await axiosApi.get("/items/carts/all");
      return response.data.items as Product[];
    },
    refetchInterval: 1000, // auto refresh
    staleTime: 0,
    retry: 1,
  });
};

/** =========================
 * ✅ Remove an item from the cart by productId
 ========================= */
export function useRemoveCart() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: async (productId: string) => {
      const res = await axiosApi.post("/items/carts/remove", { productId });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Item removed from cart!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: () => {
      toast.error("Failed to remove item!");
    },
  });
}

/** =========================
 * ✅ Add, remove, or update quantity of an item in cart
 ========================= */
export interface ToggleCartInput {
  productId: string;
  quantity?: number; // If 0, item will be removed
}

export function useToggleCart() {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; carts: Product[] },
    Error,
    ToggleCartInput
  >({
    mutationFn: async ({ productId, quantity }: ToggleCartInput) => {
      const res = await axiosApi.post("/items/carts/toggle", {
        productId,
        quantity,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cart updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: () => {
      toast.error("Failed to update cart!");
    },
  });
}
