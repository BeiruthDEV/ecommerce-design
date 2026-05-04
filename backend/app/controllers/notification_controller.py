from sqlalchemy.orm import Session

from app.services.notification_service import NotificationService


def list_notifications(db: Session):
    return NotificationService(db).list_notifications()
