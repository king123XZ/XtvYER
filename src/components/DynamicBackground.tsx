"use client";
import React, { useEffect, useState } from "react";


interface Props {
  children: React.ReactNode;
  imagenFondo?: string;
  videoFondo?: string;
  fondoActivo?: "imagen" | "video" | "ninguno";
  colorPrincipal?: string;
}

export default function DynamicBackground({ children, imagenFondo, videoFondo, fondoActivo, colorPrincipal }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (colorPrincipal) {
      document.documentElement.style.setProperty("--color-principal", colorPrincipal);
    }
  }, [colorPrincipal]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {fondoActivo === "video" && videoFondo ? (
        <video
          src={videoFondo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            minHeight: "100vh",
            width: "100vw",
            objectFit: "cover",
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundColor: "#000",
          }}
          aria-hidden="true"
        />
      ) : fondoActivo === "imagen" && imagenFondo ? (
        <div
          style={{
            minHeight: "100vh",
            width: "100vw",
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundImage: `url(${imagenFondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            width: "100vw",
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundColor: colorPrincipal || "#f9fafb",
          }}
          aria-hidden="true"
        />
      )}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {children}
      </div>
    </>
  );
}
