"use client";

import React from "react";
import { useGetBlogs } from "@/hooks/useBlogs";
import BlogCard from "../BlogCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Section from "@/ui/Section";

export default function BlogSection() {
  const { data: blogResponse, isLoading } = useGetBlogs({ limit: 3 });
  const blogs = blogResponse?.data || [];

  return (
    <Section
      title="Featured Blogs"
      subtitle="Stay updated with the latest tech trends, gadget reviews, and expert
            guides."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading
          ? [1, 2, 3].map((i) => <BlogCard key={i} isLoading={true} />)
          : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>

      {blogs.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-content/10">
          <p className="text-base-content/50 font-medium italic">
            No featured blogs available at the moment.
          </p>
        </div>
      )}

      <div className="pt-5 float-end">
        <Link
          href="/blogs"
          className="group flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-focus transition-all pb-1 border-b-2 border-transparent hover:border-primary"
        >
          View All Posts
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Section>
  );
}
