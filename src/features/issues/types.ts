export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export type RootStackParamList = {
  IssuesList: undefined;
  IssueDetails: { issueId: string };
};
