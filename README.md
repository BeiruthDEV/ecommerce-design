<div align="center">

# E-commerce Design Patterns

**Aplicação full stack demonstrando 5 padrões de projeto GoF aplicados num domínio real de e-commerce.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)](https://python.org/)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## Sobre o projeto

Sistema de e-commerce com fluxo completo de checkout, pagamento e gerenciamento de pedidos — construído para demonstrar como padrões de projeto clássicos (GoF) resolvem problemas concretos de design de software, não apenas em teoria.

Cada padrão foi aplicado onde faz sentido no domínio: o Factory cria processadores de pagamento sem expor implementação, o Strategy troca o algoritmo de desconto em runtime, o Observer notifica sistemas externos quando o status do pedido muda.

> 📌 Origem acadêmica — desenvolvido como trabalho da disciplina de Arquitetura e Projeto de Software (Engenharia de Software, Universidade de Vassouras). Sendo evoluído para um projeto mais robusto com deploy, testes e banco de dados relacional em produção.

---

## Padrões de Projeto Aplicados

| Padrão | Arquivo | Problema que resolve |
|--------|---------|----------------------|
| **Singleton** | `backend/app/config/database_singleton.py` | Garante única instância da conexão com o banco em toda a aplicação |
| **Factory Method** | `backend/app/patterns/factory/payment_factory.py` | Cria processadores de pagamento (Pix, Cartão, Boleto) sem acoplar o checkout a implementações concretas |
| **Strategy** | `backend/app/patterns/strategy/` | Permite trocar o algoritmo de desconto/frete em runtime sem modificar o código do carrinho |
| **Observer** | `backend/app/patterns/observer/` | Notifica sistemas (e-mail, painel, console) quando o status de um pedido muda, sem acoplamento direto |
| **Facade** | `backend/app/patterns/facade/checkout_facade.py` | Simplifica o fluxo de checkout (validação, pagamento, persistência, notificação) em uma única interface |

---

## Stack Técnica

**Frontend:** React 18 · TypeScript · Vite · Tailwind CSS

**Backend:** Python 3.11+ · FastAPI · Pydantic · SQLAlchemy · SQLite

**API:** REST — documentação interativa via Swagger em `/docs`

---

## Funcionalidades

- Listagem de produtos com nome, descrição, preço, imagem e estoque
- Carrinho com adicionar, remover, alterar quantidade, subtotal, frete, desconto e total
- Checkout com nome, e-mail, endereço e forma de pagamento
- Pagamento simulado com Cartão de Crédito, Pix e Boleto (via Factory)
- Criação e persistência de pedidos no SQLite
- Lista de pedidos com detalhes e mudança de status
- Notificações geradas por Observer ao mudar status do pedido (e-mail, painel, console)

---

## Como rodar

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
python -m app.seed          # carrega produtos iniciais
uvicorn app.main:app --reload
```

- API: `http://localhost:8000`
- Docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- App: `http://localhost:5173`

---

## Rotas da API

```
GET    /products
GET    /products/{product_id}
POST   /checkout
GET    /orders
GET    /orders/{order_id}
PATCH  /orders/{order_id}/status
GET    /notifications
```

---

## Fluxo de teste

1. Inicie o backend e execute o seed
2. Inicie o frontend
3. Adicione produtos ao carrinho
4. Preencha o checkout e escolha a forma de pagamento
5. Finalize o pedido e veja-o na aba Pedidos
6. Altere o status (Pago → Enviado → Entregue)
7. Observe as notificações geradas pelo Observer no painel e no console do backend

---

## Roadmap

- [ ] Testes unitários para cada padrão de projeto
- [ ] Migrar banco para PostgreSQL com Docker Compose
- [ ] Deploy com CI/CD (GitHub Actions + Render)
- [ ] Adicionar padrão Repository para desacoplar acesso a dados
- [ ] Autenticação JWT (cadastro e login de usuário)
- [ ] Painel admin para gestão de produtos e estoque

---

## Licença

MIT — uso livre para fins de estudo e portfólio.

---

<div align="center">

**[BeiruthDEV](https://github.com/BeiruthDEV)** · [LinkedIn](https://www.linkedin.com/in/matheusbeiruth)

</div>
