import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "@/lib/api/jobs";

const jobsQueryKey = ["jobs"];

export const useJobs = () => {
  return useQuery({
    queryKey: jobsQueryKey,
    queryFn: async () => {
      const response = await jobsApi.getAll();
      return response.jobs;
    },
  });
};

export const useJob = (id: number) => {
  return useQuery({
    queryKey: [...jobsQueryKey, id],
    queryFn: async () => {
      const response = await jobsApi.getById(id);
      return response.job;
    },
    enabled: Number.isInteger(id) && id > 0,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: jobsQueryKey,
      });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobsApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: [...jobsQueryKey, id],
      });

      queryClient.invalidateQueries({
        queryKey: jobsQueryKey,
      });
    },
  });
};