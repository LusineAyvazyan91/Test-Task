import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const retryDelay = (attemptIndex: number) =>
  Math.min(1000 * 2 ** attemptIndex, 30000);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message === "aborted") {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message === "aborted") {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay,
    },
  },
});

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
