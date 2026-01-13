import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IssuesAPI } from "@/api/issues.api";
import { loadIssues, saveIssues } from "@/storage/issues.storage";
import { Issue } from "../types";

export const useIssues = () => {
  const [placeholderData, setPlaceholderData] = useState<Issue[] | undefined>(
    undefined
  );

  // Load cached data on mount
  useEffect(() => {
    loadIssues().then((data) => {
      if (data) {
        setPlaceholderData(data);
      }
    });
  }, []);

  const query = useQuery({
    queryKey: ["issues"],
    queryFn: ({ signal }) => IssuesAPI.getIssues(signal),
    placeholderData,
  });

  // Save data whenever it changes
  useEffect(() => {
    if (query.data) {
      saveIssues(query.data);
    }
  }, [query.data]);

  return query;
};
