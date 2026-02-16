"use client";

import { useToggleCart } from "@/hooks/useFavCarts";
import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";

interface CartButtonProps {
  productId: string;
  maxQuantity: number;
}

export default function CartButton({
  productId,
  maxQuantity,
}: CartButtonProps) {
  const { currentUser, isLoading: userLoading } = useUserData();
  const toggleCart = useToggleCart();

  // Local state for immediate feedback
  const [quantity, setQuantity] = useState<number | null>(null);

  // Sync quantity from backend user cart
  useEffect(() => {
    if (!currentUser) {
      if (!userLoading) setQuantity(0);
      return;
    }

    const cartItem = currentUser.carts?.find(
      (c: { productId: string }) => c.productId === productId
    );

    setQuantity(cartItem?.quantity ?? 0);
  }, [currentUser, productId, userLoading]);

  const updateCart = (nextQty: number) => {
    if (!currentUser?.email) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (nextQty < 0 || nextQty > maxQuantity) return;

    // Optimistically update local state
    const prevQty = quantity;
    setQuantity(nextQty);

    toggleCart.mutate(
      { productId, quantity: nextQty },
      {
        onError: () => {
          // Rollback on error
          setQuantity(prevQty);
        },
      }
    );
  };

  const isMutating = toggleCart.isPending;

  if (userLoading || quantity === null) {
    return (
      <div className="flex justify-center items-center p-2 min-w-[120px]">
        <LuLoader className="animate-spin text-primary" size={20} />
      </div>
    );
  }

  return (
    <div className="w-fit flex items-center space-x-3 bg-base-100/50 backdrop-blur-sm p-1 rounded-full border border-base-content/5 shadow-sm relative overflow-hidden">
      {/* Minus Button */}
      <button
        disabled={quantity <= 0 || isMutating}
        onClick={() => updateCart(quantity - 1)}
        className="w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 text-base-content/70 flex items-center justify-center transition-all duration-300 disabled:opacity-30 active:scale-90 cursor-pointer"
        aria-label="Decrease quantity"
      >
        <FaMinus size={12} />
      </button>

      {/* Quantity Display */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        {isMutating ? (
          <LuLoader className="animate-spin text-primary absolute" size={16} />
        ) : (
          <span className="text-sm font-bold text-base-content animate-in fade-in duration-300">
            {quantity}
          </span>
        )}
      </div>

      {/* Plus Button */}
      <button
        disabled={quantity >= maxQuantity || isMutating}
        onClick={() => updateCart(quantity + 1)}
        className="w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 text-base-content/70 flex items-center justify-center transition-all duration-300 disabled:opacity-30 active:scale-90 cursor-pointer"
        aria-label="Increase quantity"
      >
        <FaPlus size={12} />
      </button>

      {/* Subtle Progress Bar (Bottom) */}
      {isMutating && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full animate-pulse" />
      )}
    </div>
  );
}
