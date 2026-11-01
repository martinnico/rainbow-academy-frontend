"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, DoorOpen, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, isTeacher, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
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
              Reach your goals
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
        <div className="relative flex items-center gap-2">
          {user ? (
            <>
              <button type="button" onClick={() => setMenuOpen((current) => !current)} className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-gradient-to-r from-pink-50 via-purple-50 to-sky-50 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" aria-expanded={menuOpen}>
                {`Hello Again 😊 ${user.fullName}`}
                <ChevronDown className="size-4 text-purple-400" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-purple-100 bg-white p-2 shadow-xl">
                  <button type="button" onClick={() => { setMenuOpen(false); router.push(isTeacher ? "/admin" : "/dashboard"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-stone-600 transition hover:bg-purple-50">
                    <LayoutDashboard className="size-4 text-purple-400" /> Ir a mi Dashboard
                  </button>
                  <button type="button" onClick={() => { logout(); setMenuOpen(false); router.push("/"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-stone-600 transition hover:bg-pink-50">
                    <DoorOpen className="size-4 text-pink-400" /> Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 hover:text-stone-800 transition-colors" style={{ fontFamily: "var(--font-nav)" }}>Iniciar sesión</Link>
              <Link href="/register" className="text-base bg-stone-800 text-white px-3 py-1 rounded-full hover:bg-stone-700 transition-colors">Registrarse</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
