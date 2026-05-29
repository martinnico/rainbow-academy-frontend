import { NavBar } from "@/components";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const levels = [
  {
    id: "beginner",
    label: "Beginner",
    color: "#8DC87A",
    bgLight: "#EAF5E5",
    textColor: "#3B6D11",
    title: "Primeros pasos",
    desc: "Vocabulario esencial, pronunciación y estructuras básicas para comunicarte con confianza desde el día uno.",
    modules: [
      "Saludos y presentaciones",
      "Presente simple",
      "Vocabulario cotidiano",
    ],
    price: "$2.500",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    color: "#7AAEE8",
    bgLight: "#E6F1FB",
    textColor: "#185FA5",
    title: "Tomando vuelo",
    desc: "Tiempos verbales complejos, conversación fluida y comprensión auditiva para situaciones del mundo real.",
    modules: ["Past & future tenses", "Reading comprensivo", "Expresión oral"],
    price: "$3.000",
  },
  {
    id: "advanced",
    label: "Advanced",
    color: "#9B7AE8",
    bgLight: "#EEEDFE",
    textColor: "#534AB7",
    title: "Fluidez total",
    desc: "Inglés académico y profesional, escritura avanzada y preparación para certificaciones internacionales.",
    modules: [
      "Business English",
      "Escritura académica",
      "Prep. certificaciones",
    ],
    price: "$3.500",
  },
];

const activities = [
  {
    icon: "🎬",
    name: "Clases en video",
    desc: "Contenido exclusivo y protegido",
  },
  {
    icon: "🔤",
    name: "Sopa de letras",
    desc: "Vocabulario temático por módulo",
  },
  { icon: "❓", name: "Quiz interactivo", desc: "Corrección inmediata" },
  { icon: "🃏", name: "Flashcards", desc: "Memorización espaciada" },
];

