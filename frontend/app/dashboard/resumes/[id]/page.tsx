"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { useDeleteResume, useResume } from "@/lib/hooks/use-resumes";

export default function ResumeDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const { data: resume, isLoading, isError } = useResume(id);
  const deleteResume = useDeleteResume();

  const handleDelete = async () => {
    if (!resume) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteResume.mutateAsync(resume.id);
      router.replace(routes.resumes);
    } catch {
      // Error UI will be improved later.
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading resume...</p>
      </div>
    );
  }

  if (isError || !resume) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-lg font-semibold text-red-900">Resume not found</h1>

        <p className="mt-2 text-sm text-red-700">
          We could not load this resume.
        </p>

        <Link
          href={routes.resumes}
          className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to resumes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href={routes.resumes}
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Back to resumes
        </Link>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Resume</p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {resume.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Last updated {new Date(resume.created_at).toLocaleDateString()}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteResume.isPending}
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteResume.isPending ? "Deleting..." : "Delete resume"}
          </button>
        </div>
      </div>

      {deleteResume.isError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to delete the resume. Please try again.
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Resume content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your saved resume content.
          </p>
        </div>

        <div className="whitespace-pre-wrap px-6 py-6 text-sm leading-7 text-slate-700">
          {resume.content}
        </div>
      </section>
    </div>
  );
}
