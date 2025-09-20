
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export default function AdminPanel() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [form, setForm] = useState<Partial<Producto>>({ categoria: "" });
    // ...existing code...
    const [formErrors, setFormErrors] = useState<{[key:string]:string}>({});
    // ...existing code...
    const [editId, setEditId] = useState<number | null>(null);
    const categorias = ["Streaming", "Cursos", "Métodos"];
    const [tab, setTab] = useState<string>(categorias[0]);
        const correosAdmin = React.useMemo(() => [
            "oroscoyerson2019@gmail.com",
            "angelejrv@gmail.com",
            "oroscoyeferson@gmail.com"
        ], []);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    // Ocultar el toast de éxito automáticamente después de 2 segundos
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        if (status === "authenticated" && showWelcome) {
            const timer = setTimeout(() => {
                setShowWelcome(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status, showWelcome]);

    useEffect(() => {
        if (status === "unauthenticated" || (status === "authenticated" && !correosAdmin.includes(session?.user?.email || ""))) {
            router.replace("/admin/login");
            return;
        }
        fetch('/api/productos')
            .then(res => res.json())
            .then(data => setProductos(data));
    }, [status, session, router, correosAdmin]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === "precio" || e.target.name === "descuento") {
            setForm({ ...form, [e.target.name]: Number(e.target.value) });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
        // Validación instantánea
        if (e.target.value === "") {
            setFormErrors(errors => ({ ...errors, [e.target.name]: "Este campo es obligatorio" }));
        } else {
            setFormErrors(errors => ({ ...errors, [e.target.name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        // Validación básica
        const newErrors: {[key:string]:string} = {};
        if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
        if (!form.precio) newErrors.precio = "El precio es obligatorio";
        if (!form.categoria) newErrors.categoria = "La categoría es obligatoria";
        if (!form.imagen) newErrors.imagen = "La imagen es obligatoria";
        if (!form.descripcion) newErrors.descripcion = "La descripción es obligatoria";
        setFormErrors(newErrors);
        if (Object.keys(newErrors).length > 0 && Object.values(newErrors).some(v => v)) {
            setError("Completa todos los campos obligatorios.");
            return;
        }
        let response;
        try {
            if (editId) {
                response = await fetch('/api/productos', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...form, id: editId })
                });
            } else {
                response = await fetch('/api/productos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });
            }
            const result = await response.json();
            if (!response.ok) {
                if (result.error === "No autorizado") {
                    setError("No tienes permisos para realizar esta acción. Inicia sesión como administrador.");
                } else {
                    setError(result.error || "Error al guardar el producto");
                }
                return;
            }
            setSuccess(editId ? "¡Producto actualizado correctamente!" : "¡Producto agregado correctamente!");
            // Refrescar productos
            const res = await fetch('/api/productos');
            setProductos(await res.json());
            setForm({ categoria: "" });
            setEditId(null);
        } catch (err) {
            setError("Error de red o servidor. Intenta nuevamente.");
        }
    };

    const handleEdit = (producto: Producto) => {
        setForm({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            categoria: producto.categoria,
            imagen: producto.imagen || "",
            descripcion: producto.descripcion || "",
            agotado: !!producto.agotado
        });
        setEditId(producto.id);
    };

    const handleDelete = async (id: number) => {
        await fetch('/api/productos', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        // Refrescar productos
        const res = await fetch('/api/productos');
        setProductos(await res.json());
    };

    if (status === "loading") {
        return <div className="text-center text-white py-20">Cargando...</div>;
    }
    if (status === "unauthenticated") {
        return <div className="text-center text-red-500 py-20 font-bold text-xl">No has iniciado sesión. Por favor, inicia sesión como administrador.<br/>Correo detectado: <span className='text-blue-500'>{session?.user?.email || "(ninguno)"}</span></div>;
    }
    if (status === "authenticated" && !correosAdmin.includes(session?.user?.email || "")) {
        return <div className="text-center text-red-500 py-20 font-bold text-xl">No tienes permisos para acceder al panel de administración.<br/>Correo detectado: <span className='text-blue-500'>{session?.user?.email || "(ninguno)"}</span></div>;
    }
    if (status === "authenticated" && correosAdmin.includes(session?.user?.email || "")) {
        if (showWelcome) {
            return (
                <section className="min-h-screen w-full py-0 px-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] relative overflow-x-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="w-full h-full bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-black/80 animate-pulse opacity-60"></div>
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 blur-2xl opacity-40 animate-gradient-x"></div>
                    </div>
                    <main className="relative w-full flex flex-col items-center z-10">
                        <div className="w-full max-w-2xl mx-auto pt-20 pb-8 flex flex-col items-center">
                            <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-gray-800 flex flex-col items-center animate-fade-in">
                                <h1 className="text-4xl font-extrabold mb-4 text-white text-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 bg-clip-text text-transparent drop-shadow-xl">¡Bienvenido!</h1>
                                <h2 className="text-2xl font-bold mb-2 text-green-400 text-center">{session?.user?.name || "Usuario"}</h2>
                                <p className="text-lg text-gray-300 text-center mb-2">Correo: <span className="font-semibold text-blue-400">{session?.user?.email}</span></p>
                                <p className="text-lg text-white text-center mt-4">Acceso permitido. Puedes gestionar tus productos en el panel de administración.</p>
                                <p className="text-sm text-gray-400 mt-4 animate-pulse">Redirigiendo al panel en unos segundos...</p>
                            </div>
                        </div>
                    </main>
                </section>
            );
        }
        // Panel completo después de la bienvenida
        return (
            <section className="min-h-screen w-full py-0 px-0 flex flex-col items-center justify-start bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] relative overflow-x-hidden">
                {/* Fondo animado */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-black/80 animate-pulse opacity-60"></div>
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 blur-2xl opacity-40 animate-gradient-x"></div>
                </div>
                <div className="flex w-full min-h-screen">
                    {/* Sidebar izquierdo (eliminado) */}
                    <main className="flex-1 flex flex-col items-center z-10 px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
                    {/* Mensajes de error y éxito */}
                    <div className="w-full max-w-2xl mx-auto pt-8">
                        {/* Toast flotante de notificación */}
                        {(error || success) && (
                            <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-2xl font-bold shadow-2xl text-lg animate-fade-in transition-all duration-300 ${error ? "bg-gradient-to-r from-red-600 to-pink-600 text-white border-2 border-red-400" : "bg-gradient-to-r from-green-600 to-blue-600 text-white border-2 border-green-400"}`}
                                style={{ minWidth: '260px', maxWidth: '90vw' }}>
                                {error || success}
                            </div>
                        )}
                    </div>

                    {/* Botones de logout y diseño página */}
                    <div className="absolute top-6 right-8 flex gap-4 z-50">
                        <button
                            onClick={() => router.push('/admin/configuracion-visual')}
                            className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-200 border-2 border-yellow-300"
                        >
                            Configurar Oferta y Métodos de Pago
                        </button>
                        <button
                            onClick={() => signOut({ callbackUrl: "/admin/login" })}
                            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl transition-all duration-200"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                    {/* Encabezado con logo */}
                    <div className="w-full max-w-5xl mx-auto pt-16 pb-8 flex flex-col items-center">
                        <div className="flex flex-col items-center gap-2 mb-2 w-full">
                            <div className="flex items-center gap-3">
                                <img src="/next.svg" alt="Logo" className="w-10 h-10 drop-shadow-xl" />
                            </div>
                        </div>
                        <p className="text-base text-gray-300 text-center mb-1">Gestiona tus productos de forma rápida y segura. Cambia precios, imágenes y categorías con un solo clic.</p>
                        <span className="text-xs text-gray-400 text-center mt-1">Creador del panel: <span className="font-bold text-blue-400">dv.yer</span></span>
                    </div>
                    {/* Tabs de categorías */}
                    <div className="flex justify-center gap-6 mb-8">
                        {categorias.map(c => (
                            <button
                                key={c}
                                onClick={() => setTab(c)}
                                className={`px-8 py-3 rounded-2xl font-bold text-xl transition-all duration-200 shadow-lg border-2 ${tab === c ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white scale-105 border-blue-400" : "bg-zinc-800 text-gray-300 hover:bg-zinc-900 border-zinc-700"}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    {/* Formulario de productos */}
                    <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-black/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
                        <div className="flex flex-col gap-1 col-span-1 lg:col-span-5">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <input type="checkbox" name="agotado" checked={!!form.agotado} onChange={e => setForm(f => ({ ...f, agotado: e.target.checked }))} className="accent-pink-500 w-5 h-5" />
                                Marcar como agotado
                            </label>
                            <span className="text-xs text-gray-500 mt-1">Si está agotado, se mostrará un aviso en la tarjeta y se desactivará la compra.</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            <div className="flex flex-col gap-1">
                                <select name="categoria" value={form.categoria || tab} onChange={handleChange} className={`border-2 border-blue-400 bg-white/80 p-3 rounded-xl w-full text-gray-800 font-semibold shadow focus:ring-2 focus:ring-blue-500 ${formErrors.categoria ? 'border-red-500' : ''}`} required>
                                    <option value="" disabled>Selecciona una categoría</option>
                                    {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <input name="precio" type="number" placeholder="Precio en soles" value={form.precio || ""} onChange={handleChange} className={`border-2 border-green-400 bg-white/80 p-3 rounded-xl w-full text-gray-800 font-semibold shadow focus:ring-2 focus:ring-green-500 ${formErrors.precio ? 'border-red-500' : ''}`} required />
                                {formErrors.precio && <span className="text-red-500 text-xs font-bold mt-1">{formErrors.precio}</span>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <input name="imagen" placeholder="URL de la imagen" value={form.imagen || ""} onChange={handleChange} className={`border-2 border-purple-400 bg-white/80 p-3 rounded-xl w-full text-gray-800 font-semibold shadow focus:ring-2 focus:ring-purple-500 ${formErrors.imagen ? 'border-red-500' : ''}`} />
                                {formErrors.imagen && <span className="text-red-500 text-xs font-bold mt-1">{formErrors.imagen}</span>}
                                {/* Vista previa de imagen */}
                                {form.imagen && (
                                    <div className="mt-2 flex justify-center items-center">
                                        <Image src={form.imagen} alt="Vista previa" width={80} height={80} className="rounded-xl shadow-lg border border-gray-300" />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <input type="file" accept="image/*" onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setForm(f => ({ ...f, imagen: reader.result as string }));
                                            setFormErrors(errors => ({ ...errors, imagen: "" }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }} className={`border-2 border-purple-400 bg-white/80 p-3 rounded-xl w-full text-gray-800 font-semibold shadow focus:ring-2 focus:ring-purple-500`} />
                                <span className="text-xs text-gray-500 mt-1">Puedes subir una imagen o pegar la URL</span>
                            </div>
                            <div className="flex flex-col gap-1 col-span-1 lg:col-span-5">
                                <textarea name="descripcion" placeholder="Descripción" value={form.descripcion || ""} onChange={e => {
                                    setForm({ ...form, descripcion: e.target.value });
                                    setFormErrors(errors => ({ ...errors, descripcion: e.target.value === '' ? 'La descripción es obligatoria' : '' }));
                                }} className={`border-2 border-pink-400 bg-white/80 p-3 rounded-xl w-full text-gray-800 font-semibold shadow focus:ring-2 focus:ring-pink-500 ${formErrors.descripcion ? 'border-red-500' : ''}`} required />
                                {formErrors.descripcion && <span className="text-red-500 text-xs font-bold mt-1">{formErrors.descripcion}</span>}
                                <span className="text-xs text-gray-500 mt-1">Describe el producto brevemente</span>
                                {form.descripcion && (
                                    <div className="mt-3 p-3 rounded-xl bg-white/60 border border-pink-300 text-gray-800 shadow">
                                        <span className="text-xs font-bold text-pink-500">Vista previa:</span>
                                        <div className="mt-1 text-sm whitespace-pre-line">{form.descripcion}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-6 mt-6 justify-center">
                            <button type="submit" className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-3 rounded-2xl shadow-xl font-bold text-lg hover:scale-105 transition-all duration-200">
                                {editId ? "Actualizar" : "Agregar"}
                            </button>
                            {editId && (
                                <button type="button" onClick={() => { setForm({}); setEditId(null); }} className="px-8 py-3 rounded-2xl bg-gray-400/80 text-white font-bold hover:bg-gray-500/90 transition-all duration-200">Cancelar</button>
                            )}
                        </div>
                    </form>
                    {/* Listado de productos por tab */}
                    <div className="space-y-10 mb-12">
                        <h3 className="text-3xl font-bold mb-8 text-white bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 bg-clip-text text-transparent text-center">{tab}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                            {productos.filter(p => p.categoria === tab).map(producto => (
                                <div key={producto.id} className={`rounded-2xl p-5 flex flex-col items-center shadow-xl hover:scale-[1.04] transition-transform border relative animate-fade-in ${producto.agotado ? 'bg-white border-gray-400 opacity-80' : 'bg-zinc-800 border-blue-500/20'}`} style={{minWidth:'180px',maxWidth:'340px',width:'100%'}}>
                                    {/* Indicador de descuento */}
                                    {producto.descuento && producto.descuento > 0 && (
                                        <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-3 py-1 rounded-xl shadow-lg animate-pulse text-xs z-10">
                                            ¡{producto.descuento}% OFF!
                                        </div>
                                    )}
                                    {/* Indicador de agotado */}
                                    {producto.agotado && (
                                        <div className="absolute top-2 right-2 bg-gray-900 text-white font-bold px-3 py-1 rounded-xl shadow-lg animate-fade-in text-xs z-10 border border-gray-400">
                                            <span className="text-white">AGOTADO</span>
                                        </div>
                                    )}
                                    {producto.imagen && (
                                        <div className="w-full h-40 mb-3 relative rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-800 to-black border border-gray-700 shadow-md">
                                            <Image src={producto.imagen} alt={producto.nombre} fill sizes="100vw" style={{objectFit: 'cover'}} className="rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl" />
                                        </div>
                                    )}
                                    <h3 className={`text-base font-bold mb-1 text-center drop-shadow ${producto.agotado ? 'text-gray-500' : 'text-white'}`}>{producto.nombre}</h3>
                                    <p className={`text-xs mb-1 text-center ${producto.agotado ? 'text-gray-400' : 'text-gray-400'}`}>{producto.descripcion || 'Sin descripción'}</p>
                                    {/* Precio con animación */}
                                    <div className="w-full flex flex-col items-center justify-center mb-2">
                                        {producto.descuento && producto.descuento > 0 ? (
                                            <>
                                                <span className="text-xs font-bold text-gray-400 line-through">S/ {producto.precio?.toFixed(2)}</span>
                                                <span className={`text-lg font-bold animate-bounce ${producto.agotado ? 'text-gray-400' : 'text-yellow-300'}`}>S/ {(producto.precio * (1 - producto.descuento / 100)).toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className={`text-lg font-bold ${producto.agotado ? 'text-gray-400' : 'text-yellow-300'}`}>S/ {producto.precio}</span>
                                        )}
                                    </div>
                                    <div className="flex gap-3 mt-3 w-full justify-center">
                                        <button onClick={() => handleEdit(producto)} className={"bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-bold shadow hover:scale-105 transition-all duration-200"}>Editar</button>
                                        <button onClick={() => handleDelete(producto.id)} className={`bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-bold shadow hover:scale-105 transition-all duration-200 ${producto.agotado ? 'opacity-60 pointer-events-none' : ''}`}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </main>
                </div>
            </section>
        );
    }
}
