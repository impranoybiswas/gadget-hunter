"use client";

import React, { useEffect, useState } from "react";
import { useGetItems } from "@/hooks/useItems";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Loading from "@/app/loading";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiFilter,
  FiCheckCircle,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import Image from "next/image";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL State
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";

  // Local State
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState(currentSearch);
  const [category, setCategory] = useState(currentCategory);
  const [brand, setBrand] = useState(currentBrand);

  // Fetch data
  const { data, isLoading } = useGetItems(page, search, category, brand);
  const { data: allData } = useGetItems(1, "", "", "");

  const allCategories = Array.from(
    new Set(allData?.items.map((p) => p.category) || []),
  );
  const allBrands = Array.from(
    new Set(allData?.items.map((p) => p.brand) || []),
  );

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    router.push(`/shop?${params.toString()}`);
  }, [page, search, category, brand, router]);

  if (isLoading) return <Loading />;

  const products = data?.items || [];
  const totalPages = data?.totalPages || 1;

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
      <div className="w-full text-center space-y-4 mb-12 md:mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content tracking-tight"
        >
          Explore the <span className="text-primary">Collection</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base-content/50 text-lg md:text-xl font-medium max-w-2xl mx-auto"
        >
          Discover premium gadgets and modern tech tools curated for hunters
          like you.
        </motion.p>
      </div>

      <Section className="space-y-12">
        {/* Advanced Filters */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="w-full lg:max-w-xl relative group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors text-xl" />
            <input
              type="text"
              placeholder="Search for gadgets..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full bg-base-200/50 border border-base-content/5 focus:bg-base-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-2xl pl-14 pr-6 py-4 text-base-content font-medium transition-all duration-300 placeholder:text-base-content/20 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
              <select
                value={brand}
                onChange={(e) => {
                  setPage(1);
                  setBrand(e.target.value);
                }}
                className="w-full lg:w-48 bg-base-200/50 border border-base-content/5 focus:bg-base-100 focus:border-primary/30 rounded-2xl pl-12 pr-6 py-4 text-base-content font-bold text-sm transition-all appearance-none cursor-pointer hover:bg-base-200"
              >
                <option value="">All Brands</option>
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b.charAt(0).toUpperCase() + b.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <p className="hidden sm:block text-xs font-black uppercase tracking-widest text-base-content/30 whitespace-nowrap">
              {products.length} Items Found
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5">
          {["All", ...allCategories].map((cat) => {
            const value = cat === "All" ? "" : cat;
            const isActive = category === value;
            return (
              <button
                key={cat}
                onClick={() => {
                  setPage(1);
                  setCategory(value);
                }}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? "text-primary-content"
                    : "bg-base-200/80 text-base-content/50 hover:bg-base-300 border border-base-content/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${category}-${brand}-${search}-${page}`}
          className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {products.length > 0 ? (
              products.map((product: Product) => (
                <motion.div key={product._id} variants={itemVariants} layout>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center space-y-4"
              >
                <div className="size-20 bg-base-200 rounded-full flex items-center justify-center mx-auto text-3xl text-base-content/20">
                  <FiSearch />
                </div>
                <div>
                  <h3 className="text-xl font-black text-base-content">
                    No gadgets found
                  </h3>
                  <p className="text-base-content/40">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 py-8 border-t border-base-content/5">
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

            <div className="flex items-center gap-2 px-6">
              <span className="text-sm font-black text-base-content">
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

      {/* NEW: Post-Pagination Brand Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 mb-16 md:mb-24 overflow-hidden rounded-[3rem] bg-base-200 border border-base-content/5 relative group"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-12 md:p-20 space-y-10 flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight tracking-tight">
                The Gadget Hunter <br />
                <span className="text-primary italic">Promise</span>
              </h2>
              <p className="text-base-content/60 text-lg font-medium max-w-md">
                We don&apos;t just sell products; we curate high-performance
                tools for your digital life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  title: "100% Original",
                  desc: "Genuine brands only",
                  icon: <FiCheckCircle />,
                },
                {
                  title: "Secure Check",
                  desc: "SSL encrypted payments",
                  icon: <FiShield />,
                },
                {
                  title: "Fast Shipping",
                  desc: "Safe doorstep delivery",
                  icon: <FiTruck />,
                },
                {
                  title: "Tech Support",
                  desc: "Expert help 24/7",
                  icon: <FiCheckCircle />,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-base-content tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <Image
              src="/shop/footer.png"
              alt="Premium Gadget Collection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-base-200 via-transparent to-transparent hidden lg:block" />
          </div>
        </div>
      </motion.div>
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
      className={`size-11 flex items-center justify-center rounded-2xl bg-base-200 border border-base-content/5 text-xl transition-all active:scale-90 ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-primary hover:text-primary-content hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
      }`}
    >
      {icon}
    </button>
  );
}
