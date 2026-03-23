"use client";

import Link from "next/link";
import { categories } from "@/utilities/Categories";
import { motion } from "framer-motion";

export default function CategorySection() {
  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Browse by Type
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            Top Categories
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-sm font-bold text-primary hover:underline underline-offset-4 transition shrink-0"
        >
          View All Products →
        </Link>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {categories.map((category, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              href={`/shop?category=${category.name.toLowerCase()}`}
              className="group flex flex-col items-center justify-center text-center p-4 md:p-5 rounded-2xl bg-base-200/60 border border-base-content/5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1 h-28 md:h-36 gap-3"
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <span className="text-xs md:text-sm font-bold text-base-content/70 group-hover:text-primary transition-colors duration-300 leading-tight">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
