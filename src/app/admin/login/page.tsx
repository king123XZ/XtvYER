"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const correosAdmin = ["oroscoyerson2019@gmail.com", "angelejrv@gmail.com", "oroscoyeferson@gmail.com"];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && correosAdmin.includes(session?.user?.email || "")) {
      router.replace("/admin");
    }
  }, [status, session, router]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] relative overflow-x-hidden">
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-black/80 animate-pulse opacity-60"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 blur-2xl opacity-40 animate-gradient-x"></div>
      </div>
      <div className="relative z-10 w-full max-w-sm mx-auto">
        <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-gray-800 flex flex-col items-center animate-fade-in">
          <h1 className="text-3xl font-extrabold mb-6 text-white text-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 bg-clip-text text-transparent drop-shadow-xl animate-fade-in">Panel de administrador</h1>
          {status === "loading" && <p className="text-gray-400 text-sm mt-2 text-center">Cargando...</p>}
          {status === "unauthenticated" && (
            <>
              <form className="w-full flex flex-col gap-3 mt-2" onSubmit={handleCredentialsLogin}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Correo"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="py-3 px-4 rounded-xl bg-zinc-800 text-white border border-gray-700 focus:outline-none w-full pl-10"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 6.94A8 8 0 1110 18a8 8 0 01-7.06-11.06zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a2 2 0 110 4 2 2 0 010-4zm0 6a5 5 0 00-4.58 3h9.16A5 5 0 0010 11z"/></svg>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="py-3 px-4 rounded-xl bg-zinc-800 text-white border border-gray-700 focus:outline-none w-full pl-10"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v2a4 4 0 008 0V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2a2 2 0 01-4 0zm-2 6a6 6 0 1112 0H6z"/></svg>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl font-bold text-lg hover:scale-105 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 6.94A8 8 0 1110 18a8 8 0 01-7.06-11.06zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a2 2 0 110 4 2 2 0 010-4zm0 6a5 5 0 00-4.58 3h9.16A5 5 0 0010 11z"/></svg>
                  Iniciar sesión con correo
                </button>
                {error && (
                  <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-2xl font-bold shadow-2xl text-lg animate-fade-in transition-all duration-300 bg-gradient-to-r from-red-600 to-pink-600 text-white border-2 border-red-400" style={{ minWidth: '260px', maxWidth: '90vw' }}>{error}</div>
                )}
              </form>
            </>
          )}
          {status === "authenticated" && correosAdmin.includes(session?.user?.email || "") ? (
            <div className="text-green-400 text-center mt-4 animate-fade-in">
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido, {session?.user?.name || session?.user?.email}!</h2>
              <p className="text-lg">Acceso permitido. Puedes entrar al panel de administración.</p>
            </div>
          ) : status === "authenticated" ? (
            <div className="text-red-400 text-center mt-4 animate-fade-in">
              <h2 className="text-xl font-bold mb-2">Tu cuenta no tiene permisos de administrador.</h2>
              <p className="text-lg">Por favor, inicia sesión con una cuenta autorizada.</p>
            </div>
          ) : null}
        </div>ok
        
      </div>
    </main>
  );
}
