import type { ComprehensionQuestion } from "@/types/ebook";

export interface CustomEbookQuestion extends ComprehensionQuestion {
  id: string;
  ebookId: string;
  chapterId: string;
}

const STORAGE_KEY = "rainbow-academy-custom-ebook-questions";

export function getCustomEbookQuestions(): CustomEbookQuestion[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedQuestions = window.localStorage.getItem(STORAGE_KEY);
    return savedQuestions
      ? (JSON.parse(savedQuestions) as CustomEbookQuestion[])
      : [];
  } catch {
    return [];
  }
}

export function saveCustomEbookQuestions(questions: CustomEbookQuestion[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

export function questionsForChapter(
  ebookId: string,
  chapterId: string,
  defaultQuestions: ComprehensionQuestion[],
) {
  return [
    ...defaultQuestions,
    ...getCustomEbookQuestions().filter(
      (question) =>
        question.ebookId === ebookId && question.chapterId === chapterId,
    ),
  ];
}
