// app/protected-page/page.tsx
import React from 'react';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface JWTPayload {
  userId: string;
  role: string;
}

const ProtectedPage: React.FC = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    // Opcional: Obtener información adicional del usuario si es necesario
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true },
    });

    if (!user) {
      redirect('/login');
    }

    return <div>Hola, {user.name}! Tu rol es {user.role.name}.</div>;
  } catch (error) {
    console.error('Error en página protegida:', error);
    redirect('/login');
  }
};

export default ProtectedPage;
