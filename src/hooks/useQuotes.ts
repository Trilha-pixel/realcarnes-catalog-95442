import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { QuoteRequest, InsertQuoteRequest, QuoteItem } from "../../shared/schema";

export interface QuoteRequestWithItems extends QuoteRequest {
  items: QuoteItem[];
}

// Get all quote requests
export function useQuoteRequests() {
  return useQuery<QuoteRequestWithItems[]>({
    queryKey: ["/quotes"],
    queryFn: () => apiRequest<QuoteRequestWithItems[]>("/quotes"),
  });
}

// Get quote request by ID
export function useQuoteRequest(id: number) {
  return useQuery<QuoteRequestWithItems>({
    queryKey: ["/quotes", id],
    queryFn: () => apiRequest<QuoteRequestWithItems>(`/quotes/${id}`),
    enabled: !!id,
  });
}

// Create quote request
export function useCreateQuote() {
  return useMutation({
    mutationFn: (data: InsertQuoteRequest & { items: Array<{ productId: number; productName: string; productSku: string; quantity: number }> }) =>
      apiRequest<QuoteRequestWithItems>("/quotes", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/quotes"] });
    },
  });
}

// Update quote request status
export function useUpdateQuoteStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: "novo" | "em_atendimento" | "finalizado" }) =>
      apiRequest<QuoteRequest>(`/quotes/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/quotes"] });
      queryClient.invalidateQueries({ queryKey: ["/quotes", variables.id] });
    },
  });
}

// Delete quote request
export function useDeleteQuote() {
  return useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/quotes/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/quotes"] });
    },
  });
}
