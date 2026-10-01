import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";
import { Prisma } from "@/src/generated/prisma";

const precioPisoSchema = yup.object({
  porcentaje: yup
    .number()
    .typeError("Porcentaje debe ser un número")
    .required("Porcentaje es obligatorio")
    .min(0, "Porcentaje no puede ser negativo")
    .max(100, "Porcentaje no puede ser mayor a 100"),

  usuarioId: yup
    .number()
    .typeError("usuarioId debe ser un número")
    .required("usuarioId es obligatorio")
    .integer("usuarioId debe ser entero")
    .positive("usuarioId debe ser positivo"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //  Validación con Yup
    const validatedData = await precioPisoSchema.validate(body, {
      abortEarly: false, // devuelve todos los errores
      stripUnknown: true,
    });

    const res = await prisma.precioPiso.create({
      data: {
        porcentaje: new Prisma.Decimal(validatedData.porcentaje),
        usuarioId: validatedData.usuarioId,
      },
    });

    return NextResponse.json(
      {
        data: res,
        message: "Precio piso creado correctamente",
      },
      { status: 201 }
    );

  } catch (error: any) {

    //  Manejo elegante de errores de validación
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "Errores de validación",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { message: "Error al crear el precio piso" },
      { status: 500 }
    );
  }
}