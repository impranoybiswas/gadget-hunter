"use client";

import axiosApi from "@/libs/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DBUser } from "@/types/dbUser";
import toast from "react-hot-toast";
import { useUserData } from "./useUserData";

export interface AdminStats {
  totalProducts: number;
  totalUsers: number;
  totalStock: number;
  totalCategories: number;
  totalRevenue: number;
}

/**
 * Hook to fetch admin dashboard stats
 */
export function useAdminStats() {
  const { currentUser } = useUserData();
  const isAdmin = currentUser?.role === "admin";

  return useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosApi.get("/admin/stats");
      return res.data;
    },
    enabled: isAdmin, // Only fetch if user is admin
    refetchInterval: 5000,
  });
}

/**
 * Hook to fetch all users and manage roles
 */
export function useAllUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<DBUser[]>({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosApi.get("/admin/users");
      return res.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const res = await axiosApi.patch("/admin/users", { userId, role });
      return res.data;
    },
    onSuccess: () => {
      toast.success("User role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to update role");
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    updateRole: updateRoleMutation.mutate,
    isUpdating: updateRoleMutation.isPending,
  };
}
