"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { routes } from "@/lib/routes";
import { useAnalysis } from "@/lib/hooks/use-analyses";

export default function AnalysisDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: analysis, isLoading, isError } = useAnalysis(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading analysis...</p>
      </div>
    );
  }

  if (isError || !analysis) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-lg font-semibold text-red-900">
          Analysis not found
        </h1>

        <p className="mt-2 text-sm text-red-700">
          We could not load this analysis.
        </p>

        <Link
          href={routes.analyses}
          className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to analyses
        </Link>
      </div>
    );
  }

  const result = analysis.result;

  const scoreItems = [
    {
      label: "Skills",
      value: result.scoreBreakdown.skillsMatch,
      max: 40,
    },
    {
      label: "Experience",
      value: result.scoreBreakdown.experienceMatch,
      max: 25,
    },
    {
      label: "Requirements",
      value: result.scoreBreakdown.requirementsMatch,
      max: 20,
    },
    {
      label: "Education",
      value: result.scoreBreakdown.educationMatch,
      max: 10,
    },
    {
      label: "Other factors",
      value: result.scoreBreakdown.otherFactors,
      max: 5,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <Link
          href={routes.analyses}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to analyses
        </Link>

        <div className="mt-4">
          <p className="text-sm font-medium text-slate-500">AI job analysis</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Analysis #{analysis.id}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Created {new Date(analysis.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Match score */}
      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Overall match</p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Resume #{analysis.resume_id} × Job #{analysis.job_id}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              AI-generated compatibility analysis based on the selected resume
              and job description.
            </p>
          </div>

          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-8 border-slate-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">
                {analysis.match_score}
              </p>
              <p className="text-xs font-medium text-slate-500">/ 100</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Summary</h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {result.summary}
        </p>
      </section>

      {/* Score breakdown */}
      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Score breakdown
        </h2>

        <div className="mt-6 space-y-5">
          {scoreItems.map((item) => {
            const percentage = (item.value / item.max) * 100;

            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {item.value} / {item.max}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Matched skills
          </h2>

          {result.matchedSkills.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {result.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No matched skills were identified.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Missing skills
          </h2>

          {result.missingSkills.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {result.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No missing skills were identified.
            </p>
          )}
        </section>
      </div>

      {/* Strengths and weaknesses */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Strengths</h2>

          {result.strengths.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {result.strengths.map((strength) => (
                <li
                  key={strength}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No strengths were identified.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Weaknesses</h2>

          {result.weaknesses.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {result.weaknesses.map((weakness) => (
                <li
                  key={weakness}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No weaknesses were identified.
            </p>
          )}
        </section>
      </div>

      {/* Recommendations */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Recommendations
        </h2>

        {result.recommendations.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {result.recommendations.map((recommendation) => (
              <li
                key={recommendation}
                className="flex gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            No recommendations were generated.
          </p>
        )}
      </section>
    </div>
  );
}
