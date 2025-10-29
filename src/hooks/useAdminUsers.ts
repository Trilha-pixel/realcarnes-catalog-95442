import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { AdminUser, InsertAdminUser } from "../../shared/schema";

// Get all admin users
export function useAdminUsers() {
  return useQuery<AdminUser[]>({
    queryKey: ["/admin/users"],
    queryFn: () => apiRequest<AdminUser[]>("/admin/users"),
  });
}

// Admin login
export function useAdminLogin() {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiRequest<{ user: AdminUser }>("/admin/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
  });
}

// Create admin user
export function useCreateAdminUser() {
  return useMutation({
    mutationFn: (data: InsertAdminUser) =>
      apiRequest<AdminUser>("/admin/users", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/admin/users"] });
    },
  });
}

// Update admin user
export function useUpdateAdminUser() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertAdminUser> }) =>
      apiRequest<AdminUser>(`/admin/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/admin/users"] });
    },
  });
}

// Delete admin user
export function useDeleteAdminUser() {
  return useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/admin/users/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/admin/users"] });
    },
  });
}
