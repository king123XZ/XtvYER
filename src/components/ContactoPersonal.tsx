import Image from "next/image";

const redes = [
  {
    nombre: "Telegram",
    url: "https://t.me/XoldyxStore",
    color: "from-blue-500/60 to-blue-800/60 border-blue-400",
    hover: "hover:from-blue-600/80 hover:to-blue-900/80 hover:border-blue-500",
    img: "/telegram.png",
    alt: "Logo Telegram"
  },
  {
    nombre: "WhatsApp",
    url: "https://wa.me/51934920256",
    color: "from-green-500/60 to-green-800/60 border-green-400",
    hover: "hover:from-green-600/80 hover:to-green-900/80 hover:border-green-500",
    img: "/whatsapp.png",
    alt: "Logo WhatsApp"
  },
  {
    nombre: "TikTok",
    url: "https://tiktok.com/@doxanking",
    color: "from-pink-500/60 to-gray-900/60 border-pink-400",
    hover: "hover:from-pink-600/80 hover:to-gray-950/80 hover:border-pink-500",
    img: "/tiktok.png",
    alt: "Logo TikTok"
  }
];

export default function ContactoPersonal() {
  return (
    <section id="contacto-personal" className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-700/30 p-10 my-16 flex flex-col items-center gap-8 transition-all">
      <h2 className="text-3xl font-extrabold mb-2 text-white text-center drop-shadow-lg">Contáctame directamente</h2>
      <p className="text-gray-200 text-center mb-6 text-lg">¿Tienes dudas, quieres comprar o necesitas atención personalizada? Escríbeme directo a mis redes:</p>
      <div className="flex flex-col gap-6 w-full items-center">
        {redes.map((r) => (
          <a
            key={r.nombre}
            href={r.url}
            target="_blank"
            rel="noopener"
            className={`flex items-center gap-5 bg-gradient-to-r ${r.color} ${r.hover} text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all duration-200 w-full max-w-md justify-center text-xl border-2 glass-btn hover:scale-105 backdrop-blur-lg`}
            style={{ backgroundBlendMode: "overlay" }}
          >
            <span className="w-9 h-9 flex items-center justify-center">
              <Image src={r.img} alt={r.alt} width={36} height={36} className="rounded-lg shadow" priority unoptimized />
            </span>
            {r.nombre}
          </a>
        ))}
      </div>
    </section>
  );
}
