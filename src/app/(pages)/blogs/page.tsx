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
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiBookOpen,
  FiEdit3,
  FiCpu,
  FiCode,
} from "react-icons/fi";
import Image from "next/image";

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
  const totalPages = data?.meta?.totalPages || 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Container>
      {/* Header Section */}
      <div className="w-full text-center space-y-4 mb-16 md:mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-7xl font-black text-base-content tracking-tight"
        >
          Tech <span className="text-primary">Insider</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base-content/50 text-lg md:text-xl font-medium max-w-2xl mx-auto"
        >
          Stories, deep dives, and perspectives on the future of gadgets and
          engineering.
        </motion.p>
      </div>

      <Section className="space-y-12 pb-16">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="w-full md:max-w-2xl relative group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors text-xl" />
            <input
              type="text"
              placeholder="Search articles, guides, or trends..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-base-200/50 border border-base-content/5 focus:bg-base-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-3xl pl-14 pr-12 py-5 text-base-content font-medium transition-all duration-300 placeholder:text-base-content/20 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-base-content/5 rounded-full text-base-content/40 hover:text-base-content transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-base-content/30">
              Latest Insights
            </span>
          </div>
        </div>

        {/* Blog Feed Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${search}-${page}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Create New Post Card */}
          {currentUser && (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => {
                setEditData(null);
                setIsModalOpen(true);
              }}
              className="group relative cursor-pointer h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative h-full bg-base-100 border-2 border-dashed border-base-content/10 hover:border-primary/40 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center gap-6 transition-all duration-300">
                <div className="size-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-500 shadow-inner">
                  <FiPlus
                    size={32}
                    className="group-hover:rotate-90 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-base-content tracking-tight">
                    Share Your Wisdom
                  </h3>
                  <p className="text-sm text-base-content/50 font-medium">
                    Contribute to our growing tech community
                  </p>
                </div>
                <div className="px-8 py-3 rounded-2xl bg-base-200 text-base-content/70 text-sm font-black tracking-wide group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  CREATE POST
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <BlogCard key={i} isLoading />
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog: Blog) => (
                <motion.div key={blog._id} variants={itemVariants} layout>
                  <BlogCard blog={blog} onEdit={handleEdit} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center space-y-6 bg-base-200/50 rounded-[3rem] border border-dashed border-base-content/10"
              >
                <div className="size-24 bg-base-100 rounded-full flex items-center justify-center mx-auto text-4xl text-base-content/10 shadow-inner">
                  <FiBookOpen />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-base-content">
                    Quiet for now
                  </h3>
                  <p className="text-base-content/40 font-medium">
                    Try another search term or browse existing categories.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Professional Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16 pt-12 border-t border-base-content/5 flex-wrap">
            <PaginationButton
              onClick={() => setPage(1)}
              disabled={page === 1}
              icon={<FiChevronsLeft />}
            />
            <PaginationButton
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              icon={<FiChevronLeft />}
            />

            <div className="flex items-center gap-3 px-8">
              <span className="text-sm font-black text-base-content tracking-tight">
                Page {page}{" "}
                <span className="text-base-content/30 mx-1">of</span>{" "}
                {totalPages}
              </span>
            </div>

            <PaginationButton
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              icon={<FiChevronRight />}
            />
            <PaginationButton
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              icon={<FiChevronsRight />}
            />
          </div>
        )}
      </Section>

      {/* NEW: Post-Pagination Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 mb-20 md:mb-32 overflow-hidden rounded-[3.5rem] bg-base-200 border border-base-content/5 relative group"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
          <div className="p-10 md:p-20 space-y-12 flex flex-col justify-center relative z-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                <FiEdit3 /> Writer&apos;s Hub
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-base-content leading-tight tracking-tight">
                Inspired to <span className="text-primary italic">Share?</span>
              </h2>
              <p className="text-base-content/60 text-lg md:text-xl font-medium max-w-lg">
                The best insights come from experience. Join our growing hub of
                tech writers and share your unique perspectives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                {
                  title: "Expert Reviews",
                  desc: "Depth analysis",
                  icon: <FiCpu />,
                },
                {
                  title: "Dev Insights",
                  desc: "Coding secrets",
                  icon: <FiCode />,
                },
                {
                  title: "Gadget Trends",
                  desc: "Future tech",
                  icon: <FiBookOpen />,
                },
                {
                  title: "Tech Life",
                  desc: "Digital culture",
                  icon: <FiStar />,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 group/item">
                  <div className="size-14 rounded-2xl bg-base-100 text-primary flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-black/5 group-hover/item:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-base-content text-lg tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-base-content/40 font-black uppercase tracking-widest">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[450px] lg:h-auto overflow-hidden">
            <Image
              src="/blogs/footer.png"
              alt="Tech Journaling Atmosphere"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-base-200 via-transparent to-transparent hidden lg:block" />
            <div className="absolute bottom-10 left-10 right-10 backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-3xl lg:hidden">
              <p className="text-white text-sm font-black italic">
                &quot;The art of technology is the art of writing its history in
                real-time.&quot;
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blog Form Modal */}
      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
      />
    </Container>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function PaginationButton({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`size-12 flex items-center justify-center rounded-[1.25rem] bg-base-200 border border-base-content/5 text-2xl transition-all active:scale-90 ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-primary hover:text-primary-content hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
      }`}
    >
      {icon}
    </button>
  );
}

function FiStar() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}
