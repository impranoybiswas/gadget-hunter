"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGetHeadData } from "@/hooks/useItems";
import { BannerItem } from "@/types/product";
import { FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Header() {
  const { isLoading, isError, data: bannerData } = useGetHeadData();

  const swiperData: BannerItem[] =
    isLoading || isError ? [] : bannerData?.slice(0, 3) || [];
  const sideData: BannerItem[] =
    isLoading || isError ? [] : bannerData?.slice(3, 5) || [];

  const brandLogos = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <header className="w-full space-y-5">
      {/* Main Banner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-84 md:h-100 lg:h-[480px] overflow-hidden col-span-1 lg:col-span-2 rounded-2xl shadow-sm"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="w-full h-full"
          >
            {swiperData.map((data, index) => (
              <SwiperSlide
                key={index}
                className="relative w-full h-full overflow-hidden"
              >
                {/* <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                /> */}

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster={data.image}
                >
                  <source src={data.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-white z-10 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                    New Arrival
                  </p>
                  <h2 className="text-2xl md:text-4xl font-black leading-tight drop-shadow-sm">
                    {data.title}
                  </h2>
                  <p className="text-sm md:text-base font-medium text-white/80 max-w-md">
                    {data.subtitle}
                  </p>
                  <Link
                    href={`/shop?category=${data.link}`}
                    className="inline-flex items-center gap-2 mt-2 bg-primary hover:bg-primary-focus text-white font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg text-sm"
                  >
                    Shop Now <FiArrowRight />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Side Banners */}
        <div className="flex flex-col gap-5 h-100 lg:h-[480px]">
          {sideData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="relative flex-1 rounded-2xl overflow-hidden group shadow-md cursor-pointer"
            >
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                  Featured
                </p>
                <h3 className="text-lg font-bold drop-shadow-md leading-tight">
                  {data.title}
                </h3>
                <p className="text-xs text-white/70 mt-0.5">{data.subtitle}</p>
                <Link
                  href={`/shop?category=${data.link}`}
                  className="mt-3 w-fit inline-flex items-center gap-1.5 text-xs font-bold text-white border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg transition-all"
                >
                  Explore <FiArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand Marquee */}
      <div className="bg-base-200/50 border border-base-content/5 rounded-xl h-10 md:h-12 flex items-center overflow-hidden">
        <Marquee speed={40} gradient={false} autoFill>
          <div className="flex items-center justify-center gap-8 px-4">
            {brandLogos.map((i, index) => (
              <Image
                key={index}
                src={`/assets/brands/logo-${i}.png`}
                alt={`logo-${i}`}
                width={500}
                height={500}
                className="h-4 md:h-5 w-auto object-contain dark:invert transition"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </header>
  );
}
