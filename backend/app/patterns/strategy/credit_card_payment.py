from app.models.order import Order
from app.patterns.strategy.payment_strategy import PaymentResult, PaymentStrategy


class CreditCardPayment(PaymentStrategy):
    """Strategy concreta para pagamento com cartao."""

    def pay(self, order: Order) -> PaymentResult:
        if order.total > 12000:
            return PaymentResult(
                success=False,
                status="recusado",
                message="Cartao recusado: valor acima do limite simulado.",
            )
        return PaymentResult(
            success=True,
            status="aprovado",
            message="Pagamento aprovado no cartao de credito simulado.",
        )
