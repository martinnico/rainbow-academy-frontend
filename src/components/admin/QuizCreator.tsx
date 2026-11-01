"use client";

import { Check, Plus, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { QuizDTO, QuizQuestionDTO } from "@/types/activities";

interface QuizCreatorProps {
  onSubmit?: (activity: QuizDTO) => void;
}

interface QuestionDraft extends QuizQuestionDTO {
  id: number;
}

const emptyQuestion = (id: number): QuestionDraft => ({
  id,
  question: "",
  options: ["", "", "", ""],
  correctAnswerIndex: 0,
});

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm font-normal text-stone-700 outline-none transition focus:border-[#9b7ae8] focus:ring-4 focus:ring-[#9b7ae8]/10";

export default function QuizCreator({ onSubmit }: QuizCreatorProps) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    emptyQuestion(1),
  ]);
  const [preview, setPreview] = useState<QuizDTO | null>(null);

  const updateQuestion = (
    questionId: number,
    update: (question: QuestionDraft) => QuestionDraft,
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId ? update(question) : question,
      ),
    );
  };

  const addQuestion = () =>
    setQuestions((current) => [
      ...current,
      emptyQuestion((current.at(-1)?.id ?? 0) + 1),
    ]);

  const removeQuestion = (questionId: number) => {
    setQuestions((current) =>
      current.length === 1
        ? current
        : current.filter((question) => question.id !== questionId),
    );
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string,
  ) => {
    updateQuestion(questionId, (question) => ({
      ...question,
      options: question.options.map((option, index) =>
        index === optionIndex ? value : option,
      ),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const activity: QuizDTO = {
      title: title.trim(),
      questions: questions.map((question) => ({
        question: question.question.trim(),
        options: question.options.map((option) => option.trim()),
        correctAnswerIndex: question.correctAnswerIndex,
      })),
    };

    setPreview(activity);
    onSubmit?.(activity);
  };

  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm md:p-7">
      <div className="border-b border-stone-100 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
          Nueva actividad
        </p>
        <h2
          className="mt-2 text-2xl font-semibold text-stone-800"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quiz personalizado
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Sumá preguntas, marcá la respuesta correcta y verificá el resultado.
        </p>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <label className="block text-xs font-semibold text-stone-600">
          Título
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Repaso de ciencias"
            className={inputClassName}
          />
        </label>

        {questions.map((question, questionIndex) => (
          <fieldset
            key={question.id}
            className="rounded-2xl border border-stone-100 bg-[#fffdfa] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <legend className="text-sm font-semibold text-stone-700">
                Pregunta {questionIndex + 1}
              </legend>
              <button
                type="button"
                onClick={() => removeQuestion(question.id)}
                disabled={questions.length === 1}
                aria-label={`Eliminar pregunta ${questionIndex + 1}`}
                className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-[#c66b62] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <textarea
              required
              value={question.question}
              onChange={(event) =>
                updateQuestion(question.id, (current) => ({
                  ...current,
                  question: event.target.value,
                }))
              }
              placeholder="¿Qué concepto queremos repasar?"
              rows={2}
              className="mt-3 w-full resize-none rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm text-stone-700 outline-none transition focus:border-[#9b7ae8] focus:ring-4 focus:ring-[#9b7ae8]/10"
            />
            <div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2">
                  <input
                    required
                    value={option}
                    onChange={(event) =>
                      updateOption(question.id, optionIndex, event.target.value)
                    }
                    placeholder={`Opción ${optionIndex + 1}`}
                    className="h-10 min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-700 outline-none transition focus:border-[#9b7ae8] focus:ring-4 focus:ring-[#9b7ae8]/10"
                  />
                  <label className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition has-[:checked]:border-[#8dc87a] has-[:checked]:bg-[#eaf5e5] has-[:checked]:text-[#3b6d11]">
                    <span className="sr-only">
                      Marcar opción {optionIndex + 1} como correcta
                    </span>
                    <input
                      type="radio"
                      name={`correct-answer-${question.id}`}
                      checked={question.correctAnswerIndex === optionIndex}
                      onChange={() =>
                        updateQuestion(question.id, (current) => ({
                          ...current,
                          correctAnswerIndex: optionIndex,
                        }))
                      }
                      className="sr-only"
                    />
                    <Check className="size-4" />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8062c4] transition hover:text-stone-800"
        >
          <Plus className="size-4" />
          Agregar pregunta
        </button>
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-800 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          <Plus className="size-4" />
          Preparar quiz
        </button>
      </form>

      {preview && (
        <div className="mt-6 rounded-2xl bg-[#fbf8ff] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8062c4]">
            Vista previa
          </p>
          <h3 className="mt-2 font-semibold text-stone-800">{preview.title}</h3>
          <ol className="mt-3 space-y-3">
            {preview.questions.map((question, index) => (
              <li key={`${question.question}-${index}`} className="text-sm text-stone-600">
                <p className="font-medium text-stone-700">
                  {index + 1}. {question.question}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Respuesta correcta:{" "}
                  {question.options[question.correctAnswerIndex]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
