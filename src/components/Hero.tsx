"use client";

import Image from "next/image";
import imagenesURL from "@/data/imagenesURL";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-20 text-center gap-8 min-h-[480px] overflow-hidden">
      {/* Imagen de fondo temática streaming */}
      <Image
        src={imagenesURL.heroBg}
        alt="Streaming"
        fill
        priority
        className="object-cover object-center z-0"
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-5xl md:text-7xl font-extrabold max-w-3xl drop-shadow-lg font-orbitron tracking-tight flex flex-wrap items-center justify-center text-center animate-fade-in">
          <span className="text-[#c0c0c0]">Bienvenido </span>
          <span className="mx-2 text-[#c0c0c0]">a</span>
          <span
            className="text-[#39ff14] ml-2"
            style={{
              textShadow:
                "0 0 8px rgba(57,255,20,0.4), 0 0 16px rgba(57,255,20,0.4), 0 0 32px rgba(57,255,20,0.4), 0 0 64px rgba(57,255,20,0.4)",
            }}
          >
            Xoldyx Store
          </span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-gray-200 mt-4">
          Compra cuentas de{" "}
          <span className="font-bold text-red-500">Netflix</span>,{" "}
          <span className="font-bold text-blue-400">Disney+</span>,{" "}
          <span className="font-bold text-purple-400">HBO Max</span> y más, al
          instante y con soporte 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <a
            href="#productos"
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400/50 group"
          >
            <span className="inline-block group-hover:animate-bounce-x">Ver catálogo</span>
          </a>
          <a
            href="#tutoriales"
            className="bg-white/10 border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gradient-to-r hover:from-white/20 hover:to-blue-400/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/40 group"
          >
            <span className="inline-block group-hover:animate-bounce-x">¿Cómo comprar?</span>
          </a>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
        .animate-bounce-x {
          animation: bounce-x 0.5s;
        }
      `}</style>
    </section>
  );
}
