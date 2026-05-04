from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database_singleton import Base, database
from app.routes.checkout_routes import router as checkout_router
from app.routes.notification_routes import router as notification_router
from app.routes.order_routes import router as order_router
from app.routes.product_routes import router as product_router

app = FastAPI(
    title="Mini E-commerce Design Patterns",
    description="API academica com FastAPI demonstrando Singleton, Factory, Strategy, Observer e Facade.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=database.engine)

app.include_router(product_router)
app.include_router(checkout_router)
app.include_router(order_router)
app.include_router(notification_router)


@app.get("/")
def health_check():
    return {"message": "Mini e-commerce rodando", "docs": "/docs"}
