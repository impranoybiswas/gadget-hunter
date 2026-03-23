"use client";
import { useGetItems } from "@/hooks/useItems";
import Section from "@/ui/Section";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TopCategorySection() {
  const categories = ["Mobile", "Tablet", "Smart Watch", "Earbuds"];

  return (
    <Section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
      {categories.map((category, index) => (
        <CategorySwiper key={index} category={category} index={index} />
      ))}
    </Section>
  );
}

function CategorySwiper({ category, index }: { category: string, index: number }) {
  const { data, isLoading } = useGetItems(1, "", category.toLowerCase(), "", true);

  if (isLoading)
    return (
      <div className="bg-gradient-to-br from-primary/90 to-primary rounded-xl flex justify-center items-center h-70">
        <p className="text-white text-lg animate-pulse">Loading {category}...</p>
      </div>
    );

  const products = data?.items.slice(0, 5) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl shadow overflow-hidden p-3"
    >
      <div className="text-center py-3">
        <h3 className="text-white text-xl font-semibold tracking-wide uppercase">
          {category}
        </h3>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: index * 500 + 2000, disableOnInteraction: false }}
        loop
        className="w-full h-72"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`/shop/${item._id}`}
              className="relative block group h-72 w-full overflow-hidden rounded-xl"
            >
              <Image
                src={item.images?.[0] || "/assets/placeholder-image.svg"}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end items-center text-center p-4">
                <h4 className="text-white text-base md:text-lg font-semibold truncate w-full">
                  {item.name}
                </h4>
                <p className="text-white/80 text-sm pb-5">
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
