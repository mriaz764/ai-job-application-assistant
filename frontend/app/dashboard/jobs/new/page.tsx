"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { useCreateJob } from "@/lib/hooks/use-jobs";

export default function NewJobPage() {
  const router = useRouter();
  const createJob = useCreateJob();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createJob.mutateAsync({
        title: title.trim(),
        company: company.trim() || undefined,
        description: description.trim(),
      });

      router.replace(routes.jobs);
    } catch {
      // Error is displayed below.
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link
          href={routes.jobs}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to jobs
        </Link>

        <p className="mt-5 text-sm font-medium text-slate-500">
          Job opportunity
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Add job
        </h1>

        <p className="mt-2 text-slate-600">
          Save a job opportunity so you can analyze it against your resume.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-900"
            >
              Job title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Senior Flutter Developer"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-slate-900"
            >
              Company
              <span className="ml-1 font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="e.g. Acme Technologies"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-900"
            >
              Job description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Paste the complete job description here..."
              required
              rows={14}
              className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />

            <p className="mt-2 text-xs text-slate-500">
              Include the responsibilities, requirements, skills, and
              qualifications from the original job posting.
            </p>
          </div>
        </div>

        {createJob.isError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to save the job. Please check the information and try again.
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <Link
            href={routes.jobs}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={
              createJob.isPending || !title.trim() || !description.trim()
            }
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createJob.isPending ? "Saving..." : "Save job"}
          </button>
        </div>
      </form>
    </div>
  );
}
