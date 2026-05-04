from abc import ABC, abstractmethod
from dataclasses import dataclass

from app.models.order import Order


@dataclass
class PaymentResult:
    success: bool
    status: str
    message: str


class PaymentStrategy(ABC):
    """Strategy: define o contrato para qualquer forma de pagamento."""

    @abstractmethod
    def pay(self, order: Order) -> PaymentResult:
        pass
