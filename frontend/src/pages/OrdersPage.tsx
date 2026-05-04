import { Network } from "lucide-react";

import { EmptyState } from "../components/EmptyState";
import { NotificationCard } from "../components/NotificationCard";
import { OrderCard } from "../components/OrderCard";
import type { Notification, Order } from "../types";

type OrdersPageProps = {
  orders: Order[];
  notifications: Notification[];
  onStatusChange: (orderId: number, status: string) => void;
  onGoToProducts: () => void;
};

export function OrdersPage({
  orders,
  notifications,
  onStatusChange,
  onGoToProducts,
}: OrdersPageProps) {
  return (
    <section className="section-shell grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-moss">Admin</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">Pedidos</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            Altere o status para ver o Observer criar notificacoes no painel e no console do backend.
          </p>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            title="Nenhum pedido criado"
            description="Finalize uma compra para ver os pedidos e as mudancas de status em acao."
            action={
              <button
                className="focus-ring rounded-2xl bg-moss px-5 py-3 text-sm font-bold text-white shadow-button hover:bg-mossDark"
                onClick={onGoToProducts}
              >
                Comprar agora
              </button>
            }
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
            ))}
          </div>
        )}
      </div>

      <aside className="rounded-3xl border border-line/80 bg-white/85 p-5 shadow-card backdrop-blur lg:sticky lg:top-32 lg:self-start">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-moss text-white">
            <Network size={20} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase text-moss">Observer</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">
              Notificacoes geradas pelo Observer
            </h2>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {notifications.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line bg-paper/60 p-4 text-sm leading-6 text-muted">
              As notificacoes simuladas aparecem aqui quando um pedido muda de status.
            </p>
          ) : (
            notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </div>
      </aside>
    </section>
  );
}
