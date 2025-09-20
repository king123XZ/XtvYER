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
}
  interface CompraModalProps {
    producto: Producto;
    open: boolean;
    onClose: () => void;
  }

  export default function CompraModal({ producto, open, onClose }: CompraModalProps) {
  const [metodoPago, setMetodoPago] = useState<string>("");
  if (!open) return null;

  const handleConfirmar = () => {
    if (!metodoPago) return;
    const mensaje = `¡Hola! 👋\n\nQuiero comprar el siguiente producto:\n\n` +
      `🛒 Producto: ${producto.nombre}\n` +
      `💸 Precio: S/ ${producto.precio}\n` +
      (producto.descripcion ? `📄 Descripción: ${producto.descripcion}\n` : "") +
      (producto.descuento && producto.descuento > 0 ? `🎉 Descuento: ${producto.descuento}% OFF\n` : "") +
      `Forma de pago elegida: ${metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1)}`;
    const url = `https://wa.me/51999999999?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 w-full max-w-lg relative animate-fade-in mx-2">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold">×</button>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 bg-clip-text text-transparent drop-shadow">Detalles de tu compra</h2>
        <div className="flex flex-col items-center mb-6">
          {producto.imagen && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-2 flex items-center justify-center">
              <Image src={producto.imagen} alt={producto.nombre} width={128} height={128} className="rounded-xl shadow-lg border border-blue-200 object-cover w-full h-full" />
            </div>
          )}
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 text-center break-words">{producto.nombre}</h3>
          <span className="text-base sm:text-lg font-bold text-green-600">S/ {producto.precio}</span>
          {producto.descuento && producto.descuento > 0 && (
            <span className="text-xs text-pink-500 font-bold ml-2">¡{producto.descuento}% OFF!</span>
          )}
          {producto.descripcion && (
            <p className="text-gray-600 text-sm mt-2 text-center break-words">{producto.descripcion}</p>
          )}
        </div>
        <div className="mb-8">
          <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-700 text-center">Selecciona método de pago:</h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button type="button" onClick={() => setMetodoPago("yape")} className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold shadow transition-all duration-200 ${metodoPago === "yape" ? "bg-green-500 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-green-100"}`}>Yape</button>
            <button type="button" onClick={() => setMetodoPago("plin")} className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold shadow transition-all duration-200 ${metodoPago === "plin" ? "bg-blue-500 text-white scale-105" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}>Plin</button>
            <button type="button" onClick={() => setMetodoPago("binance")} className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold shadow transition-all duration-200 ${metodoPago === "binance" ? "bg-yellow-400 text-black scale-105" : "bg-gray-200 text-gray-700 hover:bg-yellow-100"}`}>Binance</button>
          </div>
        </div>
        <button
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 ${metodoPago ? "bg-gradient-to-r from-green-500 to-blue-600 text-white hover:scale-105" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          onClick={handleConfirmar}
          disabled={!metodoPago}
        >
          Confirmar compra
        </button>
      </div>
    </div>
  );
}
