"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className=" top-0 z-50 bg-white border-b border-stone-200">
      {/* Tira arcoíris */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(to right, #E8847A, #E8A87A, #E8D87A, #8DC87A, #7AAEE8, #9B7AE8)",
        }}
      />

      <nav className="max-w-7xl mx-auto px-3 py-1 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/Logo.jpg"
            alt="Rainbow Academy"
            width={200}
            height={108}
            priority
          />
          <div className="leading-tight">
            <span
              className="block text-lg font-bold bg-linear-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              MultiColor
            </span>
            <span className="block text-[11px] tracking-widest text-stone-400 uppercase">
              Knowledge
            </span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-500 hover:text-stone-800 transition-colors"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Inicio
          </Link>
          <Link
            href="/courses"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-500 hover:text-stone-800 transition-colors"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Cursos
          </Link>
          <Link
            href="/ebooks"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-500 hover:text-stone-800 transition-colors"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Ebooks
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-500 hover:text-stone-800 transition-colors"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Contacto
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 hover:text-stone-800 transition-colors"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="text-base bg-stone-800 text-white px-3 py-1 rounded-full hover:bg-stone-700 transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
}
