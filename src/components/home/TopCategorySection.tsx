"use client";
import { useGetItems } from "@/hooks/useItems";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const CATEGORY_STYLES = [
  { accent: "from-violet-600 to-violet-800", border: "border-violet-500/30" },
  { accent: "from-sky-500 to-sky-700", border: "border-sky-500/30" },
  { accent: "from-rose-500 to-rose-700", border: "border-rose-500/30" },
  { accent: "from-amber-500 to-amber-700", border: "border-amber-500/30" },
];

export default function TopCategorySection() {
  const categories = ["Mobile", "Tablet", "Smart Watch", "Earbuds"];
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Shop by Category
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            Top Picks by Category
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((category, index) => (
          <CategorySwiper
            key={index}
            category={category}
            index={index}
            style={CATEGORY_STYLES[index % CATEGORY_STYLES.length]}
          />
        ))}
      </div>
    </section>
  );
}

function CategorySwiper({
  category,
  index,
  style,
}: {
  category: string;
  index: number;
  style: { accent: string; border: string };
}) {
  const { data, isLoading } = useGetItems(
    1,
    "",
    category.toLowerCase(),
    "",
    true,
  );

  if (isLoading)
    return (
      <div
        className={`bg-gradient-to-br ${style.accent} rounded-2xl flex justify-center items-center h-80 animate-pulse`}
      >
        <p className="text-white/60 text-sm">Loading {category}...</p>
      </div>
    );

  const products = data?.items.slice(0, 5) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
      className={`bg-gradient-to-br ${style.accent} rounded-2xl overflow-hidden border ${style.border} shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5">
        <h3 className="text-white font-bold tracking-wider uppercase text-sm">
          {category}
        </h3>
        <Link
          href={`/shop?category=${category.toLowerCase()}`}
          className="flex items-center gap-1 text-xs font-bold text-white/70 hover:text-white transition"
        >
          View All <FiArrowRight size={12} />
        </Link>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: index * 500 + 2000, disableOnInteraction: false }}
        loop
        className="w-full h-72"
      >
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            <Link
              href={`/shop/${item._id}`}
              className="relative block group h-72 w-full overflow-hidden"
            >
              <Image
                src={item.images?.[0] || "/assets/placeholder-image.svg"}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-106 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-center text-center p-4">
                <h4 className="text-white text-sm font-semibold line-clamp-2 w-full mb-1">
                  {item.name}
                </h4>
                <p className="text-white/70 text-xs mb-4">
                  BDT {item.price?.toLocaleString() || "N/A"}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
