from app.models.order import Order


class ConsoleLogObserver:
    def update(self, order: Order, old_status: str, new_status: str) -> None:
        print(f"[Observer] Pedido #{order.id}: {old_status} -> {new_status}")
