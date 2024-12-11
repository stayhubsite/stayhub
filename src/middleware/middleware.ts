// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  role: string;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas que no requieren autenticación
  const publicPaths = ['/login', '/register', '/api/login', '/api/register', '/api/test'];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Rutas de dashboard específicas
  const dashboardPaths = ['/dashboard/superadmin', '/dashboard/admin', '/dashboard/user'];

  const token = req.cookies.get('auth')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

    // Redirigir al dashboard específico si intenta acceder a /dashboard
    if (pathname === '/dashboard') {
      switch (decoded.role) {
        case 'superadmin':
          return NextResponse.redirect(new URL('/dashboard/superadmin', req.url));
        case 'admin':
          return NextResponse.redirect(new URL('/dashboard/admin', req.url));
        case 'user':
          return NextResponse.redirect(new URL('/dashboard/user', req.url));
        default:
          return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Proteger rutas de dashboard específicas
    if (dashboardPaths.some((path) => pathname.startsWith(path))) {
      if (pathname.startsWith('/dashboard/superadmin') && decoded.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      if (pathname.startsWith('/dashboard/admin') && decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      if (pathname.startsWith('/dashboard/user') && decoded.role !== 'user') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Aplicar el middleware a todas las rutas excepto las públicas y las API que deben ser públicas
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/api/protected/:path*',
    '/dashboard', // Asegúrate de incluir la ruta raíz del dashboard
  ],
};
