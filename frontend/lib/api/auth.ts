import { apiClient } from "@/lib/api/client";

export interface User {
  id: number;
  name: string;
  email: string;
}
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: User;
  accessToken: string;
}

interface CurrentUserResponse {
  user: User;
}

export const authApi = {
  login(email: string, password: string) {
    return apiClient.post<LoginResponse>("/api/auth/login", {
      email,
      password,
    }, {
      auth: false,
    });
  },

   register(data: RegisterInput) {
    return apiClient.post<LoginResponse>(
      "/api/auth/register",
      data,
      { auth: false },
    );
  },
  getCurrentUser() {
    return apiClient.get<CurrentUserResponse>("/api/auth/me");
  },

   logout() {
    return apiClient.post<{ message: string }>("/api/auth/logout");
  },
};