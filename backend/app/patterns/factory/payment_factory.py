from fastapi import HTTPException

from app.patterns.strategy.boleto_payment import BoletoPayment
from app.patterns.strategy.credit_card_payment import CreditCardPayment
from app.patterns.strategy.payment_strategy import PaymentStrategy
from app.patterns.strategy.pix_payment import PixPayment


class PaymentFactory:
    """Factory Method: centraliza a criacao da Strategy de pagamento."""

    @staticmethod
    def create(payment_method: str) -> PaymentStrategy:
        normalized = payment_method.strip().lower()
        strategies = {
            "cartao": CreditCardPayment,
            "cartao_credito": CreditCardPayment,
            "credit_card": CreditCardPayment,
            "pix": PixPayment,
            "boleto": BoletoPayment,
        }
        strategy_class = strategies.get(normalized)
        if not strategy_class:
            raise HTTPException(status_code=400, detail="Forma de pagamento invalida")
        return strategy_class()
