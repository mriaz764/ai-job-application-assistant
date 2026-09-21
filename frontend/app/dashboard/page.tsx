"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { routes } from "@/lib/routes";
import { useAnalyses } from "@/lib/hooks/use-analyses";
import { useJobs } from "@/lib/hooks/use-jobs";
import { useResumes } from "@/lib/hooks/use-resumes";

export default function DashboardPage() {
  const resumesQuery = useResumes();
  const jobsQuery = useJobs();
  const analysesQuery = useAnalyses();

  const resumesCount = resumesQuery.data?.length ?? 0;
  const jobsCount = jobsQuery.data?.length ?? 0;
  const analysesCount = analysesQuery.data?.length ?? 0;

  const recentAnalyses = [...(analysesQuery.data ?? [])]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  const recentJobs = [...(jobsQuery.data ?? [])]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  const isLoading =
    resumesQuery.isLoading || jobsQuery.isLoading || analysesQuery.isLoading;

  return (
    <div>
      {/* Page heading */}
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Manage your resumes, job opportunities, and AI-powered job analyses from one place."
      />

      {/* Workspace overview */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Workspace overview
          </h2>

          <p className="text-sm text-slate-500">
            A quick look at your job search activity.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
                📄
              </div>

              <Link
                href={routes.resumes}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View →
              </Link>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">Resumes</p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {isLoading ? "—" : resumesCount}
            </p>

            <p className="mt-1 text-sm text-slate-500">Saved resumes</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
                💼
              </div>

              <Link
                href={routes.jobs}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View →
              </Link>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">Jobs</p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {isLoading ? "—" : jobsCount}
            </p>

            <p className="mt-1 text-sm text-slate-500">Saved opportunities</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
                ✨
              </div>

              <Link
                href={routes.analyses}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View →
              </Link>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              AI analyses
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {isLoading ? "—" : analysesCount}
            </p>

            <p className="mt-1 text-sm text-slate-500">Completed analyses</p>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick actions
          </h2>

          <p className="text-sm text-slate-500">
            Get started with your job search workflow.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Link
            href={routes.resumes}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
              📄
            </div>

            <h3 className="mt-5 font-semibold text-slate-900">
              Manage resumes
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create and manage the resumes you use for job applications.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-slate-900">
              View resumes →
            </span>
          </Link>

          <Link
            href={routes.jobs}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
              💼
            </div>

            <h3 className="mt-5 font-semibold text-slate-900">Manage jobs</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Save job opportunities and prepare them for AI analysis.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-slate-900">
              View jobs →
            </span>
          </Link>

          <Link
            href={routes.analyses}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
              ✨
            </div>

            <h3 className="mt-5 font-semibold text-slate-900">AI analyses</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Compare your resume with job requirements using AI.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-slate-900">
              View analyses →
            </span>
          </Link>
        </div>
      </section>

      {/* Recent activity */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent activity
          </h2>

          <p className="text-sm text-slate-500">
            Your latest saved jobs and AI analyses.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {/* Recent analyses */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Recent analyses
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest AI job matches.
                </p>
              </div>

              <Link
                href={routes.analyses}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View all →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {analysesQuery.isLoading ? (
                <div className="px-6 py-8 text-center text-sm text-slate-500">
                  Loading analyses...
                </div>
              ) : recentAnalyses.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm font-medium text-slate-900">
                    No analyses yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Create an analysis to see your AI job matches here.
                  </p>

                  <Link
                    href={`${routes.analyses}/new`}
                    className="mt-4 inline-block text-sm font-semibold text-slate-900 hover:text-slate-600"
                  >
                    Create analysis →
                  </Link>
                </div>
              ) : (
                recentAnalyses.map((analysis) => (
                  <Link
                    key={analysis.id}
                    href={routes.analysis(analysis.id)}
                    className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        Resume #{analysis.resume_id} × Job #{analysis.job_id}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold text-slate-900">
                        {analysis.match_score}%
                      </p>

                      <p className="text-xs text-slate-500">Match</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent jobs */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">Recent jobs</h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest saved opportunities.
                </p>
              </div>

              <Link
                href={routes.jobs}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View all →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {jobsQuery.isLoading ? (
                <div className="px-6 py-8 text-center text-sm text-slate-500">
                  Loading jobs...
                </div>
              ) : recentJobs.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm font-medium text-slate-900">
                    No jobs yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Save a job opportunity to start building your job workspace.
                  </p>

                  <Link
                    href={`${routes.jobs}/new`}
                    className="mt-4 inline-block text-sm font-semibold text-slate-900 hover:text-slate-600"
                  >
                    Add a job →
                  </Link>
                </div>
              ) : (
                recentJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={routes.job(job.id)}
                    className="block px-6 py-4 transition hover:bg-slate-50"
                  >
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {job.title}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-4">
                      <p className="truncate text-xs text-slate-500">
                        {job.company || "Company not specified"}
                      </p>

                      <p className="shrink-0 text-xs text-slate-500">
                        {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Getting started */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Get started</p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Build your first AI-powered job analysis
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Add a resume and save a job description. Then compare them and
              receive AI-powered recommendations.
            </p>
          </div>

          <Link
            href={routes.resumes}
            className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Add your resume
          </Link>
        </div>
      </section>
    </div>
  );
}
