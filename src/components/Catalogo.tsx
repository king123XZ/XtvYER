"use client";
import { useEffect, useState } from "react";
// import CompraModal from "./CompraModal";

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


import Image from "next/image";
import Carrusel from "./Carrusel";
// import PaymentsOnly from "./PaymentsOnly";
// import OfertaEspecialBanner from "./OfertaEspecialBanner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import useScrollReveal from "@/hooks/useScrollReveal";

const correosAdmin = [
  "oroscoyerson2019@gmail.com",
  "angelejrv@gmail.com",
  "oroscoyeferson@gmail.com"
];

export default function Catalogo() {
  useScrollReveal(".reveal", {});
  const { data: session, status } = useSession();
  const router = useRouter();
  // const [modalOpen, setModalOpen] = useState(false);
  // const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  // const [compraData, setCompraData] = useState({ nombre: "", correo: "", telefono: "" });
  // Carrito
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const Carrito = dynamic(() => import("./Carrito").then(mod => mod.default), { ssr: false });
  const [seccion, setSeccion] = useState<"streaming" | "metodos" | "cursos">("streaming");
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    if (status === "authenticated" && correosAdmin.includes(session?.user?.email || "")) {
      router.push("/admin");
    }
  }, [status, session, router]);

  // const handleGoogleLogin = () => {
  //   signIn("google", { callbackUrl: "/admin" });
  // };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      });
  }, []);

  // Agrupar productos por categoría
  const streaming = productos.filter((p) => p.categoria?.toLowerCase() === "streaming");
  const metodos = productos.filter((p) => p.categoria?.toLowerCase() === "métodos" || p.categoria?.toLowerCase() === "metodos");
  const cursos = productos.filter((p) => p.categoria?.toLowerCase() === "cursos");

  return (
    <>
  {/* Banner animado de promociones (dinámico) */}
  {/* <OfertaEspecialBanner /> */}
      <Carrusel />
      <section id="productos" className="w-full max-w-6xl mx-auto py-16 px-4 relative overflow-hidden reveal bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-700/30" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        {/* Fondo decorativo lateral derecho */}
        <div className="hidden md:block absolute top-0 right-0 h-full w-1/3 z-0 pointer-events-none select-none">
          <Image src="/globe.svg" alt="Fondo decorativo" fill style={{ objectFit: 'cover', opacity: 0.13 }} />
        </div>
        <div className="absolute inset-0 bg-black/40 z-0 rounded-3xl" />
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow reveal">Catálogo de productos</h2>
          <div className="flex justify-center gap-4 mb-10">
            <button
              className={`px-6 py-2 rounded font-bold transition text-lg ${seccion === "streaming" ? "bg-yellow-400 text-black" : "bg-white/10 text-white border border-white/20 hover:bg-yellow-300 hover:text-black"}`}
              onClick={() => setSeccion("streaming")}
            >
              Streaming
            </button>
            <button
              className={`px-6 py-2 rounded font-bold transition text-lg ${seccion === "metodos" ? "bg-yellow-400 text-black" : "bg-white/10 text-white border border-white/20 hover:bg-yellow-300 hover:text-black"}`}
              onClick={() => setSeccion("metodos")}
            >
              Métodos
            </button>
            <button
              className={`px-6 py-2 rounded font-bold transition text-lg ${seccion === "cursos" ? "bg-yellow-400 text-black" : "bg-white/10 text-white border border-white/20 hover:bg-yellow-300 hover:text-black"}`}
              onClick={() => setSeccion("cursos")}
            >
              Cursos
            </button>
          </div>
          {loading ? (
            <div className="text-center text-white">Cargando productos...</div>
          ) : (
            <>
              {seccion === "streaming" && (
                <>
                  <h3 className="text-2xl font-bold mb-6 mt-10 text-white">Cuentas de Streaming</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 justify-center items-center">
                    {streaming.map((prod) => (
                      <div
                        key={prod.id}
                        className={`bg-black/40 rounded-2xl shadow-2xl p-4 flex flex-col items-center border-2 border-gray-700 group hover:scale-[1.07] hover:shadow-yellow-400/30 transition-all duration-300 ease-out relative mx-auto ${prod.agotado ? 'opacity-70' : ''}`}
                        style={{ width: '100%', maxWidth: '260px', minWidth: '200px', height: '420px' }}
                      >
                        {prod.agotado && (
                          <div className="absolute top-2 right-2 bg-gray-900 text-white font-bold px-3 py-1 rounded-xl shadow-lg animate-fade-in text-xs z-10 border border-gray-400">
                            <span className="text-white">AGOTADO</span>
                          </div>
                        )}
                        <div className="w-full mb-3 relative rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-800 to-black border-2 border-gray-700 shadow-md" style={{ height: '160px', minHeight: '120px', maxHeight: '180px' }}>
                          {prod.imagen ? (
                            <Image src={prod.imagen} alt={prod.nombre} fill sizes="100vw" style={{ objectFit: 'cover' }} className="w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                              <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 mb-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm16 0l-4.5 6-3-4-4.5 6'/></svg>
                              <span>Sin imagen</span>
                            </div>
                          )}
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-1 py-2 px-2">
                          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">{prod.nombre}</h3>
                          <p className="text-sm text-gray-300 mb-1">{prod.descripcion || 'Sin descripción'}</p>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center mt-auto mb-2">
                          {prod.descuento && prod.descuento > 0 ? (
                            <>
                              <span className="text-xs font-bold text-gray-400 line-through">S/ {prod.precio.toFixed(2)}</span>
                              <span className="text-lg font-bold text-yellow-300">S/ {(prod.precio * (1 - prod.descuento / 100)).toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-yellow-300">S/ {prod.precio}</span>
                          )}
                          <button
                            className={`mt-3 px-6 py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-green-500 group-hover:shadow-yellow-400/40 hover:scale-110 shadow-lg transition-all duration-200 text-white font-bold active:scale-95 active:bg-green-600/80 ${prod.agotado ? 'opacity-60 pointer-events-none cursor-not-allowed' : ''}`}
                            disabled={prod.agotado}
                            onClick={e => {
                              if (!prod.agotado) {
                                const card = (e.target as HTMLElement).closest('.group') as HTMLElement | null;
                                if (card) {
                                  card.classList.remove('animate-bounce-fast');
                                  void (card as HTMLElement).offsetWidth;
                                  card.classList.add('animate-bounce-fast');
                                  setTimeout(() => card.classList.remove('animate-bounce-fast'), 400);
                                }
                                setCarrito((prev) => {
                                  if (prev.find((p) => p.id === prod.id)) return prev;
                                  return [...prev, prod];
                                });
                              }
                            }}
                          >
                            {prod.agotado ? (
                              <span className="font-bold text-white">No disponible</span>
                            ) : (
                              <span className="font-bold text-white">Agregar al carrito</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {seccion === "metodos" && (
                <>
                  <h3 className="text-2xl font-bold mb-6 mt-10 text-white">Métodos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 justify-center items-center">
                    {metodos.map((prod) => (
                      <div
                        key={prod.id}
                        className={`bg-black/40 rounded-2xl shadow-2xl p-4 flex flex-col items-center border-2 border-gray-700 group hover:scale-[1.07] hover:shadow-yellow-400/30 transition-all duration-300 ease-out relative mx-auto ${prod.agotado ? 'opacity-70' : ''}`}
                        style={{ width: '100%', maxWidth: '260px', minWidth: '200px', height: '420px' }}
                      >
                        {prod.agotado && (
                          <div className="absolute top-2 right-2 bg-gray-900 text-white font-bold px-3 py-1 rounded-xl shadow-lg animate-fade-in text-xs z-10 border border-gray-400">
                            <span className="text-white">AGOTADO</span>
                          </div>
                        )}
                        <div className="w-full mb-3 relative rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-800 to-black border-2 border-gray-700 shadow-md" style={{ height: '160px', minHeight: '120px', maxHeight: '180px' }}>
                          {prod.imagen ? (
                            <Image src={prod.imagen} alt={prod.nombre} fill sizes="100vw" style={{ objectFit: 'cover' }} className="w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                              <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 mb-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm16 0l-4.5 6-3-4-4.5 6'/></svg>
                              <span>Sin imagen</span>
                            </div>
                          )}
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-1 py-2 px-2">
                          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">{prod.nombre}</h3>
                          <p className="text-sm text-gray-300 mb-1">{prod.descripcion || 'Sin descripción'}</p>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center mt-auto mb-2">
                          {prod.descuento && prod.descuento > 0 ? (
                            <>
                              <span className="text-xs font-bold text-gray-400 line-through">S/ {prod.precio.toFixed(2)}</span>
                              <span className="text-lg font-bold text-yellow-300">S/ {(prod.precio * (1 - prod.descuento / 100)).toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-yellow-300">S/ {prod.precio}</span>
                          )}
                          <button
                            className={`mt-3 px-6 py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-green-500 group-hover:shadow-yellow-400/40 hover:scale-110 shadow-lg transition-all duration-200 text-white font-bold active:scale-95 active:bg-green-600/80 ${prod.agotado ? 'opacity-60 pointer-events-none cursor-not-allowed' : ''}`}
                            disabled={prod.agotado}
                            onClick={e => {
                              if (!prod.agotado) {
                                const card = (e.target as HTMLElement).closest('.group') as HTMLElement | null;
                                if (card) {
                                  card.classList.remove('animate-bounce-fast');
                                  void (card as HTMLElement).offsetWidth;
                                  card.classList.add('animate-bounce-fast');
                                  setTimeout(() => card.classList.remove('animate-bounce-fast'), 400);
                                }
                                setCarrito((prev) => {
                                  if (prev.find((p) => p.id === prod.id)) return prev;
                                  return [...prev, prod];
                                });
                              }
                            }}
                          >
                            {prod.agotado ? (
                              <span className="font-bold text-white">No disponible</span>
                            ) : (
                              <span className="font-bold text-white">Agregar al carrito</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {seccion === "cursos" && (
                <>
                  <h3 className="text-2xl font-bold mb-6 mt-10 text-white">Cursos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 justify-center items-center">
                    {cursos.map((prod) => (
                      <div key={prod.id} className={`bg-black/40 rounded-2xl shadow-2xl p-4 flex flex-col items-center border-2 border-gray-700 hover:scale-105 transition-transform relative mx-auto ${prod.agotado ? 'opacity-70' : ''}`} style={{ width: '100%', maxWidth: '260px', minWidth: '200px', height: '420px' }}>
                        {prod.agotado && (
                          <div className="absolute top-2 right-2 bg-gray-900 text-white font-bold px-3 py-1 rounded-xl shadow-lg animate-fade-in text-xs z-10 border border-gray-400">
                            <span className="text-white">AGOTADO</span>
                          </div>
                        )}
                        <div className="w-full mb-3 relative rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-800 to-black border-2 border-gray-700 shadow-md" style={{ height: '160px', minHeight: '120px', maxHeight: '180px' }}>
                          {prod.imagen ? (
                            <Image src={prod.imagen} alt={prod.nombre} fill sizes="100vw" style={{ objectFit: 'cover' }} className="w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                              <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 mb-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm16 0l-4.5 6-3-4-4.5 6'/></svg>
                              <span>Sin imagen</span>
                            </div>
                          )}
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-1 py-2 px-2">
                          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">{prod.nombre}</h3>
                          <p className="text-sm text-gray-300 mb-1">{prod.descripcion || 'Sin descripción'}</p>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center mt-auto mb-2">
                          {prod.descuento && prod.descuento > 0 ? (
                            <>
                              <span className="text-xs font-bold text-gray-400 line-through">S/ {prod.precio.toFixed(2)}</span>
                              <span className="text-lg font-bold text-yellow-300">S/ {(prod.precio * (1 - prod.descuento / 100)).toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-yellow-300">S/ {prod.precio}</span>
                          )}
                          <button
                            className={`mt-3 px-6 py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:scale-105 shadow-lg transition text-white font-bold ${prod.agotado ? 'opacity-60 pointer-events-none cursor-not-allowed' : ''}`}
                            disabled={prod.agotado}
                            onClick={() => {
                              if (!prod.agotado) {
                                setCarrito((prev) => {
                                  if (prev.find((p) => p.id === prod.id)) return prev;
                                  return [...prev, prod];
                                });
                              }
                            }}
                          >
                            {prod.agotado ? (
                              <span className="font-bold text-white">No disponible</span>
                            ) : (
                              <span className="font-bold text-white">Agregar al carrito</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
  {/* <PaymentsOnly /> */}
  <style jsx global>{`
    @keyframes bounce-fast {
      0% { transform: scale(1); }
      20% { transform: scale(1.12) translateY(-8px); }
      40% { transform: scale(0.98) translateY(2px); }
      60% { transform: scale(1.04) translateY(-4px); }
      80% { transform: scale(0.99) translateY(1px); }
      100% { transform: scale(1); }
    }
    .animate-bounce-fast {
      animation: bounce-fast 0.4s cubic-bezier(.68,-0.55,.27,1.55);
    }
  `}</style>
  <Carrito carrito={carrito} setCarrito={setCarrito} />
    </>
  );
}
