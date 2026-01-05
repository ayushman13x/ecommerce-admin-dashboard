import { withAuth } from "next-auth/middleware";

// This is the "default export function" the error is asking for
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  matcher: ["/dashboard/:path*", "/products/:path*"] 
};