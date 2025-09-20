import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET() {
  const imagenes = await prisma.carruselImagen.findMany({ orderBy: { orden: "asc" } });
  return NextResponse.json(imagenes);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = Date.now() + "-" + file.name.replace(/\s/g, "-");
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(uploadsDir + path.sep + fileName, buffer);
    const url = "/uploads/" + fileName;
    const nuevaImagen = await prisma.carruselImagen.create({ data: { url } });
    return NextResponse.json(nuevaImagen);
  } catch (err) {
    return NextResponse.json({ error: "Error al guardar la imagen" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.carruselImagen.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
