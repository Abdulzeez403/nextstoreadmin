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
        // Send login request to the backend
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

        // If the response is OK, return the user and token
        if (response.ok) {
          return {
            id: user?.user?.id,
            email: user?.user?.email,
            name: user?.user?.name,
            role: user?.user?.role,
            isAdmin: user?.user?.isAdmin,
            token: user?.user?.token, // Attach token here
          };
        }

        // If the login fails, throw an error
        throw new Error(user.error || "Invalid credentials");
      },
    }),
  ],
  callbacks: {
    // Store the JWT token in the JWT callback
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; // Store token in JWT token object
      }
      return token;
    },
    // Attach the token to the session callback
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Add accessToken to the session
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
