"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { activities, lessons } from "@/lib/api";
import type {
  ActivityRequestDTO,
  ActivityQuizQuestionRequestDTO,
  CourseResponseDTO,
  LessonResponseDTO,
} from "@/types/api";

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm text-stone-700 outline-none focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10";

interface ActivityEditorProps {
  courses: CourseResponseDTO[];
  lessons: LessonResponseDTO[];
  selectedCourseId: number | null;
  onCourseChange: (id: number) => void;
  onError: (message: string) => void;
  onNotice: (message: string) => void;
  initialLessonId?: number;
}

const newQuestion = (orderIndex: number): ActivityQuizQuestionRequestDTO => ({
  questionText: "",
  orderIndex,
  options: [
    { optionText: "", isCorrect: true },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
  ],
});

export default function ActivityEditor({
  courses,
  lessons: lessonList,
  selectedCourseId,
  onCourseChange,
  onError,
  onNotice,
  initialLessonId,
}: ActivityEditorProps) {
  const [lessonId, setLessonId] = useState(initialLessonId ?? 0);
  const [activityId, setActivityId] = useState<number | null>(null);
  const [type, setType] = useState<"WORD_SEARCH" | "QUIZ">("WORD_SEARCH");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [words, setWords] = useState("");
  const [minPassScore, setMinPassScore] = useState(60);
  const [questions, setQuestions] = useState<ActivityQuizQuestionRequestDTO[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const handleCourseChange = (courseId: number) => {
    onCourseChange(courseId);
    setLessonId(0);
    setActivityId(null);
    setTitle("");
    setInstructions("");
    setWords("");
    setQuestions([]);
  };

  const selectLesson = async (value: string) => {
    const nextLessonId = Number(value);
    setLessonId(nextLessonId);
    setActivityId(null);
    setQuestions([]);
    if (!nextLessonId) return;
    setLoadingActivity(true);
    try {
      const current = await lessons.getLessonActivity(nextLessonId);
      setActivityId(current.id);
      setType(current.type);
      setTitle(current.title);
      setInstructions(current.instructions ?? "");
      setWords(current.words.join(", "));
      setMinPassScore(current.minPassScore);
      setQuestions(current.questions.map((question) => ({
        questionText: question.questionText,
        orderIndex: question.orderIndex,
        options: question.options.map((option) => ({
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        })),
      })));
    } catch {
      setTitle("");
      setInstructions("");
      setWords("");
      setMinPassScore(60);
    } finally {
      setLoadingActivity(false);
    }
  };

  useEffect(() => {
    if (!initialLessonId) return;
    const timeoutId = window.setTimeout(() => {
      void selectLesson(String(initialLessonId));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [initialLessonId]);

  const updateQuestion = (index: number, question: ActivityQuizQuestionRequestDTO) =>
    setQuestions((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? question : item)),
    );

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: ActivityRequestDTO = {
      lessonId,
      type,
      title: title.trim(),
      instructions: instructions.trim(),
      minPassScore,
      words:
        type === "WORD_SEARCH"
          ? words.split(",").map((word) => word.trim()).filter(Boolean)
          : [],
      questions:
        type === "QUIZ"
          ? questions.map((question, index) => ({
              ...question,
              orderIndex: index + 1,
            }))
          : [],
    };
    try {
      if (type === "QUIZ" && questions.some((question) => !question.options.some((option) => option.isCorrect))) {
        onError("Cada pregunta debe tener una opción correcta marcada.");
        return;
      }
      if (activityId === null) await activities.createActivity(payload);
      else await activities.updateActivity(activityId, payload);
      onNotice(activityId === null ? "Actividad creada correctamente." : "Actividad actualizada correctamente.");
    } catch (saveError) {
      onError(saveError instanceof Error ? saveError.message : "No pudimos guardar la actividad.");
    }
  };

  return (
    <form onSubmit={save} className="mx-auto max-w-3xl rounded-[1.75rem] border border-purple-100/80 bg-white/90 p-6 shadow-xl shadow-purple-500/5 backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Actividad de lección</p>
      <h2 className="mt-2 text-2xl font-semibold text-stone-800">
        {activityId === null ? "Nueva actividad" : "Editar actividad"}
      </h2>
      <div className="mt-6 space-y-4">
        <label className="block text-xs font-semibold text-stone-600">Curso
          <select required value={selectedCourseId ?? ""} onChange={(event) => handleCourseChange(Number(event.target.value))} className={inputClass}>
            <option value="">Seleccioná un curso</option>
            {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
          </select>
        </label>
        <label className="block text-xs font-semibold text-stone-600">Lección
          <select required value={lessonId || ""} onChange={(event) => void selectLesson(event.target.value)} className={inputClass}>
            <option value="">Seleccioná una lección</option>
            {lessonList.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}
          </select>
        </label>
        {loadingActivity && <p className="rounded-xl bg-[#f5f8fc] p-3 text-xs text-[#527db3]">Consultando actividad existente...</p>}
        <label className="block text-xs font-semibold text-stone-600">Título
          <input required value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} />
        </label>
        <label className="block text-xs font-semibold text-stone-600">Instrucciones
          <textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} className={`${inputClass} h-20 py-3`} placeholder="Leé cada pregunta y elegí la respuesta correcta." />
        </label>
        <label className="block text-xs font-semibold text-stone-600">Tipo
          <select value={type} onChange={(event) => setType(event.target.value as "WORD_SEARCH" | "QUIZ")} className={inputClass}>
            <option value="WORD_SEARCH">Sopa de letras</option>
            <option value="QUIZ">Quiz</option>
          </select>
        </label>
        <label className="block text-xs font-semibold text-stone-600">Puntaje mínimo (%)
          <input required min={0} max={100} type="number" value={minPassScore} onChange={(event) => setMinPassScore(Number(event.target.value))} className={inputClass} />
        </label>
        {type === "WORD_SEARCH" ? (
          <label className="block text-xs font-semibold text-stone-600">Palabras separadas por coma
            <textarea required value={words} onChange={(event) => setWords(event.target.value)} placeholder="rainbow, book, star" className={`${inputClass} h-24 py-3`} />
            <span className="mt-1 block text-xs font-normal text-stone-400">La matriz se genera automáticamente; no ingreses una grilla manual.</span>
          </label>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-stone-600">Preguntas y opciones</p>
              <button type="button" onClick={() => setQuestions((current) => [...current, newQuestion(current.length)])} className="inline-flex items-center gap-1 text-xs font-semibold text-[#8062c4]"><Plus className="size-3.5" />Agregar pregunta</button>
            </div>
            {questions.map((question, questionIndex) => (
              <fieldset key={questionIndex} className="rounded-2xl border border-stone-100 bg-[#fffdfa] p-4">
                <div className="flex items-center justify-between">
                  <legend className="text-sm font-semibold text-stone-700">Pregunta #{questionIndex + 1}</legend>
                  {questions.length > 1 && <button type="button" onClick={() => setQuestions((current) => current.filter((_, index) => index !== questionIndex).map((item, index) => ({ ...item, orderIndex: index })))} className="text-xs font-semibold text-[#c45c52]">Eliminar</button>}
                </div>
                <input required value={question.questionText} onChange={(event) => updateQuestion(questionIndex, { ...question, questionText: event.target.value })} placeholder="Pregunta" className={inputClass} />
                <div className="mt-3 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input required value={option.optionText} onChange={(event) => updateQuestion(questionIndex, { ...question, options: question.options.map((item, itemIndex) => itemIndex === optionIndex ? { ...item, optionText: event.target.value } : item) })} placeholder={`Opción ${optionIndex + 1}`} className={`${inputClass} mt-0`} />
                      <label className="flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-stone-200 px-2 text-[10px] font-semibold text-stone-500 has-[:checked]:border-[#8dc87a] has-[:checked]:bg-[#eaf5e5] has-[:checked]:text-[#3b6d11]">
                        <input type="radio" name={`correct-${questionIndex}`} checked={option.isCorrect} onChange={() => updateQuestion(questionIndex, { ...question, options: question.options.map((item, itemIndex) => ({ ...item, isCorrect: itemIndex === optionIndex })) })} className="sr-only" />
                        Correcta ✓
                      </label>
                      {question.options.length > 2 && (
                        <button type="button" onClick={() => updateQuestion(questionIndex, { ...question, options: question.options.filter((_, index) => index !== optionIndex) })} className="text-xs text-stone-400 hover:text-[#c45c52]">Quitar</button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => updateQuestion(questionIndex, { ...question, options: [...question.options, { optionText: "", isCorrect: false }] })} className="mt-3 text-xs font-semibold text-[#8062c4]">+ Agregar opción</button>
              </fieldset>
            ))}
          </div>
        )}
        <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-800 text-sm font-semibold text-white transition hover:bg-stone-700"><Plus className="size-4" />{activityId === null ? "Guardar actividad" : "Actualizar actividad"}</button>
      </div>
    </form>
  );
}
