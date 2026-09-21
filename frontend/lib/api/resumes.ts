import { apiClient } from "@/lib/api/client";

export interface Resume {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface ResumeListResponse {
  resumes: Resume[];
}

interface ResumeResponse {
  resume: Resume;
}

interface CreateResumeInput {
  title: string;
  content: string;
}

export const resumesApi = {
  getAll() {
    return apiClient.get<ResumeListResponse>("/api/resumes");
  },

  getById(id: number) {
    return apiClient.get<ResumeResponse>(`/api/resumes/${id}`);
  },

  create(data: CreateResumeInput) {
    return apiClient.post<ResumeResponse>("/api/resumes", data);
  },

  delete(id: number) {
    return apiClient.delete<{ message: string }>(`/api/resumes/${id}`);
  },
};