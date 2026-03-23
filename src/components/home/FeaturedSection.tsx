"use client";
import { useGetItems } from "@/hooks/useItems";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FavouriteButton from "../FavouriteButton";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const TABS = ["All", "Mobile", "Tablet", "Earbuds", "Smart Watch"];

export default function FeaturedProductSection() {
  const [activeTab, setActiveTab] = useState("All");
  const { data, isLoading } = useGetItems(
    1,
    "",
    activeTab === "All" ? "" : activeTab.toLowerCase(),
    "",
  );

  const products = data?.items.slice(0, 10) || [];

  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Handpicked for You
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            Featured Products
          </h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4 transition shrink-0"
        >
          View All <FiArrowRight />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-primary text-primary-content border-primary shadow-sm"
                : "bg-base-200/60 text-base-content/60 border-base-content/10 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-base-200 animate-pulse aspect-[3/4]"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              className="group relative rounded-2xl overflow-hidden border border-base-content/8 bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Favourite */}
              <div className="absolute top-3 right-3 z-20">
                <FavouriteButton productId={p._id as string} />
              </div>

              {/* Category Tag */}
              <div className="absolute top-3 left-3 z-20 bg-primary/90 text-primary-content text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {p.category}
              </div>

              {/* Image */}
              <Link href={`/shop/${p._id}`} className="block">
                <div className="relative w-full aspect-square overflow-hidden bg-base-200">
                  <Image
                    src={p.images?.[0] || "/assets/placeholder-image.svg"}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-107 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Quick View pill */}
                  <div className="absolute bottom-0 inset-x-0 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 pb-3">
                    <span className="px-4 py-1.5 bg-white text-primary text-xs font-bold rounded-full shadow-lg">
                      Quick View
                    </span>
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="flex flex-col flex-1 px-3 md:px-4 py-3">
                <p className="text-[10px] text-base-content/40 uppercase tracking-widest font-bold mb-1">
                  {p.brand}
                </p>
                <h3 className="font-semibold text-xs md:text-sm text-base-content line-clamp-2 leading-snug mb-2">
                  {p.name}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm md:text-base font-black text-primary">
                    BDT {p.price?.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {products.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-content/10">
          <p className="text-base-content/40 text-sm">
            No products found in this category.
          </p>
        </div>
      )}
    </section>
  );
}
