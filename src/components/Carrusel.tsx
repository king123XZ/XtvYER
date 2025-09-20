"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { productosStreaming } from "@/data/productosStreaming";
import { productosMetodos } from "@/data/productosMetodos";
import { productosCursos } from "@/data/productosCursos";

// Unificar todos los productos para el carrusel
const productos = [
  ...productosStreaming,
  ...productosMetodos,
  ...productosCursos,
];

// Duplicar para efecto infinito
const lista = [...productos, ...productos];

export default function Carrusel() {
  const [seleccionado, setSeleccionado] = useState<number|null>(null);
  const [animar, setAnimar] = useState(true);
  const cintaRef = useRef<HTMLDivElement>(null);
  const carruselRef = useRef<HTMLDivElement>(null);
  // Detener animación y seleccionar
  const handleClick = (idx: number) => {
    setSeleccionado(idx);
    setAnimar(false);
  };
  // Detectar clic fuera para reactivar
  useEffect(() => {
    if (seleccionado === null) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (carruselRef.current && !carruselRef.current.contains(event.target as Node)) {
        setSeleccionado(null);
        setAnimar(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [seleccionado]);
  return (
    <div ref={carruselRef} className="w-full overflow-hidden relative" style={{background: "rgba(35, 37, 38, 0.4)"}}>
      {/* Fade lateral */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-20" style={{background: "linear-gradient(90deg, #232526 80%, transparent)"}} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 z-20" style={{background: "linear-gradient(270deg, #232526 80%, transparent)"}} />
      <div className="relative w-full h-20 py-2">
        <div
          ref={cintaRef}
          className={`absolute left-0 top-0 flex items-center h-16 ${animar ? "animate-cinta" : ""}`}
          style={{ width: `${lista.length * 80}px` }}
        >
          {lista.map((producto, idx) => {
            const isSelected = seleccionado === idx;
            return (
              <a
                key={idx}
                href={`/#producto-${producto.nombre.toLowerCase().replace(/\s+/g, "-")}`}
                className={`mx-3 flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-200 shadow-lg transition-all duration-200 group relative overflow-visible z-10
                  ${isSelected ? "bg-white scale-110 z-30" : seleccionado !== null ? "bg-white/40 opacity-40 grayscale" : "bg-white/70 hover:scale-110 hover:z-10"}`}
                tabIndex={0}
                title={producto.nombre}
                onClick={e => { e.preventDefault(); handleClick(idx); }}
                style={isSelected ? { boxShadow: "0 0 0 4px #fff, 0 4px 24px #0006" } : {}}
              >
                <Image src={producto.imagen} alt={producto.nombre} width={44} height={44} className="object-contain drop-shadow-xl" />
                {/* Tooltip */}
                <span className="absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 px-3 py-1 rounded-xl bg-black/90 text-white text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-30 shadow-xl">
                  {producto.nombre}
                </span>
              </a>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes cinta {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-cinta {
          animation: cinta 18s linear infinite;
        }
      `}</style>
    </div>
  );



