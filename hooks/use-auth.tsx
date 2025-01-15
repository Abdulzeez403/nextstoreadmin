import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  const login = () => signIn();
  const logout = () => signOut();

  return {
    session,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
}
