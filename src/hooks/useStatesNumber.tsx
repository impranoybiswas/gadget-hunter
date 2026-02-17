import { useGetItems } from "@/hooks/useItems";
import { useCarts, useFavorites } from "./useFavCarts";

export function useStatesNumber() {
  const { data: items } = useGetItems(1, "", "", "", true);
  const { data: carts = [] } = useCarts();
  const { data: favorites } = useFavorites();

  const allCategories = items?.items.map((p) => p.category);
  const totalCategories = [...new Set(allCategories)].length;

  const totalProducts = items?.items?.length || 0;
  const totalCarts = carts?.length || 0;
  const totalFavorites = favorites?.length || 0;

  return { totalProducts, totalCarts, totalFavorites, totalCategories };
}
