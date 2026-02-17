"use client";

import React, { useEffect, useState } from "react";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import BlogCard from "@/components/BlogCard";
import BlogFormModal from "@/components/BlogFormModal";
import { useGetBlogs } from "@/hooks/useBlogs";
import { useUserData } from "@/hooks/useUserData";
import { useSearchParams, useRouter } from "next/navigation";
import { Blog } from "@/types/blog";
import { FaPlus, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Blogs() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL State
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";

  // Local State
  const { currentUser } = useUserData();
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState(currentSearch);
  const limit = 11;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Blog | null>(null);

  const { data, isLoading } = useGetBlogs({
    page,
    limit,
    search,
  });

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);
    router.push(`/blogs?${params.toString()}`);
  }, [page, search, router]);

  const handleEdit = (blog: Blog) => {
    setEditData(blog);
    setIsModalOpen(true);
  };

  const blogs = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1; // Corrected to use meta.totalPages from API response structure

  return (
    <Container>
      {/* Hero Section */}
      <Section
        title="Tech Insider"
        subtitle="Exploring the frontiers of gadgetry and code"
        className="text-center pt-8"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
          <p className="text-base-content/70 text-lg text-center">
            Join our community of enthusiasts sharing deep dives, reviews, and
            the latest trends in the tech world.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="relative flex-1 w-full group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-12 py-4 rounded-2xl border border-base-content/10 bg-base-200/50 focus:bg-base-100 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-base-content text-lg"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-base-content/5 rounded-full text-base-content/40 hover:text-base-content transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Blog Feed */}
      <Section className="pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add New Blog Card */}
          {currentUser && (
            <motion.div
              layout
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditData(null);
                setIsModalOpen(true);
              }}
              className="group relative cursor-pointer h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative h-full bg-base-100 border-2 border-dashed border-base-content/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 group-hover:border-primary/30 transition-colors bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#333_1px,transparent_1px)]">
                <div className="size-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                  <FaPlus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-base-content">Create New Post</h3>
                  <p className="text-sm text-base-content/60">Share your technical insights with the world</p>
                </div>
                <div className="mt-2 px-6 py-2 rounded-full bg-base-200 text-base-content/70 text-xs font-semibold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  Get Started
                </div>
              </div>
            </motion.div>
          )}

          {isLoading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <BlogCard key={i} isLoading />
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog: Blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-base-200 rounded-3xl border border-dashed border-base-content/10">
              <p className="text-base-content/50 font-medium">No results found for your search.</p>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            <button
              className="px-4 py-2 bg-base-200 border border-base-content/10 rounded-lg hover:bg-base-300 transition disabled:opacity-50 text-base-content text-sm font-medium"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              First
            </button>
            <button
              className="px-4 py-2 bg-base-200 border border-base-content/10 rounded-lg hover:bg-base-300 transition disabled:opacity-50 text-base-content text-sm font-medium"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            <span className="font-semibold text-base-content px-4 py-2 bg-base-100 border border-base-content/10 rounded-lg text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-base-200 border border-base-content/10 rounded-lg hover:bg-base-300 transition disabled:opacity-50 text-base-content text-sm font-medium"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
            <button
              className="px-4 py-2 bg-base-200 border border-base-content/10 rounded-lg hover:bg-base-300 transition disabled:opacity-50 text-base-content text-sm font-medium"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              Last
            </button>
          </div>
        )}
      </Section>

      {/* Blog Form Modal */}
      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
      />
    </Container>
  );
}
