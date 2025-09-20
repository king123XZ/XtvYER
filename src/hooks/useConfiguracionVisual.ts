import { useEffect, useState } from "react";

export interface ConfiguracionVisual {
  imagenFondo?: string;
  videoFondo?: string;
  colorPrincipal?: string;
  fondoActivo?: "imagen" | "video" | "ninguno";
  logo?: string;
  favicon?: string;
  tituloPagina?: string;
  metaDescripcion?: string;
  metaKeywords?: string;
  openGraphImg?: string;
  themeColor?: string;
  fuente?: string;
  banner?: string;
  idioma?: string;
  enlacesRapidos?: string;
  backup?: string;
}

export function useConfiguracionVisual() {
  const [config, setConfig] = useState<ConfiguracionVisual | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchConfig() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/configuracion-visual");
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        setError("Error al cargar la configuración visual");
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  return { config, loading, error };
}
