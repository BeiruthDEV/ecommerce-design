from sqlalchemy.orm import Session

from app.models.notification import Notification


class NotificationService:
    def __init__(self, db: Session):
        self.db = db

    def create(self, order_id: int, channel: str, message: str) -> Notification:
        notification = Notification(order_id=order_id, channel=channel, message=message)
        self.db.add(notification)
        self.db.commit()
        self.db.refresh(notification)
        return notification

    def list_notifications(self) -> list[Notification]:
        return self.db.query(Notification).order_by(Notification.created_at.desc()).all()
