from sqlalchemy.orm import Session

from app.patterns.facade.checkout_facade import CheckoutFacade
from app.schemas.checkout_schema import CheckoutRequest


def create_checkout(payload: CheckoutRequest, db: Session):
    return CheckoutFacade(db).checkout(payload)
