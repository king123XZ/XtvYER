
"use client";

import Link from "next/link";
import Image from "next/image";
import type { ConfiguracionVisual } from "@/hooks/useConfiguracionVisual";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

  // Recibe la config visual como prop desde el layout
// Recibe la config visual como prop desde el layout
export default function Header({ config }: { config?: Partial<ConfiguracionVisual> }) {
  // const { data: session } = useSession();
  // const router = useRouter();
  // const handleAdminClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (session) {
  //     router.push("/admin");
  //   } else {
  //     router.push("/admin/login");
  //   }
  // };
    return (
      <header className="w-full bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* LOGO dinámico */}
          {config?.logo ? (
            <Image src={config.logo} alt="Logo" width={40} height={40} />
          ) : (
            <span className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-bold text-lg">X</span>
          )}
          <span className="font-bold text-xl tracking-tight">{config?.tituloPagina || "Xoldyx Store"}</span>
        </div>
        <div className="flex gap-6 items-center ml-auto text-base font-medium">
          <Link href="/">Inicio</Link>
          <Link href="#productos">Productos</Link>
          <button className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 ml-2" onClick={() => window.location.href = '/admin'}>
            Ir al Panel Admin
          </button>
        </div>
      </header>
    );
  };
//
