import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Banner, InsertBanner } from "../../shared/schema";

// Get all banners (active only by default)
export function useBanners(activeOnly = true) {
  return useQuery<Banner[]>({
    queryKey: ["/banners", { activeOnly }],
    queryFn: () => apiRequest<Banner[]>("/banners"),
    select: (data) => {
      if (activeOnly) {
        return data.filter((banner) => banner.active).sort((a, b) => a.order - b.order);
      }
      return data.sort((a, b) => a.order - b.order);
    },
  });
}

// Create banner
export function useCreateBanner() {
  return useMutation({
    mutationFn: (data: InsertBanner) =>
      apiRequest<Banner>("/banners", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/banners"] });
    },
  });
}

// Update banner
export function useUpdateBanner() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertBanner> }) =>
      apiRequest<Banner>(`/banners/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/banners"] });
    },
  });
}

// Reorder banners
export function useReorderBanners() {
  return useMutation({
    mutationFn: (bannerOrders: { id: number; order: number }[]) =>
      apiRequest("/banners/reorder", {
        method: "POST",
        body: JSON.stringify({ bannerOrders }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/banners"] });
    },
  });
}

// Delete banner
export function useDeleteBanner() {
  return useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/banners/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/banners"] });
    },
  });
}
