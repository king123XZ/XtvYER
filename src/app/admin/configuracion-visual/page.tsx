
"use client";
import FormaDePagoYOferta from "./FormaDePagoYOferta";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ConfiguracionVisual() {
  const router = useRouter();
  const [imagenFondo, setImagenFondo] = useState<string>("");
  const [videoFondo, setVideoFondo] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [colorPrincipal, setColorPrincipal] = useState<string>("#ffffff");
  const [preview, setPreview] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [fondoActivo, setFondoActivo] = useState<'imagen' | 'video' | 'ninguno'>("ninguno");
  const [previewSize, setPreviewSize] = useState<'mobile' | 'tablet' | 'desktop'>("desktop");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Cargar configuración actual
  useEffect(() => {
    fetch("/api/configuracion-visual")
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data.imagenFondo) {
            setImagenFondo(data.imagenFondo);
            setPreview(data.imagenFondo);
          }
          if (data.videoFondo) {
            setVideoFondo(data.videoFondo);
            setVideoPreview(data.videoFondo);
          }
          if (data.colorPrincipal) setColorPrincipal(data.colorPrincipal);
          if (data.fondoActivo) setFondoActivo(data.fondoActivo);
          if (data.logo) {
            setLogo(data.logo);
            setLogoPreview(data.logo);
          }
        }
      });
  }, []);

  // Manejar carga de logo (fuera del useEffect)
  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      setSuccess("");
      setError("");
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.url) {
            setLogo(data.url);
            setLogoPreview(data.url);
          } else {
            setError("Error al subir el logo");
          }
        })
        .catch(() => setError("Error al subir el logo"))
        .finally(() => setLoading(false));
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenFondo(reader.result as string);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      setSuccess("");
      setError("");
      try {
        const res = await fetch("/api/upload-video", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          setVideoFondo(data.url);
          setVideoPreview(data.url);
        } else {
          setError("Error al subir el video");
        }
      } catch {
        setError("Error al subir el video");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFondo(e.target.value);
    setVideoPreview(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    // Validación: si fondoActivo es video, debe haber videoFondo válido
    if (fondoActivo === "video" && (!videoFondo || videoFondo.trim() === "")) {
      setError("Debes subir un video antes de guardar la configuración.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/configuracion-visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagenFondo, videoFondo, colorPrincipal, fondoActivo, logo })
      });
      if (!res.ok) {
        let msg = "Error al guardar la configuración";
        try {
          const data = await res.json();
          if (data && data.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }
      setSuccess("¡Configuración guardada!");
    } catch (err: any) {
      setError(err?.message || "Error al guardar la configuración");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] py-12 px-4">
  {/* Vista previa visual */}
  <div className="w-full max-w-xl mb-8">
  {/* Sección editable de métodos de pago y oferta */}
  <FormaDePagoYOferta />
        {/* Controles de tamaño de vista previa */}
        <div className="flex justify-end gap-2 mb-2">
          <button type="button" onClick={() => setPreviewSize("mobile")}
            className={`px-3 py-1 rounded-lg font-bold text-xs ${previewSize === "mobile" ? "bg-pink-500 text-white" : "bg-zinc-800 text-gray-300"}`}>Móvil</button>
          <button type="button" onClick={() => setPreviewSize("tablet")}
            className={`px-3 py-1 rounded-lg font-bold text-xs ${previewSize === "tablet" ? "bg-pink-500 text-white" : "bg-zinc-800 text-gray-300"}`}>Tablet</button>
          <button type="button" onClick={() => setPreviewSize("desktop")}
            className={`px-3 py-1 rounded-lg font-bold text-xs ${previewSize === "desktop" ? "bg-pink-500 text-white" : "bg-zinc-800 text-gray-300"}`}>Escritorio</button>
        </div>
        <div
          className="relative rounded-3xl overflow-hidden border-4 border-pink-400 shadow-2xl flex items-center justify-center mx-auto"
          style={{
            background: colorPrincipal,
            minHeight: previewSize === "mobile" ? 400 : previewSize === "tablet" ? 500 : 220,
            width: previewSize === "mobile" ? 240 : previewSize === "tablet" ? 500 : "100%",
            maxWidth: previewSize === "desktop" ? 640 : undefined,
            transition: "all .2s"
          }}
        >
          {fondoActivo === "video" && videoPreview ? (
            <video src={videoPreview} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
          ) : fondoActivo === "imagen" && preview ? (
            <Image src={preview} alt="Vista previa fondo" fill className="absolute inset-0 w-full h-full object-cover z-0" style={{objectFit:'cover'}} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-lg z-0 opacity-60">Sin fondo seleccionado</div>
          )}
          {/* Logo en la vista previa */}
          {logoPreview && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 rounded-full p-2 shadow-lg flex items-center justify-center" style={{maxWidth: 120, maxHeight: 120}}>
              <Image src={logoPreview} alt="Logo" width={100} height={100} className="object-contain max-h-24 max-w-24" />
            </div>
          )}
          <div className="relative z-10 p-4 bg-black/40 rounded-xl text-white font-bold text-center shadow-lg mt-20">
            Vista previa de la página
          </div>
        </div>
      </div>
    <div>
      <label className="block text-lg font-bold text-gray-200 mb-2">Logo de la web</label>
      <input type="file" accept="image/*" onChange={handleLogoChange} className="w-full p-3 rounded-xl bg-white/80 text-gray-800 font-semibold border-2 border-purple-400 shadow focus:ring-2 focus:ring-purple-500" />
      <span className="text-xs text-gray-400 mt-1 block">Sube el logo de la web (PNG/JPG recomendado, fondo transparente).</span>
      {logoPreview && (
        <div className="flex flex-col items-center mt-2">
          <Image src={logoPreview} alt="Logo preview" width={120} height={120} className="object-contain max-h-24 max-w-24 rounded-full border-2 border-purple-400 bg-white" />
          <button
            type="button"
            onClick={() => { setLogo(""); setLogoPreview(""); setSuccess(""); setError(""); }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all"
          >Quitar logo</button>
        </div>
      )}
    </div>
    <div>
      <label className="block text-lg font-bold text-gray-200 mb-2">¿Qué fondo quieres mostrar?</label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="fondoActivo" value="imagen" checked={fondoActivo === "imagen"} onChange={() => setFondoActivo("imagen")}/>
          <span className="text-white">Imagen</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="fondoActivo" value="video" checked={fondoActivo === "video"} onChange={() => setFondoActivo("video")}/>
          <span className="text-white">Video</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="fondoActivo" value="ninguno" checked={fondoActivo === "ninguno"} onChange={() => setFondoActivo("ninguno")}/>
          <span className="text-white">Ninguno</span>
        </label>
      </div>
    </div>
      <div className="w-full max-w-xl bg-zinc-900/90 rounded-3xl shadow-2xl border border-gray-800 p-8 flex flex-col items-center animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-6 text-white text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-xl">Configuración visual</h1>
        {success && <div className="mb-4 text-green-400 font-bold">{success}</div>}
        {error && <div className="mb-4 text-red-400 font-bold">{error}</div>}
  <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
    <div>
      <label className="block text-lg font-bold text-gray-200 mb-2">Video de fondo</label>
      <input type="file" accept="video/*" onChange={handleVideoFileChange} className="w-full p-3 rounded-xl bg-white/80 text-gray-800 font-semibold border-2 border-blue-400 shadow focus:ring-2 focus:ring-blue-500" />
      <span className="text-xs text-gray-400 mt-1 block">Sube un video mp4/webm para el fondo (opcional).</span>
      <input type="text" placeholder="o pega una URL de video (mp4/webm)" value={videoFondo.startsWith("/uploads/") ? "" : videoFondo} onChange={handleVideoUrlChange} className="w-full mt-2 p-2 rounded-xl bg-white/80 text-gray-800 border border-blue-300" />
      {videoPreview && (
        <>
          <video src={videoPreview} controls loop muted className="mt-3 rounded-xl shadow-lg border border-gray-300 w-full max-h-48 object-cover" />
          <button
            type="button"
            onClick={() => {
              setVideoFondo("");
              setVideoPreview("");
              setSuccess("");
              setError("");
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all"
          >
            Quitar video
          </button>
        </>
      )}
    </div>
    <div>
      <label className="block text-lg font-bold text-gray-200 mb-2">Imagen de fondo</label>
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-3 rounded-xl bg-white/80 text-gray-800 font-semibold border-2 border-yellow-400 shadow focus:ring-2 focus:ring-yellow-500" />
      <span className="text-xs text-gray-400 mt-1 block">Sube una imagen para el fondo de la web.</span>
      {preview && (
        <>
          <div className="relative w-full max-h-48 h-48 mb-2">
            <Image src={preview} alt="Vista previa" fill className="rounded-xl shadow-lg border border-gray-300 object-cover" style={{objectFit:'cover'}} />
          </div>
          <button
            type="button"
            onClick={() => {
              setImagenFondo("");
              setPreview("");
              setSuccess("");
              setError("");
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all"
          >
            Quitar imagen
          </button>
        </>
      )}
    </div>
    <div>
      <label className="block text-lg font-bold text-gray-200 mb-2">Color principal</label>
      <input type="color" value={colorPrincipal} onChange={e => setColorPrincipal(e.target.value)} className="w-16 h-10 rounded-lg border-2 border-pink-400 bg-white/80 shadow" />
      <span className="text-xs text-gray-400 mt-1 block">Elige el color principal de la web.</span>
    </div>
    <div className="flex gap-4 justify-center mt-6">
      <button type="submit" disabled={loading} className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-2xl shadow-xl font-bold text-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">{loading ? "Guardando..." : "Guardar cambios"}</button>
      <button type="button" onClick={() => router.back()} className="px-8 py-3 rounded-2xl bg-gray-400/80 text-white font-bold hover:bg-gray-500/90 transition-all duration-200">Cancelar</button>
    </div>
  </form>
 </div>
</section>

  );
}
