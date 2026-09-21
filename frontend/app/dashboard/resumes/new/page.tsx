"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useCreateResume } from "@/lib/hooks/use-resumes";
import { routes } from "@/lib/routes";

export default function NewResumePage() {
  const router = useRouter();
  const createResume = useCreateResume();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      await createResume.mutateAsync({
        title: title.trim(),
        content: content.trim(),
      });

      router.replace(routes.resumes);
    } catch {
      // React Query exposes the mutation error through createResume.error.
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">Add Resume</h1>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-xl bg-white p-6 shadow-sm"
          >
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Resume title
              </label>

              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Senior Flutter Developer"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Resume content
              </label>

              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={16}
                placeholder="Paste your resume content here..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
              />
            </div>

            {createResume.isError && (
              <p className="text-sm text-red-600">
                Failed to create resume. Please try again.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.replace(routes.resumes)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  createResume.isPending || !title.trim() || !content.trim()
                }
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {createResume.isPending ? "Saving..." : "Save Resume"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
