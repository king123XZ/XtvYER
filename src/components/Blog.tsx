const novedades = [
  {
    titulo: "Tip: ¿Cómo elegir el mejor plan?",
    descripcion: "Compara precios y beneficios de cada plataforma antes de comprar. ¡Te asesoramos gratis!",
    fecha: "18/09/2025",
    tipo: "Tip"
  },
  {
    titulo: "Nuevo método de pago disponible",
    descripcion: "Ahora aceptamos Yape y Plin para que tu compra sea más fácil y rápida.",
    fecha: "17/09/2025",
    tipo: "Lanzamiento"
  }
];

export default function Blog() {
  return (
    <section id="blog" className="w-full max-w-3xl mx-auto my-16 px-6 py-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-700/30 flex flex-col items-center gap-8 transition-all">
      <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-2">Novedades y Tips</h2>
      <div className="w-full flex flex-col items-center gap-6">
        {/* Video explicativo de métodos */}
        <div className="w-full flex flex-col items-center gap-2">
          <h3 className="text-xl font-bold text-white mb-2">¿Cómo funciona el curso?</h3>
          <div className="w-full aspect-video max-w-2xl rounded-2xl overflow-hidden shadow-lg border-2 border-blue-400/40 mb-6">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video explicativo de métodos"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          {/* Feed TikTok (SociableKIT Widget) */}
          <h3 className="text-xl font-bold text-white mb-2 mt-6">Mi feed de TikTok</h3>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg border-2 border-pink-400/40" style={{ minHeight: 500 }}>
            <iframe
              src="https://www.sociablekit.com/app/embed/245377" 
              frameBorder="0"
              width="100%"
              height="600"
              title="Feed TikTok"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full h-[500px] bg-black"
              style={{ minHeight: 500 }}
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full mt-4">
          {novedades.map((n, i) => (
            <div key={i} className="bg-black/40 rounded-2xl p-6 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 border-blue-400/60 hover:border-yellow-400 transition-all">
              <div className="flex flex-col items-start md:w-1/4">
                <span className="text-xs text-gray-400 mb-1">{n.fecha}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${n.tipo === 'Promoción' ? 'bg-yellow-400/80 text-black' : n.tipo === 'Tip' ? 'bg-blue-400/80 text-white' : 'bg-green-400/80 text-black'}`}>{n.tipo}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{n.titulo}</h3>
                <p className="text-gray-200 text-base">{n.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
