from app.models.order import Order
from app.patterns.strategy.payment_strategy import PaymentResult, PaymentStrategy


class BoletoPayment(PaymentStrategy):
    """Strategy concreta para Boleto."""

    def pay(self, order: Order) -> PaymentResult:
        line = f"23790.0000 {order.id:06d}.000000 {int(order.total * 100):010d}.000000 1"
        return PaymentResult(
            success=True,
            status="pendente",
            message=f"Linha digitavel do boleto: {line}",
        )
