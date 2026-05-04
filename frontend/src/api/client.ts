import type { Notification, Order, PaymentMethod, Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Erro inesperado" }));
    throw new Error(error.detail ?? "Erro inesperado");
  }

  return response.json() as Promise<T>;
}

export const api = {
  listProducts: () => request<Product[]>("/products"),
  checkout: (payload: {
    customer_name: string;
    customer_email: string;
    address: string;
    payment_method: PaymentMethod;
    items: { product_id: number; quantity: number }[];
  }) =>
    request<Order>("/checkout", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  listOrders: () => request<Order[]>("/orders"),
  updateOrderStatus: (orderId: number, status: string) =>
    request<Order>(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  listNotifications: () => request<Notification[]>("/notifications"),
};
