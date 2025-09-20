export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 bg-gray-900 text-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 mt-12">
  <span>© {new Date().getFullYear()} Xoldyx Store. Todos los derechos reservados.</span>
      <div className="flex gap-4">
        <a href="#" className="hover:underline">Política de privacidad</a>
        <a href="#" className="hover:underline">Términos y condiciones</a>
      </div>
    </footer>
  );
}
