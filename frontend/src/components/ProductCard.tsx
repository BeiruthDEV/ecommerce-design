import { Check, Plus, ShoppingBag } from "lucide-react";

import { currency } from "../lib/format";
import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  inCart: number;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, inCart, onAdd }: ProductCardProps) {
  const soldOut = product.stock <= 0;
  const maxSelected = inCart >= product.stock;

  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-line/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover">
      <div className="relative h-44 overflow-hidden bg-neutral-100 md:h-48">
        <img
          src={product.image_url ?? ""}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-moss shadow-sm backdrop-blur">
          {product.stock} em estoque
        </div>
      </div>

      <div className="flex min-h-44 flex-col p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-muted">
              <ShoppingBag size={14} /> Tech
            </p>
            <h2 className="mt-1.5 text-lg font-semibold leading-tight text-ink">{product.name}</h2>
          </div>
          <span className="rounded-xl bg-paper px-3 py-2 text-right text-sm font-bold text-moss">
            {currency.format(product.price)}
          </span>
        </div>

        <p className="line-clamp-2 mt-3 text-sm leading-6 text-muted">{product.description}</p>

        <button
          className={`focus-ring mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all ${
            soldOut || maxSelected
              ? "bg-neutral-200 text-neutral-500"
              : "bg-ink text-white shadow-button hover:bg-moss"
          }`}
          disabled={soldOut || maxSelected}
          onClick={() => onAdd(product)}
        >
          {soldOut || maxSelected ? <Check size={18} /> : <Plus size={18} />}
          {soldOut ? "Indisponivel" : maxSelected ? "Limite no carrinho" : "Adicionar ao carrinho"}
        </button>
      </div>
    </article>
  );
}
