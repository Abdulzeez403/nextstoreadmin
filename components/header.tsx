"use client";

import { Bell, User, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Header() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const toggleSearch = () => setSearchVisible((prev) => !prev);

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      {/* Search Section */}
      {/* <div className="w-full flex-1">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <Search className="h-4 w-4" />
          </Button>
          {isSearchVisible && (
            <form className="md:flex lg:flex">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              />
            </form>
          )}
        </div>
      </div> */}

      {/* Notifications Button */}
      <Button size="icon" variant="ghost" aria-label="Toggle notifications">
        <Bell className="h-4 w-4" />
      </Button>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* User Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full"
            aria-label="User Menu"
          >
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {/* Dynamic User Info */}
              <p className="text-sm font-medium leading-none">User</p>
              <p className="text-xs leading-none text-muted-foreground">
                {/* Replace this with actual user email or name */}
                user@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
