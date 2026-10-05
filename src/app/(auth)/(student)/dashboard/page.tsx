"use client";

import Link from "next/link";
import { useState } from "react";

const accountData = {
  name: "Camila Fernández",
  email: "camila.fernandez@email.com",
  memberId: "RA-2048",
  status: "Cuenta activa",
  plan: "Acceso premium a cursos pagos",
  joined: "12 de marzo de 2026",
  phone: "+54 9 3764 56-5439",
  location: "Posadas, Misiones",
};

const roadmapSteps = [
  {
    step: "01",
    title: "Tu cuenta",
    description: "Revisá tus datos, estado de acceso y progreso general.",
    color: "#E8847A",
  },
  {
    step: "02",
    title: "Sopa de letras",
    description: "Encontrá palabras en inglés y marcá tu avance.",
    color: "#8DC87A",
  },
  {
    step: "03",
    title: "Quiz reactivo",
    description: "Elegí la respuesta correcta y sumá puntos en tiempo real.",
    color: "#7AAEE8",
  },
  {
    step: "04",
    title: "Cursos pagos",
    description: "Accedé a inglés básico, intermedio y avanzado.",
    color: "#9B7AE8",
  },
];

const courses = [
  {
    id: "basic",
    title: "Inglés básico",
    level: "Nivel 1",
    progress: 100,
    description:
      "Bases de pronunciación, vocabulario esencial y estructuras para comunicarte desde el primer día.",
    modules: ["Saludos", "Presente simple", "Vocabulario cotidiano"],
    color: "#8DC87A",
    badge: "Completado",
  },
  {
    id: "intermediate",
    title: "Inglés intermedio",
    level: "Nivel 2",
    progress: 72,
    description:
      "Conversación más fluida, comprensión auditiva y tiempos verbales para situaciones reales.",
    modules: ["Past tense", "Speaking", "Reading comprensivo"],
    color: "#7AAEE8",
    badge: "En progreso",
  },
  {
    id: "advanced",
    title: "Inglés avanzado",
    level: "Nivel 3",
    progress: 38,
    description:
      "Inglés académico y profesional, escritura avanzada y preparación para certificaciones.",
    modules: ["Business English", "Writing", "Certificaciones"],
    color: "#9B7AE8",
    badge: "Disponible",
  },
];

const accountStats = [
  { label: "Cursos pagos", value: "3" },
  { label: "Lecciones completadas", value: "86" },
  { label: "Progreso general", value: "70%" },
  { label: "Soporte activo", value: "24/7" },
];

const wordSearchWords = [
  { word: "HELLO", hint: "Saludo básico" },
  { word: "APPLE", hint: "Fruta" },
  { word: "GREEN", hint: "Color" },
  { word: "FRIEND", hint: "Persona cercana" },
  { word: "SCHOOL", hint: "Lugar de estudio" },
];

const wordSearchBoard = [
  ["H", "E", "L", "L", "O", "M", "A", "P"],
  ["A", "P", "P", "L", "E", "R", "T", "O"],
  ["G", "R", "E", "E", "N", "S", "U", "N"],
  ["F", "R", "I", "E", "N", "D", "Q", "X"],
  ["S", "C", "H", "O", "O", "L", "Y", "Z"],
  ["B", "R", "I", "G", "H", "T", "K", "L"],
  ["W", "O", "R", "L", "D", "J", "A", "V"],
  ["S", "M", "I", "L", "E", "N", "O", "P"],
];

const quizQuestions = [
  {
    prompt: "How do you say 'casa' in English?",
    options: ["House", "Home", "Room", "Street"],
    answer: "House",
  },
  {
    prompt: "Choose the correct sentence.",
    options: [
      "She go to school.",
      "She goes to school.",
      "She going to school.",
      "She went to school every day.",
    ],
    answer: "She goes to school.",
  },
  {
    prompt: "What is the plural of 'child'?",
    options: ["Childs", "Children", "Childes", "Childs'"],
    answer: "Children",
  },
  {
    prompt: "Translate 'buenas noches'.",
    options: ["Good night", "Good evening", "Good morning", "Good bye"],
    answer: "Good night",
  },
];

type Cell = [number, number];

