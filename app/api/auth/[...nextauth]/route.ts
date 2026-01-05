import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminUser = {
          id: "1",
          email: "admin@test.com",
          password: "password123",
          name: "Ayushman"
        };

        if (
          credentials?.email === adminUser.email &&
          credentials?.password === adminUser.password
        ) {
          return adminUser;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: "a_very_long_random_string_for_security_123456789",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };