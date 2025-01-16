"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { SessionProvider } from "next-auth/react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <SessionProvider>
        <Provider store={store}>
          <body className={inter.className}>
            <div className="flex h-screen overflow-hidden">
              <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
          </body>
        </Provider>
      </SessionProvider>
    </html>
  );
}
