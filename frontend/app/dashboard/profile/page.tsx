"use client";

import { useAuthStore } from "@/lib/stores/auth-store";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">
          Unable to load your profile information.
        </p>
      </div>
    );
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Account</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          View your account information and authentication details.
        </p>
      </div>

      {/* Profile overview */}
      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
            {initial}
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>

            <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
      </section>

      {/* Account details */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">Account information</h2>

          <p className="mt-1 text-sm text-slate-500">
            Information associated with your account.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-sm font-medium text-slate-900">Name</p>

              <p className="mt-1 text-sm text-slate-500">Your account name</p>
            </div>

            <p className="text-sm font-medium text-slate-700 sm:text-right">
              {user.name}
            </p>
          </div>

          <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-sm font-medium text-slate-900">Email</p>

              <p className="mt-1 text-sm text-slate-500">
                Your account email address
              </p>
            </div>

            <p className="break-all text-sm font-medium text-slate-700 sm:text-right">
              {user.email}
            </p>
          </div>

          <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-sm font-medium text-slate-900">User ID</p>

              <p className="mt-1 text-sm text-slate-500">
                Internal account identifier
              </p>
            </div>

            <p className="text-sm font-medium text-slate-700 sm:text-right">
              #{user.id}
            </p>
          </div>
        </div>
      </section>

      {/* Account status */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
            ✓
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Account active
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your account is authenticated and ready to use the AI Job
              Application Assistant.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
