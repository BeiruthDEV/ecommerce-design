from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    product_name: str
    quantity: int
    unit_price: float


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    customer_name: str
    customer_email: str
    address: str
    payment_method: str
    payment_status: str
    payment_details: str
    status: str
    subtotal: float
    shipping: float
    discount: float
    total: float
    created_at: datetime
    items: list[OrderItemResponse]


class OrderStatusUpdate(BaseModel):
    status: str = Field(pattern="^(Pendente|Pago|Enviado|Entregue|Cancelado)$")
