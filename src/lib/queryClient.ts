import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// API base URL - uses Vite's built-in proxy or direct localhost
const API_BASE_URL = "/api";

// API Request helper with proper error handling
export async function apiRequest<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  
  try {
    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: response.statusText,
      }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Default fetch function for React Query
export const defaultQueryFn = async ({ queryKey }: { queryKey: any[] }) => {
  const url = queryKey[0] as string;
  return apiRequest(url);
};
