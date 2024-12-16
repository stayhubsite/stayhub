"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LucideIcon,
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  ClipboardList,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: "Resumen",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Habitaciones",
    href: "/rooms",
    icon: BedDouble,
  },
  {
    title: "Reservas",
    href: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    title: "Check-in/out",
    href: "/dashboard/checkin-out",
    icon: ClipboardList,
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
