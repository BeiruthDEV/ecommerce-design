import { BellRing, Clock } from "lucide-react";

import { dateTime } from "../lib/format";
import type { Notification } from "../types";

type NotificationCardProps = {
  notification: Notification;
};

export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <div className="rounded-2xl border border-line/80 bg-white p-4 shadow-card">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-moss/10 text-moss">
          <BellRing size={18} />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <strong className="text-sm capitalize text-ink">{notification.channel}</strong>
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock size={13} /> {dateTime.format(new Date(notification.created_at))}
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-muted">{notification.message}</p>
        </div>
      </div>
    </div>
  );
}
