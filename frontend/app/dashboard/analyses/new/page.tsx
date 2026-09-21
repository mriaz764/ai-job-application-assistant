"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { useResumes } from "@/lib/hooks/use-resumes";
import { useJobs } from "@/lib/hooks/use-jobs";
import { useCreateAnalysis } from "@/lib/hooks/use-analyses";

export default function NewAnalysisPage() {
  const router = useRouter();

  const { data: resumes, isLoading: resumesLoading } = useResumes();
  const { data: jobs, isLoading: jobsLoading } = useJobs();
  const createAnalysis = useCreateAnalysis();

  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");

  const isLoading = resumesLoading || jobsLoading;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resumeId || !jobId) {
      return;
    }

    try {
      const response = await createAnalysis.mutateAsync({
        resumeId: Number(resumeId),
        jobId: Number(jobId),
      });

      router.replace(`${routes.analyses}/${response.analysis.id}`);
    } catch {
      // Error UI is displayed below.
    }
  };

  const hasResumes = Boolean(resumes && resumes.length > 0);
  const hasJobs = Boolean(jobs && jobs.length > 0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link
          href={routes.analyses}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to analyses
        </Link>

        <p className="mt-5 text-sm font-medium text-slate-500">
          AI job analysis
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          New analysis
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Select a resume and a job opportunity. AI will compare them and
          generate an explainable analysis.
        </p>
      </div>

      {!isLoading && (!hasResumes || !hasJobs) && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-semibold text-amber-900">
            You need a resume and a job first
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            Create at least one resume and one job opportunity before starting
            an analysis.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {!hasResumes && (
              <Link
                href={`${routes.resumes}/new`}
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Add resume
              </Link>
            )}

            {!hasJobs && (
              <Link
                href={`${routes.jobs}/new`}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white"
              >
                Add job
              </Link>
            )}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-slate-900"
            >
              Resume
            </label>

            <select
              id="resume"
              value={resumeId}
              onChange={(event) => setResumeId(event.target.value)}
              disabled={isLoading || !hasResumes || createAnalysis.isPending}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
            >
              <option value="">Select a resume</option>

              {resumes?.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="job"
              className="block text-sm font-medium text-slate-900"
            >
              Job opportunity
            </label>

            <select
              id="job"
              value={jobId}
              onChange={(event) => setJobId(event.target.value)}
              disabled={isLoading || !hasJobs || createAnalysis.isPending}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
            >
              <option value="">Select a job</option>

              {jobs?.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.company ? `${job.title} — ${job.company}` : job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {createAnalysis.isError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to create the analysis. Please try again.
          </div>
        )}

        <div className="mt-8 border-t border-slate-100 pt-6">
          <button
            type="submit"
            disabled={
              isLoading ||
              !hasResumes ||
              !hasJobs ||
              !resumeId ||
              !jobId ||
              createAnalysis.isPending
            }
            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createAnalysis.isPending ? "Analyzing..." : "Analyze job match"}
          </button>
        </div>
      </form>
    </div>
  );
}
