from typing import Protocol

from app.models.order import Order


class OrderStatusObserver(Protocol):
    def update(self, order: Order, old_status: str, new_status: str) -> None:
        pass


class OrderStatusSubject:
    """Observer Subject: notifica observers quando o status do pedido muda."""

    def __init__(self) -> None:
        self._observers: list[OrderStatusObserver] = []

    def attach(self, observer: OrderStatusObserver) -> None:
        self._observers.append(observer)

    def notify(self, order: Order, old_status: str, new_status: str) -> None:
        for observer in self._observers:
            observer.update(order, old_status, new_status)
