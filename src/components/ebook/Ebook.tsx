"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPaymentPreference, ebooks as ebooksApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { EbookResponseDTO, EbookPurchaseResponseDTO } from "@/types/api";

export default function EbookCatalog() {
  const { user } = useAuth();
  const [ebooks, setEbooks] = useState<EbookResponseDTO[]>([]);
  const [purchases, setPurchases] = useState<EbookPurchaseResponseDTO[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [busyEbookId, setBusyEbookId] = useState<number | null>(null);

  useEffect(() => {
    ebooksApi.getEbooks().then(setEbooks).catch(() => setMessage("No pudimos cargar los ebooks."));
  }, []);

  useEffect(() => {
    if (user) {
      ebooksApi.getStudentEbookPurchases(user.id).then(setPurchases).catch(() => setMessage("No pudimos consultar tus compras."));
    }
  }, [user]);

  const owned = (ebookId: number) => purchases.some((purchase) => purchase.ebookId === ebookId);

  const purchase = async (ebookId: number) => {
    if (!user) {
      setMessage("Iniciá sesión para comprar este ebook.");
      return;
    }
    setBusyEbookId(ebookId);
    setMessage(null);
    try {
      const response = await createPaymentPreference({
        itemType: "EBOOK",
        itemId: ebookId,
        studentId: user.id,
      });
      window.location.assign(response.initPoint);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No pudimos iniciar el pago.");
      setBusyEbookId(null);
    }
  };

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:px-12">
          <div className="w-full md:w-1/2">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-stone-900 md:text-5xl" style={{ fontFamily: "Playfair Display, serif" }}>
              Ebooks: Tu compañero de aprendizaje
            </h1>
            <p className="mb-10 max-w-lg text-base leading-relaxed text-stone-600">
              Materiales complementarios para cada nivel, disponibles para estudiar donde quieras.
            </p>
          </div>
          <div className="flex w-full justify-center md:w-1/2 md:justify-end">
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-md aspect-4/3 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div
                    className="absolute bottom-[35%] right-[-10%] w-[120%] h-[120%] rounded-full opacity-70 blur-3xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 70% 30%, #9B7AE8 0%, #7AAEE8 15%, #8DC87A 30%, #E8D87A 45%, #E8A87A 60%, #E8847A 75%, transparent 90%)",
                      transform: "rotate(-15deg)",
                    }}
                  />
                  <div className="relative text-[160px] md:text-[200px] leading-none select-none">
                    📖
                    <span className="absolute top-[20%] right-[15%] text-6xl transform rotate-12">
                      🌈
                    </span>
                  </div>
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
        </div>
      </section>
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-stone-400">Catálogo real</p>
            {message && <p role="status" className="rounded-xl bg-[#fffbea] px-4 py-2 text-sm text-stone-600">{message}</p>}
          </div>
          <p className="mb-5 inline-flex rounded-xl border border-[#dce8f5] bg-[#f5f8fc] px-4 py-2 text-xs font-medium text-[#527db3]">
            💳 Pagá con Mercado Pago, Tarjeta de Débito o Crédito
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ebooks.map((ebook, index) => (
              <div key={ebook.id} className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 h-40 rounded-xl" style={{ background: `linear-gradient(135deg, rgba(${index % 2 ? "232,168,122" : "155,122,232"},0.24), rgba(122,174,232,0.2), rgba(141,200,122,0.2))` }} />
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">Ebook</span>
                  <span className="text-sm font-semibold text-stone-800">${ebook.price.toLocaleString("es-AR")}</span>
                </div>
                <h2 className="mb-3 text-base font-semibold text-stone-900">{ebook.title}</h2>
                <p className="mb-4 line-clamp-3 text-sm text-stone-500">{ebook.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">{owned(ebook.id) ? "Comprado" : "PDF + ejercicios"}</span>
                  {owned(ebook.id) ? (
                    <Link href={`/ebooks/${ebook.id}`} className="text-sm font-semibold text-stone-900 hover:text-stone-700">Ver ebook</Link>
                  ) : (
                    <button type="button" onClick={() => void purchase(ebook.id)} disabled={busyEbookId === ebook.id} className="rounded-full bg-stone-800 px-3 py-2 text-xs font-semibold text-white hover:bg-stone-700 disabled:opacity-60">
                      {busyEbookId === ebook.id ? "Procesando..." : "Comprar"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
