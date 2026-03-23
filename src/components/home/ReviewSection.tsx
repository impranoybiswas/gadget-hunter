"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Raju Kader",
    photo: "https://i.pravatar.cc/300?img=1",
    rating: 5,
    review:
      "Ordered a phone and it arrived in perfect condition within 2 days. Outstanding packaging!",
  },
  {
    id: 2,
    name: "Rahim Ahmed",
    photo: "https://i.pravatar.cc/300?img=2",
    rating: 4,
    review:
      "Great product quality. The earbuds I got exceed the description. Will order again.",
  },
  {
    id: 3,
    name: "Riya Chowdhury",
    photo: "https://i.pravatar.cc/300?img=3",
    rating: 5,
    review:
      "Best gadget store I've used. Fast shipping and exactly what I ordered. Highly recommended!",
  },
  {
    id: 4,
    name: "Karim Khan",
    photo: "https://i.pravatar.cc/300?img=4",
    rating: 4,
    review:
      "Quick checkout and great offers available. The smartwatch I bought is amazing.",
  },
  {
    id: 5,
    name: "Emily Brown",
    photo: "https://i.pravatar.cc/300?img=5",
    rating: 5,
    review:
      "Loved the product photos — they match reality perfectly. Very professional store.",
  },
  {
    id: 6,
    name: "David Smith",
    photo: "https://i.pravatar.cc/300?img=6",
    rating: 4,
    review:
      "Good overall experience. The tablet arrived in 3 days with all accessories included.",
  },
  {
    id: 7,
    name: "Fatima Noor",
    photo: "https://i.pravatar.cc/300?img=7",
    rating: 5,
    review:
      "Amazing discounts! I got my new earbuds at nearly half price during the flash sale.",
  },
  {
    id: 8,
    name: "John Wilson",
    photo: "https://i.pravatar.cc/300?img=8",
    rating: 4,
    review:
      "Easy navigation, great product selection and reliable delivery. Very happy with my tablet.",
  },
  {
    id: 9,
    name: "Maya Ali",
    photo: "https://i.pravatar.cc/300?img=9",
    rating: 5,
    review:
      "Super fast shipping and responsive customer support. The smartwatch looks premium.",
  },
  {
    id: 10,
    name: "Carlos Mendes",
    photo: "https://i.pravatar.cc/300?img=10",
    rating: 5,
    review:
      "Convenient and trustworthy gadget store. The product quality is consistent.",
  },
];

export default function ReviewSection() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Social Proof
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            What Customers Say
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-base-content/50">
          <FiMessageSquare />
          <span>{reviews.length}+ verified reviews</span>
        </div>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        navigation
        spaceBetween={20}
        className="w-full pb-12"
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="py-2 px-1 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-base-100 border border-base-content/8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-400 p-5 h-full flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating
                        ? "text-warning"
                        : "text-base-content/10"
                    }
                    size={13}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-base-content/70 leading-relaxed italic flex-1">
                &ldquo;{review.review}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-base-content/5">
                <Image
                  className="rounded-full object-cover shrink-0 border-2 border-primary/20"
                  src={review.photo}
                  alt={review.name}
                  width={40}
                  height={40}
                />
                <div>
                  <p className="text-sm font-bold text-base-content">
                    {review.name}
                  </p>
                  <p className="text-xs text-base-content/40">Verified Buyer</p>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
