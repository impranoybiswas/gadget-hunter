"use client";

import React from "react";
import { useGetBlogs } from "@/hooks/useBlogs";
import BlogCard from "../BlogCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function BlogSection() {
  const { data: blogResponse, isLoading } = useGetBlogs({ limit: 3 });
  const blogs = blogResponse?.data || [];

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Latest Insights
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            Featured Blogs
          </h2>
        </div>
        <Link
          href="/blogs"
          className="group flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4 transition shrink-0"
        >
          View All Posts
          <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? [1, 2, 3].map((i) => <BlogCard key={i} isLoading={true} />)
          : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>

      {blogs.length === 0 && !isLoading && (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-dashed border-base-content/10">
          <p className="text-base-content/40 text-sm">
            No featured blogs available at the moment.
          </p>
        </div>
      )}
    </section>
  );
}
