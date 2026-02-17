"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGetHeadData } from "@/hooks/useItems";
import { BannerItem } from "@/types/product";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Header() {
  const { isLoading, isError, data: bannerData } = useGetHeadData();

  const swiperData: BannerItem[] =
    isLoading || isError ? [] : bannerData?.slice(0, 3) || [];
  const sideData: BannerItem[] =
    isLoading || isError ? [] : bannerData?.slice(3, 7) || [];

  const brandLogos = Array.from({ length: 12 }, (_, i) => i + 1);


  return (
    <header className="w-full space-y-6">
      {/* Main Banner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swiper Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-84 md:h-100 lg:h-120 overflow-hidden col-span-1 lg:col-span-2 rounded-lg shadow-sm"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            className="w-full h-full"
          >
            {swiperData.map((data, index) => (
              <SwiperSlide
                key={index}
                className="relative w-full h-full overflow-hidden"
              >
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  priority
                  className="object-cover rounded-lg transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white z-10">
                  <h2 className="text-2xl md:text-4xl font-bold text-shadow-xs drop-shadow-sm">
                    {data.title}
                  </h2>
                  <p className="text-base md:text-lg font-medium opacity-90">
                    {data.subtitle}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Side Banners */}
        <div className="flex flex-col gap-6 h-100 lg:h-120">
          {sideData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              className="relative h-1/2 rounded-lg overflow-hidden group shadow-md"
            >
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white z-10">
                <h3 className="text-xl font-semibold text-shadow-xs drop-shadow-md">
                  {data.title}
                </h3>
                <p className="text-sm opacity-90">{data.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-base-100 h-8 md:h-10 flex items-center overflow-hidden my-2"
      >
        <span className="w-[2px] h-full bg-gradient-to-b from-transparent via-base-300 to-transparent" />
        <Marquee speed={40} gradient={false} autoFill>
          <div className="flex items-center justify-center gap-6 px-3">
            {brandLogos.map((i, index) => (
              <Image
                key={index}
                src={`/assets/brands/logo-${i}.png`}
                alt={`logo-${i}`}
                width={500}
                height={500}
                className="h-4 md:h-6 w-auto object-contain dark:invert"
              />
            ))}
          </div>
        </Marquee>
        <span className="w-[2px] h-full bg-gradient-to-b from-transparent via-base-300 to-transparent" />
      </motion.div>
    </header>
  );
}
