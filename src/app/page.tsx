import ContactoPersonal from "@/components/ContactoPersonal";

import Hero from "@/components/Hero";

import Catalogo from "@/components/Catalogo";

import Comunidad from "@/components/Comunidad";


export default function Home() {
  return (
    <>
      <Hero />

      {/* Sección ¿Cómo comprar? */}
      <section id="tutoriales" className="w-full max-w-3xl mx-auto my-16 px-6 py-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-700/30 flex flex-col items-center gap-6 transition-all">
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-2">¿Cómo comprar?</h2>
        <ol className="list-decimal text-lg text-gray-200 pl-6 space-y-3 max-w-2xl">
          <li>Explora el <b>catálogo</b> y elige el producto que deseas comprar.</li>
          <li>Haz clic en <b>Agregar al carrito</b> en el producto que te interesa.</li>
          <li>Cuando termines, abre el <b>carrito</b> (ícono arriba a la derecha) y revisa tu pedido.</li>
          <li>Presiona <b>Confirmar compra</b> y completa tus datos de contacto.</li>
          <li>Serás redirigido a <b>WhatsApp</b> para finalizar tu compra con atención personalizada.</li>
          <li>¡Listo! Te ayudaremos con el pago y la entrega de tu producto.</li>
        </ol>
        <div className="mt-4 text-center text-gray-400 text-base">¿Tienes dudas? Contáctanos directo por WhatsApp, Telegram o TikTok.</div>
      </section>

      <Catalogo />

      <Comunidad />
      <ContactoPersonal />
    </>
  );
}
