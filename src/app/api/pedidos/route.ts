import { NextResponse } from "next/server";

let pedidos = [
  // Ejemplo de pedido inicial
  {
    id: 1,
    producto: "Producto de ejemplo",
    cantidad: 2,
    total: 200,
    estado: "pendiente",
  },
];

export async function GET() {
  return NextResponse.json(pedidos);
}

export async function POST(request: Request) {
  const data = await request.json();
  const nuevo = { ...data, id: Date.now(), estado: "pendiente" };
  pedidos.push(nuevo);
  return NextResponse.json(nuevo);
}

export async function PUT(request: Request) {
  const data = await request.json();
  pedidos = pedidos.map((p) => (p.id === data.id ? { ...p, ...data } : p));
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  pedidos = pedidos.filter((p) => p.id !== id);
  return NextResponse.json({ ok: true });
}
