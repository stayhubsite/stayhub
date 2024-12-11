// app/api/check-auth/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  role: string;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  const cookies = Object.fromEntries(cookieHeader.split('; ').map((c) => c.split('=')));
  const token = cookies['auth'];

  if (!token) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    return NextResponse.json({ message: 'Autenticado', user: decoded }, { status: 200 });
  } catch (error) {
    console.error('Error verificando token:', error);
    return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
  }
}
