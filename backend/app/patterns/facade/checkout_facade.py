from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.patterns.factory.payment_factory import PaymentFactory
from app.schemas.checkout_schema import CheckoutRequest
from app.services.order_service import OrderService


class CheckoutFacade:
    """Facade: coordena carrinho, pedido, pagamento e notificacoes do checkout."""

    def __init__(self, db: Session):
        self.db = db

    def checkout(self, payload: CheckoutRequest) -> Order:
        if not payload.items:
            raise HTTPException(status_code=400, detail="Carrinho vazio")

        products_by_id = self._load_and_validate_products(payload)
        subtotal = sum(
            products_by_id[item.product_id].price * item.quantity for item in payload.items
        )
        shipping = 0.0 if subtotal >= 3000 else 39.9
        discount = subtotal * 0.05 if subtotal >= 5000 else 0.0
        total = round(subtotal + shipping - discount, 2)

        order = Order(
            customer_name=payload.customer_name,
            customer_email=payload.customer_email,
            address=payload.address,
            payment_method=payload.payment_method,
            payment_status="pendente",
            payment_details="Pagamento ainda nao processado.",
            status="Pendente",
            subtotal=round(subtotal, 2),
            shipping=shipping,
            discount=round(discount, 2),
            total=total,
        )
        self.db.add(order)
        self.db.flush()

        for item in payload.items:
            product = products_by_id[item.product_id]
            product.stock -= item.quantity
            self.db.add(
                OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    product_name=product.name,
                    quantity=item.quantity,
                    unit_price=product.price,
                )
            )

        self.db.commit()
        self.db.refresh(order)

        payment_strategy = PaymentFactory.create(payload.payment_method)
        payment_result = payment_strategy.pay(order)
        order.payment_status = payment_result.status
        order.payment_details = payment_result.message
        self.db.commit()

        target_status = "Pago" if payment_result.success and payment_result.status == "aprovado" else "Pendente"
        if not payment_result.success:
            target_status = "Cancelado"

        return OrderService(self.db).update_status(order.id, target_status)

    def _load_and_validate_products(self, payload: CheckoutRequest) -> dict[int, Product]:
        product_ids = [item.product_id for item in payload.items]
        products = self.db.query(Product).filter(Product.id.in_(product_ids)).all()
        products_by_id = {product.id: product for product in products}

        if len(products_by_id) != len(set(product_ids)):
            raise HTTPException(status_code=404, detail="Produto do carrinho nao encontrado")

        for item in payload.items:
            product = products_by_id[item.product_id]
            if item.quantity > product.stock:
                raise HTTPException(
                    status_code=400,
                    detail=f"Estoque insuficiente para {product.name}",
                )
        return products_by_id
