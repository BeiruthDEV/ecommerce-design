from sqlalchemy.orm import Session

from app.models.order import Order
from app.services.notification_service import NotificationService


class EmailNotificationObserver:
    def __init__(self, db: Session):
        self.notification_service = NotificationService(db)

    def update(self, order: Order, old_status: str, new_status: str) -> None:
        message = (
            f"E-mail simulado para {order.customer_email}: "
            f"pedido #{order.id} mudou de {old_status} para {new_status}."
        )
        self.notification_service.create(order.id, "email", message)
