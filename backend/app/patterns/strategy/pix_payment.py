from app.models.order import Order
from app.patterns.strategy.payment_strategy import PaymentResult, PaymentStrategy


class PixPayment(PaymentStrategy):
    """Strategy concreta para Pix."""

    def pay(self, order: Order) -> PaymentResult:
        code = f"PIX-ECO-{order.id:06d}-{int(order.total * 100)}"
        return PaymentResult(
            success=True,
            status="pendente",
            message=f"Codigo Pix gerado: {code}",
        )
