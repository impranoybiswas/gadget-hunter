"use client";

import { useUserData } from "@/hooks/useUserData";
import { Product } from "@/types/product";
import Button from "@/ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";

export function PayButton({ cartTotal, selectedProducts }: { cartTotal: number, selectedProducts: Product[] }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserData()

  const items = selectedProducts.map(p => ({
    id: p._id,
    quantity: p.cartQuantity,
  }));

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          items : items,
          customer: {
            name: currentUser?.name || "N/A",
            email: currentUser?.email || "N/A",
            address: "N/A",
            phone: "N/A",
          },
        }),
      });

      const text = await res.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text);

      if (data?.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
        console.log("Redirecting to payment gateway...");
      } else {
        toast.error("Payment initiation failed!");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      isLarge
      isOutline={false}
      className={`min-w-32 ${loading ? "pointer-events-none" : ""}`}
      onClick={handleCheckout}
      disabled={loading}
      label={loading ? "Processing..." : "Pay Now"}
    />
  );
}
