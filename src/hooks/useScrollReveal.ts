import { useEffect } from "react";

export default function useScrollReveal(selector = ".reveal", options = {}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = document.querySelectorAll(selector);
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, options]);
}
