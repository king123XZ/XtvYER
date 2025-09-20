// Botón flotante de WhatsApp
"use client";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!closed) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [closed]);

  if (!visible || closed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="relative">
        <a
          href="https://wa.me/51999999999?text=Hola!%20Quiero%20más%20info%20sobre%20los%20productos%20de%20Xoldyx%20Store"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center p-4 transition-all scale-100 hover:scale-110"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
          aria-label="WhatsApp Soporte"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#25D366"/>
            <path d="M23.5 17.5C22.8333 18.8333 21.5 20.5 19.5 20.5C17.5 20.5 15.5 18.5 15.5 16.5C15.5 14.5 17.5 12.5 19.5 12.5C21.5 12.5 22.8333 14.1667 23.5 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="ml-2 font-bold hidden md:inline">Soporte</span>
        </a>
        <button
          onClick={() => setClosed(true)}
          className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 transition-all border border-white/30"
          aria-label="Cerrar WhatsApp"
        >
          ×
        </button>
      </div>
    </div>
  );
}
