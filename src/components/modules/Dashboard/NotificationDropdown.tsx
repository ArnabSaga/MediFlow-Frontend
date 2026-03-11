"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Bell, Calendar, CheckCircle, Clock, UserPlus } from "lucide-react";

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "appointment" | "schedule" | "system" | "user";
    timestamp: Date;
    read: boolean;
}

const MOCK_NOTIFICATION: Notification[] = [
    {
        id: "1",
        title: "Appointment Reminder",
        message: "Your appointment is scheduled for tomorrow at 10:00 AM.",
        type: "appointment",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
    },
    {
        id: "2",
        title: "Schedule Reminder",
        message: "Your schedule is set for tomorrow at 10:00 AM.",
        type: "schedule",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: false,
    },
    {
        id: "3",
        title: "System Notification",
        message: "A system update has been scheduled for tomorrow at 10:00 AM.",
        type: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true,
    },
    {
        id: "4",
        title: "New User Activity",
        message: "A new user account was added to the dashboard last week.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        read: true,
    },
];

const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
        case "appointment":
            return <Calendar className="h-4 w-4 text-blue-600" />;
        case "schedule":
            return <Clock className="h-4 w-4 text-amber-600" />;
        case "system":
            return <CheckCircle className="h-4 w-4 text-purple-600" />;
        case "user":
            return <UserPlus className="h-4 w-4 text-green-600" />;
        default:
            return <Bell className="h-4 w-4 text-slate-600" />;
    }
};

const NotificationDropdown = () => {
    const unreadCount = MOCK_NOTIFICATION.filter((notification) => !notification.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open notifications"
                    className="relative h-10 w-10 rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cyan-500/30"
                >
                    <Bell className="h-5 w-5 text-slate-700" />

                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-sm"
                        >
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-[calc(100vw-1rem)] max-w-[360px] rounded-2xl border border-slate-200 bg-white p-0 shadow-[0_18px_45px_rgba(15,23,42,0.14)]"
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <DropdownMenuLabel className="p-0 text-sm font-semibold text-slate-900">
                        Notifications
                    </DropdownMenuLabel>

                    {unreadCount > 0 && (
                        <Badge className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100">
                            {unreadCount} new
                        </Badge>
                    )}
                </div>

                <DropdownMenuSeparator className="bg-slate-200" />

                <ScrollArea className="h-80">
                    {MOCK_NOTIFICATION.length > 0 ? (
                        <div className="p-2">
                            {MOCK_NOTIFICATION.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={cn(
                                        "relative mb-1 flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-all outline-none",
                                        "focus:bg-slate-100 data-highlighted:bg-slate-100",
                                        !notification.read &&
                                            "bg-slate-50/90 before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-r-full before:bg-cyan-500"
                                    )}
                                >
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="line-clamp-1 pr-1 text-sm font-semibold text-slate-900">
                                                {notification.title}
                                            </p>

                                            {!notification.read && (
                                                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                                            )}
                                        </div>

                                        <p className="line-clamp-2 wrap-break-word text-xs leading-5 text-slate-500">
                                            {notification.message}
                                        </p>

                                        <p className="text-[11px] font-medium text-slate-400">
                                            {formatDistanceToNow(notification.timestamp, {
                                                addSuffix: true,
                                            })}
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-56 flex-col items-center justify-center px-6 text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                                <Bell className="h-5 w-5 text-slate-500" />
                            </div>

                            <p className="text-sm font-semibold text-slate-900">
                                No notifications yet
                            </p>

                            <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-500">
                                New alerts, reminders, and updates will appear here.
                            </p>
                        </div>
                    )}
                </ScrollArea>

                <DropdownMenuSeparator className="bg-slate-200" />

                <DropdownMenuItem className="flex cursor-pointer items-center justify-center rounded-b-2xl px-4 py-3 text-sm font-semibold text-cyan-700 transition-colors focus:bg-cyan-50 focus:text-cyan-800 data-highlighted:bg-cyan-50 data-highlighted:text-cyan-800">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown;
