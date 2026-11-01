export type WordSearchDirection =
  | "right"
  | "left"
  | "down"
  | "up"
  | "down-right"
  | "down-left"
  | "up-right"
  | "up-left";

export interface WordSearchPlacementDTO {
  word: string;
  row: number;
  column: number;
  direction: WordSearchDirection;
}

export interface WordSearchDTO {
  title: string;
  level: string;
  words: string[];
  placements: WordSearchPlacementDTO[];
  board: string[][];
}

export interface QuizQuestionDTO {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizDTO {
  title: string;
  questions: QuizQuestionDTO[];
}
