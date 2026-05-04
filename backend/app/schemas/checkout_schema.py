from pydantic import BaseModel, EmailStr, Field


class CheckoutItem(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class CheckoutRequest(BaseModel):
    customer_name: str = Field(min_length=2, max_length=120)
    customer_email: EmailStr
    address: str = Field(min_length=5, max_length=255)
    payment_method: str
    items: list[CheckoutItem]
