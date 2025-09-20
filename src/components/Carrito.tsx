"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen?: string;
  descripcion?: string;
  descuento?: number;
  agotado?: boolean;
}

interface CarritoProps {
  carrito: Producto[];
  setCarrito: React.Dispatch<React.SetStateAction<Producto[]>>;
}

function Carrito({ carrito, setCarrito }: CarritoProps) {
  const [mostrar, setMostrar] = useState(false);
  const [metodoPago, setMetodoPago] = useState<string>("");
  const [nombre, setNombre] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const total = carrito.reduce((acc: number, prod: Producto) => acc + (prod.precio * (prod.descuento ? (1 - prod.descuento / 100) : 1)), 0);

  const quitarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((p: Producto) => p.id !== id));
  };

  const handleComprar = async () => {
    if (!metodoPago || carrito.length === 0 || enviando) return;
    setEnviando(true);
    // Resumen de productos
    const productosMsg = carrito.map(p => `• ${p.nombre} (${p.categoria}) S/ ${p.precio}${p.descuento ? `, ${p.descuento}% OFF` : ""}`).join("\n");
  // Mensaje personalizado
  const mensaje = `🛒 *¡Nuevo pedido online!*\n\n👤 *Nombre:* ${nombre ? nombre : "(no ingresado)"}\n\n${productosMsg}\n\n💰 *Total a pagar:* S/ ${total.toFixed(2)}\n💳 *Método elegido:* ${metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1)}\n\nGracias por tu compra 🙌\nEn breve te enviaré los datos para el pago y la entrega. Si tienes dudas, responde este mensaje.`;
    // Guardar pedido en la base de datos
    try {
      await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          // telefono eliminado
          productos: carrito,
          total,
          metodoPago,
        }),
      });
    } catch {
      // Si falla, igual se envía el WhatsApp
    }
    // Enviar a WhatsApp
    const url = `https://wa.me/51934920256?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    setConfirmado(true);
    setCarrito([]);
    setMetodoPago("");
    setNombre("");
    setEnviando(false);
    setTimeout(() => {
      setConfirmado(false);
      setMostrar(false);
    }, 3500);
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-xl hover:scale-105 transition-all duration-200 text-base sm:text-lg"
        onClick={() => setMostrar(true)}
      >
        🛒 Carrito ({carrito.length})
      </button>
      {mostrar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full relative animate-fade-in mx-2">
            <button onClick={() => setMostrar(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold">×</button>
            <h2 className="text-2xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 bg-clip-text text-transparent drop-shadow">Tu carrito</h2>
            {confirmado ? (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="text-3xl mb-4">✅</span>
                <div className="text-lg font-bold text-green-600 mb-2">¡Pedido enviado!</div>
                <div className="text-gray-700 text-center">Te contactaremos pronto por WhatsApp.</div>
              </div>
            ) : carrito.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No has agregado productos.</div>
            ) : (
              <>
                <ul className="mb-6 divide-y divide-gray-200">
                  {carrito.map(prod => (
                    <li key={prod.id} className="flex items-center gap-3 py-3">
                      {prod.imagen && (
                        <Image src={prod.imagen} alt={prod.nombre} width={48} height={48} className="rounded-xl border border-gray-300" />
                      )}
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{prod.nombre}</div>
                        <div className="text-xs text-gray-500">{prod.categoria}</div>
                        <div className="text-sm text-green-600 font-bold">S/ {prod.precio}{prod.descuento ? `, ${prod.descuento}% OFF` : ""}</div>
                      </div>
                      <button onClick={() => quitarDelCarrito(prod.id)} className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-100">Eliminar</button>
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nombre (opcional):</label>
                  <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 bg-white text-gray-900" placeholder="Tu nombre" maxLength={40} />
                </div>
                {/* Campo de teléfono eliminado */}
                <div className="mb-6 text-center font-bold text-lg text-blue-700">Total: S/ {total.toFixed(2)}</div>
                <div className="mb-6">
                  <h4 className="text-base font-bold mb-2 text-gray-700 text-center">Selecciona método de pago:</h4>
                  <div className="flex gap-4 justify-center">
                    <button type="button" onClick={() => setMetodoPago("yape")} className={`px-6 py-3 rounded-xl font-bold shadow transition-all duration-200 ${metodoPago === "yape" ? "bg-green-500 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-green-100"}`}>Yape</button>
                    <button type="button" onClick={() => setMetodoPago("plin")} className={`px-6 py-3 rounded-xl font-bold shadow transition-all duration-200 ${metodoPago === "plin" ? "bg-blue-500 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}>Plin</button>
                    <button type="button" onClick={() => setMetodoPago("binance")} className={`px-6 py-3 rounded-xl font-bold shadow transition-all duration-200 ${metodoPago === "binance" ? "bg-yellow-400 text-black scale-105" : "bg-gray-200 text-gray-700 hover:bg-yellow-100"}`}>Binance</button>
                  </div>
                  {/* Instrucciones visuales de pago eliminadas, tú enviarás el número o QR por WhatsApp */}
                </div>
                <button
                  className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 ${metodoPago && carrito.length > 0 && !enviando ? "bg-gradient-to-r from-green-500 to-blue-600 text-white hover:scale-105" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  onClick={handleComprar}
                  disabled={!metodoPago || carrito.length === 0 || enviando}
                >
                  {enviando ? "Enviando..." : "Confirmar compra"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Carrito;
