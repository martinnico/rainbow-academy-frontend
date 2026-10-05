"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

type AuthMode = "login" | "register";

const benefits = [
  "Clases pensadas para tu ritmo",
  "Actividades interactivas y divertidas",
  "Progreso claro desde el primer día",
];

export default function AuthPanel({ mode }: { mode: AuthMode }) {
  const isRegister = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setSubmitted(false);

    window.setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 650);
  };

  return (
    <main
      className="relative flex min-h-[calc(100vh-9.5rem)] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10"
      style={{
        background:
          "radial-gradient(circle at 10% 15%, rgba(232, 216, 122, .24), transparent 25%), radial-gradient(circle at 92% 78%, rgba(122, 174, 232, .2), transparent 28%), #fbf9f4",
      }}
    >
      <div className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full border-[34px] border-[#e8847a]/10" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full border-[44px] border-[#9b7ae8]/10" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-[0_24px_80px_rgba(96,77,49,0.12)] backdrop-blur-sm lg:grid-cols-[0.92fr_1.08fr]">
        <section
          className="relative hidden overflow-hidden p-10 text-white lg:flex lg:min-h-[650px] lg:flex-col lg:justify-between xl:p-14"
          style={{
            background:
              "linear-gradient(145deg, #273247 0%, #394a60 58%, #526b75 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border-[42px] border-[#e8847a]/25" />
          <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full border-[48px] border-[#7aaee8]/20" />
          <div className="pointer-events-none absolute bottom-12 right-12 h-28 w-28 rounded-full border-[18px] border-[#e8d87a]/20" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                <Image
                  src="/images/Logo.jpg"
                  alt="Rainbow Academy"
                  width={72}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </span>
              <span>
                <strong
                  className="block text-lg leading-none text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Rainbow Academy
                </strong>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-white/60">
                  Learn in color
                </span>
              </span>
            </Link>
          </div>

          <div className="relative z-10 max-w-sm">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/80">
              <Sparkles className="size-3.5 text-[#e8d87a]" />
              Un espacio para crecer
            </div>
            <h2
              className="text-4xl leading-[1.08] text-white xl:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Tu próximo capítulo empieza con una palabra.
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
              Aprendé inglés con pequeñas metas, mucha curiosidad y una
              comunidad que celebra cada avance.
            </p>

            <div className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-white/85"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#8dc87a]/25 text-[#c8ecbb]">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-xs text-white/50">
            <BookOpen className="size-4" />
            <span>Una academia, muchos colores, tu propio camino.</span>
          </div>
        </section>

        <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-md">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-100">
                  <Image
                    src="/images/Logo.jpg"
                    alt="Rainbow Academy"
                    width={58}
                    height={34}
                    className="h-full w-auto object-contain"
                  />
                </span>
                <span className="text-base font-semibold text-stone-700">
                  Rainbow Academy
                </span>
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7aaee8]">
                {isRegister
                  ? "Tu aventura comienza acá"
                  : "Qué bueno verte de nuevo"}
              </p>
              <h1
                className="text-4xl leading-tight text-stone-800 sm:text-[2.7rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {isRegister ? "Creá tu cuenta" : "Iniciá tu sesión"}
              </h1>
              <p className="mt-3 text-sm leading-6 text-stone-500">
                {isRegister
                  ? "Guardá tu progreso y empezá a aprender inglés a tu manera."
                  : "Volvé a tus clases, actividades y palabras favoritas."}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegister && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-stone-700">
                    Nombre
                    <span className="relative block">
                      <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                      <input
                        required
                        name="firstName"
                        type="text"
                        placeholder="Tu nombre"
                        className="h-12 w-full rounded-xl border border-stone-200 bg-[#fffdfa] pl-10 pr-3 text-sm text-stone-800 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
                      />
                    </span>
                  </label>
                  <label className="space-y-2 text-sm font-medium text-stone-700">
                    Apellido
                    <input
                      required
                      name="lastName"
                      type="text"
                      placeholder="Tu apellido"
                      className="mt-2 h-12 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm text-stone-800 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
                    />
                  </label>
                </div>
              )}

              <label className="block space-y-2 text-sm font-medium text-stone-700">
                Email
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="hola@ejemplo.com"
                    className="h-12 w-full rounded-xl border border-stone-200 bg-[#fffdfa] pl-10 pr-3 text-sm text-stone-800 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
                  />
                </span>
              </label>

              <label className="block space-y-2 text-sm font-medium text-stone-700">
                Contraseña
                <span className="relative block">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                  <input
                    required
                    minLength={6}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    className="h-12 w-full rounded-xl border border-stone-200 bg-[#fffdfa] pl-10 pr-12 text-sm text-stone-800 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-400 transition hover:text-stone-700"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </span>
              </label>

              {isRegister ? (
                <label className="flex items-start gap-2 pt-1 text-xs leading-5 text-stone-500">
                  <input
                    required
                    type="checkbox"
                    className="mt-1 accent-[#7aaee8]"
                  />
                  <span>
                    Acepto los términos de uso y la política de privacidad de
                    Rainbow Academy.
                  </span>
                </label>
              ) : (
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 text-stone-500">
                    <input type="checkbox" className="accent-[#7aaee8]" />
                    Recordarme
                  </label>
                  <button
                    type="button"
                    className="font-semibold text-[#537da9] hover:text-[#3d638b]"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-stone-800 px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(39,50,71,0.16)] transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70"
              >
                {isSending
                  ? "Preparando tu espacio..."
                  : isRegister
                    ? "Crear mi cuenta"
                    : "Entrar a mi aula"}
                {!isSending && (
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              {submitted && (
                <p
                  role="status"
                  className="rounded-xl bg-[#eaf5e5] px-4 py-3 text-center text-xs font-medium text-[#3b6d11]"
                >
                  {isRegister
                    ? "¡Listo! Tu cuenta está preparada para empezar."
                    : "¡Bienvenido de nuevo! Tu aula te está esperando."}
                </p>
              )}
            </form>

            <p className="mt-7 text-center text-sm text-stone-500">
              {isRegister
                ? "¿Ya tenés una cuenta?"
                : "¿Todavía no tenés una cuenta?"}{" "}
              <Link
                href={isRegister ? "/login" : "/register"}
                className="font-semibold text-[#537da9] underline decoration-[#7aaee8]/40 underline-offset-4 hover:text-[#3d638b]"
              >
                {isRegister ? "Iniciá sesión" : "Registrate gratis"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
