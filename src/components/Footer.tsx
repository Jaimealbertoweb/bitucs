import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cream-dark bg-brown text-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-pink">BITUCS</p>
            <p className="text-sm text-cream-dark">Lo bonito de volver a casa.</p>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-pink transition-colors">
              Inicio
            </Link>
            <Link href="/disenos" className="hover:text-pink transition-colors">
              Diseños
            </Link>
            <Link href="/configurador" className="hover:text-pink transition-colors">
              Diseña el tuyo
            </Link>
            <Link href="/contacto" className="hover:text-pink transition-colors">
              Contacto
            </Link>
          </nav>
        </div>
        <div className="mt-6 pt-4 border-t border-brown-light text-center text-xs text-cream-dark">
          &copy; 2026 BITUCS - Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
