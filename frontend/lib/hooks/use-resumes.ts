import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { resumesApi } from "@/lib/api/resumes";

const resumesQueryKey = ["resumes"];

export const useResumes = () => {
  return useQuery({
    queryKey: resumesQueryKey,
    queryFn: async () => {
      const response = await resumesApi.getAll();
      return response.resumes;
    },
  });
};

export const useResume = (id: number) => {
  return useQuery({
    queryKey: [...resumesQueryKey, id],
    queryFn: async () => {
      const response = await resumesApi.getById(id);
      return response.resume;
    },
    enabled: Number.isInteger(id) && id > 0,
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resumesQueryKey,
      });
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumesApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: [...resumesQueryKey, id],
      });

      queryClient.invalidateQueries({
        queryKey: resumesQueryKey,
      });
    },
  });
};