export const routes = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  resumes: "/dashboard/resumes",
  resume: (id: number) => `/dashboard/resumes/${id}`,
  jobs: "/dashboard/jobs",
  job: (id: number) => `/dashboard/jobs/${id}`,
  analyses: "/dashboard/analyses",
  analysis: (id: number) => `/dashboard/analyses/${id}`,
  profile: "/dashboard/profile",
} as const;