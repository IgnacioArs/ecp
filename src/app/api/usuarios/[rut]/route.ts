import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";


// Expresiones regulares para validar email y RUT chileno
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
const telefonoRegex = /^[0-9]{8,15}$/; // solo números, entre 8 y 15 dígitos

export async function GET(request: NextRequest,{ params }: { params: { rut: string } }) {
  try {
    
    const { rut } = await params;
    const usuario = await prisma.usuario.findUnique({
      where: { rut }
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: usuario,
      message: "Usuario obtenido por rut",
      status: 200,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: { rut: string } }
) {
  try {

    const { rut } = await params; //  sin await

    const usuario = await prisma.usuario.findUnique({
      where: { rut }
    });

    if (!usuario) {
      return NextResponse.json(
        
        {
         data:usuario,
         message: "Usuario no encontrado",
         status: 404 
        }
      );
    }

    const body = await request.json();

    const updateData: any = {};

    //  Solo actualiza lo que venga
    if (body.nombre) updateData.nombre = body.nombre.trim();
    if (body.apellido) updateData.apellido = body.apellido.trim();
    if (body.email) updateData.email = body.email;
    if (body.telefono) updateData.telefono = Number(body.telefono);
    if (body.direccion) updateData.direccion = body.direccion;
    if (body.roleId) updateData.roleId = body.roleId;
    if (body.creadoPorIdUsuario) updateData.creadoPorIdUsuario = body.creadoPorIdUsuario;

    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json(
          
          { 
            data:"123456",
            message: "Password debe tener al menos 6 caracteres", 
            status: 400 
           }
        );
      }
      updateData.password = await bcrypt.hash(body.password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        
        { 
          data:{},
          message: "No hay campos para actualizar",
          status: 400 }
      );
    }

    const res = await prisma.usuario.update({
      where: { rut },
      data: updateData,
    });

    return NextResponse.json(
      {
        data: res,
        message: "Usuario actualizado correctamente",
        status: 200
      }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}