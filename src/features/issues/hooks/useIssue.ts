import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IssuesAPI } from "@/api/issues.api";
import { Issue } from "../types";

export const useIssue = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<Issue>({
    queryKey: ["issue", id],
    queryFn: ({ signal }) => IssuesAPI.getIssue(id, signal),
    enabled: !!id,
    // Use placeholderData instead of initialData to allow refetching
    placeholderData: (): Issue | undefined => {
      const issues = queryClient.getQueryData<Issue[]>(["issues"]);
      return issues?.find((issue) => issue.id === id);
    },
    staleTime: 0, // Always refetch to get latest data
  });
};
