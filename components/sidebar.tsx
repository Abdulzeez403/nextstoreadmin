"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Package,
  BarChart,
  Settings,
  Users,
  Menu,
  CircleX,
  MonitorCog,
  Store
} from "lucide-react";


const sidebarItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Stores", href: "/admin/stores", icon: Store },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Customers", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Setups", href: "/admin/setup", icon: MonitorCog },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // To manage sidebar toggle state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false); // Close sidebar when a link is clicked on mobile
    }
  };

  return (
    <div className="relative">
      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden absolute top-4 left-4 z-50 ">
       { isOpen ? null : (
          <Menu className="h-6 w-6 " onClick={toggleSidebar} />
        )}
      </div>

      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-gray-200 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={cn(
          " h-screen fixed inset-0 top-0 left-0 z-50 flex flex-col bg-gray-100/40 dark:bg-gray-800/40 transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full", // For mobile
          "lg:relative lg:translate-x-0 lg:w-64" // Fixed sidebar on larger screens
        )}
      >
        <div className="flex justify-between h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Package className="h-6 w-6" />
            <span>NextStore</span>
          </Link>
<div className="flex md:hidden lg:hidden"> 
            <CircleX   onClick={toggleSidebar}/>

</div>
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
                <Link href={item.href} onClick={handleLinkClick}>
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
