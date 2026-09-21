import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => authApi.login(email, password),

    onSuccess: (response) => {
      setUser(response.user);
      queryClient.setQueryData(
        ["current-user"],
        response.user,
      );
    },
  });
};