import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { queryClient } from "@/lib/query/query-client";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.register,

    onSuccess: (data) => {
      setUser(data.user);

      queryClient.setQueryData(
        ["current-user"],
        data.user,
      );
    },
  });
};