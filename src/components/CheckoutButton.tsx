"use client";

import { Product } from "@/types/product";
import Modal from "@/ui/Modal";
import { PayButton } from "./PayButton";
import Button from "@/ui/Button";
import { FaCartShopping } from "react-icons/fa6";

type Props = {
  selectedProducts: Product[];
  cartTotal: number;
};

export default function CheckoutButton({ selectedProducts, cartTotal }: Props) {
  return (
    <Modal
      label={
        <Button
          label="Checkout"
          leftIcon={<FaCartShopping />}
          isLarge
          isOutline={false}
          disabled={selectedProducts.length === 0}
        />
      }
    >
      <div className="space-y-4">
        {/* Header */}
        <h2 className="text-lg font-semibold text-base-content">Order Summary</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-base-content/10 rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th className="p-2 text-sm font-medium text-base-content/70">Product</th>
                <th className="p-2 text-sm font-medium text-base-content/70">Qty</th>
                <th className="p-2 text-sm font-medium text-base-content/70">Unit Price</th>
                <th className="p-2 text-sm font-medium text-base-content/70">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-base-content/5 last:border-b-0 hover:bg-base-200/50"
                >
                  {/* Product */}
                  <td className="p-2 text-base-content font-medium text-sm tracking-tight">
                    {product.name}
                  </td>

                  {/* Quantity */}
                  <td className="p-2 text-sm text-base-content/80">
                    {product.cartQuantity || 1}
                  </td>

                  {/* Base Price */}
                  <td className="p-2 text-sm text-base-content/80">
                    BDT {product.price.toFixed(2)}
                  </td>

                  {/* Total Price */}
                  <td className="p-2 text-sm font-semibold text-success">
                    BDT{" "}
                    {(
                      product.totalPrice ||
                      product.price * (product.cartQuantity || 1)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-base-content/5 pt-4">
          <span className="text-base-content/70 font-medium">Total Amount</span>
          <span className="text-lg font-bold text-success">
            BDT {cartTotal.toFixed(2)}
          </span>
        </div>

        {/* Pay Now */}
        <div className="pt-2 float-end">
          <PayButton cartTotal={cartTotal} selectedProducts={selectedProducts} />
        </div>
      </div>
    </Modal>
  );
}
