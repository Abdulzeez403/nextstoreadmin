"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignIn from "./auth/signin/page";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated" && session.user) {
      // Fetch user data and update local state
      const fetchUser = async () => {
        const response = await fetch("/api/user");
        const userData = await response.json();
        setUser(userData);
      };
      fetchUser();
    }
  }, [status, session, router]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SignIn />
    </div>
  );
}
