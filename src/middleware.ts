import { withAuth } from "next-auth/middleware";

// export { default } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin"))
        return token?.role === "ADMIN";

      return !!token;
    },
  },
});

export const config = { matcher: ["/profile", "/admin/:path*"] };
