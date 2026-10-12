export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface WordSearchData {
  words: { word: string; translation: string }[];
  gridSize: number;
}

export interface PictureMatchItem {
  word: string;
  correctEmoji: string;
  options: string[];
}

export interface SituationItem {
  sentence: string;
  translation: string;
  options: string[];
  correctIndex: number;
}

export interface ModuleData {
  id: string;
  name: string;
  description: string;
  quiz: QuizQuestion[];
  wordSearch: WordSearchData;
  pictureMatch: PictureMatchItem[];
  situations: SituationItem[];
}

export interface LevelData {
  id: string;
  label: string;
  title: string;
  description: string;
  color: string;
  bgLight: string;
  textColor: string;
  modules: ModuleData[];
}
