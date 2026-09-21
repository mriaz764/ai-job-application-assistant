"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.replace(routes.login);
    }
  }, [isLoading, isError, user, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  if (isError || !user) {
    return null;
  }

  return children;
}
