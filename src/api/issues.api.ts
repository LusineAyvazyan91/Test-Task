import { Issue } from "../features/issues/types";

let ISSUES: Issue[] = [
  {
    id: "1",
    title: "Enhance Search Functionality",
    description:
      "This task focuses on developing comprehensive API documentation. It should clearly outline the endpoints, request/response formats, and authentication methods. The documentation will help developers integrate with our API more easily and reduce support requests. We need to include code examples, error handling guides, and best practices for each endpoint. Additionally, we should create interactive API documentation using tools like Swagger or Postman collections.",
    status: "open",
    priority: "high",
    createdAt: "2026-01-12T10:30:00Z",
    updatedAt: "2026-01-12T10:30:00Z",
  },
  {
    id: "2",
    title: "Refactor Data Models",
    description:
      "This task involves refining the existing data models to improve efficiency and scalability. It includes optimizing database schemas and updating related API endpoints. The refactoring will help reduce query times, improve data consistency, and make the system more maintainable. We'll need to migrate existing data and update all dependent services. This is a critical task that requires careful planning and testing to ensure no data loss or service disruption.",
    status: "closed",
    priority: "medium",
    createdAt: "2026-01-10T14:12:00Z",
    updatedAt: "2026-01-10T14:12:00Z",
  },
  {
    id: "3",
    title: "Implement User Authentication",
    description:
      "This task focuses on implementing a secure user authentication system. It includes setting up password hashing, JWT tokens, and session management. The authentication system will support multiple login methods including email/password and OAuth providers. We need to ensure proper security measures are in place, such as rate limiting, password strength requirements, and secure token storage. The implementation should follow industry best practices for security and user experience.",
    status: "open",
    priority: "low",
    createdAt: "2026-01-08T11:00:00Z",
    updatedAt: "2026-01-08T11:00:00Z",
  },
  {
    id: "4",
    title: "Fix Memory Leak in Image Gallery",
    description:
      "Images are not being properly released from memory after viewing. This causes the app to consume increasing amounts of memory over time, leading to performance degradation and potential crashes. We need to implement proper image caching strategies, ensure images are unloaded when no longer needed, and add memory monitoring. This issue affects user experience significantly, especially on devices with limited RAM.",
    status: "open",
    priority: "high",
    createdAt: "2026-01-15T09:20:00Z",
    updatedAt: "2026-01-15T09:20:00Z",
  },
  {
    id: "5",
    title: "Add Dark Mode Support",
    description:
      "Implement dark mode theme for the entire application. This includes updating all components, screens, and ensuring proper contrast ratios for accessibility. We should also add a system preference detection and allow users to manually toggle between light and dark modes. The implementation needs to be consistent across all platforms and maintain proper color contrast for readability. This feature has been highly requested by users.",
    status: "open",
    priority: "medium",
    createdAt: "2026-01-14T11:45:00Z",
    updatedAt: "2026-01-16T14:30:00Z",
  },
  {
    id: "6",
    title: "Optimize Database Queries",
    description:
      "Review and optimize slow database queries in the user dashboard. Some queries are taking more than 5 seconds to execute, which is causing performance issues. We need to add proper indexing, consider query optimization techniques, and implement database query caching where appropriate. This will improve the overall application performance and user experience. We should also monitor query performance after optimization.",
    status: "closed",
    priority: "high",
    createdAt: "2026-01-13T08:15:00Z",
    updatedAt: "2026-01-15T16:00:00Z",
  },
];

const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

export const IssuesAPI = {
  async getIssues(signal?: AbortSignal): Promise<Issue[]> {
    await delay();
    if (signal?.aborted) throw new Error("aborted");
    return ISSUES;
  },

  async getIssue(id: string, signal?: AbortSignal): Promise<Issue> {
    await delay();
    if (signal?.aborted) throw new Error("aborted");
    const issue = ISSUES.find((i) => i.id === id);
    if (!issue) {
      throw new Error(`Issue with id ${id} not found`);
    }
    return issue;
  },

  async patchIssue(
    id: string,
    data: Partial<Issue>,
    signal?: AbortSignal
  ): Promise<Issue> {
    await delay();
    if (signal?.aborted) throw new Error("aborted");
    ISSUES = ISSUES.map((i) =>
      i.id === id ? { ...i, ...data, updatedAt: new Date().toISOString() } : i
    );
    const updatedIssue = ISSUES.find((i) => i.id === id);
    if (!updatedIssue) {
      throw new Error(`Issue with id ${id} not found`);
    }
    return updatedIssue;
  },
};
