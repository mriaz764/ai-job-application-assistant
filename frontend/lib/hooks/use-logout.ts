import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      clearAuth();

      queryClient.removeQueries({
        queryKey: ["current-user"],
      });
    },
  });
};