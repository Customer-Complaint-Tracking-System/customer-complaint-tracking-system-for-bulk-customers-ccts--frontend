"use client";

import { Bell, CheckCheck, MessageSquareWarning } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    id: 1,
    title: "New complaint received",
    description: "A new customer complaint requires your attention.",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Complaint escalated",
    description: "A complaint has been escalated for review.",
    time: "30 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "Approval required",
    description: "A complaint resolution is awaiting approval.",
    time: "1 hour ago",
    unread: false,
  },
];

const Notification = () => {
  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Notifications, ${unreadCount} unread`}
            className="relative size-10 rounded-full"
          >
            <Bell className="size-5" />

            {unreadCount > 0 && (
              <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border-2 border-background bg-brand-blue p-0 text-[10px] text-white">
                {unreadCount}
              </Badge>
            )}
          </Button>
        }
      />

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl p-0"
      >
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-sm font-semibold">Notifications</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-brand-blue"
          >
            <CheckCheck className="size-4" />
            Mark all read
          </Button>
        </div>

        <Separator />

        <div className="max-h-[360px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-3 border-b p-4 last:border-b-0 transition-colors hover:bg-muted/50 ${
                  notification.unread ? "bg-brand-blue/[0.04]" : ""
                }`}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <MessageSquareWarning className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{notification.title}</p>

                    {notification.unread && (
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-blue" />
                    )}
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {notification.description}
                  </p>

                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <Bell className="size-8 text-muted-foreground/50" />
              <p className="text-sm font-medium">All caught up!</p>
              <p className="text-xs text-muted-foreground">
                You have no notifications right now.
              </p>
            </div>
          )}
        </div>

        <Separator />

        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-sm text-brand-blue"
            onClick={() => {
              // Navigate to your notifications page.
            }}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
