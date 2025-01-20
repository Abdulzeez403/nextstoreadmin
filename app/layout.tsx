"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { SessionProvider } from "next-auth/react";
import { Toast, ToastProvider } from "@radix-ui/react-toast";
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
            <main className="bg-slate-200 px-4">{children}</main>
          </body>
        </Provider>
      </SessionProvider>
    </html>
  );
}
