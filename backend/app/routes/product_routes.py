from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database_singleton import get_db
from app.controllers import product_controller
from app.schemas.product_schema import ProductResponse

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return product_controller.list_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return product_controller.get_product(product_id, db)
