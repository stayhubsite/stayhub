// app/api/login/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface JWTPayload {
  userId: string;
  role: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const { email, password }: LoginRequestBody = await request.json();

    // Validación básica
    const parsedData = loginSchema.safeParse({ email, password });
    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: parsedData.error.errors },
        { status: 400 }
      );
    }

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
    }

    // Comparar contraseñas usando bcryptjs
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
    }

    // Crear el payload del JWT
    const payload: JWTPayload = {
      userId: user.id,
      role: user.role.name,
    };

    // Generar el token
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    // Configurar las opciones de la cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
      path: '/',
    };

    // Establecer la cookie usando NextResponse
    const response = NextResponse.json(
      { message: 'Autenticación exitosa.', role: user.role.name },
      { status: 200 }
    );
    response.cookies.set('auth', token, cookieOptions);

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error en el login:', error);
    return NextResponse.json({ message: 'Error en el login.' }, { status: 500 });
  }
}
