export interface JobAnalysisInput {
  resume: string;
  jobDescription: string;
}

export interface JobAnalysisResult {
  matchScore: number;
  message: string;
}

export const analyzeJob = (input: JobAnalysisInput): JobAnalysisResult => {
  const { resume, jobDescription } = input;

  const resumeWords = resume.toLowerCase().split(/\s+/);
  const jobWords = jobDescription.toLowerCase().split(/\s+/);

  const matchingWords = resumeWords.filter((word) => jobWords.includes(word));

  const uniqueMatchingWords = new Set(matchingWords);

  const matchScore = Math.min(
    Math.round((uniqueMatchingWords.size / jobWords.length) * 100),
    100,
  );

  return {
    matchScore,
    message: `Found ${uniqueMatchingWords.size} matching words between the resume and job description.`,
  };
};
