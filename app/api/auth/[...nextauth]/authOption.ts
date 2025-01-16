import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const user = await response.json();
        console.log(user, "the user");

        if (response.ok && user.token) {
          return {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            token: user?.token,
          };
        }

        throw new Error(user.error || "Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Path to your custom sign-in page
    signOut: "/auth/signout", // (Optional) Custom sign-out page
    error: "/auth/signin", // (Optional) Custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
