"use client";

import { useParams } from "next/navigation";
import { useGetItem } from "@/hooks/useItems";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Loading from "@/app/loading";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import CartButton from "@/components/CartButton";
import { FaShoppingCart } from "react-icons/fa";
import FavouriteButton from "@/components/FavouriteButton";

/**
 * =========================================================
 * Product Detail Page — Clean, Modern, and Responsive Layout
 * =========================================================
 */
export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Fetch product
  const { data: product, isLoading } = useGetItem(id);

  if (isLoading) return <Loading />;

  if (!product) {
    return (
      <Container>
        <p className="text-center text-base-content/50 py-16 text-lg font-medium">
          Product not found.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Section
        title={product.name}
        subtitle="Detailed view of the selected product"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8"
      >
        {/* ======== Left: Image Gallery ======== */}
        <div className="rounded-2xl overflow-hidden border border-base-content/10 shadow-sm hover:shadow-md transition-all duration-300 bg-base-100">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            loop
            className="w-full h-80 md:h-[28rem] lg:h-[32rem]"
          >
            {product.images?.length ? (
              product.images.map((img, index) => (
                <SwiperSlide key={index} className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </SwiperSlide>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full text-base-content/30 bg-base-200">
                No Image Available
              </div>
            )}
          </Swiper>
        </div>

        {/* ======== Right: Product Info ======== */}
        <div className="flex flex-col justify-between gap-6">
          {/* Product Heading & Brand */}
          <div>
            <p className="uppercase tracking-wide text-xs font-bold text-primary mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-primary mb-2">
              BDT {product.price.toLocaleString()}
            </p>
            <p className="text-sm text-base-content/50">
              Inclusive of all applicable taxes.
            </p>
          </div>

          {/* Product Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-base-content/80">
            <div className="bg-base-200 p-2 rounded-lg text-center">
              <span className="font-bold text-base-content block text-xs uppercase opacity-60">Category</span>
              {product.category}
            </div>
            <div className="bg-base-200 p-2 rounded-lg text-center">
              <span className="font-bold text-base-content block text-xs uppercase opacity-60">Warranty</span>
              {product.warranty || "N/A"}
            </div>
            <div className="bg-base-200 p-2 rounded-lg text-center">
              <span className="font-bold text-base-content block text-xs uppercase opacity-60">Condition</span>
              {product.isBrandNew ? "Brand New" : "Used"}
            </div>
            <div className="bg-base-200 p-2 rounded-lg text-center">
              <span className="font-bold text-base-content block text-xs uppercase opacity-60">Stock</span>
              {product.quantity} pcs
            </div>
          </div>

          {/* Description */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-base-content mb-2 border-b border-base-content/10 pb-2">
              Description
            </h3>
            <p className="text-base-content/70 leading-relaxed text-justify">
              {product.description || "No description available."}
            </p>
          </div>

          {/* ======== Action Buttons ======== */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            {/* Favourite Button */}
            <div className="flex items-center justify-center gap-3 w-full sm:w-auto border border-error/20 bg-error/5 hover:bg-error/10 transition-all duration-300 px-5 py-2.5 rounded-lg shadow-sm cursor-pointer group">
              <span className="font-medium text-base-content/70 text-sm group-hover:text-error transition-colors">
                Add to favorites
              </span>
              <FavouriteButton productId={product._id as string} />
            </div>

            {/* Add to Cart */}
            <div className="flex items-center justify-center gap-3 w-full sm:w-auto border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 px-5 py-2.5 rounded-lg shadow-sm cursor-pointer group">
              <FaShoppingCart className="text-primary text-lg" />
              <span className="font-medium text-base-content/70 text-sm group-hover:text-primary transition-colors">
                Add to Cart
              </span>
              <CartButton
                productId={product._id as string}
                maxQuantity={product.quantity}
              />
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
