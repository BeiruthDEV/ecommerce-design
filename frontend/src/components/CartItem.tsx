import { Minus, Plus, Trash2 } from "lucide-react";

import { currency } from "../lib/format";
import type { CartItem as CartItemType } from "../types";

type CartItemProps = {
  item: CartItemType;
  onQuantityChange: (productId: number, delta: number) => void;
  onRemove: (productId: number) => void;
};

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="grid gap-4 rounded-3xl border border-line/70 bg-white p-4 shadow-card sm:grid-cols-[96px_1fr]">
      <img
        src={item.product.image_url ?? ""}
        alt={item.product.name}
        className="h-24 w-full rounded-2xl object-cover sm:w-24"
      />
      <div className="min-w-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-ink">{item.product.name}</h3>
            <p className="mt-1 text-sm text-muted">{currency.format(item.product.price)} cada</p>
          </div>
          <strong className="text-lg text-moss">
            {currency.format(item.product.price * item.quantity)}
          </strong>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-2xl border border-line bg-paper/70 p-1">
            <button
              type="button"
              className="focus-ring grid h-9 w-9 place-items-center rounded-xl text-muted hover:bg-white hover:text-ink"
              onClick={() => onQuantityChange(item.product.id, -1)}
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span className="min-w-10 text-center text-sm font-bold">{item.quantity}</span>
            <button
              type="button"
              className="focus-ring grid h-9 w-9 place-items-center rounded-xl text-muted hover:bg-white hover:text-ink"
              onClick={() => onQuantityChange(item.product.id, 1)}
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="text-xs font-semibold uppercase text-muted">
            Max. {item.product.stock} unidades
          </span>
          <button
            type="button"
            className="focus-ring ml-auto flex h-10 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-sm font-semibold text-red-700 hover:bg-red-100"
            onClick={() => onRemove(item.product.id)}
          >
            <Trash2 size={16} /> Remover
          </button>
        </div>
      </div>
    </div>
  );
}
