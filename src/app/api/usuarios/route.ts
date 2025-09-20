import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const usuarios = await prisma.user.findMany({
    select: { id: true, name: true, email: true, rol: true },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(usuarios);
}

export async function PUT(req: NextRequest) {
  const { id, rol } = await req.json();
  const usuario = await prisma.user.update({
    where: { id },
    data: { rol },
    select: { id: true, name: true, email: true, rol: true },
  });
  return NextResponse.json(usuario);
}
