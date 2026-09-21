import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{title}</p>

      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 inline-block text-sm font-semibold text-slate-900 hover:text-slate-600"
        >
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
