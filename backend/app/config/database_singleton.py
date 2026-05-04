from pathlib import Path
import os
from threading import Lock

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


class Base(DeclarativeBase):
    pass


class DatabaseSingleton:
    """Singleton: centraliza uma unica engine/session factory do SQLAlchemy."""

    _instance = None
    _lock = Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialize()
        return cls._instance

    def _initialize(self) -> None:
        env_path = Path(__file__).resolve().parents[2] / ".env"
        load_dotenv(env_path)
        database_path = Path(__file__).resolve().parents[2] / "ecommerce.db"
        self.database_url = os.getenv("DATABASE_URL", f"sqlite:///{database_path}")
        self.engine = create_engine(
            self.database_url,
            connect_args={"check_same_thread": False},
        )
        self.SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine,
        )


database = DatabaseSingleton()


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()
