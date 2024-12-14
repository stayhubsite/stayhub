// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Definir rutas públicas
    const publicPaths = ["/", "/auth/signin", "/auth/register", "/unauthorized"];

    // Verificar si la ruta es pública
    const isPublic = publicPaths.some((path) => pathname.startsWith(path));

    if (isPublic) {
      return NextResponse.next();
    }

    // Rutas protegidas
    const token = req.nextauth.token;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }

    // Verificar permisos específicos si es necesario
    if (pathname.startsWith("/admin") && token.roleId !== 1 && token.roleId !== 2) {
      const url = req.nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
