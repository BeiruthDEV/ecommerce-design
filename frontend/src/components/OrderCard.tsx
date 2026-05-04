import { CalendarDays, Mail, ReceiptText } from "lucide-react";

import { currency, dateTime } from "../lib/format";
import type { Order } from "../types";
import { StatusBadge } from "./StatusBadge";

const statuses = ["Pendente", "Pago", "Enviado", "Entregue", "Cancelado"];

type OrderCardProps = {
  order: Order;
  onStatusChange: (orderId: number, status: string) => void;
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  return (
    <article className="rounded-3xl border border-line/80 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-cardHover">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold text-ink">Pedido #{order.id}</h3>
            <StatusBadge status={order.status} />
          </div>
          <div className="mt-3 grid gap-2 text-sm text-muted md:grid-cols-2">
            <span className="flex items-center gap-2">
              <Mail size={15} /> {order.customer_name} - {order.customer_email}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={15} /> {dateTime.format(new Date(order.created_at))}
            </span>
            <span className="flex items-center gap-2">
              <ReceiptText size={15} /> {order.payment_method} - {order.payment_status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <strong className="rounded-2xl bg-paper px-4 py-2 text-lg text-moss">
            {currency.format(order.total)}
          </strong>
          <select
            className="focus-ring h-11 rounded-2xl border border-line bg-white px-3 text-sm font-semibold text-ink"
            value={order.status}
            onChange={(event) => onStatusChange(order.id, event.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 rounded-2xl bg-paper/70 p-4 text-sm leading-6 text-muted">
        {order.payment_details}
      </p>

      <div className="mt-4 divide-y divide-line/70 rounded-2xl border border-line/70">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4 px-4 py-3 text-sm">
            <span className="text-muted">
              {item.quantity}x <strong className="text-ink">{item.product_name}</strong>
            </span>
            <span className="font-semibold text-ink">
              {currency.format(item.unit_price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
