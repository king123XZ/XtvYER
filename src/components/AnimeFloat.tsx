"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Puedes cambiar la URL por cualquier personaje de anime GIF o PNG
const ANIME_IMG = "https://i.ibb.co/QF9NNbHx/goku-dance.gif";

export default function AnimeFloat() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 animate-float pointer-events-none select-none">
      <Image
        src={ANIME_IMG}
        alt="Personaje anime flotante"
        width={90}
        height={110}
        className="drop-shadow-2xl rounded-xl sm:w-[140px] sm:h-[180px] w-[90px] h-[110px]"
        priority
        unoptimized
      />
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @media (min-width: 640px) {
          .sm\\:w-\[140px\] { width: 140px !important; }
          .sm\\:h-\[180px\] { height: 180px !important; }
          .sm\\:left-6 { left: 1.5rem !important; }
          .sm\\:bottom-6 { bottom: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
