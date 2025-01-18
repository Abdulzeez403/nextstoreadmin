"use client";

import { Inter } from "next/font/google";
// import { ThemeProvider } from '@/components/theme-provider'
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import SidebarNav from "@/components/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  readonly children: React.ReactNode;
  readonly session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
 
  return (
    <html lang="en">
        <body className={inter.className}>
          <div className="flex h-screen overflow-hidden">
            <SidebarNav />
            <div className="flex flex-col flex-1 overflow-hidden">
              <div>
              <Header />
              <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
          </div>
          </div>
        </body>
    </html>
  );
}
