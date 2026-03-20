"use client";
import { useGetItems } from "@/hooks/useItems";
import Section from "@/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FavouriteButton from "../FavouriteButton";

export default function FeaturedProductSection() {
  const { data, isLoading } = useGetItems(1, "", "", "");

  if (isLoading)
    return (
      <Section title="Featured Products" subtitle="Top picks curated for you">
        <p className="text-center text-gray-500 py-10">
          Loading featured items...
        </p>
      </Section>
    );

  const products = data?.items.slice(0, 15) || [];

  return (
    <Section
      title="Featured Products"
      subtitle="Top picks curated for you"
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
    >
      {products.map((p, index) => (
        <motion.div
          key={p._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="group relative rounded-md overflow-hidden border border-base-content/10 bg-base-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          {/* Image */}
          <div className="relative w-full aspect-square overflow-hidden bg-base-200">
            <Image
              src={p.images?.[0] || "/assets/placeholder-image.svg"}
              alt={p.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Quick View Button */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <Link
                href={`/shop/${p._id}`}
                className="px-4 py-1.5 bg-base-100 text-primary text-sm font-semibold rounded-full shadow hover:bg-primary hover:text-primary-content transition"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 px-3 md:px-4 py-3">
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-1">
              {p.brand}
            </p>
            <h3 className="font-semibold text-sm md:text-base text-base-content line-clamp-1">
              {p.name}
            </h3>
            <div className="flex items-center gap-1 text-primary font-semibold mt-2">
              <span className="text-base md:text-xl">{"BDT "+p.price}</span>
            </div>
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-10">
            <FavouriteButton productId={p._id as string} />
          </div>

          {/* Floating Tag (Optional) */}
          <div className="absolute top-3 left-3 bg-primary text-primary-content text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
            {p.category}
          </div>
        </motion.div>
      ))}
    </Section>
  );
}
