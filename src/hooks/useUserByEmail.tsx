import axiosApi from "@/libs/axiosInstance";
import { DBUser } from "@/types/dbUser";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

/**
 * Fetch current logged-in user (backend verifies via session)
 */
const fetchUser = async ({ email }: { email: string }): Promise<DBUser> => {
  const response = await axiosApi.get<DBUser>("/userByEmail", { params: { email } });
  return response.data;
};

/**
 * Custom hook to fetch the current logged-in user's data
 */
export function useUserByEmail({ email }: { email: string }) {
  const { data: session, status } = useSession();

  const query = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUser({ email }),
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    authorUser: query.data,
    isLoading: query.isLoading,
    session,
    status,
  };
}