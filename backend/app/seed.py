from app.config.database_singleton import Base, database
from app.models import Notification, Order, OrderItem, Product


PRODUCTS = [
    {
        "name": "Notebook Gamer",
        "description": "Notebook com placa dedicada, 16GB de RAM e SSD NVMe para jogos e projetos pesados.",
        "price": 6899.9,
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80",
        "stock": 8,
    },
    {
        "name": "Smartphone",
        "description": "Smartphone 5G com tela OLED, camera tripla e bateria para o dia todo.",
        "price": 2499.0,
        "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
        "stock": 18,
    },
    {
        "name": "Headset",
        "description": "Headset gamer com som espacial, microfone removivel e almofadas confortaveis.",
        "price": 399.9,
        "image_url": "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=80",
        "stock": 25,
    },
    {
        "name": "Teclado Mecanico",
        "description": "Teclado mecanico ABNT2 com switches tateis, iluminacao RGB e cabo removivel.",
        "price": 529.9,
        "image_url": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
        "stock": 16,
    },
    {
        "name": "Monitor",
        "description": "Monitor 27 polegadas QHD, 144Hz, painel IPS e suporte com ajuste de altura.",
        "price": 1799.9,
        "image_url": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
        "stock": 10,
    },
]


def run_seed() -> None:
    Base.metadata.create_all(bind=database.engine)
    db = database.SessionLocal()
    try:
        existing = db.query(Product).count()
        if existing:
            print("Seed ignorado: produtos ja cadastrados.")
            return
        db.add_all(Product(**product) for product in PRODUCTS)
        db.commit()
        print("Seed concluido: produtos iniciais cadastrados.")
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
