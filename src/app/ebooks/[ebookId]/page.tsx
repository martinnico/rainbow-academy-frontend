"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  LockKeyhole,
} from "lucide-react";
import { ebooksData } from "@/services/ebookCatalog";
import { questionsForChapter } from "@/services/ebookQuestionService";

export default function EbookReaderPage() {
  const { ebookId } = useParams<{ ebookId: string }>();
  const ebook = ebooksData.find((item) => item.id === ebookId) ?? ebooksData[0];
  const [chapterIndex, setChapterIndex] = useState(0);
  const chapter = ebook.chapters[chapterIndex] ?? ebook.chapters[0];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isChecked, setIsChecked] = useState(false);

  const questions = questionsForChapter(
    ebook.id,
    chapter.id,
    chapter.questions,
  );

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.correctIndex ? 1 : 0),
    0,
  );

  const selectChapter = (index: number) => {
    setChapterIndex(index);
    setAnswers({});
    setIsChecked(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 80% 10%, ${ebook.color}25, transparent 32%), radial-gradient(circle at 10% 80%, #7aaee820, transparent 28%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <Link
            href="/ebooks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-stone-800"
          >
            <ArrowLeft className="size-4" /> Volver a ebooks
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr] lg:items-center">
            <div
              className="flex aspect-[4/5] items-center justify-center rounded-[2rem] shadow-sm"
              style={{
                background: `linear-gradient(145deg, ${ebook.color}, #ffffff)`,
              }}
            >
              <div className="text-center">
                <BookOpen
                  className="mx-auto size-16 text-white/90"
                  strokeWidth={1.4}
                />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Rainbow Academy
                </p>
                <p
                  className="mt-2 text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {ebook.level}
                </p>
              </div>
            </div>
            <div>
              <span
                className="inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]"
                style={{ background: ebook.bgLight, color: ebook.textColor }}
              >
                {ebook.tag} · Lectura
              </span>
              <h1
                className="mt-5 text-4xl leading-tight text-stone-900 md:text-5xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {ebook.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                {ebook.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-stone-500">
                <span className="rounded-xl bg-stone-100 px-3 py-2">
                  {ebook.chapters.length} capítulos
                </span>
                <span className="rounded-xl bg-stone-100 px-3 py-2">
                  {ebook.pages} páginas
                </span>
                <span className="rounded-xl bg-stone-100 px-3 py-2">
                  Preguntas por capítulo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pt-10 md:px-12 lg:grid-cols-[245px_1fr]">
        <aside className="h-fit rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
            Contenido
          </p>
          <div className="mt-3 space-y-1">
            {ebook.chapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectChapter(index)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${index === chapterIndex ? "bg-stone-800 text-white" : "text-stone-600 hover:bg-stone-50"}`}
              >
                <span
                  className={`mt-0.5 text-xs font-bold ${index === chapterIndex ? "text-[#e8d87a]" : "text-stone-400"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-5">
                  {item.title.replace(/^Chapter \d+: /, "")}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <article className="min-w-0">
          <div className="rounded-[1.75rem] border border-stone-200 bg-white px-6 py-8 shadow-sm md:px-12 md:py-12">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                  Capítulo {chapterIndex + 1} de {ebook.chapters.length}
                </p>
                <h2
                  className="mt-2 text-2xl font-semibold text-stone-900 md:text-3xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {chapter.title}
                </h2>
              </div>
              <BookOpen className="hidden size-7 text-stone-300 sm:block" />
            </div>
            <div className="max-w-3xl space-y-4 text-[15px] leading-7 text-stone-600">
              {renderContent(chapter.content)}
            </div>
          </div>

          <section className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm md:p-10">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8d87a]/30 text-[#927f1c]">
                <CircleHelp className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                  Comprensión lectora
                </p>
                <h2
                  className="mt-2 text-2xl font-semibold text-stone-800"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ¿Cuánto recordás?
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Respondé las preguntas sobre este capítulo y comprobá tu
                  avance.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-7">
              {questions.map((question, index) => (
                <div
                  key={`${question.question}-${index}`}
                  className="border-b border-stone-100 pb-7 last:border-0 last:pb-0"
                >
                  <p className="font-semibold leading-6 text-stone-800">
                    <span className="mr-2 text-[#7aaee8]">{index + 1}.</span>
                    {question.question}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = answers[index] === optionIndex;
                      const isCorrect =
                        isChecked && optionIndex === question.correctIndex;
                      const isWrong = isChecked && isSelected && !isCorrect;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setAnswers((current) => ({
                              ...current,
                              [index]: optionIndex,
                            }))
                          }
                          className={`rounded-xl border px-4 py-3 text-left text-sm transition ${isCorrect ? "border-[#8dc87a] bg-[#eaf5e5] text-[#3b6d11]" : isWrong ? "border-[#e8847a] bg-[#fce9e6] text-[#ad4237]" : isSelected ? "border-[#7aaee8] bg-[#e6f1fb] text-[#185fa5]" : "border-stone-200 text-stone-600 hover:border-[#7aaee8] hover:bg-[#f8fbfe]"}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-stone-100 pt-6 sm:flex-row sm:items-center">
              {isChecked ? (
                <p className="text-sm font-semibold text-stone-700">
                  Obtuviste {score} de {questions.length} respuestas correctas.
                </p>
              ) : (
                <p className="flex items-center gap-2 text-xs text-stone-400">
                  <LockKeyhole className="size-3.5" /> Tus respuestas se
                  corrigen al enviar.
                </p>
              )}
              <button
                type="button"
                disabled={questions.some(
                  (_, index) => answers[index] === undefined,
                )}
                onClick={() => setIsChecked(true)}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-stone-800 px-5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Check className="size-4" /> Comprobar respuestas
              </button>
            </div>
          </section>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={chapterIndex === 0}
              onClick={() => selectChapter(chapterIndex - 1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-stone-800 disabled:invisible"
            >
              <ArrowLeft className="size-4" /> Capítulo anterior
            </button>
            <button
              type="button"
              disabled={chapterIndex === ebook.chapters.length - 1}
              onClick={() => selectChapter(chapterIndex + 1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition hover:text-stone-900 disabled:invisible"
            >
              Siguiente capítulo <ArrowRight className="size-4" />
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}

function renderContent(content: string): ReactNode[] {
  return content.split("\n").map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) return <div key={index} className="h-1" />;
    if (trimmedLine.startsWith("# "))
      return (
        <h3
          key={index}
          className="text-3xl text-stone-900"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {trimmedLine.slice(2)}
        </h3>
      );
    if (trimmedLine.startsWith("## "))
      return (
        <h4 key={index} className="pt-4 text-xl font-semibold text-stone-800">
          {trimmedLine.slice(3)}
        </h4>
      );
    if (trimmedLine.startsWith("|---")) return null;
    if (trimmedLine.startsWith("|"))
      return (
        <div
          key={index}
          className="grid grid-cols-2 gap-3 rounded-lg bg-stone-50 px-4 py-2 text-sm"
        >
          <span>{trimmedLine.split("|")[1]?.trim()}</span>
          <span>{trimmedLine.split("|")[2]?.trim()}</span>
        </div>
      );
    if (trimmedLine.startsWith("- "))
      return (
        <p
          key={index}
          className="pl-5 before:mr-2 before:text-[#e8847a] before:content-['•']"
        >
          {trimmedLine.slice(2)}
        </p>
      );
    if (trimmedLine.startsWith("> "))
      return (
        <blockquote
          key={index}
          className="border-l-4 border-[#e8d87a] bg-[#fffbea] px-5 py-3 italic text-stone-600"
        >
          {trimmedLine.slice(2)}
        </blockquote>
      );

    return <p key={index}>{trimmedLine}</p>;
  });
}
