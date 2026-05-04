import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { api } from "./api/client";
import { Header, type Tab } from "./components/Header";
import { LoadingState } from "./components/LoadingState";
import { CartPage } from "./pages/CartPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProductsPage } from "./pages/ProductsPage";
import type { CartItem, Notification, Order, PaymentMethod, Product } from "./types";

type CheckoutForm = {
  customer_name: string;
  customer_email: string;
  address: string;
  payment_method: PaymentMethod;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    customer_name: "Maria Souza",
    customer_email: "maria@email.com",
    address: "Rua das Flores, 123",
    payment_method: "pix",
  });

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  );
  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 39.9;
  const discount = subtotal >= 5000 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;

  async function loadData() {
    const [productData, orderData, notificationData] = await Promise.all([
      api.listProducts(),
      api.listOrders(),
      api.listNotifications(),
    ]);
    setProducts(productData);
    setOrders(orderData);
    setNotifications(notificationData);
  }

  useEffect(() => {
    loadData()
      .catch(() => {
        setMessageType("error");
        setMessage(
          "Nao foi possivel conectar com a API. Verifique se o backend esta rodando em http://localhost:8000.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  function addToCart(product: Product) {
    setMessageType("success");
    setMessage(`${product.name} adicionado ao carrinho.`);
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  function changeQuantity(productId: number, delta: number) {
    setCart((current) =>
      current.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(item.product.stock, item.quantity + delta)),
            }
          : item,
      ),
    );
  }

  function removeFromCart(productId: number) {
    setCart((current) => current.filter((item) => item.product.id !== productId));
    setMessageType("info");
    setMessage("Item removido do carrinho.");
  }

  async function handleCheckout(event: FormEvent) {
    event.preventDefault();
    if (!cart.length) {
      setMessageType("error");
      setMessage("Adicione produtos ao carrinho antes de finalizar.");
      return;
    }

    setBusy(true);
    setMessageType("info");
    setMessage("Processando pedido no backend...");
    try {
      const order = await api.checkout({
        ...checkoutForm,
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      });
      setCart([]);
      setActiveTab("orders");
      setMessageType("success");
      setMessage(`Pedido #${order.id} criado com sucesso.`);
      await loadData();
    } catch (error) {
      setMessageType("error");
      setMessage(error instanceof Error ? error.message : "Erro ao finalizar pedido.");
    } finally {
      setBusy(false);
    }
  }

  async function updateStatus(orderId: number, status: string) {
    setBusy(true);
    setMessageType("info");
    setMessage("Atualizando status e notificando observers...");
    try {
      await api.updateOrderStatus(orderId, status);
      setMessageType("success");
      setMessage(`Status do pedido #${orderId} atualizado.`);
      await loadData();
    } catch (error) {
      setMessageType("error");
      setMessage(error instanceof Error ? error.message : "Erro ao atualizar status.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app-shell min-h-screen text-ink">
      <Header
        activeTab={activeTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        orderCount={orders.length}
        onTabChange={setActiveTab}
      />

      {(message || busy) && (
        <div className="section-shell pt-5">
          <div
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-card backdrop-blur ${
              messageType === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : messageType === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-line bg-white/85 text-muted"
            }`}
          >
            {busy ? (
              <Loader2 className="mt-0.5 animate-spin" size={18} />
            ) : messageType === "error" ? (
              <AlertCircle className="mt-0.5" size={18} />
            ) : (
              <CheckCircle2 className="mt-0.5" size={18} />
            )}
            <span>{busy && !message ? "Carregando..." : message}</span>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : (
        <>
          {activeTab === "products" && (
            <ProductsPage products={products} cart={cart} onAdd={addToCart} />
          )}
          {activeTab === "cart" && (
            <CartPage
              cart={cart}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              form={checkoutForm}
              onFormChange={setCheckoutForm}
              onQuantityChange={changeQuantity}
              onRemove={removeFromCart}
              onCheckout={handleCheckout}
              onGoToProducts={() => setActiveTab("products")}
            />
          )}
          {activeTab === "orders" && (
            <OrdersPage
              orders={orders}
              notifications={notifications}
              onStatusChange={updateStatus}
              onGoToProducts={() => setActiveTab("products")}
            />
          )}
        </>
      )}
    </main>
  );
}

export default App;
