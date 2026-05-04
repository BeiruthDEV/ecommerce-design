import { Package, Receipt, ShoppingCart } from "lucide-react";

export type Tab = "products" | "cart" | "orders";

type HeaderProps = {
  activeTab: Tab;
  cartCount: number;
  orderCount: number;
  onTabChange: (tab: Tab) => void;
};

const navItems = [
  { id: "products" as const, label: "Produtos", icon: Package },
  { id: "cart" as const, label: "Carrinho", icon: ShoppingCart },
  { id: "orders" as const, label: "Pedidos", icon: Receipt },
];

export function Header({ activeTab, cartCount, orderCount, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/92 backdrop-blur-xl">
      <div className="section-shell flex flex-col gap-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-ink md:text-5xl">Design Shop</h1>
        </div>

        <nav className="grid grid-cols-3 gap-2 rounded-full border border-line bg-white/80 p-1.5 shadow-card backdrop-blur sm:flex sm:w-fit">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            const count = id === "cart" ? cartCount : id === "orders" ? orderCount : undefined;
            return (
              <button
                key={id}
                className={`focus-ring relative flex h-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition-all sm:px-4 ${
                  active
                    ? "bg-moss text-white shadow-active"
                    : "text-muted hover:bg-paper hover:text-ink"
                }`}
                onClick={() => onTabChange(id)}
              >
                <Icon size={18} strokeWidth={2.2} />
                <span className="hidden sm:inline">{label}</span>
                {count !== undefined && count > 0 && (
                  <span
                    className={`grid min-h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] ${
                      active ? "bg-white/20 text-white" : "bg-moss/10 text-moss"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
