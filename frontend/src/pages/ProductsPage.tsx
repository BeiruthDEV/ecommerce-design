import type { CartItem, Product } from "../types";
import { EmptyState } from "../components/EmptyState";
import { ProductCard } from "../components/ProductCard";

type ProductsPageProps = {
  products: Product[];
  cart: CartItem[];
  onAdd: (product: Product) => void;
};

export function ProductsPage({ products, cart, onAdd }: ProductsPageProps) {
  const featured = products[0];

  return (
    <section className="section-shell py-5 md:py-6">
      {featured && (
        <div className="mb-6 overflow-hidden rounded-[1.6rem] border border-line/80 bg-ink shadow-cardHover">
          <div className="grid lg:grid-cols-[0.9fr_0.8fr]">
            <div className="flex flex-col justify-between gap-5 p-6 text-white md:p-7">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase text-white/75">
                  Colecao tech
                </span>
                <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
                  Seu setup com cara de loja premium.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/68">
                  Produtos selecionados, checkout direto e pedidos acompanhados em um painel limpo.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-white/75">
                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                  <strong className="mr-2 text-lg text-white">{products.length}</strong>produtos
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                  <strong className="mr-2 text-lg text-white">3</strong>pagamentos
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                  <strong className="mr-2 text-lg text-white">Observer</strong>ativo
                </div>
              </div>
            </div>

            <div className="relative min-h-56 overflow-hidden lg:min-h-0">
              <img
                src={featured.image_url ?? ""}
                alt={featured.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent lg:bg-gradient-to-l" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/90 p-3 shadow-card backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-moss">Destaque da vitrine</p>
                    <strong className="mt-1 block text-base text-ink">{featured.name}</strong>
                  </div>
                  <button
                    type="button"
                    className="focus-ring rounded-xl bg-moss px-3 py-2 text-sm font-bold text-white transition hover:bg-mossDark"
                    onClick={() => onAdd(featured)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-moss">Catalogo</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink md:text-3xl">Produtos em destaque</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Frete inteligente", "Estoque real", "Checkout seguro"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-white/75 px-4 py-2 text-sm font-semibold text-muted shadow-card"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="Nenhum produto encontrado"
          description="Execute o seed do backend para carregar os produtos iniciais da loja."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const inCart = cart.find((item) => item.product.id === product.id)?.quantity ?? 0;
            return (
              <ProductCard
                key={product.id}
                product={product}
                inCart={inCart}
                onAdd={onAdd}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
