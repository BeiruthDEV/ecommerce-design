from fastapi import HTTPException
from sqlalchemy.orm import Session, selectinload

from app.models.order import Order
from app.patterns.observer.console_log_observer import ConsoleLogObserver
from app.patterns.observer.dashboard_notification_observer import DashboardNotificationObserver
from app.patterns.observer.email_notification_observer import EmailNotificationObserver
from app.patterns.observer.order_status_subject import OrderStatusSubject


class OrderService:
    def __init__(self, db: Session):
        self.db = db

    def list_orders(self) -> list[Order]:
        return (
            self.db.query(Order)
            .options(selectinload(Order.items))
            .order_by(Order.created_at.desc())
            .all()
        )

    def get_order(self, order_id: int) -> Order:
        order = (
            self.db.query(Order)
            .options(selectinload(Order.items))
            .filter(Order.id == order_id)
            .first()
        )
        if not order:
            raise HTTPException(status_code=404, detail="Pedido nao encontrado")
        return order

    def update_status(self, order_id: int, status: str) -> Order:
        order = self.get_order(order_id)
        old_status = order.status
        order.status = status
        if status == "Pago":
            order.payment_status = "aprovado"
        if status == "Cancelado":
            order.payment_status = "cancelado"
        self.db.commit()
        self.db.refresh(order)

        # Observer: todos os interessados sao avisados quando o status muda.
        subject = OrderStatusSubject()
        subject.attach(EmailNotificationObserver(self.db))
        subject.attach(DashboardNotificationObserver(self.db))
        subject.attach(ConsoleLogObserver())
        subject.notify(order, old_status, status)
        return self.get_order(order_id)
