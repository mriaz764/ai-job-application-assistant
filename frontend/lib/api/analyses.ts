import { apiClient } from "@/lib/api/client";

export interface ScoreBreakdown {
  skillsMatch: number;
  experienceMatch: number;
  requirementsMatch: number;
  educationMatch: number;
  otherFactors: number;
}

export interface AIAnalysisResult {
  scoreBreakdown: ScoreBreakdown;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  matchScore: number;
}

export interface Analysis {
  id: number;
  user_id: number;
  resume_id: number;
  job_id: number;
  match_score: number;
  result: AIAnalysisResult;
  created_at: string;
}

interface AnalysisListResponse {
  analyses: Analysis[];
}

interface AnalysisResponse {
  analysis: Analysis;
}

export interface CreateAnalysisInput {
  resumeId: number;
  jobId: number;
}

export const analysesApi = {
  getAll() {
    return apiClient.get<AnalysisListResponse>("/api/analyses");
  },

  getById(id: number) {
    return apiClient.get<AnalysisResponse>(`/api/analyses/${id}`);
  },

  create(data: CreateAnalysisInput) {
    return apiClient.post<AnalysisResponse>("/api/analyses", data);
  },
};