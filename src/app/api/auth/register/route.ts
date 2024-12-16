// src/app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// Definición de tipos para mayor seguridad
type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  roleId: number;
};

export async function POST(request: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const { email, password, name, roleId }: RegisterRequest = await request.json();

    // Validar campos requeridos
    if (!email || !password || !name || !roleId) {
      return NextResponse.json(
        { message: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Usuario ya registrado" },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId,
        // Si hotelId es opcional y puede no estar presente, puedes manejarlo así:
        // hotelId: someCondition ? someValue : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        roleId: true,
        hotelId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Responder con éxito
    return NextResponse.json(
      { message: "Usuario creado exitosamente", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al crear el usuario:", error);
    return NextResponse.json(
      { message: "Error al crear el usuario", error: error.message },
      { status: 500 }
    );
  }
}