const vocabBubbles = [
  {
    word: "Hello",
    translation: "Hola — Beginner · Módulo 1",
    color: "#E8847A",
    progress: 100,
    locked: false,
  },
  {
    word: "Commute",
    translation: "Viaje al trabajo — Intermediate · Módulo 3",
    color: "#8DC87A",
    progress: 60,
    locked: false,
  },
  {
    word: "Endeavour",
    translation: "Esfuerzo — Advanced · Módulo 1",
    color: "#7AAEE8",
    progress: 20,
    locked: false,
  },
  {
    word: "Serendipity",
    translation: "🔒 Bloqueado · Completá Intermediate",
    color: "#9B7AE8",
    progress: 0,
    locked: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — fondo oscuro, ancho completo */}
      <section
        className="relative overflow-hidden min-h-130 px-8 md:px-16 py-16"
        style={{ background: "#1a1a2e" }}
      >
        {/* Arcos decorativos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 900 520"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="750"
              cy="520"
              rx="420"
              ry="320"
              fill="none"
              stroke="#E8847A"
              strokeWidth="60"
              opacity="0.06"
            />
            <ellipse
              cx="750"
              cy="520"
              rx="320"
              ry="240"
              fill="none"
              stroke="#E8A87A"
              strokeWidth="50"
              opacity="0.07"
            />
            <ellipse
              cx="750"
              cy="520"
              rx="220"
              ry="160"
              fill="none"
              stroke="#E8D87A"
              strokeWidth="40"
              opacity="0.07"
            />
            <ellipse
              cx="750"
              cy="520"
              rx="140"
              ry="100"
              fill="none"
              stroke="#8DC87A"
              strokeWidth="30"
              opacity="0.08"
            />
            <ellipse
              cx="750"
              cy="520"
              rx="75"
              ry="52"
              fill="none"
              stroke="#7AAEE8"
              strokeWidth="22"
              opacity="0.10"
            />
            <ellipse
              cx="750"
              cy="520"
              rx="28"
              ry="18"
              fill="#9B7AE8"
              opacity="0.18"
            />
            {/*<circle cx="80" cy="60" r="3" fill="#E8847A" opacity="0.4" />
            <circle cx="140" cy="30" r="2" fill="#8DC87A" opacity="0.4" />
            <circle cx="200" cy="80" r="4" fill="#7AAEE8" opacity="0.3" />
            <circle cx="50" cy="140" r="2.5" fill="#E8D87A" opacity="0.4" />
            <circle cx="320" cy="20" r="3" fill="#E8A87A" opacity="0.35" />
            <circle cx="260" cy="55" r="2" fill="#9B7AE8" opacity="0.4" />*/}
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-7xl mx-auto">
          {/* Badge flotante */}
          {/*<div
            className="absolute top-6 right-6 z-10 text-center rounded-xl px-4 py-2 text-xs hidden md:block"
            style={{
              background: "rgba(138,180,248,0.15)",
              border: "1px solid rgba(138,180,248,0.25)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <strong
              className="block text-xl font-bold"
              style={{ color: "#7AAEE8", fontFamily: "var(--font-playfair)" }}
            >
              +100
            </strong>
            alumnos activos
          </div>*/}

          {/* Texto izquierda */}
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest mb-5"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              🇬🇧 English · Inglés · Anglais
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Aprendé inglés
              <br />a tu{" "}
              <em className="not-italic" style={{ color: "#7AAEE8" }}>
                ritmo
              </em>
              <br />y a tu nivel
            </h1>

            <p
              className="text-sm leading-relaxed mb-7 max-w-sm"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Clases online con metodología progresiva — videos, actividades
              interactivas y exámenes en linea.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/register"
                className="text-sm font-medium px-7 py-3 rounded-full transition-opacity hover:opacity-90"
                style={{ background: "#fff", color: "#1a1a2e" }}
              >
                Empezar ahora
              </Link>
              <Link
                href="/level-test"
                className="text-sm px-7 py-3 rounded-full transition-colors hover:border-white"
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                }}
              >
                Test de nivel gratis
              </Link>
            </div>
          </div>

          {/* Burbujas de vocabulario */}
          <div className="flex flex-col gap-3">
            {vocabBubbles.map((item) => (
              <div
                key={item.word}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  opacity: item.locked ? 0.4 : 1,
                }}
              >
                <p
                  className="text-lg font-bold mb-0.5"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: item.color,
                  }}
                >
                  {item.word}
                </p>
                <p
                  className="text-xs mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {item.translation}
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 h-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.progress}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "3", label: "Niveles" },
            { num: "+100", label: "Alumnos" },
            { num: "1", label: "Profesora" },
            { num: "100%", label: "Online" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.num}
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Niveles */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
          Recorrido de aprendizaje
        </p>
        <h2
          className="text-3xl font-bold text-stone-800 mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tres niveles, un camino
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: level.color }}
              />
              <span
                className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                style={{ background: level.bgLight, color: level.textColor }}
              >
                {level.label}
              </span>
              <h3
                className="text-xl font-bold text-stone-800 mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {level.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-5">
                {level.desc}
              </p>
              <ul className="space-y-2 mb-6">
                {level.modules.map((mod) => (
                  <li
                    key={mod}
                    className="flex items-center gap-2 text-sm text-stone-700"
                  >
                    <span style={{ color: level.color }}>✓</span>
                    {mod}
                  </li>
                ))}
              </ul>
              <p
                className="text-2xl font-bold text-stone-800"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {level.price}{" "}
                <span className="text-sm font-normal text-stone-400">
                  / nivel
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Actividades */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
            Actividades
          </p>
          <h2
            className="text-3xl font-bold text-stone-800 mb-10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Aprender jugando
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activities.map((act) => (
              <div
                key={act.name}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{act.icon}</div>
                <p className="text-sm font-medium text-stone-800">{act.name}</p>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-7xl mx-auto px-6 py-10 pb-20">
        <div
          className="rounded-3xl p-12 text-center text-white"
          style={{ background: "#1a1a2e" }}
        >
          <div
            className="h-1 w-16 mx-auto mb-8 rounded-full"
            style={{
              background:
                "linear-gradient(to right, #E8847A, #E8A87A, #E8D87A, #8DC87A, #7AAEE8, #9B7AE8)",
            }}
          />
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ¿Listo para empezar?
          </h2>
          <p
            className="text-sm mb-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Hacé el test de nivel gratuito y te asignamos el curso ideal
          </p>
          <Link
            href="/level-test"
            className="inline-block bg-white text-stone-800 px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Hacer el test ahora
          </Link>
        </div>
      </section>
    </>
  );
}
