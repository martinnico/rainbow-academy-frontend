"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Heart, LockKeyhole, Play, RotateCcw, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  courses as coursesApi,
  lessons as lessonsApi,
  subscriptions as subscriptionsApi,
} from "@/lib/api";
import type {
  ActivityResponseDTO,
  ActivityQuizQuestionDTO,
  CourseResponseDTO,
  CourseRoadmapLessonDTO,
  LessonResponseDTO,
  SubscriptionResponseDTO,
} from "@/types/api";

type Cell = [number, number];
type Placement = { word: string; cells: Cell[] };
function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function shuffleQuiz(questions: ActivityQuizQuestionDTO[]): ActivityQuizQuestionDTO[] {
  return shuffleArray(questions).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}

const directions: Cell[] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const pastelColors = ["#E8847A", "#8DC87A", "#7AAEE8", "#9B7AE8", "#E8A87A"];

function createWordSearch(words: string[]) {
  const cleanWords = [
    ...new Set(words.map((word) => word.trim().toUpperCase()).filter(Boolean)),
  ];
  const size = Math.max(12, ...cleanWords.map((word) => word.length + 2));
  const grid = Array.from({ length: size }, () => Array<string>(size).fill(""));
  const placements: Placement[] = [];

  const canPlace = (word: string, row: number, col: number, [dr, dc]: Cell) => {
    const cells: Cell[] = [];
    for (let index = 0; index < word.length; index += 1) {
      const nextRow = row + dr * index;
      const nextCol = col + dc * index;
      if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size)
        return null;
      const current = grid[nextRow][nextCol];
      if (current && current !== word[index]) return null;
      cells.push([nextRow, nextCol]);
    }
    return cells;
  };

  for (const word of cleanWords.sort((a, b) => b.length - a.length)) {
    let best: { cells: Cell[]; score: number } | null = null;
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        for (const direction of directions) {
          const cells = canPlace(word, row, col, direction);
          if (!cells) continue;
          const score = cells.reduce(
            (total, [r, c]) => total + (grid[r][c] ? 1 : 0),
            0,
          );
          if (
            !best ||
            score > best.score ||
            (score === best.score && Math.random() > 0.6)
          ) {
            best = { cells, score };
          }
        }
      }
    }
    if (best) {
      best.cells.forEach(([row, col], index) => {
        grid[row][col] = word[index];
      });
      placements.push({ word, cells: best.cells });
    }
  }

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return {
    grid: grid.map((row) =>
      row.map(
        (letter) =>
          letter || letters[Math.floor(Math.random() * letters.length)],
      ),
    ),
    placements,
  };
}

function lineBetween(start: Cell, end: Cell): Cell[] | null {
  const rowDelta = end[0] - start[0];
  const colDelta = end[1] - start[1];
  const rowStep = Math.sign(rowDelta);
  const colStep = Math.sign(colDelta);
  const distance = Math.max(Math.abs(rowDelta), Math.abs(colDelta));
  if (
    distance === 0 ||
    (rowDelta !== 0 &&
      colDelta !== 0 &&
      Math.abs(rowDelta) !== Math.abs(colDelta))
  ) {
    return null;
  }

  return Array.from({ length: distance + 1 }, (_, index) => [
    start[0] + rowStep * index,
    start[1] + colStep * index,
  ]);
}

function toYouTubeEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      if (url.pathname.startsWith("/embed/")) return value;
    }
  } catch {
    return null;
  }
  return null;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponseDTO[]>(
    [],
  );
  const [courses, setCourses] = useState<CourseResponseDTO[]>([]);
  const [courseLessons, setCourseLessons] = useState<LessonResponseDTO[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [roadmap, setRoadmap] = useState<CourseRoadmapLessonDTO[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [activity, setActivity] = useState<ActivityResponseDTO | null>(null);
  const [wordSearch, setWordSearch] = useState(() => createWordSearch([]));
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectionStart, setSelectionStart] = useState<Cell | null>(null);
  const [selection, setSelection] = useState<Cell[]>([]);
  const [dragging, setDragging] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<ActivityQuizQuestionDTO[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizLives, setQuizLives] = useState(3);
  const [quizCorrectAnswers, setQuizCorrectAnswers] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizExhausted, setQuizExhausted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) router.replace("/login");
  }, [isAuthLoading, router, user]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      subscriptionsApi.getStudentSubscriptions(user.id),
      coursesApi.getCourses(),
    ])
      .then(([studentSubscriptions, availableCourses]) => {
        const active = studentSubscriptions.filter(
          (item) => item.status === "ACTIVE",
        );
        setSubscriptions(active);
        setCourses(availableCourses);
        const rainbowPass = active.some(
          (item) =>
            item.planType === "MEMBERSHIP_MONTHLY" ||
            item.planType === "MEMBERSHIP_ANNUAL",
        );
        if (rainbowPass) {
          setSelectedCourseId((current) => current ?? availableCourses[0]?.id ?? null);
        } else if (active.length > 0) {
          setSelectedCourseId((current) => current ?? active[0].courseId);
        }
      })
      .catch(() =>
        setMessage("No pudimos cargar tus cursos. Intentá nuevamente."),
      );
  }, [user]);

  useEffect(() => {
    if (!user || selectedCourseId === null) return;
    lessonsApi
      .getLessonsByCourse(selectedCourseId)
      .then(setCourseLessons)
      .catch(() => setMessage("No pudimos cargar los videos del curso."));
    coursesApi
      .getCourseRoadmap(selectedCourseId, user.id)
      .then((items) => {
        setRoadmap(items);
        const firstUnlocked = items.find((item) => item.status === "UNLOCKED");
        setActiveLessonId((current) =>
          items.some((item) => item.lessonId === current)
            ? current
            : (firstUnlocked?.lessonId ?? null),
        );
      })
      .catch(() => setMessage("No pudimos cargar el mapa de ruta del curso."));
  }, [selectedCourseId, user]);

  const activeLesson =
    roadmap.find((lesson) => lesson.lessonId === activeLessonId) ?? null;
  const hasRainbowPass = subscriptions.some(
    (item) =>
      item.planType === "MEMBERSHIP_MONTHLY" ||
      item.planType === "MEMBERSHIP_ANNUAL",
  );
  const activeLessonDetails = courseLessons.find(
    (lesson) => lesson.id === activeLessonId,
  );

  useEffect(() => {
    if (!user || !activeLesson || activeLesson.status !== "UNLOCKED") {
      const timeoutId = window.setTimeout(() => setActivity(null), 0);
      return () => window.clearTimeout(timeoutId);
    }
    const resetTimeoutId = window.setTimeout(() => {
      setFoundWords([]);
      setSelection([]);
      setSelectionStart(null);
      setQuizSubmitted(false);
      setQuizQuestions([]);
      setCurrentQuestionIndex(0);
      setQuizLives(3);
      setQuizCorrectAnswers(0);
      setQuizSelectedOption(null);
      setQuizExhausted(false);
    }, 0);
    lessonsApi
      .getLessonActivity(activeLesson.lessonId)
      .then((loadedActivity) => {
        setActivity(loadedActivity);
        if (loadedActivity.type === "WORD_SEARCH") {
          setWordSearch(createWordSearch(loadedActivity.words));
        } else {
          setQuizQuestions(shuffleQuiz(loadedActivity.questions));
        }
      })
      .catch(() =>
        setMessage("No pudimos cargar la actividad de esta lección."),
      );
    return () => window.clearTimeout(resetTimeoutId);
  }, [activeLesson, user]);

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId,
  );
  const completedLessons = roadmap.filter(
    (lesson) => lesson.status === "COMPLETED",
  ).length;
  const courseCompleted =
    roadmap.length > 0 && completedLessons === roadmap.length;
  const wordProgress = activity?.words.length
    ? Math.round((foundWords.length / activity.words.length) * 100)
    : 0;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const finishLesson = async (score: number) => {
    if (!user || !activeLesson || activeLesson.status !== "UNLOCKED") return;
    try {
      const result = await lessonsApi.completeLesson(
        activeLesson.lessonId,
        user.id,
        score,
      );
      if (result.passed) {
        setCelebration(true);
        setMessage(
          "¡Excelente! Completaste la lección y desbloqueaste el siguiente nivel.",
        );
        const refreshed = await coursesApi.getCourseRoadmap(
          selectedCourseId as number,
          user.id,
        );
        setRoadmap(refreshed);
        setActiveLessonId(result.unlockedNextLessonId ?? activeLesson.lessonId);
      } else {
        setMessage(
          `Tu puntaje fue ${result.score}. Revisá la actividad e intentá nuevamente.`,
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos guardar tu progreso.",
      );
    }
  };

  const restartQuiz = () => {
    setQuizQuestions(shuffleQuiz(activity?.questions ?? []));
    setCurrentQuestionIndex(0);
    setQuizLives(3);
    setQuizCorrectAnswers(0);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    setQuizExhausted(false);
    setMessage(null);
  };

  const submitQuizAnswer = () => {
    if (!currentQuestion || quizSelectedOption === null || quizExhausted) return;
    const isCorrect = currentQuestion.options[quizSelectedOption]?.isCorrect ?? false;
    const nextCorrectAnswers = quizCorrectAnswers + (isCorrect ? 1 : 0);
    const nextLives = isCorrect ? quizLives : quizLives - 1;
    setQuizCorrectAnswers(nextCorrectAnswers);
    setQuizSubmitted(true);

    if (nextLives <= 0) {
      setQuizLives(0);
      setQuizExhausted(true);
      return;
    }
    setQuizLives(nextLives);
    if (currentQuestionIndex === quizQuestions.length - 1) {
      const score = Math.round((nextCorrectAnswers / quizQuestions.length) * 100);
      if (score >= (activity?.minPassScore ?? 0)) {
        void finishLesson(score);
      } else {
        setMessage(`Tu puntaje fue ${score}%. Necesitás al menos ${activity?.minPassScore ?? 0}%.`);
        setQuizExhausted(true);
      }
      return;
    }
    window.setTimeout(() => {
      setCurrentQuestionIndex((index) => index + 1);
      setQuizSelectedOption(null);
      setQuizSubmitted(false);
    }, 350);
  };

  const chooseCell = (cell: Cell) => {
    if (!selectionStart) {
      setSelectionStart(cell);
      setSelection([cell]);
      return;
    }
    const selectedLine = lineBetween(selectionStart, cell);
    if (!selectedLine) {
      setSelectionStart(cell);
      setSelection([cell]);
      return;
    }
    setSelection(selectedLine);
    const word = selectedLine
      .map(([row, col]) => wordSearch.grid[row][col])
      .join("");
    const reverse = word.split("").reverse().join("");
    const found = wordSearch.placements.find(
      (item) => item.word === word || item.word === reverse,
    );
    if (found && !foundWords.includes(found.word)) {
      const nextWords = [...foundWords, found.word];
      setFoundWords(nextWords);
      setSelectionStart(null);
      setSelection([]);
      if (nextWords.length === activity?.words.length) {
        void finishLesson(100);
      }
    }
  };

  const isCellSelected = (cell: Cell) =>
    selection.some(([row, col]) => row === cell[0] && col === cell[1]);
  const foundColor = (cell: Cell) => {
    const index = wordSearch.placements.findIndex(
      (placement) =>
        foundWords.includes(placement.word) &&
        placement.cells.some(
          ([row, col]) => row === cell[0] && col === cell[1],
        ),
    );
    return index >= 0 ? pastelColors[index % pastelColors.length] : undefined;
  };

  if (isAuthLoading || !user)
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 text-stone-500">
        Cargando tu aula...
      </main>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50/70 via-purple-50/50 to-sky-50/70 pb-16">
      <section className="relative overflow-hidden border-b border-purple-100/80 bg-white/80 backdrop-blur-md">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 90% 20%, rgba(155,122,232,.2), transparent 30%), radial-gradient(circle at 10% 80%, rgba(232,132,122,.18), transparent 28%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Roadmap del alumno
              </p>
              <h1
                className="mt-3 text-4xl font-bold leading-tight text-stone-900 md:text-5xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Te damos la Bienvenida, {user.fullName.split(" ")[0]}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-stone-600">
                Elegí una lección desbloqueada y avanzá paso a paso en tu curso.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white/90 px-6 py-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                Estado de graduación
              </p>
              <p className="mt-3 text-lg font-semibold text-stone-800">
                {user.graduated ? "Graduada" : "En progreso"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-12">
        {message && (
          <div
            role="status"
            className="mb-6 rounded-2xl border border-[#e8d87a]/50 bg-[#fffbea] px-5 py-4 text-sm text-stone-700"
          >
            {message}
          </div>
        )}
        {celebration && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#8dc87a]/40 bg-[#eaf5e5] px-5 py-4 font-semibold text-[#3b6d11]">
            <Sparkles className="size-5" /> ¡Nivel completado! Tu próximo
            desafío ya está disponible.
          </div>
        )}
        {subscriptions.length === 0 ? (
          <div className="rounded-[2rem] border border-stone-200 bg-white p-10 text-center shadow-sm">
            <h2
              className="text-2xl font-semibold text-stone-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Todavía no tenés cursos activos
            </h2>
            <p className="mt-3 text-stone-600">
              Visitá el catálogo para elegir tu próximo recorrido.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              {hasRainbowPass && (
                <span className="rounded-full border border-purple-200 bg-gradient-to-r from-pink-50 via-purple-50 to-sky-50 px-4 py-2 text-sm font-bold text-purple-700">
                  🌈 Miembro Rainbow Pass Activo
                </span>
              )}
              <label className="text-sm font-semibold text-stone-700">
                Curso activo{" "}
                <select
                  value={selectedCourseId ?? ""}
                  onChange={(event) => {
                    setSelectedCourseId(Number(event.target.value));
                    setCelebration(false);
                  }}
                  className="ml-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-normal text-stone-700 shadow-sm"
                >
                  {(hasRainbowPass
                    ? courses
                    : subscriptions.map((subscription) => ({
                        id: subscription.courseId,
                        title:
                          courses.find(
                            (course) => course.id === subscription.courseId,
                          )?.title ?? `Curso #${subscription.courseId}`,
                      }))).map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </label>
              <span className="rounded-full bg-white px-4 py-2 text-sm text-stone-600 shadow-sm">
                {completedLessons}/{roadmap.length} lecciones completadas
              </span>
            </div>
            {courseCompleted && (
              <div className="mb-8 rounded-[1.75rem] border border-[#9b7ae8]/30 bg-[#f5f0ff] p-6 text-[#5d438d]">
                <p className="font-semibold">
                  ¡Felicitaciones! Completaste{" "}
                  {selectedCourse?.title ?? "tu curso"}.
                </p>
                <p className="mt-1 text-sm">
                  Listo para el examen oral por Meet/Zoom con la profesora.
                </p>
              </div>
            )}

            <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
              <section className="rounded-[2rem] border border-purple-100/80 bg-white/90 p-6 shadow-xl shadow-purple-500/5 backdrop-blur-md">
                <h2
                  className="text-2xl font-semibold text-stone-900"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Tu recorrido
                </h2>
                <div className="mt-6 space-y-3">
                  {roadmap.map((lesson, index) => {
                    const unlocked = lesson.status === "UNLOCKED";
                    return (
                      <button
                        key={lesson.lessonId}
                        type="button"
                        disabled={!unlocked}
                        onClick={() => {
                          setActiveLessonId(lesson.lessonId);
                          setCelebration(false);
                        }}
                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${activeLessonId === lesson.lessonId ? "border-[#7aaee8] bg-[#f0f7ff]" : "border-stone-200"} ${unlocked ? "hover:border-[#7aaee8]" : "cursor-not-allowed opacity-65"}`}
                      >
                        <span
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${lesson.status === "COMPLETED" ? "bg-[#8dc87a]" : unlocked ? "bg-[#7aaee8]" : "bg-stone-400"}`}
                        >
                          {lesson.status === "COMPLETED" ? (
                            <Check className="size-5" />
                          ) : lesson.status === "LOCKED" ? (
                            <LockKeyhole className="size-4" />
                          ) : (
                            String(index + 1).padStart(2, "0")
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block truncate text-sm text-stone-800">
                            {lesson.title}
                          </strong>
                          <span className="mt-1 block text-xs uppercase tracking-wider text-stone-400">
                            {lesson.status}
                          </span>
                        </span>
                        {unlocked && <Play className="size-4 text-[#7aaee8]" />}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[2rem] border border-purple-100/80 bg-white/90 p-6 shadow-xl shadow-purple-500/5 backdrop-blur-md">
                {!activeLesson || activeLesson.status !== "UNLOCKED" ? (
                  <div className="py-16 text-center text-stone-500">
                    Seleccioná una lección desbloqueada para comenzar.
                  </div>
                ) : (
                  <>
                    {activeLessonDetails?.videoUrl &&
                      toYouTubeEmbedUrl(activeLessonDetails.videoUrl) && (
                        <div className="mb-8 overflow-hidden rounded-2xl border border-[#dce8f5] bg-[#f5f8fc]">
                          <iframe
                            title={`Video de ${activeLesson.title}`}
                            src={
                              toYouTubeEmbedUrl(activeLessonDetails.videoUrl) ??
                              undefined
                            }
                            className="aspect-video w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                    {!activity ? (
                      <div className="py-16 text-center text-stone-500">
                        Cargando actividad...
                      </div>
                    ) : activity.type === "WORD_SEARCH" ? (
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-[#7aaee8]">
                              Sopa de letras
                            </p>
                            <h2
                              className="mt-2 text-3xl font-semibold text-stone-900"
                              style={{ fontFamily: "var(--font-playfair)" }}
                            >
                              {activity.title}
                            </h2>
                          </div>
                          <span className="rounded-full bg-[#eaf5e5] px-3 py-1 text-sm font-semibold text-[#3b6d11]">
                            {wordProgress}%
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-stone-600">
                          Elegí la primera y última letra, o arrastrá en línea
                          recta en cualquiera de las 8 direcciones.
                        </p>
                        <div
                          className="mx-auto mt-6 grid max-w-[560px] touch-none select-none"
                          style={{
                            gridTemplateColumns: `repeat(${wordSearch.grid.length}, minmax(0, 1fr))`,
                          }}
                          onMouseLeave={() =>
                            dragging &&
                            setSelection(selectionStart ? [selectionStart] : [])
                          }
                        >
                          {wordSearch.grid.map((row, rowIndex) =>
                            row.map((letter, colIndex) => {
                              const cell: Cell = [rowIndex, colIndex];
                              const color = foundColor(cell);
                              return (
                                <button
                                  key={`${rowIndex}-${colIndex}`}
                                  type="button"
                                  onMouseDown={() => {
                                    setDragging(true);
                                    if (!selectionStart) {
                                      setSelectionStart(cell);
                                      setSelection([cell]);
                                    }
                                  }}
                                  onMouseEnter={() => {
                                    if (dragging && selectionStart)
                                      setSelection(
                                        lineBetween(selectionStart, cell) ?? [
                                          selectionStart,
                                        ],
                                      );
                                  }}
                                  onMouseUp={() => {
                                    setDragging(false);
                                    chooseCell(cell);
                                  }}
                                  className="aspect-square border border-white/70 text-[clamp(.55rem,2vw,.9rem)] font-bold text-stone-700 transition"
                                  style={{
                                    backgroundColor:
                                      color ??
                                      (isCellSelected(cell)
                                        ? "#fff3c4"
                                        : "#f8fafc"),
                                  }}
                                >
                                  {letter}
                                </button>
                              );
                            }),
                          )}
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {activity.words.map((word) => (
                            <span
                              key={word}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${foundWords.includes(word.toUpperCase()) ? "bg-[#eaf5e5] text-[#3b6d11] line-through" : "bg-stone-100 text-stone-600"}`}
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setWordSearch(createWordSearch(activity.words));
                            setFoundWords([]);
                            setSelection([]);
                            setSelectionStart(null);
                          }}
                          className="mt-5 text-sm font-semibold text-[#537da9] hover:text-[#3d638b]"
                        >
                          Generar otra cuadrícula
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#7aaee8]">
                          Quiz
                        </p>
                        <h2
                          className="mt-2 text-3xl font-semibold text-stone-900"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {activity.title}
                        </h2>
                        <div className="mt-6 rounded-2xl bg-gradient-to-r from-rose-50 via-purple-50 to-sky-50 p-4">
                          <div className="flex items-center justify-between text-sm font-semibold text-stone-700">
                            <span>Pregunta {currentQuestionIndex + 1} / {quizQuestions.length}</span>
                            <span aria-label={`${quizLives} intentos restantes`} className="tracking-widest">
                              {Array.from({ length: 3 }, (_, index) => <Heart key={index} className={`inline size-5 ${index < quizLives ? "fill-[#e8847a] text-[#e8847a]" : "text-stone-300"}`} />)}
                            </span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
                            <div className="h-full rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 transition-all duration-500" style={{ width: `${quizQuestions.length ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0}%` }} />
                          </div>
                        </div>
                        {quizExhausted ? (
                          <div className="mt-6 rounded-2xl border border-[#f1c6c1] bg-[#fff0ed] p-6 text-center">
                            <p className="font-semibold text-[#a34d45]">¡Agotaste tus 3 intentos! Vamos a intentarlo de nuevo con las preguntas mezcladas 🔄</p>
                            <button type="button" onClick={restartQuiz} className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                              <RotateCcw className="size-4" /> Reintentar Quiz desde cero
                            </button>
                          </div>
                        ) : currentQuestion ? (
                          <fieldset className="mt-6">
                            <legend className="text-xl font-semibold text-stone-800">{currentQuestion.questionText}</legend>
                            <div className="mt-4 grid gap-3">
                              {currentQuestion.options.map((option, optionIndex) => (
                                <label key={option.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 ${quizSelectedOption === optionIndex ? "border-[#9b7ae8] bg-[#f5f0ff] text-[#5d438d] shadow-md" : "border-purple-100/80 bg-white/90 text-stone-600"}`}>
                                  <input type="radio" name={`question-${currentQuestion.id}`} checked={quizSelectedOption === optionIndex} onChange={() => { setQuizSelectedOption(optionIndex); setQuizSubmitted(false); }} className="accent-[#9b7ae8]" />
                                  {option.optionText}
                                </label>
                              ))}
                            </div>
                            <button type="button" disabled={quizSelectedOption === null || quizSubmitted} onClick={submitQuizAnswer} className="mt-6 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50">
                              {currentQuestionIndex === quizQuestions.length - 1 ? "Comprobar resultado" : "Comprobar / Siguiente"}
                            </button>
                          </fieldset>
                        ) : <p className="mt-6 text-sm text-stone-500">Esta actividad todavía no tiene preguntas.</p>}
                      </div>
                    )}
                  </>
                )}
              </section>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
