import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IssuesAPI } from "@/api/issues.api";
import { Issue } from "../types";

export const useUpdateIssue = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      signal,
    }: {
      id: string;
      data: Partial<Issue>;
      signal?: AbortSignal;
    }) => IssuesAPI.patchIssue(id, data, signal),

    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ["issues"] });
      await qc.cancelQueries({ queryKey: ["issue", id] });

      const previousIssues = qc.getQueryData<Issue[]>(["issues"]);
      const previousIssue = qc.getQueryData<Issue>(["issue", id]);

      // Update issues list cache
      qc.setQueryData<Issue[]>(["issues"], (old) =>
        old?.map((i) => (i.id === id ? { ...i, ...data } : i))
      );

      // Update single issue cache
      if (previousIssue) {
        qc.setQueryData<Issue>(["issue", id], (old) =>
          old ? { ...old, ...data } : old
        );
      }

      return { previousIssues, previousIssue };
    },

    onError: (_err, variables, ctx) => {
      if (ctx?.previousIssues) {
        qc.setQueryData(["issues"], ctx.previousIssues);
      }
      if (ctx?.previousIssue && variables) {
        qc.setQueryData(["issue", variables.id], ctx.previousIssue);
      }
    },

    onSettled: (_data, _error, variables) => {
      qc.invalidateQueries({ queryKey: ["issues"] });
      if (variables) {
        qc.invalidateQueries({ queryKey: ["issue", variables.id] });
      }
    },
  });
};
