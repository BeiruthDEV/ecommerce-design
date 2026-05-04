import { CreditCard } from "lucide-react";

import { currency } from "../lib/format";

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  disabled?: boolean;
};

export function OrderSummary({ subtotal, shipping, discount, total, disabled }: OrderSummaryProps) {
  return (
    <div className="rounded-3xl border border-line/80 bg-ink p-5 text-white shadow-card">
      <div>
        <p className="text-xs font-bold uppercase text-white/55">
          Resumo do pedido
        </p>
        <h3 className="mt-2 text-2xl font-semibold">Total da compra</h3>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <SummaryRow label="Subtotal" value={subtotal} />
        <SummaryRow label="Frete" value={shipping} />
        <SummaryRow label="Desconto" value={discount} />
      </div>

      <div className="mt-6 rounded-2xl bg-white/10 p-4">
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm text-white/70">Total final</span>
          <strong className="text-3xl font-semibold">{currency.format(total)}</strong>
        </div>
      </div>

      <button
        className="focus-ring mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-moss font-bold text-white shadow-button hover:bg-mossDark"
        disabled={disabled}
      >
        <CreditCard size={18} /> Finalizar pedido
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-4 text-white/80">
      <span>{label}</span>
      <span className="font-semibold text-white">{currency.format(value)}</span>
    </div>
  );
}
