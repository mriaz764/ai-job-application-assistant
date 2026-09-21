"use client";

import Link from "next/link";

import { routes } from "@/lib/routes";
import { useAnalyses } from "@/lib/hooks/use-analyses";
import { EmptyState } from "@/components/ui/empty-state";

export default function AnalysesPage() {
  const { data: analyses, isLoading, isError } = useAnalyses();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">AI insights</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Analyses
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Compare your resumes with saved job opportunities using AI.
          </p>
        </div>

        <Link
          href={`${routes.analyses}/new`}
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          New analysis
        </Link>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">Loading analyses...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-900">
            Unable to load analyses
          </h2>

          <p className="mt-1 text-sm text-red-700">
            Something went wrong while loading your analyses.
          </p>
        </div>
      )}

      {!isLoading && !isError && analyses && analyses.length === 0 && (
        <EmptyState
          title="No analyses yet"
          description="Create an analysis to compare your resume with a saved job."
          actionLabel="Create analysis"
          actionHref={`${routes.analyses}/new`}
        />
      )}

      {!isLoading && !isError && analyses && analyses.length > 0 && (
        <div className="grid gap-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      Analysis #{analysis.id}
                    </span>

                    <span className="text-sm text-slate-500">
                      Created{" "}
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-slate-900">
                    Resume #{analysis.resume_id} × Job #{analysis.job_id}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    AI-powered compatibility analysis
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Match
                    </p>

                    <p className="text-2xl font-bold text-slate-900">
                      {analysis.match_score}%
                    </p>
                  </div>

                  <Link
                    href={`${routes.analyses}/${analysis.id}`}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    View analysis
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
