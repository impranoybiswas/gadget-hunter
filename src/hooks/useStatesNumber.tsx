import { useGetItems } from "@/hooks/useItems";
import { useCarts, useFavorites } from "./useFavCarts";
import { useGetPayments } from "./usePayments";
import { useUserData } from "./useUserData";

export function useStatesNumber() {
  const { currentUser } = useUserData();
  const { data: items } = useGetItems(1, "", "", "", true);
  const { data: carts = [] } = useCarts();
  const { data: favorites } = useFavorites();
  const { data: payments = [] } = useGetPayments(
    currentUser?.email ? { email: currentUser.email } : undefined,
  );

  const allCategories = items?.items.map((p) => p.category) || [];
  const totalCategories = [...new Set(allCategories)].length;

  const totalProducts = items?.items?.length || 0;
  const totalCarts = carts?.length || 0;
  const totalFavorites = favorites?.length || 0;

  // Calculate total spent for user
  const totalSpent = payments.reduce((acc, pay) => acc + (pay.amount || 0), 0);
  const totalOrders = payments.length;

  return {
    totalProducts,
    totalCarts,
    totalFavorites,
    totalCategories,
    totalSpent,
    totalOrders,
  };
}
