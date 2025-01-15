"use client";

import { Inter } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from '@/components/theme-provider'
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  readonly children: React.ReactNode;
  readonly session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <div className="flex h-screen overflow-hidden">
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
