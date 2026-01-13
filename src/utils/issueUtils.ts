import type { Issue } from "../features/issues/types";

export const getPriorityColor = (priority: Issue["priority"]): string => {
  switch (priority) {
    case "critical":
    case "high":
      return "#DC2626";
    case "medium":
      return "#F59E0B";
    case "low":
      return "#16A34A";
    default:
      return "#6B7280";
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");

  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${displayHours}:${displayMinutes} ${ampm}, ${day} ${month} ${year}`;
};

export const formatUpdatedDate = (dateString: string): string => {
  return `Updated at: ${formatDate(dateString)}`;
};

export const calculateIssueStats = (issues: Issue[]) => {
  const total = issues.length;
  const closed = issues.filter((issue) => issue.status === "closed").length;
  const opened = issues.filter((issue) => issue.status === "open").length;

  return {
    total,
    closed,
    opened,
    closedPercentage: total > 0 ? (closed / total) * 100 : 0,
    openedPercentage: total > 0 ? (opened / total) * 100 : 0,
  };
};

export const filterIssues = (
  issues: Issue[],
  filter: "all" | "open" | "closed",
  searchQuery: string
): Issue[] => {
  let filtered = [...issues];

  // Apply status filter
  if (filter === "open") {
    filtered = filtered.filter((issue) => issue.status === "open");
  } else if (filter === "closed") {
    filtered = filtered.filter((issue) => issue.status === "closed");
  }

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((issue) =>
      issue.title.toLowerCase().includes(query)
    );
  }

  return filtered;
};
