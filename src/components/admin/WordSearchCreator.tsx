"use client";

import { Check, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import type {
  WordSearchDirection,
  WordSearchDTO,
  WordSearchPlacementDTO,
} from "@/types/activities";

interface WordSearchCreatorProps {
  onSubmit?: (activity: WordSearchDTO) => void;
}

const BOARD_SIZE = 8;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const directions: Array<{
  direction: WordSearchDirection;
  row: number;
  column: number;
}> = [
  { direction: "right", row: 0, column: 1 },
  { direction: "left", row: 0, column: -1 },
  { direction: "down", row: 1, column: 0 },
  { direction: "up", row: -1, column: 0 },
  { direction: "down-right", row: 1, column: 1 },
  { direction: "down-left", row: 1, column: -1 },
  { direction: "up-right", row: -1, column: 1 },
  { direction: "up-left", row: -1, column: -1 },
];

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm font-normal text-stone-700 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10";

function emptyBoard(): string[][] {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ""),
  );
}

function findPlacement(
  board: string[][],
  word: string,
): WordSearchPlacementDTO | null {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let column = 0; column < BOARD_SIZE; column += 1) {
      for (const option of directions) {
        const letters = Array.from({ length: word.length }, (_, index) => {
          const nextRow = row + option.row * index;
          const nextColumn = column + option.column * index;
          return board[nextRow]?.[nextColumn] ?? "";
        });

        if (letters.join("") === word) {
          return {
            word,
            row: row + 1,
            column: column + 1,
            direction: option.direction,
          };
        }
      }
    }
  }

  return null;
}

function fillEmptyCells(board: string[][]): string[][] {
  return board.map((row) =>
    row.map(
      (letter) =>
        letter ||
        ALPHABET[Math.floor(Math.random() * ALPHABET.length)],
    ),
  );
}

export default function WordSearchCreator({
  onSubmit,
}: WordSearchCreatorProps) {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [words, setWords] = useState([""]);
  const [board, setBoard] = useState<string[][]>(() => emptyBoard());
  const [preview, setPreview] = useState<WordSearchDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateCell = (row: number, column: number, value: string) => {
    const letter = value.toUpperCase().replace(/[^A-Z]/g, "").slice(-1);
    setBoard((current) =>
      current.map((boardRow, rowIndex) =>
        rowIndex === row
          ? boardRow.map((cell, columnIndex) =>
              columnIndex === column ? letter : cell,
            )
          : boardRow,
      ),
    );
    setPreview(null);
    setError(null);
  };

  const updateWord = (index: number, value: string) => {
    setWords((current) =>
      current.map((word, wordIndex) =>
        wordIndex === index
          ? value.toUpperCase().replace(/[^A-Z\s]/g, "")
          : word,
      ),
    );
    setPreview(null);
    setError(null);
  };

  const addWord = () => setWords((current) => [...current, ""]);

  const removeWord = (index: number) => {
    setWords((current) =>
      current.length === 1
        ? current
        : current.filter((_, wordIndex) => wordIndex !== index),
    );
    setPreview(null);
    setError(null);
  };

  const clearBoard = () => {
    setBoard(emptyBoard());
    setPreview(null);
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedWords = words
      .map((word) => word.replace(/\s+/g, "").trim().toUpperCase())
      .filter(Boolean);
    const placements = normalizedWords.map((word) =>
      findPlacement(board, word),
    );
    const missingWordIndex = placements.findIndex(
      (placement) => placement === null,
    );

    if (missingWordIndex >= 0) {
      setError(
        `La palabra "${normalizedWords[missingWordIndex]}" no está formada en la matriz. Revisá sus letras.`,
      );
      setPreview(null);
      return;
    }

    const completedBoard = fillEmptyCells(board);
    const activity: WordSearchDTO = {
      title: title.trim(),
      level: level.trim(),
      words: normalizedWords,
      placements: placements.filter(
        (placement): placement is WordSearchPlacementDTO =>
          placement !== null,
      ),
      board: completedBoard,
    };

    setBoard(completedBoard);
    setError(null);
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
          Sopa de letras
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Escribí las letras directamente en la matriz, como en el juego del
          dashboard. Al confirmar, los espacios vacíos se completan al azar.
        </p>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <label className="block text-xs font-semibold text-stone-600">
          Título
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Animales de la selva"
            className={inputClassName}
          />
        </label>
        <label className="block text-xs font-semibold text-stone-600">
          Nivel o curso
          <input
            required
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            placeholder="3.º grado"
            className={inputClassName}
          />
        </label>

        <div className="rounded-2xl border border-[#dce8f5] bg-[#f5f8fc] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#527db3]">
                Matriz 8 × 8
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Escribí una letra por casilla. Las palabras pueden estar en
                cualquier dirección.
              </p>
            </div>
            <button
              type="button"
              onClick={clearBoard}
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 transition hover:text-stone-800"
            >
              <RotateCcw className="size-3.5" />
              Limpiar
            </button>
          </div>
          <div className="mx-auto mt-4 grid max-w-sm grid-cols-8 gap-1.5">
            {board.map((row, rowIndex) =>
              row.map((letter, columnIndex) => (
                <input
                  key={`${rowIndex}-${columnIndex}`}
                  aria-label={`Fila ${rowIndex + 1}, columna ${columnIndex + 1}`}
                  maxLength={1}
                  value={letter}
                  onChange={(event) =>
                    updateCell(rowIndex, columnIndex, event.target.value)
                  }
                  className="aspect-square w-full rounded-lg border border-stone-200 bg-white text-center text-base font-bold uppercase text-stone-700 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/20"
                />
              )),
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-stone-600">
              Palabras que el alumno deberá encontrar
            </p>
            <button
              type="button"
              onClick={addWord}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#527db3] transition hover:text-stone-800"
            >
              <Plus className="size-3.5" />
              Agregar
            </button>
          </div>
          {words.map((word, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                required
                value={word}
                onChange={(event) => updateWord(index, event.target.value)}
                placeholder={`Palabra ${index + 1}`}
                className="h-10 min-w-0 flex-1 rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm uppercase text-stone-700 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
              />
              <button
                type="button"
                onClick={() => removeWord(index)}
                disabled={words.length === 1}
                aria-label={`Eliminar palabra ${index + 1}`}
                className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-[#c66b62] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-[#fff1ef] px-3 py-2 text-sm text-[#a94f46]">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-800 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          <Check className="size-4" />
          Confirmar y completar matriz
        </button>
      </form>

      {preview && (
        <div className="mt-6 rounded-2xl bg-[#f5f8fc] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#527db3]">
            Vista previa lista para guardar
          </p>
          <div className="mx-auto mt-4 grid max-w-sm grid-cols-8 gap-1">
            {preview.board.flatMap((row, rowIndex) =>
              row.map((letter, columnIndex) => (
                <span
                  key={`${rowIndex}-${columnIndex}`}
                  className="flex aspect-square items-center justify-center rounded-md bg-white text-sm font-semibold text-stone-700 shadow-sm"
                >
                  {letter}
                </span>
              )),
            )}
          </div>
        </div>
      )}
    </section>
  );
}
