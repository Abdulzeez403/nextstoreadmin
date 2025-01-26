"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignIn from "./auth/signin/page";
import { useAuth } from "@/hooks/use-auth";

export default function AuthPage() {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/admin");
  }

  return (
    <div className="flex-1 space-y-4">
      <SignIn />
    </div>
  );
}
