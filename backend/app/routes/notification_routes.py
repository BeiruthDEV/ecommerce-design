from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database_singleton import get_db
from app.controllers import notification_controller
from app.schemas.notification_schema import NotificationResponse

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=list[NotificationResponse])
def list_notifications(db: Session = Depends(get_db)):
    return notification_controller.list_notifications(db)
