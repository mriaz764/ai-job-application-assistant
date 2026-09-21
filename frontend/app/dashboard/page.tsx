import Link from "next/link";

import { routes } from "@/lib/routes";

export default function DashboardPage() {
  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Overview</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Manage your resumes, job opportunities, and AI-powered job analyses
          from one place.
        </p>
      </div>

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

      {/* Getting started */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Get started</p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Build your first AI-powered job analysis
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Add a resume and save a job description. Later, you&apos;ll be
              able to compare them and receive AI-powered recommendations.
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
