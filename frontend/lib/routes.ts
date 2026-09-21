export const routes = {
  login: "/login",
  dashboard: "/dashboard",
  resumes: "/dashboard/resumes",
  resume: (id: number) => `/dashboard/resumes/${id}`,
  jobs: "/dashboard/jobs",
  analyses: "/dashboard/analyses",
  profile: "/dashboard/profile",
} as const;