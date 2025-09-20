
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimeFloat from "@/components/AnimeFloat";
import Providers from "@/components/Providers";
import DynamicBackground from "@/components/DynamicBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PrismaClient } from "@prisma/client";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Xoldyx Store - Tienda Digital",
  description: "Xoldyx Store: Venta de cuentas streaming, métodos y cursos digitales al mejor precio.",
};

// Next.js App Router: layout.tsx es un Server Component, no puede usar hooks de cliente.
// Hacemos fetch server-side a la config visual y la pasamos como prop a los componentes client.

async function getConfiguracionVisual() {
  const prisma = new PrismaClient();
  const config = await prisma.configuracionVisual.findFirst();
  await prisma.$disconnect();
  return config;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getConfiguracionVisual();
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ background: config?.colorPrincipal || undefined }}>
        <DynamicBackground
          imagenFondo={config?.imagenFondo || undefined}
          videoFondo={config?.videoFondo || undefined}
          fondoActivo={config?.fondoActivo || undefined}
          colorPrincipal={config?.colorPrincipal || undefined}
        >
          <Providers>
            <Header config={config ? {
              ...config,
              imagenFondo: config.imagenFondo || undefined,
              videoFondo: config.videoFondo || undefined,
              colorPrincipal: config.colorPrincipal || undefined,
              fondoActivo: config.fondoActivo || undefined,
              logo: config.logo || undefined,
              favicon: config.favicon || undefined,
              tituloPagina: config.tituloPagina || undefined,
              metaDescripcion: config.metaDescripcion || undefined,
              metaKeywords: config.metaKeywords || undefined,
              openGraphImg: config.openGraphImg || undefined,
              themeColor: config.themeColor || undefined,
              fuente: config.fuente || undefined,
              banner: config.banner || undefined,
              idioma: config.idioma || undefined,
              enlacesRapidos: config.enlacesRapidos || undefined,
              backup: config.backup || undefined
            } : undefined} />
            <main>{children}</main>
            <Footer />
            <AnimeFloat />
          </Providers>
          <WhatsAppButton />
        </DynamicBackground>
      </body>
    </html>
  );
}
