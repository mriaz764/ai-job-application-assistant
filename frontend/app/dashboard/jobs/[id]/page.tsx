"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { useDeleteJob, useJob } from "@/lib/hooks/use-jobs";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const { data: job, isLoading, isError } = useJob(id);
  const deleteJob = useDeleteJob();

  const handleDelete = async () => {
    if (!job) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob.mutateAsync(job.id);
      router.replace(routes.jobs);
    } catch {
      // Error UI is displayed below.
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading job...</p>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-lg font-semibold text-red-900">Job not found</h1>

        <p className="mt-2 text-sm text-red-700">We could not load this job.</p>

        <Link
          href={routes.jobs}
          className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href={routes.jobs}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to jobs
        </Link>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Job opportunity
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {job.title}
            </h1>

            {job.company && (
              <p className="mt-2 text-base font-medium text-slate-600">
                {job.company}
              </p>
            )}

            <p className="mt-2 text-sm text-slate-500">
              Added {new Date(job.created_at).toLocaleDateString()}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteJob.isPending}
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteJob.isPending ? "Deleting..." : "Delete job"}
          </button>
        </div>
      </div>

      {deleteJob.isError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to delete the job. Please try again.
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Job description
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Original job requirements and responsibilities.
          </p>
        </div>

        <div className="whitespace-pre-wrap px-6 py-6 text-sm leading-7 text-slate-700">
          {job.description}
        </div>
      </section>
    </div>
  );
}
