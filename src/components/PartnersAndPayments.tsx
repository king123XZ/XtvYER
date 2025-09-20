"use client";
import Image from "next/image";

const partners = [
  { src: "/vercel.svg", alt: "Vercel" },
  { src: "/next.svg", alt: "Next.js" },
  { src: "/globe.svg", alt: "Web Partner" },
  { src: "/window.svg", alt: "Windows Partner" },
];

const pagos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png", alt: "Visa" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png", alt: "Mastercard" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/PayPal_2014_logo.png", alt: "PayPal" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Logo_Yape.png", alt: "Yape" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Plin_logo.png", alt: "Plin" },
];

function CarouselMini({ items }: { items: { src: string; alt: string }[] }) {
  const itemsFull = [...items, ...items];
  return (
    <div className="w-full overflow-hidden py-3 bg-transparent">
      <div
        className="flex gap-8 animate-carousel hover:[animation-play-state:paused]"
        style={{ minWidth: '100%', width: 'max-content' }}
      >
        {itemsFull.map((logo, i) => (
          <div key={i} className="flex items-center justify-center h-10 w-24 md:w-32 grayscale hover:grayscale-0 transition-all duration-300">
            <Image src={logo.src} alt={logo.alt} width={80} height={40} className="object-contain w-full h-full" />
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel 16s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function PartnersAndPayments() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 my-12">
      <div>
        <h4 className="text-lg font-bold text-white mb-2">Partners oficiales</h4>
        <CarouselMini items={partners} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2">Métodos de pago aceptados</h4>
        <CarouselMini items={pagos} />
      </div>
    </div>
  );
}
