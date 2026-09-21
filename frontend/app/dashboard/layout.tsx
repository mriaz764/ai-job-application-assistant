"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useLogout } from "@/lib/hooks/use-logout";
import { routes } from "@/lib/routes";
import { useAuthStore } from "@/lib/stores/auth-store";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    label: "Dashboard",
    href: routes.dashboard,
    icon: "⌂",
  },
  {
    label: "Resumes",
    href: routes.resumes,
    icon: "▤",
  },
  {
    label: "Jobs",
    href: routes.jobs,
    icon: "▣",
  },
  {
    label: "Analyses",
    href: routes.analyses,
    icon: "✦",
  },
  {
    label: "Profile",
    href: routes.profile,
    icon: "◯",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useLogout();
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.replace(routes.login);
    } catch {
      // Error UI can be added later.
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-slate-200 px-6">
              <Link href={routes.dashboard} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                  AI
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Job Assistant
                  </p>

                  <p className="text-xs text-slate-500">
                    AI-powered career tools
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
              </p>

              <div className="space-y-1">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== routes.dashboard &&
                      pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.icon}
                      </span>

                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* User section */}
            <div className="border-t border-slate-200 p-4">
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {user?.name ?? "User"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.email ?? ""}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={logout.isPending}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100">
                  ↪
                </span>

                {logout.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </aside>

          {/* Main application area */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Header */}
            <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
              <div>
                <p className="text-sm text-slate-500">
                  AI Job Application Assistant
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  Your career workspace
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.name ?? "User"}
                  </p>

                  <p className="text-xs text-slate-500">{user?.email ?? ""}</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1 p-6 lg:p-8">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
