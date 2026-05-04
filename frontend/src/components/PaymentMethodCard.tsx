import { Barcode, CreditCard, QrCode } from "lucide-react";

import type { PaymentMethod } from "../types";

type PaymentMethodCardProps = {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (method: PaymentMethod) => void;
};

const paymentOptions = {
  cartao: {
    title: "Cartao",
    description: "Aprovacao simulada com regra de limite.",
    Icon: CreditCard,
  },
  pix: {
    title: "Pix",
    description: "Gera um codigo Pix para pagamento.",
    Icon: QrCode,
  },
  boleto: {
    title: "Boleto",
    description: "Emite linha digitavel simulada.",
    Icon: Barcode,
  },
};

export function PaymentMethodCard({ method, selected, onSelect }: PaymentMethodCardProps) {
  const option = paymentOptions[method];
  const Icon = option.Icon;

  return (
    <button
      type="button"
      className={`focus-ring w-full rounded-2xl border p-4 text-left transition-all ${
        selected
          ? "border-moss bg-moss/8 shadow-active"
          : "border-line bg-white hover:border-moss/40 hover:bg-paper/60"
      }`}
      onClick={() => onSelect(method)}
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
            selected ? "bg-moss text-white" : "bg-paper text-moss"
          }`}
        >
          <Icon size={20} />
        </span>
        <span>
          <span className="block font-semibold text-ink">{option.title}</span>
          <span className="mt-1 block text-sm leading-5 text-muted">{option.description}</span>
        </span>
      </div>
    </button>
  );
}
