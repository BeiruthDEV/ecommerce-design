from sqlalchemy.orm import Session

from app.schemas.order_schema import OrderStatusUpdate
from app.services.order_service import OrderService


def list_orders(db: Session):
    return OrderService(db).list_orders()


def get_order(order_id: int, db: Session):
    return OrderService(db).get_order(order_id)


def update_order_status(order_id: int, payload: OrderStatusUpdate, db: Session):
    return OrderService(db).update_status(order_id, payload.status)
