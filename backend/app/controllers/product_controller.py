from sqlalchemy.orm import Session

from app.services.product_service import ProductService


def list_products(db: Session):
    return ProductService(db).list_products()


def get_product(product_id: int, db: Session):
    return ProductService(db).get_product(product_id)
