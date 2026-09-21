"use client";

import { useRouter } from "next/navigation";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useLogout } from "@/lib/hooks/use-logout";
import { routes } from "@/lib/routes";

export default function DashboardPage() {
  const router = useRouter();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();

      router.replace(routes.login);
    } catch {
      // We'll handle the error UI properly later.
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

              <p className="mt-2 text-slate-600">
                Welcome to your AI Job Application Assistant.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={logout.isPending}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {logout.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
