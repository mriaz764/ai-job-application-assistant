"use client";

import Link from "next/link";

import { routes } from "@/lib/routes";
import { useDeleteJob, useJobs } from "@/lib/hooks/use-jobs";
import { EmptyState } from "@/components/ui/empty-state";

export default function JobsPage() {
  const { data: jobs, isLoading, isError } = useJobs();
  const deleteJob = useDeleteJob();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob.mutateAsync(id);
    } catch {
      // Error UI will be handled below.
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Job opportunities
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Jobs
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Save job opportunities you want to analyze against your resumes.
          </p>
        </div>

        <Link
          href={`${routes.jobs}/new`}
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Add job
        </Link>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">Loading jobs...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-900">Unable to load jobs</h2>

          <p className="mt-1 text-sm text-red-700">
            Something went wrong while loading your jobs.
          </p>
        </div>
      )}

      {!isLoading && !isError && jobs && jobs.length === 0 && (
        <EmptyState
          title="No jobs yet"
          description="Save a job opportunity to start building your job workspace."
          actionLabel="Add a job"
          actionHref={`${routes.jobs}/new`}
        />
      )}

      {!isLoading && !isError && jobs && jobs.length > 0 && (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <Link
                    href={`${routes.jobs}/${job.id}`}
                    className="block truncate text-lg font-semibold text-slate-900 transition hover:text-slate-600"
                  >
                    {job.title}
                  </Link>

                  {job.company && (
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {job.company}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-slate-500">
                    Added {new Date(job.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`${routes.jobs}/${job.id}`}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    View job
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(job.id)}
                    disabled={deleteJob.isPending}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deleteJob.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteJob.isError && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to delete the job. Please try again.
        </div>
      )}
    </div>
  );
}
