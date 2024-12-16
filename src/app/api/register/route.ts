// app/api/register/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Usuario ya existe.' }, { status: 400 });
    }

    // Hashear la contraseña usando bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con roleId 2 (admin)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: { connect: { id: 2 } }, // Asigna el rol de admin (id 2)
      },
    });

    return NextResponse.json({ message: 'Usuario creado', userId: user.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Datos inválidos', errors: error.errors }, { status: 400 });
    }
    console.error('Error en el registro:', error);
    return NextResponse.json({ message: 'Error en el registro.' }, { status: 500 });
  }
}
