import { apiClient } from "@/lib/api/client";

export interface Job {
  id: number;
  user_id: number;
  title: string;
  company?: string;
  description: string;
  created_at: string;
}

export interface CreateJobInput {
  title: string;
  company?: string;
  description: string;
}

export interface UpdateJobInput {
  title: string;
  company?: string;
  description: string;
}

interface JobListResponse {
  jobs: Job[];
}

interface JobResponse {
  job: Job;
}

export const jobsApi = {
  getAll() {
    return apiClient.get<JobListResponse>("/api/jobs");
  },

  getById(id: number) {
    return apiClient.get<JobResponse>(`/api/jobs/${id}`);
  },

  create(data: CreateJobInput) {
    return apiClient.post<JobResponse>("/api/jobs", data);
  },


  delete(id: number) {
    return apiClient.delete<{ message: string }>(`/api/jobs/${id}`);
  },
};