type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  Pendente: "border-amber-200 bg-amber-50 text-amber-800",
  Pago: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Enviado: "border-blue-200 bg-blue-50 text-blue-800",
  Entregue: "border-violet-200 bg-violet-50 text-violet-800",
  Cancelado: "border-red-200 bg-red-50 text-red-800",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase ${
        statusStyles[status] ?? "border-line bg-paper text-muted"
      }`}
    >
      {status}
    </span>
  );
}
