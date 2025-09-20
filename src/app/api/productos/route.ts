import { getServerSession } from "next-auth";
import { authOptions, adminEmails } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  return !!session && !!userEmail && adminEmails.includes(userEmail);
}

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(productos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(request: import("next/server").NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const data = await request.json();
    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion || "",
        precio: data.precio,
        imagen: data.imagen,
        categoria: data.categoria || "",
        descuento: data.descuento || 0,
        agotado: !!data.agotado,
      },
    });
    return NextResponse.json(nuevoProducto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}

export async function PUT(request: import("next/server").NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const data = await request.json();
    const productoActualizado = await prisma.producto.update({
      where: { id: data.id },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion || "",
        precio: data.precio,
        imagen: data.imagen,
        categoria: data.categoria || "",
        descuento: data.descuento || 0,
        agotado: !!data.agotado,
      },
    });
    return NextResponse.json(productoActualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Producto no encontrado o error al actualizar" }, { status: 404 });
  }
}

export async function DELETE(request: import("next/server").NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    const deleted = await prisma.producto.delete({ where: { id } });
    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Producto no encontrado o error al eliminar" }, { status: 404 });
  }
}
