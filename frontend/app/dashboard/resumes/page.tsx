"use client";

import Link from "next/link";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useDeleteResume, useResumes } from "@/lib/hooks/use-resumes";
import { routes } from "@/lib/routes";
import { EmptyState } from "@/components/ui/empty-state";

export default function ResumesPage() {
  const { data: resumes, isLoading, isError } = useResumes();
  const deleteResume = useDeleteResume();

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) {
      return;
    }

    deleteResume.mutate(id);
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href={routes.dashboard}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                ← Dashboard
              </Link>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Resumes
              </h1>

              <p className="mt-1 text-slate-600">
                Manage your resumes for job analysis.
              </p>
            </div>

            <Link
              href={`${routes.resumes}/new`}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Add Resume
            </Link>
          </div>

          {isLoading && (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              Loading resumes...
            </div>
          )}

          {isError && (
            <div className="rounded-xl bg-white p-8 text-center text-red-600 shadow-sm">
              Failed to load resumes.
            </div>
          )}

          {!isLoading && !isError && resumes?.length === 0 && (
            <EmptyState
              title="No resumes yet"
              description="Create a resume to start analyzing your fit for job opportunities."
              actionLabel="Create resume"
              actionHref={`${routes.resumes}/new`}
            />
          )}

          {!isLoading && !isError && resumes && resumes.length > 0 && (
            <div className="grid gap-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <Link
                        href={routes.resume(resume.id)}
                        className="block truncate text-lg font-semibold text-slate-900 transition hover:text-slate-600"
                      >
                        {resume.title}
                      </Link>

                      <p className="mt-1 text-sm text-slate-500">
                        Updated{" "}
                        {new Date(resume.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <Link
                        href={routes.resume(resume.id)}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        View resume
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(resume.id)}
                        disabled={deleteResume.isPending}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deleteResume.isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
