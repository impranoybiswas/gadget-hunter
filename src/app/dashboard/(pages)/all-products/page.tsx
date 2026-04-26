"use client";

import React from "react";
import { useGetItems, useDeleteItem } from "@/hooks/useItems";
import ProtectedLayout from "@/customs/ProtectedLayout";
import { FaTrash, FaBoxOpen, FaCube } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Image from "next/image";
import { AxiosError } from "axios";

export default function AllProductsPage() {
  const { data, isLoading } = useGetItems(1, "", "", "", true); // Fetch all
  const deleteItem = useDeleteItem();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteItem.mutateAsync(id);
          toast.success("Product deleted successfully");
        } catch (err: unknown) {
          const error = err as AxiosError<{ error: string }>;
          toast.error(
            error?.response?.data?.error || "Failed to delete product",
          );
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const products = data?.items || [];

  return (
    <ProtectedLayout protectedFor="admin">
      <div className="bg-base-100 rounded-xl shadow-md border border-base-content/10 overflow-hidden">
        <div className="p-6 border-b border-base-content/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
            <FaBoxOpen className="text-primary" /> Manage Products
          </h2>
          <span className="badge badge-primary">
            {products.length} Total Items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-left">
            <thead className="bg-base-200 text-base-content/70 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">In Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-content/5">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-base-200/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-base-300 relative">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-base-content/30">
                              <FaCube size={24} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base-content line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-xs text-base-content/50 uppercase tracking-tighter">
                          {product.brand}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base-content/70">
                    <span className="bg-base-200 px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div
                      className={`badge ${product.quantity > 0 ? "badge-success text-white" : "badge-error text-white font-bold"}`}
                    >
                      {product.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* Note: Edit page might not exist, but adding as standard */}
                      {/* <Link href={`/dashboard/edit-product/${product._id}`} className="btn btn-ghost btn-sm text-info bg-info/10 hover:bg-info hover:text-white">
                        <FaEdit />
                      </Link> */}
                      <button
                        onClick={() => handleDelete(product._id!)}
                        className="btn btn-ghost btn-sm text-error bg-error/10 hover:bg-error hover:text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-base-content/50"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedLayout>
  );
}
