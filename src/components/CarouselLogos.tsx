"use client";
import Image from "next/image";

const logos = [
  { src: "/netflix.png", alt: "Netflix" },
  { src: "/hbo.png", alt: "HBO Max" },
  { src: "/disney.png", alt: "Disney+" },
  { src: "/crunchyroll-anime-y-drama-18863.jpg", alt: "Crunchyroll" },
  { src: "/globe.svg", alt: "Web" },
  { src: "/window.svg", alt: "Windows" },
  { src: "/vercel.svg", alt: "Vercel" },
  { src: "/next.svg", alt: "Next.js" },
];

export default function CarouselLogos() {
  // Duplicar logos para efecto infinito
  const logosFull = [...logos, ...logos].reverse();
  return (
  <div className="w-full overflow-hidden py-6 bg-black">
      <div
        className="flex gap-10 animate-carousel hover:[animation-play-state:paused]"
        style={{ minWidth: '100%', width: 'max-content' }}
      >
        {logosFull.map((logo, i) => (
          <div key={i} className="flex items-center justify-center h-16 w-32 md:w-40 grayscale hover:grayscale-0 transition-all duration-300">
            <Image src={logo.src} alt={logo.alt} width={120} height={64} className="object-contain w-full h-full" />
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
