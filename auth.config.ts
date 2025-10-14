import type { Session } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({
      auth,
      request,
    }: {
      auth: { user?: Session["user"] } | null;
      request: { nextUrl: URL };
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) return isLoggedIn;
      if (isLoggedIn) return Response.redirect(new URL("/dashboard", request.nextUrl));
      return true;
    },
  },
  providers: [],
};
