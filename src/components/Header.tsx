"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/disenos", label: "Diseños" },
  { href: "/configurador", label: "Diseña el tuyo" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-cream-dark">
      <div className="max-w-6xl mx-auto px-4 h-32 flex items-center justify-between">
        {/* Nav links - left */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-pink ${
                pathname === link.href ? "text-pink" : "text-brown"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-brown"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo - right */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="BITUCS - Lo bonito de volver a casa"
            width={320}
            height={128}
            className="h-28 w-auto mix-blend-multiply"
            priority
          />
        </Link>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-cream-dark bg-cream">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-medium border-b border-cream-dark transition-colors hover:bg-cream-dark ${
                pathname === link.href ? "text-pink" : "text-brown"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
