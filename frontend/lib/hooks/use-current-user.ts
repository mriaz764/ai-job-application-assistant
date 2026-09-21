import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";

export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await authApi.getCurrentUser();

      setUser(response.user);

      return response.user;
    },
    retry: false,
  });
};