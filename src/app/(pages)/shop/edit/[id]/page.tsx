"use client";

import { useGetItem, useUpdateItem } from "@/hooks/useItems";
import React from "react";
import toast from "react-hot-toast";

export default function ProductEdit({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data: product, isLoading } = useGetItem(id);
  const updateProduct = useUpdateItem();

  if (isLoading) {
    return <p className="p-4 text-base-content/50 animate-pulse">Loading product...</p>;
  }

  if (!product) {
    return <p className="p-4 text-error font-semibold">Product not found.</p>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));

    // Ensure required fields are valid
    if (!name || isNaN(price)) {
      toast.error("Please provide valid name and price.");
      return;
    }

    // Trigger mutation
    updateProduct.mutate(
      { _id: id, name, price },
      {
        onSuccess: () => {
          toast.success("✅ Product updated successfully!");
        },
        onError: () => {
          toast.error("❌ Failed to update product. Please try again.");
        },
      }
    );
  };

  return (
    <div className="mt-10 p-6 bg-base-100 rounded-xl border border-base-content/10 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-base-content">
        Edit Product – <span className="text-primary font-mono text-sm">{product._id}</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          defaultValue={product.name}
          placeholder="Name"
          name="name"
          className="input input-bordered flex-1"
        />
        <input
          defaultValue={product.price}
          placeholder="Price"
          name="price"
          type="number"
          className="input input-bordered w-full md:w-32"
        />
        <button
          type="submit"
          disabled={updateProduct.isPending}
          className={`btn btn-primary ${updateProduct.isPending ? "loading" : ""}`}
        >
          {updateProduct.isPending ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
