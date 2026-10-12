export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  questions: ComprehensionQuestion[];
}

export interface EbookData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  level: string;
  price: string;
  description: string;
  color: string;
  bgLight: string;
  textColor: string;
  pages: number;
  chapters: Chapter[];
}
