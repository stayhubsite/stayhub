"use client";
import { Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  message: string;
  type: "info" | "warning" | "urgent";
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    message: "Habitación 101 necesita limpieza urgente",
    type: "urgent",
  },
  { id: 2, message: "Nueva reserva para la Suite 301", type: "info" },
  { id: 3, message: "Mantenimiento programado para mañana", type: "warning" },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notifications.length > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem>No hay notificaciones nuevas</DropdownMenuItem>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              className="flex justify-between items-start"
            >
              <span
                className={`text-sm ${
                  notif.type === "urgent"
                    ? "text-red-500"
                    : notif.type === "warning"
                    ? "text-yellow-500"
                    : ""
                }`}
              >
                {notif.message}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismiss(notif.id)}
              >
                Descartar
              </Button>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
