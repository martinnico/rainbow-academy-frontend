import Link from "next/link";

const courses = [
  {
    id: "course-a1",
    title: "Ingles A1 - Primeros pasos",
    level: "Beginner",
    lessons: "18 clases",
    duration: "6 semanas",
    price: "$12.900",
    href: "/courses/a1",
    gradient:
      "linear-gradient(135deg, rgba(232,132,122,0.32), rgba(232,168,122,0.22), rgba(232,216,122,0.18))",
  },
  {
    id: "course-a2",
    title: "Ingles A2 - Conversacion diaria",
    level: "Beginner",
    lessons: "20 clases",
    duration: "7 semanas",
    price: "$13.900",
    href: "/courses/a2",
    gradient:
      "linear-gradient(135deg, rgba(122,174,232,0.28), rgba(155,122,232,0.18), rgba(141,200,122,0.2))",
  },
  {
    id: "course-b1",
    title: "Ingles B1 - Fluidez real",
    level: "Intermediate",
    lessons: "24 clases",
    duration: "8 semanas",
    price: "$15.900",
    href: "/courses/b1",
    gradient:
      "linear-gradient(135deg, rgba(141,200,122,0.28), rgba(122,174,232,0.2), rgba(232,216,122,0.2))",
  },
  {
    id: "course-b2",
    title: "Ingles B2 - Dominio total",
    level: "Intermediate",
    lessons: "26 clases",
    duration: "9 semanas",
    price: "$17.900",
    href: "/courses/b2",
    gradient:
      "linear-gradient(135deg, rgba(155,122,232,0.28), rgba(122,174,232,0.2), rgba(232,132,122,0.18))",
  },
  {
    id: "course-c1",
    title: "Ingles C1 - Profesional",
    level: "Advanced",
    lessons: "30 clases",
    duration: "10 semanas",
    price: "$19.900",
    href: "/courses/c1",
    gradient:
      "linear-gradient(135deg, rgba(232,216,122,0.28), rgba(232,168,122,0.2), rgba(122,174,232,0.2))",
  },
  {
    id: "course-c2",
    title: "Ingles C2 - Experto",
    level: "Advanced",
    lessons: "32 clases",
    duration: "12 semanas",
    price: "$22.900",
    href: "/courses/c2",
    gradient:
      "linear-gradient(135deg, rgba(122,174,232,0.28), rgba(141,200,122,0.2), rgba(155,122,232,0.2))",
  },
  {
    id: "course-exam",
    title: "Preparacion IELTS",
    level: "Exam",
    lessons: "16 clases",
    duration: "6 semanas",
    price: "$18.500",
    href: "/courses/ielts",
    gradient:
      "linear-gradient(135deg, rgba(232,168,122,0.3), rgba(232,132,122,0.2), rgba(155,122,232,0.18))",
  },
  {
    id: "course-business",
    title: "Business English",
    level: "Especial",
    lessons: "14 clases",
    duration: "5 semanas",
    price: "$16.900",
    href: "/courses/business",
    gradient:
      "linear-gradient(135deg, rgba(141,200,122,0.3), rgba(232,216,122,0.2), rgba(122,174,232,0.2))",
  },
];

export default function CoursesPage() {
  return (
    <main className="bg-stone-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute -top-32 right-[-10%] h-80 w-[60%] rounded-full blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(155,122,232,0.35), rgba(122,174,232,0.25), rgba(141,200,122,0.18), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-[-15%] h-72 w-[55%] rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(232,132,122,0.32), rgba(232,168,122,0.22), rgba(232,216,122,0.2), transparent 70%)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <p className="text-xs uppercase tracking-widest text-stone-500">
            Rainbow Academy
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-stone-900 mt-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Cursos que se adaptan a tu ritmo
          </h1>
          <p className="text-base md:text-lg text-stone-600 mt-4 max-w-2xl">
            Explora nuestros programas online con clases en vivo, contenido
            interactivo y seguimiento personalizado para cada nivel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-white/80 border border-stone-200 text-stone-600">
              200+ cursos
            </span>
            <span className="text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-white/80 border border-stone-200 text-stone-600">
              Certificaciones internacionales
            </span>
            <span className="text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-white/80 border border-stone-200 text-stone-600">
              Acceso inmediato
            </span>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Cursos disponibles
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-stone-900 mt-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Elegi tu proximo desafio
              </h2>
            </div>
            <p className="text-sm text-stone-500">
              Actualizados cada semana por nuestro equipo docente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44">
                  <div
                    className="absolute inset-0"
                    style={{ background: course.gradient }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/0 to-white/0" />
                  <span className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-widest bg-white/90 text-stone-600 px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                  <button
                    className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-stone-900 text-white text-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    type="button"
                  >
                    +
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-stone-900">
                    {course.title}
                  </h3>
                  <p className="text-sm text-stone-500 mt-2">
                    {course.lessons} · {course.duration}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-stone-900">
                      {course.price}
                    </span>
                    <Link
                      href={course.href}
                      className="text-sm font-semibold text-stone-900 hover:text-stone-700"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
