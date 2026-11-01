export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type ActivityType = "WORD_SEARCH" | "QUIZ";
export type RoadmapLessonStatus = "LOCKED" | "UNLOCKED" | "COMPLETED";

export interface AuthLoginRequestDTO {
  username: string;
  password: string;
}

export interface AuthRegisterRequestDTO {
  username: string;
  password: string;
  fullName: string;
  dni: string;
}

export interface UserProfileResponseDTO {
  id: number;
  username: string;
  fullName: string;
  email?: string;
  dni?: string | null;
  emailVerified?: boolean;
  lastLoginAt?: string | null;
  graduated: boolean;
  roles: string[];
}

export interface AuthResponseDTO {
  username: string;
  message: string;
  jwt: string;
  status: boolean;
}

export interface CourseResponseDTO {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  monthlyPrice: number;
  active: boolean;
}

export interface CourseRequestDTO {
  title: string;
  description: string;
  level: CourseLevel;
  monthlyPrice: number;
  active: boolean;
}

export interface LessonResponseDTO {
  id: number;
  courseId: number;
  orderIndex: number;
  title: string;
  videoUrl: string;
  description: string;
  activity?: ActivityResponseDTO | null;
}

export interface LessonRequestDTO {
  courseId: number;
  orderIndex: number;
  title: string;
  videoUrl: string;
  description: string;
}

export interface ActivityQuizOptionDTO {
  id: number;
  optionText: string;
  isCorrect: boolean;
}

export interface ActivityQuizQuestionDTO {
  id: number;
  questionText: string;
  orderIndex: number;
  options: ActivityQuizOptionDTO[];
}

export interface ActivityQuizOptionRequestDTO {
  optionText: string;
  isCorrect: boolean;
}

export interface ActivityQuizQuestionRequestDTO {
  questionText: string;
  orderIndex: number;
  options: ActivityQuizOptionRequestDTO[];
}

export interface ActivityResponseDTO {
  id: number;
  lessonId: number;
  type: ActivityType;
  title: string;
  instructions?: string;
  minPassScore: number;
  words: string[];
  questions: ActivityQuizQuestionDTO[];
}

export interface ActivityRequestDTO {
  lessonId: number;
  type: ActivityType;
  title: string;
  instructions?: string;
  minPassScore: number;
  words: string[];
  questions: ActivityQuizQuestionRequestDTO[];
}

export interface CourseRoadmapActivityDTO {
  id: number;
  type: ActivityType;
  title: string;
  minPassScore: number;
}

export interface CourseRoadmapLessonDTO {
  lessonId: number;
  orderIndex: number;
  title: string;
  description: string;
  status: RoadmapLessonStatus;
  score: number;
  activity: CourseRoadmapActivityDTO;
}

export interface CompleteLessonRequestDTO {
  score: number;
}

export interface CompleteLessonResponseDTO {
  lessonId: number;
  status: RoadmapLessonStatus;
  score: number;
  passed: boolean;
  unlockedNextLessonId: number | null;
  courseCompleted: boolean;
}

export interface SubscriptionResponseDTO {
  id: number;
  studentId: number;
  courseId: number;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  amountPaid: number;
  planType?: SubscriptionPlanType;
}

export type SubscriptionStatus = "ACTIVE" | "EXPIRED";
export type SubscriptionPlanType =
  | "SINGLE_COURSE"
  | "MEMBERSHIP_MONTHLY"
  | "MEMBERSHIP_ANNUAL";

export interface SubscriptionRequestDTO {
  studentId: number;
  courseId: number;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  amountPaid: number;
  planType?: SubscriptionPlanType;
}

export interface EbookResponseDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  filePath: string;
  coverUrl: string;
}

export interface EbookRequestDTO {
  title: string;
  description: string;
  price: number;
  filePath: string;
  coverUrl: string;
}

export interface EbookPurchaseRequestDTO {
  studentId: number;
  ebookId: number;
  purchaseDate: string;
  amountPaid: number;
}

export interface EbookPurchaseResponseDTO {
  id: number;
  studentId: number;
  ebookId: number;
  purchaseDate: string;
  amountPaid: number;
}

export interface PaymentPreferenceRequestDTO {
  itemType:
    | "COURSE"
    | "EBOOK"
    | "MEMBERSHIP_MONTHLY"
    | "MEMBERSHIP_ANNUAL";
  itemId: number;
  studentId: number;
}

export interface PaymentPreferenceResponseDTO {
  preferenceId: string;
  initPoint: string;
  sandboxSimulated: boolean;
  message: string;
}

export interface ApiErrorResponse {
  message: string;
  status?: number;
  timestamp?: string;
  errors?: Record<string, string>;
}
