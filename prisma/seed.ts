import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Imágenes de streaming para el carrusel
  const imagenesCarrusel = [
    "/uploads/netflix.png",
  "/uploads/disney.png",
  "/uploads/hbo.png",
  "/uploads/prime.png",
    "/uploads/spotify.png"
  ];
  for (const url of imagenesCarrusel) {
    await prisma.carruselImagen.create({ data: { url } });
  }

  // Productos Streaming
  await prisma.producto.createMany({
    data: [
      { nombre: "Netflix 1 mes", precio: 12, imagen: "/public/netflix.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Crunchyroll 1 mes", precio: 4, imagen: "/public/crunchyroll.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Prime Video 1 mes", precio: 7, imagen: "/public/prime.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Disney+ 1 mes", precio: 6, imagen: "/public/disney.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Vix 1 mes", precio: 3, imagen: "/public/vix.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Deezer 1 mes", precio: 5, imagen: "/public/deezer.png", categoria: "Streaming", descripcion: "" },
  { nombre: "HBO Max 1 mes", precio: 8, imagen: "/public/hbo.png", categoria: "Streaming", descripcion: "" },
  { nombre: "YouTube Premium 1 mes", precio: 10, imagen: "/public/youtube.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Canva Pro anual", precio: 10, imagen: "/public/canva.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Canva Pro 1 mes", precio: 4, imagen: "/public/canva.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Office anual", precio: 50, imagen: "/public/office.png", categoria: "Streaming", descripcion: "" },
  { nombre: "ChatGPT Plus 1 mes", precio: 18, imagen: "/public/chatgpt.png", categoria: "Streaming", descripcion: "" },
  { nombre: "Paramount+ 1 mes", precio: 5, imagen: "/public/paramount.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Apple TV+ 1 mes", precio: 10, imagen: "/public/appletv.png", categoria: "Streaming", descripcion: "" },
    ],
  });
  // Productos Métodos
  await prisma.producto.createMany({
    data: [
  { nombre: "Método de Vix", precio: 15, imagen: "/public/vix.png", categoria: "Métodos", descripcion: "" },
  { nombre: "Método de Deezer", precio: 10, imagen: "/public/deezer.png", categoria: "Métodos", descripcion: "" },
  { nombre: "Método de Apple TV", precio: 30, imagen: "/public/appletv.png", categoria: "Métodos", descripcion: "" },
      { nombre: "Método de YouTube", precio: 35, imagen: "/public/youtube.png", categoria: "Métodos", descripcion: "" },
      { nombre: "Método de Crunchyroll", precio: 30, imagen: "/public/crunchyroll.png", categoria: "Métodos", descripcion: "" },
    ],
  });

  // Productos Cursos
  await prisma.producto.createMany({
    data: [
      { nombre: "Curso Cracking", precio: 50, imagen: "/public/curso.png", categoria: "Cursos", descripcion: "" },
    ],
  });

}
main()
  .then(() => {
    console.log('Productos importados correctamente');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const imagenes = [
    "/uploads/netflix.png",
    "/uploads/disney.png",
    "/uploads/hbo.png",
    "/uploads/prime.png",
    "/uploads/spotify.png"
  ];
  for (const url of imagenes) {
    await prisma.carruselImagen.create({ data: { url } });
  }
}

main().finally(() => prisma.$disconnect());
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Productos Streaming
  await prisma.producto.createMany({
    data: [
      { nombre: "Netflix 1 mes", precio: 12, imagen: "/public/netflix.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Crunchyroll 1 mes", precio: 4, imagen: "/public/crunchyroll.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Prime Video 1 mes", precio: 7, imagen: "/public/prime.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Disney+ 1 mes", precio: 6, imagen: "/public/disney.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Vix 1 mes", precio: 3, imagen: "/public/vix.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Deezer 1 mes", precio: 5, imagen: "/public/deezer.png", categoria: "Streaming", descripcion: "" },
      { nombre: "HBO Max 1 mes", precio: 8, imagen: "/public/hbo.png", categoria: "Streaming", descripcion: "" },
      { nombre: "YouTube Premium 1 mes", precio: 10, imagen: "/public/youtube.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Canva Pro anual", precio: 10, imagen: "/public/canva.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Canva Pro 1 mes", precio: 4, imagen: "/public/canva.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Office anual", precio: 50, imagen: "/public/office.png", categoria: "Streaming", descripcion: "" },
      { nombre: "ChatGPT Plus 1 mes", precio: 18, imagen: "/public/chatgpt.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Paramount+ 1 mes", precio: 5, imagen: "/public/paramount.png", categoria: "Streaming", descripcion: "" },
      { nombre: "Apple TV+ 1 mes", precio: 10, imagen: "/public/appletv.png", categoria: "Streaming", descripcion: "" },
    ],
  });

  // Productos Métodos
  await prisma.producto.createMany({
    data: [
      { nombre: "Método de Vix", precio: 15, imagen: "/public/vix.png", categoria: "Métodos", descripcion: "" },
      { nombre: "Método de Deezer", precio: 10, imagen: "/public/deezer.png", categoria: "Métodos", descripcion: "" },
      { nombre: "Método de Apple TV", precio: 30, imagen: "/public/appletv.png", categoria: "Métodos", descripcion: "" },
      { nombre: "Método de YouTube", precio: 35, imagen: "/public/youtube.png", categoria: "Métodos", descripcion: "" },
      { nombre: "Método de Crunchyroll", precio: 30, imagen: "/public/crunchyroll.png", categoria: "Métodos", descripcion: "" },
    ],
  });

  // Productos Cursos
  await prisma.producto.createMany({
    data: [
      { nombre: "Curso Cracking", precio: 50, imagen: "/public/curso.png", categoria: "Cursos", descripcion: "" },
    ],
  });
}

main()
  .then(() => {
    console.log('Productos importados correctamente');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
