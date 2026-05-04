import type { FormEvent } from "react";

import { CartItem as CartItemRow } from "../components/CartItem";
import { EmptyState } from "../components/EmptyState";
import { OrderSummary } from "../components/OrderSummary";
import { PaymentMethodCard } from "../components/PaymentMethodCard";
import type { CartItem, PaymentMethod } from "../types";

type CheckoutForm = {
  customer_name: string;
  customer_email: string;
  address: string;
  payment_method: PaymentMethod;
};

type CartPageProps = {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  form: CheckoutForm;
  onFormChange: (form: CheckoutForm) => void;
  onQuantityChange: (productId: number, delta: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: (event: FormEvent) => void;
  onGoToProducts: () => void;
};

export function CartPage({
  cart,
  subtotal,
  shipping,
  discount,
  total,
  form,
  onFormChange,
  onQuantityChange,
  onRemove,
  onCheckout,
  onGoToProducts,
}: CartPageProps) {
  return (
    <form className="section-shell grid gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr]" onSubmit={onCheckout}>
      <section>
        <div className="mb-5">
          <p className="text-xs font-bold uppercase text-moss">Carrinho</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">Itens selecionados</h2>
        </div>

        {cart.length === 0 ? (
          <EmptyState
            title="Carrinho vazio"
            description="Escolha seus produtos favoritos e volte aqui para finalizar a compra."
            action={
              <button
                type="button"
                className="focus-ring rounded-2xl bg-moss px-5 py-3 text-sm font-bold text-white shadow-button hover:bg-mossDark"
                onClick={onGoToProducts}
              >
                Ver produtos
              </button>
            }
          />
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </section>

      <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
        <section className="rounded-3xl border border-line/80 bg-white p-5 shadow-card">
          <div>
            <p className="text-xs font-bold uppercase text-moss">Checkout</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Dados do cliente</h2>
          </div>

          <div className="mt-5 grid gap-4">
            <Input
              label="Nome"
              value={form.customer_name}
              onChange={(value) => onFormChange({ ...form, customer_name: value })}
            />
            <Input
              label="E-mail"
              type="email"
              value={form.customer_email}
              onChange={(value) => onFormChange({ ...form, customer_email: value })}
            />
            <Input
              label="Endereco"
              value={form.address}
              onChange={(value) => onFormChange({ ...form, address: value })}
            />
          </div>

          <div className="mt-6">
            <p className="text-sm font-bold text-ink">Forma de pagamento</p>
            <div className="mt-3 grid gap-3">
              {(["cartao", "pix", "boleto"] as PaymentMethod[]).map((method) => (
                <PaymentMethodCard
                  key={method}
                  method={method}
                  selected={form.payment_method === method}
                  onSelect={(payment_method) => onFormChange({ ...form, payment_method })}
                />
              ))}
            </div>
          </div>
        </section>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
          total={total}
          disabled={cart.length === 0}
        />
      </aside>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm font-bold text-ink">
      {label}
      <input
        className="focus-ring mt-2 h-12 w-full rounded-2xl border border-line bg-paper/40 px-4 text-sm font-medium text-ink placeholder:text-muted/70 transition-colors hover:border-moss/40"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
