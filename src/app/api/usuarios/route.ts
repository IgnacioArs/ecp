import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

// Expresiones regulares para validar email y RUT chileno
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
const telefonoRegex = /^[0-9]{8,15}$/; // solo números, entre 8 y 15 dígitos

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      nombre,
      apellido,
      email,
      rut,
      password,
      telefono,
      direccion,
      roleId,
      creadoPorIdUsuario
    } = body;

    // Validaciones
    if (!nombre?.trim()) {
      return NextResponse.json({ message: "Nombre es obligatorio" }, { status: 400 });
    }

    if (!apellido?.trim()) {
      return NextResponse.json({ message: "Apellido es obligatorio" }, { status: 400 });
    }

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ message: "Email inválido" }, { status: 400 });
    }

    if (!rut || !rutRegex.test(rut)) {
      return NextResponse.json({ message: "RUT inválido. Formato correcto: 12345678-9" }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ message: "Password debe tener al menos 6 caracteres" }, { status: 400 });
    }

    if (!telefono || !telefonoRegex.test(telefono)) {
      return NextResponse.json({ message: "Teléfono inválido. Solo números, 8-15 dígitos" }, { status: 400 });
    }

    if (!direccion?.trim()) {
      return NextResponse.json({ message: "Dirección es obligatoria" }, { status: 400 });
    }

    if (!roleId) {
      return NextResponse.json({ message: "roleId es obligatorio" }, { status: 400 });
    }
    
    if (!creadoPorIdUsuario) {
      return NextResponse.json({ message: "creadoPorIdUsuario es obligatorio" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        rut,
        password: hashedPassword,
        telefono: Number(telefono),
        direccion,
        roleId,
        creadoPorIdUsuario,
      },
    });

    return NextResponse.json(
      {
        data: res,
        message: "Usuario creado correctamente",
        status: 201
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al crear usuario" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url);

  const skip = searchParams.get("skip") ?? "0";
  const take = searchParams.get("take") ?? "10";
  const res = await prisma.usuario.findMany({
    skip: Number(skip),
    take: Number(take),
  });

  return NextResponse.json({
    data: res,
    message: "Usuarios obtenidos",
    status: 200,
  });
}