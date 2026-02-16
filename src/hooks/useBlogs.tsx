"use client";

import axiosApi from "@/libs/axiosInstance";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Blog, BlogResponse } from "@/types/blog";
import toast from "react-hot-toast";

/**
 * =========================
 * Blog API React Query Hooks
 * =========================
 */

interface BlogsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const fetchBlogs = async ({
  page = 1,
  limit = 10,
  search = "",
}: BlogsParams): Promise<BlogResponse> => {
  const res = await axiosApi.get("/blogs", {
    params: { page, limit, search },
  });
  return res.data;
};

export function useGetBlogs(params: BlogsParams) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => fetchBlogs(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useGetBlog(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosApi.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

/**
 * POST: Add Blog
 */
export function useAddBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Omit<Blog, "_id" | "createdAt">) => {
      const res = await axiosApi.post("/blogs", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog published!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      toast.error("Failed to publish blog.");
    },
  });
}

/**
 * PATCH: Update Blog
 */
export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }: Partial<Blog> & { id: string }) => {
      const res = await axiosApi.patch(`/blogs/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog updated!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      toast.error("Failed to update blog.");
    },
  });
}

/**
 * DELETE: Remove Blog
 */
export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosApi.delete(`/blogs/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog deleted!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      toast.error("Failed to delete blog.");
    },
  });
}
