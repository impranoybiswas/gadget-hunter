"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddItem } from "@/hooks/useItems";
import { Product } from "@/types/product";
import { ImageUpload } from "@/customs/ImageUpload";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiPackage,
  FiTag,
  FiDollarSign,
  FiLayers,
  FiInfo,
  FiShield,
  FiPlus,
  FiBriefcase,
  FiImage,
} from "react-icons/fi";
import Button from "@/ui/Button";
import { categories } from "@/utilities/Categories";

/** Form field types */
type ProductFormValues = {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  warranty: string;
  description: string;
};

export default function AddProduct() {
  const { register, handleSubmit, reset } = useForm<ProductFormValues>();
  const addProduct = useAddItem();

  // Image state management
  const [images, setImages] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);

  /** Handle new image upload */
  const handleImageUpload = (url: string, index: number) => {
    const updated = [...images];
    updated[index] = url;
    setImages(updated);
  };

  /** Handle form submission */
  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      // Validation check
      const uploadedImages = images.filter((img) => img);
      if (uploadedImages.length === 0) {
        toast.error("Please upload at least one product image.");
        setLoading(false);
        return;
      }

      const product: Product = {
        name: data.name.trim(),
        brand: data.brand.trim(),
        price: Number(data.price),
        quantity: Number(data.quantity),
        category: data.category.trim(),
        warranty: data.warranty.trim(),
        description: data.description.trim(),
        images: uploadedImages,
      };

      // Send to backend
      await addProduct.mutateAsync(product);
      toast.success("✅ Product added successfully!");
      reset();
      setImages(["", "", ""]);
    } catch (err) {
      console.error("❌ Error adding product:", err);
      toast.error("Something went wrong while adding product.");
    } finally {
      setLoading(false);
    }
  };

  const fieldLabelClass =
    "flex items-center gap-2 text-sm font-semibold mb-2 text-base-content/80";
  const inputClass =
    "input input-bordered w-full bg-base-200/40 focus:input-primary border-base-content/10 transition-all duration-200";

  return (
    <section className="w-full mx-auto py-4">
      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-md rounded-2xl p-6 sm:p-10 space-y-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Section 1: Basic Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-base-content/5 pb-2">
            <FiInfo className="text-primary" />
            <h2 className="text-lg font-bold">General Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className={fieldLabelClass}>
                <FiPackage className="text-primary/70" /> Product Name
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="e.g. Google Pixel 9 Pro"
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className={fieldLabelClass}>
                <FiBriefcase className="text-primary/70" /> Brand Name
              </label>
              <input
                {...register("brand", { required: true })}
                placeholder="e.g. Google"
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className={fieldLabelClass}>
                <FiLayers className="text-primary/70" /> Category
              </label>
              <select
                {...register("category", { required: true })}
                className={`${inputClass} select select-bordered`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category...
                </option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className={fieldLabelClass}>
                <FiShield className="text-primary/70" /> Warranty Info
              </label>
              <input
                {...register("warranty")}
                placeholder="e.g. 1 Year Local Warranty"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Inventory & Pricing */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-base-content/5 pb-2">
            <FiDollarSign className="text-primary" />
            <h2 className="text-lg font-bold">Pricing & Stock</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className={fieldLabelClass}>
                <FiDollarSign className="text-primary/70" /> Price (BDT)
              </label>
              <div className="relative">
                <input
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="0.00"
                  className={`${inputClass} pl-10`}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 font-bold">
                  ৳
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className={fieldLabelClass}>
                <FiTag className="text-primary/70" /> Stock Quantity
              </label>
              <input
                {...register("quantity", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Available units"
                className={inputClass}
              />
            </div>
          </div>

          
        </div>

        {/* Section 3: Description */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-base-content/5 pb-2">
            <FiInfo className="text-primary" />
            <h2 className="text-lg font-bold">Product Details</h2>
          </div>
          <div className="space-y-1">
            <label className={fieldLabelClass}>Comprehensive Description</label>
            <textarea
              {...register("description")}
              placeholder="Describe the key features, specifications, and what makes this gadget stand out..."
              className="textarea textarea-bordered w-full bg-base-200/40 focus:textarea-primary border-base-content/10 min-h-[160px] transition-all text-base"
            />
          </div>
        </div>

        {/* Section 4: Image Upload */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-base-content/5 pb-2">
            <FiImage className="text-primary" />
            <h2 className="text-lg font-bold">Product Showcase</h2>
          </div>
          <p className="text-xs text-base-content/50 -mt-4">
            High-quality images attract 3x more customers. (Minimum 1 Required)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="group transition-all duration-300">
                <ImageUpload
                  folder="gadget_hunters/products"
                  label={`Gallery View ${i + 1}`}
                  imageUrl={images[i] || "/assets/placeholder-image.svg"}
                  onUploadSuccess={(url) => handleImageUpload(url, i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-end border-t border-base-content/5">
          <Button
            type="button"
            label="Reset Form"
            isOutline
            isLarge
            onClick={() => {
              reset();
              setImages(["", "", ""]);
            }}
          />

          <Button
            type="submit"
            leftIcon={
              loading || addProduct.status === "pending" ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FiPlus />
              )
            }
            label={
              loading || addProduct.status === "pending"
                ? "Adding Gadget..."
                : "List Product"
            }
            isLarge
            isOutline={false}
            disabled={loading || addProduct.status === "pending"}
          />
        </div>
      </motion.form>
    </section>
  );
}
