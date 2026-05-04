from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database_singleton import get_db
from app.controllers import order_controller
from app.schemas.order_schema import OrderResponse, OrderStatusUpdate

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=list[OrderResponse])
def list_orders(db: Session = Depends(get_db)):
    return order_controller.list_orders(db)


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    return order_controller.get_order(order_id, db)


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    payload: OrderStatusUpdate,
    db: Session = Depends(get_db),
):
    return order_controller.update_order_status(order_id, payload, db)
