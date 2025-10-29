import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product, InsertProduct } from "../../shared/schema";

interface ProductFilters {
  categoryId?: number;
  featured?: boolean;
  search?: string;
  status?: "active" | "inactive";
}

// Get all products with optional filters
export function useProducts(filters?: ProductFilters) {
  const params = new URLSearchParams();
  if (filters?.categoryId) params.append("categoryId", filters.categoryId.toString());
  if (filters?.featured !== undefined) params.append("featured", filters.featured.toString());
  if (filters?.search) params.append("search", filters.search);
  if (filters?.status) params.append("status", filters.status);

  const queryString = params.toString();
  const endpoint = queryString ? `/products?${queryString}` : "/products";

  return useQuery<Product[]>({
    queryKey: ["/products", filters],
    queryFn: () => apiRequest<Product[]>(endpoint),
  });
}

// Get product by ID
export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ["/products", id],
    queryFn: () => apiRequest<Product>(`/products/${id}`),
    enabled: !!id,
  });
}

// Get featured products
export function useFeaturedProducts() {
  return useProducts({ featured: true, status: "active" });
}

// Create product
export function useCreateProduct() {
  return useMutation({
    mutationFn: (data: InsertProduct) =>
      apiRequest<Product>("/products", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/products"] });
    },
  });
}

// Update product
export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertProduct> }) =>
      apiRequest<Product>(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/products"] });
    },
  });
}

// Delete product
export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/products/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/products"] });
    },
  });
}
