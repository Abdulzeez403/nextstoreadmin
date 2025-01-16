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
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Wait for the session to be loaded
  if (isLoading) {
    return null; // You can show a loading spinner or other UI here if needed
  }

  // Redirect if the user is authenticated
  if (isAuthenticated) {
    router.push("/admin");
  }

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          <div className="flex h-screen overflow-hidden">
            <SidebarNav />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
          </div>

          {/* </ThemeProvider> */}
        </body>
      </SessionProvider>
    </html>
  );
}
