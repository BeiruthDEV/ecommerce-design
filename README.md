<p align="center">
  <img src="assets/logo-vassouras.png" alt="Universidade de Vassouras" width="400"/>
</p>

<h3 align="center">
  Universidade de Vassouras  
</h3>

---

### 📚 Curso: **Engenharia de Software**  
### 🖥️ Disciplina: **Arquitetura e Projeto de Software**  
### 👨‍🎓 Autor: **Matheus Beiruth**

---

# Mini E-commerce Design Patterns

Aplicacao full stack simples para demonstrar Padroes de Projeto em Arquitetura de Software usando um dominio de e-commerce. O sistema lista produtos, monta carrinho, finaliza checkout, simula pagamentos, salva pedidos e dispara notificacoes quando o status do pedido muda.

## Tecnologias usadas

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Python, FastAPI, Pydantic
- Banco de dados: SQLite
- ORM: SQLAlchemy
- API: REST

## Funcionalidades

- Listagem de produtos com nome, descricao, preco, imagem e estoque.
- Carrinho no frontend com adicionar, remover, alterar quantidade, subtotal, frete, desconto e total.
- Checkout com nome, e-mail, endereco e forma de pagamento.
- Pagamento simulado com cartao de credito, Pix e boleto.
- Criacao e persistencia de pedidos no SQLite.
- Lista de pedidos com detalhes e mudanca de status.
- Notificacoes simuladas por e-mail, painel e console usando Observer.

## Padroes de projeto aplicados

- Singleton: `backend/app/config/database_singleton.py`
- Factory Method: `backend/app/patterns/factory/payment_factory.py`
- Strategy: `backend/app/patterns/strategy/`
- Observer: `backend/app/patterns/observer/`
- Facade: `backend/app/patterns/facade/checkout_facade.py`

## Como rodar o backend Python

O backend ja inclui `backend/.env` com:

```env
DATABASE_URL=sqlite:///./ecommerce.db
```

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload
```

No Linux/Mac, ative o ambiente virtual com:

```bash
source venv/bin/activate
```

A API ficara disponivel em:

```txt
http://localhost:8000
```

A documentacao interativa do FastAPI ficara em:

```txt
http://localhost:8000/docs
```

## Como configurar o banco SQLite

O banco SQLite e criado automaticamente quando o backend inicia. Para carregar produtos iniciais, rode:

```bash
cd backend
python -m app.seed
```

O arquivo do banco sera criado em:

```txt
backend/ecommerce.db
```

## Como rodar o frontend

O frontend ja inclui `frontend/.env` com:

```env
VITE_API_URL=http://localhost:8000
```

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra:

```txt
http://localhost:5173
```

## Fluxo completo de teste

1. Inicie o backend e execute o seed.
2. Inicie o frontend.
3. Abra a pagina de produtos.
4. Adicione produtos ao carrinho.
5. Va para o carrinho e confira subtotal, frete, desconto e total.
6. Preencha o checkout.
7. Escolha Pix, Cartao ou Boleto.
8. Finalize o pedido.
9. Abra a aba Pedidos e veja o pedido criado.
10. Altere o status do pedido para Pago, Enviado, Entregue ou Cancelado.
11. Veja as notificacoes geradas pelo Observer no painel.
12. Observe tambem o log simulado no console do backend.

## Rotas principais

```txt
GET    /products
GET    /products/{product_id}
POST   /checkout
GET    /orders
GET    /orders/{order_id}
PATCH  /orders/{order_id}/status
GET    /notifications
```
