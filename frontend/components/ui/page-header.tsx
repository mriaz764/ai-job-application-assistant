interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-sm font-medium text-slate-500">{eyebrow}</p>
      )}

      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      {description && (
        <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
      )}
    </div>
  );
}
