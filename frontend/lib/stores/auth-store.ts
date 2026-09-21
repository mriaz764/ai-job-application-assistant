import { create } from "zustand";

import type { User } from "@/lib/api/auth";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
    }),

  clearAuth: () =>
    set({
      user: null,
    }),
}));