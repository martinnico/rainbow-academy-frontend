import Link from "next/link";

const levels = [
  {
    id: "beginner",
    label: "Beginner",
    color: "#8DC87A",
    bgLight: "#EAF5E5",
    textColor: "#3B6D11",
    title: "Primeros pasos",
    desc: "Vocabulario esencial, pronunciación y estructuras básicas...",
    modules: ["Saludos", "Presente", "Vocabulario"],
    price: "$2.500",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    color: "#7AAEE8",
    bgLight: "#E6F1FB",
    textColor: "#185FA5",
    title: "Tomando vuelo",
    desc: "Tiempos verbales complejos, conversación fluida...",
    modules: ["Past & Future", "Reading", "Expresión"],
    price: "$3.000",
  },
  {
    id: "advanced",
    label: "Advanced",
    color: "#9B7AE8",
    bgLight: "#EEEDFE",
    textColor: "#534AB7",
    title: "Fluidez total",
    desc: "Inglés académico y profesional, escritura avanzada...",
    modules: ["Business English", "Escritura", "Certificaciones"],
    price: "$3.500",
  },
];

const ebookProducts = [
  {
    id: "ebook-a1",
    title: "Ebook A1 - Fundamentos",
    tag: "Beginner",
    price: "$9.990",
    href: "/ebooks/a1",
  },
  {
    id: "ebook-a2",
    title: "Ebook A2 - Conversacion",
    tag: "Beginner",
    price: "$11.990",
    href: "/ebooks/a2",
  },
  {
    id: "ebook-b1",
    title: "Ebook B1 - Progreso",
    tag: "Intermediate",
    price: "$13.990",
    href: "/ebooks/b1",
  },
  {
    id: "ebook-b2",
    title: "Ebook B2 - Dominio",
    tag: "Intermediate",
    price: "$15.990",
    href: "/ebooks/b2",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Principal (Oscuro) */}
      {/*  <section className="relative overflow-hidden min-h-130 bg-[#1a1a2e] text-white px-8 md:px-16 py-16 flex items-center">
        {/* ... (SVG de arcos y círculos de tu código original aquí) ... */}
      {/*<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto">
          <div>
            {/* ... (Tu texto de 'Aprendé inglés...' original aquí) ... */}
      {/*} <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Aprendé inglés
              <br /> a tu <span style={{ color: "#7AAEE8" }}>ritmo</span>,<br />{" "}
              a tu nivel
            </h1>
            <p className="text-sm text-white/60 mb-7 max-w-sm">
              Clases online con metodología progresiva — videos, actividades
              interactivas y exámenes personalizados
            </p>
            <div className="flex gap-3">
              <Link
                href="/register"
                className="bg-white text-[#1a1a2e] text-sm font-medium px-7 py-3 rounded-full"
              >
                Empezar ahora
              </Link>
              <Link
                href="/test"
                className="text-white border border-white/30 text-sm px-7 py-3 rounded-full"
              >
                Test gratis
              </Link>
            </div>
          </div>
          <div className="text-9xl text-center opacity-30">🚀</div>{" "}
          {/* Mock de burbujas */}
      {/*</div>
      </section>*/}

      {/* Stats (Piedra) */}
      {/*<section className="bg-stone-800 text-white">
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
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {stat.num}
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>*/}

      {/* ========================================= */}
      {/* NUEVO HERO DE EBOOKS (FONDO CLARO) */}
      {/* ========================================= */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto Izquierda */}
          <div className="relative z-10">
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight text-stone-900 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Ebooks: Tu compañero
              <br />
              de aprendizaje
            </h2>

            <p className="text-base text-stone-600 mb-10 max-w-lg leading-relaxed">
              Descarga nuestros materiales complementarios para cada nivel.
              Gramática, vocabulario y práctica adicional, todo en formato
              digital para que estudies donde quieras.
            </p>

            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-stone-700 transition-colors"
            >
              Ver todos los Ebooks
              <span>→</span>
            </Link>
          </div>

          {/* Ilustración Derecha */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-4/3 flex items-center justify-center">
              {/* Ilustración de Libro con Arcoíris */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Arcoíris */}
                <div
                  className="absolute bottom-[35%] right-[-10%] w-[120%] h-[120%] rounded-full opacity-70 blur-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, #9B7AE8 0%, #7AAEE8 15%, #8DC87A 30%, #E8D87A 45%, #E8A87A 60%, #E8847A 75%, transparent 90%)",
                    transform: "rotate(-15deg)",
                  }}
                />

                {/* Libro Abierto (Simulado con Emojis/Símbolos, reemplázalo por tu SVG real) */}
                <div className="relative text-[160px] md:text-[200px] leading-none select-none">
                  📖
                  <span className="absolute top-[20%] right-[15%] text-6xl transform rotate-12">
                    🌈
                  </span>
                </div>

                {/* Efecto de destellos */}
                <div className="absolute top-[30%] right-[10%] text-2xl animate-pulse">
                  ✨
                </div>
                <div className="absolute top-[50%] right-[25%] text-xl animate-pulse delay-100">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-widest text-stone-400">
              Ebooks destacados
            </p>
            <p className="text-sm text-stone-500">
              Compra y descarga al instante
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ebookProducts.map((ebook) => (
              <div
                key={ebook.id}
                className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="h-40 rounded-xl mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(155,122,232,0.18), rgba(122,174,232,0.18), rgba(141,200,122,0.18))",
                  }}
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                    {ebook.tag}
                  </span>
                  <span className="text-sm font-semibold text-stone-800">
                    {ebook.price}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 mb-3">
                  {ebook.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    PDF + ejercicios
                  </span>
                  <Link
                    href={ebook.href}
                    className="text-sm font-semibold text-stone-900 hover:text-stone-700"
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ========================================= */}

      {/* Niveles (Blanco) */}
      {/*<section className="bg-stone-50 py-20 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
            Recorrido de aprendizaje
          </p>
          <h3
            className="text-3xl font-bold text-stone-800 mb-10"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Tres niveles, un camino
          </h3>
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
                <h4
                  className="text-xl font-bold text-stone-800 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {level.title}
                </h4>
                <p className="text-sm text-stone-500 mb-5">{level.desc}</p>
                {/* ... (Lista de módulos y precio de tu código original aquí) ... */}
      {/*</div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* ... (Resto de secciones de Actividades y CTA final aquí) ... */}
    </>
  );
}