export default function DashboardPage() {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [wordMessage, setWordMessage] = useState(
    "Encontrá las cinco palabras y marcá tu progreso.",
  );
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizPicked, setQuizPicked] = useState<string | null>(null);
  const [quizLocked, setQuizLocked] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState(
    "Elegí una respuesta para empezar.",
  );
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuiz = quizQuestions[quizIndex];
  const wordProgress = Math.round(
    (foundWords.length / wordSearchWords.length) * 100,
  );
  const quizProgress = Math.round((quizIndex / quizQuestions.length) * 100);

  const handleCellClick = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const alreadyFound = foundWords.some((word) => {
      const position = wordSearchWords.findIndex((item) => item.word === word);
      return position >= 0 && row === position;
    });

    if (alreadyFound) {
      return;
    }

    let nextSelection: Cell[] = [];

    if (selectedCells.length === 0) {
      nextSelection = [[row, col]];
    } else {
      const lastCell = selectedCells[selectedCells.length - 1];
      const sameRow = lastCell[0] === row;
      const sameColumn = lastCell[1] === col;
      const isAdjacent =
        (sameRow && Math.abs(lastCell[1] - col) === 1) ||
        (sameColumn && Math.abs(lastCell[0] - row) === 1);

      nextSelection = isAdjacent
        ? [...selectedCells, [row, col]]
        : [[row, col]];
    }

    setSelectedCells(nextSelection);

    const selectedWord = nextSelection
      .map(
        ([selectedRow, selectedCol]) =>
          wordSearchBoard[selectedRow][selectedCol],
      )
      .join("");
    const reversedWord = selectedWord.split("").reverse().join("");
    const match = wordSearchWords.find(
      (item) => item.word === selectedWord || item.word === reversedWord,
    );

    if (match && !foundWords.includes(match.word)) {
      setFoundWords((current) => [...current, match.word]);
      setSelectedCells([]);
      setWordMessage(`Encontraste ${match.word}. ${match.hint}.`);
      return;
    }

    if (cellKey) {
      setWordMessage(
        nextSelection.length === 1
          ? "Seguí marcando letras en la misma línea para formar una palabra."
          : "Todavía no coincide. Seguí probando o limpiá la selección.",
      );
    }
  };

  const resetWordSearch = () => {
    setFoundWords([]);
    setSelectedCells([]);
    setWordMessage("Encontrá las cinco palabras y marcá tu progreso.");
  };

  const handleQuizAnswer = (option: string) => {
    if (quizLocked || quizFinished) {
      return;
    }

    setQuizPicked(option);
    setQuizLocked(true);

    const isCorrect = option === currentQuiz.answer;

    if (isCorrect) {
      setQuizCorrect((current) => current + 1);
      setQuizFeedback(`Correct! ${currentQuiz.answer} is the right answer.`);
    } else {
      setQuizFeedback(
        `Not quite. The correct answer is ${currentQuiz.answer}.`,
      );
    }
  };

  const goToNextQuestion = () => {
    const nextIndex = quizIndex + 1;

    if (nextIndex >= quizQuestions.length) {
      setQuizFinished(true);
      setQuizFeedback("Quiz completed. You can review your score below.");
      return;
    }

    setQuizIndex(nextIndex);
    setQuizPicked(null);
    setQuizLocked(false);
    setQuizFeedback("Elegí una respuesta para continuar.");
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizPicked(null);
    setQuizLocked(false);
    setQuizCorrect(0);
    setQuizFeedback("Elegí una respuesta para empezar.");
    setQuizFinished(false);
  };

  return (
    <main className="bg-stone-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 right-[-10%] h-72 w-[60%] rounded-full blur-3xl opacity-80"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(155,122,232,0.24), rgba(122,174,232,0.18), rgba(141,200,122,0.12), transparent 72%)",
            }}
          />
          <div
            className="absolute bottom-0 left-[-16%] h-72 w-[56%] rounded-full blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(232,132,122,0.24), rgba(232,168,122,0.18), rgba(232,216,122,0.12), transparent 72%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-18">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
                Roadmap del alumno
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Bienvenida, {accountData.name.split(" ")[0]}
              </h1>
              <p className="text-base md:text-lg text-stone-600 mt-4 max-w-2xl">
                Este panel concentra tu cuenta, tus cursos pagos y dos módulos
                interactivos para seguir aprendiendo dentro del mismo recorrido.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white/90 backdrop-blur px-6 py-5 shadow-sm min-w-70">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                Estado de la cuenta
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, #E8847A 0%, #E8A87A 32%, #8DC87A 68%, #7AAEE8 100%)",
                  }}
                >
                  CF
                </div>
                <div>
                  <p
                    className="text-xl font-semibold text-stone-900"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {accountData.status}
                  </p>
                  <p className="text-sm text-stone-500">{accountData.plan}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-4">
          {roadmapSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-white"
                style={{ background: step.color }}
              >
                {step.step}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-stone-900">
                {step.title}
              </h2>
              <p className="mt-2 text-sm text-stone-600 leading-6">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-4 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                  Mi cuenta
                </p>
                <h2
                  className="text-2xl font-semibold text-stone-900 mt-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Datos personales
                </h2>
              </div>
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center text-white font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #9B7AE8 0%, #7AAEE8 50%, #8DC87A 100%)",
                }}
              >
                {accountData.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
            </div>

            <dl className="mt-8 space-y-5">
              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  Nombre completo
                </dt>
                <dd className="text-sm font-medium text-stone-800 mt-2">
                  {accountData.name}
                </dd>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  Correo
                </dt>
                <dd className="text-sm font-medium text-stone-800 mt-2 break-all">
                  {accountData.email}
                </dd>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  ID de usuario
                </dt>
                <dd className="text-sm font-medium text-stone-800 mt-2">
                  {accountData.memberId}
                </dd>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  Fecha de registro
                </dt>
                <dd className="text-sm font-medium text-stone-800 mt-2">
                  {accountData.joined}
                </dd>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  Teléfono
                </dt>
                <dd className="text-sm font-medium text-stone-800 mt-2">
                  {accountData.phone}
                </dd>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  Ubicación
                </dt>
                <dd className="text-sm font-medium text-stone-800 mt-2">
                  {accountData.location}
                </dd>
              </div>
            </dl>
          </div>

          <div className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {accountStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-stone-400">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-stone-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                    Cursos habilitados
                  </p>
                  <h2
                    className="text-2xl font-semibold text-stone-900 mt-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Tu formación pagada
                  </h2>
                </div>
                <p className="text-sm text-stone-500 max-w-xl md:text-right">
                  Todos los cursos están disponibles desde tu cuenta. Podés
                  retomar donde lo dejaste y avanzar a tu ritmo.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {courses.map((course) => (
                  <article
                    key={course.id}
                    className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="text-xs uppercase tracking-[0.26em] text-stone-400"
                          style={{ color: course.color }}
                        >
                          {course.level}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-stone-900">
                          {course.title}
                        </h3>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: `${course.color}20`,
                          color: course.color,
                        }}
                      >
                        {course.badge}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-stone-600 leading-6">
                      {course.description}
                    </p>

                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-stone-400">
                        <span>Progreso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${course.progress}%`,
                            background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)`,
                          }}
                        />
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-stone-600">
                      {course.modules.map((module) => (
                        <li key={module} className="flex items-start gap-3">
                          <span
                            className="mt-2 h-2 w-2 rounded-full flex-none"
                            style={{ backgroundColor: course.color }}
                          />
                          <span>{module}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500">
                      Acceso desbloqueado por tu compra activa.
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-7 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                  Sopa de letras interactiva
                </p>
                <h2
                  className="text-2xl font-semibold text-stone-900 mt-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Encontrá palabras en inglés
                </h2>
              </div>
              <div className="text-sm text-stone-500">
                {foundWords.length} de {wordSearchWords.length} encontradas
              </div>
            </div>

            <div className="mt-6 h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${wordProgress}%`,
                  background:
                    "linear-gradient(90deg, #E8847A 0%, #E8A87A 25%, #E8D87A 50%, #8DC87A 75%, #7AAEE8 100%)",
                }}
              />
            </div>

            <p className="mt-5 text-sm text-stone-600 leading-6">
              {wordMessage}
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-4 overflow-x-auto">
                <div className="grid grid-cols-8 gap-2 min-w-90">
                  {wordSearchBoard.map((row, rowIndex) =>
                    row.map((letter, colIndex) => {
                      const cellSelected = selectedCells.some(
                        ([selectedRow, selectedCol]) =>
                          selectedRow === rowIndex && selectedCol === colIndex,
                      );
                      const cellFound = foundWords.some((word) => {
                        const wordRow = wordSearchWords.findIndex(
                          (item) => item.word === word,
                        );
                        const wordLength = word.length;
                        return (
                          wordRow === rowIndex &&
                          colIndex >= 0 &&
                          colIndex < wordLength
                        );
                      });

                      return (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          type="button"
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                          className={`aspect-square rounded-xl border text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-stone-400 ${
                            cellFound
                              ? "border-transparent text-white"
                              : cellSelected
                                ? "border-stone-700 bg-stone-900 text-white"
                                : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                          }`}
                          style={
                            cellFound
                              ? {
                                  background:
                                    "linear-gradient(135deg, #8DC87A 0%, #7AAEE8 100%)",
                                }
                              : undefined
                          }
                        >
                          {letter}
                        </button>
                      );
                    }),
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-stone-900">
                      Palabras a encontrar
                    </h3>
                    <button
                      type="button"
                      onClick={resetWordSearch}
                      className="text-xs uppercase tracking-[0.22em] text-stone-500 hover:text-stone-800"
                    >
                      Reiniciar
                    </button>
                  </div>

                  <ul className="mt-4 space-y-3">
                    {wordSearchWords.map((item) => {
                      const completed = foundWords.includes(item.word);

                      return (
                        <li
                          key={item.word}
                          className="flex items-center justify-between rounded-2xl border border-stone-200 px-4 py-3"
                        >
                          <div>
                            <p className="font-semibold text-stone-900">
                              {item.word}
                            </p>
                            <p className="text-xs uppercase tracking-[0.24em] text-stone-400 mt-1">
                              {item.hint}
                            </p>
                          </div>
                          <span
                            className="rounded-full px-3 py-1 text-xs font-semibold"
                            style={{
                              backgroundColor: completed
                                ? "#8DC87A20"
                                : "#E5E7EB",
                              color: completed ? "#3B6D11" : "#6B7280",
                            }}
                          >
                            {completed ? "Found" : "Pending"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-[1.5rem] border border-stone-200 bg-stone-900 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/55">
                    Pista
                  </p>
                  <p className="mt-3 text-sm text-white/75 leading-6">
                    Hacé clic en las letras de una misma fila, en orden, para
                    formar la palabra.
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.24em] text-white/55">
                    Progreso global: {wordProgress}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-5 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                  Quiz reactivo
                </p>
                <h2
                  className="text-2xl font-semibold text-stone-900 mt-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Respondé en inglés
                </h2>
              </div>
              <div className="text-sm text-stone-500">
                {quizFinished
                  ? "Completado"
                  : `Pregunta ${quizIndex + 1} de ${quizQuestions.length}`}
              </div>
            </div>

            <div className="mt-6 h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${quizFinished ? 100 : quizProgress}%`,
                  background:
                    "linear-gradient(90deg, #E8847A 0%, #7AAEE8 100%)",
                }}
              />
            </div>

            {!quizFinished ? (
              <div className="mt-7">
                <p className="text-lg font-semibold text-stone-900 leading-7">
                  {currentQuiz.prompt}
                </p>

                <div className="mt-5 grid gap-3">
                  {currentQuiz.options.map((option) => {
                    const isSelected = quizPicked === option;
                    const isCorrect = option === currentQuiz.answer;

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={quizLocked}
                        onClick={() => handleQuizAnswer(option)}
                        className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                          quizLocked
                            ? isCorrect
                              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                              : isSelected
                                ? "border-rose-300 bg-rose-50 text-rose-900"
                                : "border-stone-200 bg-stone-50 text-stone-500"
                            : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400 hover:bg-white"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600 leading-6">
                  {quizFeedback}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToNextQuestion}
                    disabled={!quizLocked}
                    className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
                  >
                    Siguiente pregunta
                  </button>
                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="inline-flex items-center justify-center rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:text-stone-900"
                  >
                    Reiniciar quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-7 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
                  Resultado final
                </p>
                <p className="mt-3 text-3xl font-bold text-stone-900">
                  {quizCorrect} / {quizQuestions.length}
                </p>
                <p className="mt-3 text-sm text-stone-600 leading-6">
                  Terminaste el quiz. Podés volver a jugar para practicar y
                  mejorar tu rapidez.
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
                  >
                    Jugar otra vez
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="rounded-[2rem] border border-stone-200 bg-linear-to-br from-stone-900 to-stone-800 p-8 shadow-lg text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-80">
              <div
                className="absolute -top-20 right-[-10%] h-52 w-52 rounded-full blur-3xl"
                style={{ background: "rgba(232,132,122,0.18)" }}
              />
              <div
                className="absolute bottom-[-18%] left-[-12%] h-48 w-48 rounded-full blur-3xl"
                style={{ background: "rgba(122,174,232,0.16)" }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">
                  Soporte y acceso
                </p>
                <h2
                  className="text-2xl font-semibold mt-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ¿Necesitás ayuda con tu cuenta?
                </h2>
                <p className="mt-4 text-sm text-white/75 leading-6 max-w-xl">
                  Si querés actualizar tus datos, pedir soporte o consultar
                  sobre un curso, nuestro equipo te acompaña desde WhatsApp o
                  correo.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/75">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                      Correo
                    </p>
                    <p className="mt-2 text-white">{accountData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                      Teléfono
                    </p>
                    <p className="mt-2 text-white">{accountData.phone}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/5493764565439"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
                  >
                    Contactar por WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Ver datos de contacto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
