import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Category, InsertCategory } from "../../shared/schema";

// Get all categories
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["/categories"],
    queryFn: () => apiRequest<Category[]>("/categories"),
  });
}

// Get category by ID
export function useCategory(id: number) {
  return useQuery<Category>({
    queryKey: ["/categories", id],
    queryFn: () => apiRequest<Category>(`/categories/${id}`),
    enabled: !!id,
  });
}

// Create category
export function useCreateCategory() {
  return useMutation({
    mutationFn: (data: InsertCategory) =>
      apiRequest<Category>("/categories", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/categories"] });
    },
  });
}

// Update category
export function useUpdateCategory() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertCategory> }) =>
      apiRequest<Category>(`/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/categories"] });
    },
  });
}

// Delete category
export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/categories/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/categories"] });
    },
  });
}
