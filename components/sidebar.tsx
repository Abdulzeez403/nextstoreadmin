"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Package,
  BarChart,
  Settings,
  Users,
} from "lucide-react";

const sidebarItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Users", href: "/admin/users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col ">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Package className="h-6 w-6" />
            <span>NextStore</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-2 px-4">
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-green-200 dark:bg-gray-700"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
