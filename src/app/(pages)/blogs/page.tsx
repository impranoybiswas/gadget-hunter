"use client";

import React, { useState } from "react";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Button from "@/ui/Button";
import BlogCard from "@/components/BlogCard";
import BlogFormModal from "@/components/BlogFormModal";
import { useGetBlogs } from "@/hooks/useBlogs";
import { useUserData } from "@/hooks/useUserData";
import { Blog } from "@/types/blog";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function Blogs() {
  const { currentUser } = useUserData();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 12;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Blog | null>(null);

  const { data, isLoading } = useGetBlogs({
    page,
    limit,
    search,
  });

  const handleEdit = (blog: Blog) => {
    setEditData(blog);
    setIsModalOpen(true);
  };

  const blogs = data?.data || [];
  const totalPages = data?.totalPages || 1;

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
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-base-content/10 bg-base-100 shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all text-base-content"
              />
            </div>

            {currentUser && (
              <div className="fixed right-10 bottom-20">

                <Button
                  className="w-11"
                  rightIcon={<FaPlus />}
                  isOutline={false}
                  isLarge={true}
                  disabled={isModalOpen}
                  onClick={() => {
                    setEditData(null);
                    setIsModalOpen(true);
                  }}
                />

              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Blog Feed */}
      <Section className="pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <Button
              label="Prev"
              isOutline
              isLarge={false}
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            />
            <span className="text-sm font-bold text-base-content px-4 py-2 bg-base-200 rounded-full">
              {page} / {totalPages}
            </span>
            <Button
              label="Next"
              isOutline
              isLarge={false}
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            />
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
