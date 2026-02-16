"use client";

import Link from "next/link";

import { Blog } from "@/types/blog";
import { useUserByEmail } from "@/hooks/useUserByEmail";
import { useUserData } from "@/hooks/useUserData";
import { useDeleteBlog } from "@/hooks/useBlogs";
import React from "react";
import { FaEdit, FaTrash, FaRegCalendarAlt, FaUserEdit } from "react-icons/fa";
import Skeleton from "@/ui/Skeleton";
import { motion } from "framer-motion";
import Image from "next/image";

interface BlogCardProps {
  blog?: Blog;
  onEdit?: (blog: Blog) => void;
  isLoading?: boolean;
}

export default function BlogCard({ blog, onEdit, isLoading }: BlogCardProps) {
  const { authorUser } = useUserByEmail({ email: blog?.author || "" });
  const { currentUser } = useUserData();
  const deleteBlog = useDeleteBlog();

  const isAuthor = currentUser?.email === blog?.author;

  if (isLoading) {
    return (
      <div className="bg-base-100 border border-base-content/5 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col gap-4">
        <Skeleton variant="text" className="h-7 w-3/4 mb-2" />
        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-5/6" />
          <Skeleton variant="text" className="h-4 w-4/6" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Skeleton variant="circle" className="size-8" />
          <Skeleton variant="text" className="h-4 w-24" />
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-base-100 border border-base-content/5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between h-full relative"
    >
      <Link href={`/blogs/${blog._id}`} className="absolute inset-0 z-0" />
      {/* Blog Content */}
      <div className="flex-1 relative z-10 pointer-events-none">
        <div className="flex justify-between items-start mb-4 pointer-events-auto">
          <h3 className="text-xl font-bold text-base-content line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
          {isAuthor && (
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit?.(blog);
                }}
                className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors cursor-pointer"
                title="Edit Post"
              >
                <FaEdit size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (confirm("Are you sure you want to delete this blog?")) {
                    deleteBlog.mutate(blog._id);
                  }
                }}
                className="p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors cursor-pointer"
                title="Delete Post"
              >
                <FaTrash size={14} />
              </button>
            </div>
          )}
        </div>
        <p className="text-base-content/70 text-sm leading-relaxed mb-6 line-clamp-4 pointer-events-auto">
          {blog.content}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-base-content/5 flex items-center justify-between text-xs font-medium text-base-content/60 relative z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden relative">
            {authorUser?.image ? (
              <Image src={authorUser.image} alt={authorUser.name} fill className="size-full object-cover" />
            ) : (
              <FaUserEdit size={14} />
            )}
          </div>
          <span className="text-base-content font-semibold">{authorUser?.name || "Member"}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <FaRegCalendarAlt className="text-base-content/40" />
          <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </motion.div>
  );
}
