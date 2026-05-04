from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database_singleton import get_db
from app.controllers import checkout_controller
from app.schemas.checkout_schema import CheckoutRequest
from app.schemas.order_schema import OrderResponse

router = APIRouter(prefix="/checkout", tags=["checkout"])


@router.post("", response_model=OrderResponse, status_code=201)
def checkout(payload: CheckoutRequest, db: Session = Depends(get_db)):
    return checkout_controller.create_checkout(payload, db)
