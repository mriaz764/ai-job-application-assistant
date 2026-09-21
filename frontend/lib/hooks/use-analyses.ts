import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analysesApi } from "@/lib/api/analyses";

const analysesQueryKey = ["analyses"];

export const useAnalyses = () => {
  return useQuery({
    queryKey: analysesQueryKey,
    queryFn: async () => {
      const response = await analysesApi.getAll();
      return response.analyses;
    },
  });
};

export const useAnalysis = (id: number) => {
  return useQuery({
    queryKey: [...analysesQueryKey, id],
    queryFn: async () => {
      const response = await analysesApi.getById(id);
      return response.analysis;
    },
    enabled: Number.isInteger(id) && id > 0,
  });
};

export const useCreateAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: analysesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: analysesQueryKey,
      });
    },
  });
};