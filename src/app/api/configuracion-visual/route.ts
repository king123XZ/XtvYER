import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Obtener la configuración visual actual
export async function GET() {
  const config = await prisma.configuracionVisual.findFirst();
  return NextResponse.json(config || {});
}

// POST: Crear o actualizar la configuración visual (todos los campos)
export async function POST(req: Request) {
  const body = await req.json();
  const {
    imagenFondo,
    videoFondo,
    colorPrincipal,
    fondoActivo,
    logo,
    favicon,
    tituloPagina,
    metaDescripcion,
    metaKeywords,
    openGraphImg,
    themeColor,
    fuente,
    banner,
    idioma,
    enlacesRapidos,
    backup,
    metodosPago,
    textoOferta
  } = body;

  // Buscar el primer registro existente
  const existing = await prisma.configuracionVisual.findFirst();
  let config;
  const data = {
    imagenFondo,
    videoFondo,
    colorPrincipal,
    fondoActivo,
    logo,
    favicon,
    tituloPagina,
    metaDescripcion,
    metaKeywords,
    openGraphImg,
    themeColor,
    fuente,
    banner,
    idioma,
    enlacesRapidos,
    backup,
    metodosPago,
    textoOferta
  };
  if (existing) {
    config = await prisma.configuracionVisual.update({
      where: { id: existing.id },
      data
    });
  } else {
    config = await prisma.configuracionVisual.create({
      data
    });
  }
  return NextResponse.json(config);
}
