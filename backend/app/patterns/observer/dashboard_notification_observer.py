from sqlalchemy.orm import Session

from app.models.order import Order
from app.services.notification_service import NotificationService


class DashboardNotificationObserver:
    def __init__(self, db: Session):
        self.notification_service = NotificationService(db)

    def update(self, order: Order, old_status: str, new_status: str) -> None:
        message = f"Painel: pedido #{order.id} agora esta com status {new_status}."
        self.notification_service.create(order.id, "dashboard", message)
