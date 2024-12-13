// app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password, name, roleId } = await request.json();

  if (!email || !password || !roleId) {
    return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
  }

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "Usuario ya registrado" }, { status: 400 });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId,
      },
    });
    return NextResponse.json({ message: "Usuario creado exitosamente", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el usuario", error }, { status: 500 });
  }
}
