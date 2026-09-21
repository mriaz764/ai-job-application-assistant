"use client";

import { useCurrentUser } from "@/lib/hooks/use-current-user";

export function AuthSession() {
  useCurrentUser();

  return null;
}
