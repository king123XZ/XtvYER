import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No se envió archivo" }, { status: 400 });
  }
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-video-fondo.${ext}`;
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);
  const arrayBuffer = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(arrayBuffer));
  return NextResponse.json({ url: `/uploads/${fileName}` });
}
