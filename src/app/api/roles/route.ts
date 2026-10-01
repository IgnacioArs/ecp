import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await prisma.role.createMany({
      data: [
        { nombreRol: "administrador" },
        { nombreRol: "vendedor" },
        { nombreRol: "jefe" },
      ],
      skipDuplicates: true,
    });

    return NextResponse.json({
      data: res,
      message: "Roles creados correctamente",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al crear roles", error },
      { status: 500 }
    );
  }
}