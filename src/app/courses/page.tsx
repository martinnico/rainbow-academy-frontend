"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  courses as coursesApi,
  createPaymentPreference,
  subscriptions as subscriptionsApi,
} from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { CourseResponseDTO, SubscriptionResponseDTO } from "@/types/api";

const gradients = [
  "linear-gradient(135deg, rgba(232,132,122,0.32), rgba(232,168,122,0.22), rgba(232,216,122,0.18))",
  "linear-gradient(135deg, rgba(122,174,232,0.28), rgba(155,122,232,0.18), rgba(141,200,122,0.2))",
  "linear-gradient(135deg, rgba(141,200,122,0.28), rgba(122,174,232,0.2), rgba(232,216,122,0.2))",
  "linear-gradient(135deg, rgba(155,122,232,0.28), rgba(122,174,232,0.2), rgba(232,132,122,0.18))",
];
type CourseFilter = "ALL" | CourseResponseDTO["level"];

export default function CoursesPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [courseList, setCourseList] = useState<CourseResponseDTO[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyCourseId, setBusyCourseId] = useState<number | null>(null);
  const [busyPlan, setBusyPlan] = useState<"MEMBERSHIP_MONTHLY" | "MEMBERSHIP_ANNUAL" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<CourseFilter>("ALL");

  useEffect(() => {
    coursesApi
      .getCourses()
      .then(setCourseList)
      .catch(() => setMessage("No pudimos cargar los cursos. Intentá nuevamente."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user || isAuthLoading) return;
    subscriptionsApi
      .getStudentSubscriptions(user.id)
      .then(setSubscriptions)
      .catch(() => setMessage("No pudimos consultar tus suscripciones."));
  }, [user, isAuthLoading]);

  const subscribe = async (course: CourseResponseDTO) => {
    if (!user) {
      setMessage("Iniciá sesión para suscribirte a un curso.");
      return;
    }

    setBusyCourseId(course.id);
    setMessage(null);
    try {
      const response = await createPaymentPreference({
        itemType: "COURSE",
        itemId: course.id,
        studentId: user.id,
      });
      window.location.assign(response.initPoint);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No pudimos crear la suscripción.");
    } finally {
      setBusyCourseId(null);
    }
  };

  const subscribeMembership = async (
    itemType: "MEMBERSHIP_MONTHLY" | "MEMBERSHIP_ANNUAL",
  ) => {
    if (!user) {
      setMessage("Iniciá sesión para suscribirte al Rainbow Pass.");
      return;
    }
    setBusyPlan(itemType);
    setMessage(null);
    try {
      const response = await createPaymentPreference({
        itemType,
        itemId: 0,
        studentId: user.id,
      });
      window.location.assign(response.initPoint);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No pudimos crear tu membresía.");
    } finally {
      setBusyPlan(null);
    }
  };

  const hasActiveSubscription = (courseId: number) =>
    subscriptions.some(
      (subscription) =>
        subscription.courseId === courseId && subscription.status === "ACTIVE",
    );
  const visibleCourses =
    levelFilter === "ALL"
      ? courseList
      : courseList.filter((course) => course.level === levelFilter);

  return (
    <main className="bg-stone-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 right-[-10%] h-80 w-[60%] rounded-full blur-3xl opacity-70" style={{ background: "radial-gradient(circle at 60% 40%, rgba(155,122,232,0.35), rgba(122,174,232,0.25), rgba(141,200,122,0.18), transparent 70%)" }} />
          <div className="absolute bottom-0 left-[-15%] h-72 w-[55%] rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(circle at 40% 40%, rgba(232,132,122,0.32), rgba(232,168,122,0.22), rgba(232,216,122,0.2), transparent 70%)" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
          <p className="text-xs uppercase tracking-widest text-stone-500">Rainbow Academy</p>
          <h1 className="mt-3 text-4xl font-bold text-stone-900 md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Cursos que se adaptan a tu ritmo
          </h1>
          <p className="mt-4 max-w-2xl text-base text-stone-600 md:text-lg">
            Explorá nuestros programas online con clases en vivo, contenido interactivo y seguimiento personalizado.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 rounded-[2rem] border border-purple-100 bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 p-6 shadow-md md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-500">🌈 Rainbow Pass</p>
            <h2 className="mt-2 text-3xl font-bold text-stone-900 md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Membresía All-Access (Estilo Coursera)
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-stone-600">Elegí libertad total: todos los cursos y niveles durante el tiempo que prefieras.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {([
                ["MEMBERSHIP_MONTHLY", "Membresía Mensual All-Access", "$35.000 / mes", "Acceso ilimitado durante 30 días.", "Suscribirme al Pase Mensual", "from-pink-100 to-amber-50"],
                ["MEMBERSHIP_ANNUAL", "Membresía Anual All-Access", "$350.000 / año", "Acceso ilimitado durante 12 meses.", "Suscribirme al Pase Anual", "from-sky-100 to-purple-100"],
              ] as const).map(([type, title, price, description, label, gradient]) => (
                <article key={type} className={`rounded-3xl border border-white/80 bg-gradient-to-br ${gradient} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
                  {type === "MEMBERSHIP_ANNUAL" && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">🔥 Ahorrá 2 meses</span>}
                  <h3 className="mt-4 text-xl font-bold text-stone-800">{title}</h3>
                  <p className="mt-2 text-2xl font-bold text-stone-900">{price}</p>
                  <p className="mt-2 text-sm text-stone-600">{description}</p>
                  <button type="button" disabled={busyPlan === type} onClick={() => void subscribeMembership(type)} className="mt-5 rounded-full bg-stone-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-700 disabled:opacity-60">
                    {busyPlan === type ? "Procesando..." : label}
                  </button>
                </article>
              ))}
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400">Cursos disponibles</p>
              <h2 className="mt-2 text-3xl font-bold text-stone-900 md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Elegí tu curso individual
              </h2>
            </div>
            {message && <p role="status" className="rounded-xl bg-[#fffbea] px-4 py-3 text-sm text-stone-600">{message}</p>}
          </div>

          <p className="mb-5 inline-flex rounded-xl border border-[#dce8f5] bg-[#f5f8fc] px-4 py-2 text-xs font-medium text-[#527db3]">
            💳 Pagá con Mercado Pago, Tarjeta de Débito o Crédito
          </p>
          <div className="mb-6 flex flex-wrap gap-2" aria-label="Filtrar cursos por nivel">
            {([
              ["ALL", "Todos los niveles"],
              ["BEGINNER", "Beginner / Principiante"],
              ["INTERMEDIATE", "Intermediate / Intermedio"],
              ["ADVANCED", "Advanced / Avanzado"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setLevelFilter(value)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  levelFilter === value
                    ? "border-[#7aaee8] bg-[#e6f1fb] text-[#527db3]"
                    : "border-stone-200 bg-white text-stone-500 hover:border-[#b9d8f3]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {loading ? (
            <p className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-stone-500">Cargando cursos...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course, index) => {
                const subscribed = hasActiveSubscription(course.id);
                return (
                  <div key={course.id} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative h-44" style={{ background: gradients[index % gradients.length] }}>
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-stone-600">
                        {course.level}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-stone-900">{course.title}</h3>
                      <p className="mt-2 min-h-12 text-sm text-stone-500">{course.description}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-lg font-semibold text-stone-900">${course.monthlyPrice.toLocaleString("es-AR")}</span>
                        {subscribed ? (
                          <Link href="/dashboard" className="rounded-full bg-stone-800 px-3 py-2 text-xs font-semibold text-white hover:bg-stone-700">
                            Ir al aula
                          </Link>
                        ) : (
                          <button type="button" disabled={busyCourseId === course.id} onClick={() => subscribe(course)} className="rounded-full bg-[#7aaee8] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#537da9] disabled:opacity-60">
                            {busyCourseId === course.id ? "Procesando..." : "Suscribirme"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {visibleCourses.length === 0 && (
                <p className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500 md:col-span-2 lg:col-span-3">
                  No hay cursos disponibles para este nivel.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
