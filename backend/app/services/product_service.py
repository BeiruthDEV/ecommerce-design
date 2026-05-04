from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.product import Product


class ProductService:
    def __init__(self, db: Session):
        self.db = db

    def list_products(self) -> list[Product]:
        return self.db.query(Product).order_by(Product.id).all()

    def get_product(self, product_id: int) -> Product:
        product = self.db.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Produto nao encontrado")
        return product
