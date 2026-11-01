import type {
  ActivityRequestDTO,
  ActivityResponseDTO,
  ApiErrorResponse,
  AuthLoginRequestDTO,
  AuthRegisterRequestDTO,
  AuthResponseDTO,
  CompleteLessonRequestDTO,
  CompleteLessonResponseDTO,
  CourseRequestDTO,
  CourseResponseDTO,
  CourseRoadmapLessonDTO,
  EbookPurchaseResponseDTO,
  EbookPurchaseRequestDTO,
  EbookRequestDTO,
  EbookResponseDTO,
  LessonRequestDTO,
  LessonResponseDTO,
  PaymentPreferenceRequestDTO,
  PaymentPreferenceResponseDTO,
  SubscriptionRequestDTO,
  SubscriptionResponseDTO,
  UserProfileResponseDTO,
} from "@/types/api";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
).replace(/\/$/, "");
const TOKEN_KEY = "rainbow-academy-token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  readonly status: number;
  readonly response: ApiErrorResponse;

  constructor(status: number, response: ApiErrorResponse) {
    super(response.message || "Ocurrió un error al comunicarse con el servidor.");
    this.name = "ApiError";
    this.status = status;
    this.response = response;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = getStoredToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (response.status === 204) return undefined as T;

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const errorBody: ApiErrorResponse =
      typeof body === "object" && body !== null
        ? (body as ApiErrorResponse)
        : { message: `La solicitud falló (${response.status}).` };
    throw new ApiError(response.status, errorBody);
  }

  return body as T;
}

const json = (body: unknown): RequestInit => ({
  method: "POST",
  body: JSON.stringify(body),
});

export const api = {
  auth: {
    login: (data: AuthLoginRequestDTO) =>
      request<AuthResponseDTO>("/api/auth/login", json(data)),
    register: (data: AuthRegisterRequestDTO) =>
      request<AuthResponseDTO>("/api/auth/register", json(data)),
    verifyPassword: (password: string) =>
      request<void>("/api/auth/verify-password", json({ password })),
    getMe: () => request<UserProfileResponseDTO>("/api/auth/me"),
  },
  courses: {
    getCourses: () => request<CourseResponseDTO[]>("/api/courses"),
    createCourse: (data: CourseRequestDTO) =>
      request<CourseResponseDTO>("/api/courses", json(data)),
    updateCourse: (id: number, data: CourseRequestDTO) =>
      request<CourseResponseDTO>(`/api/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    deleteCourse: (id: number) =>
      request<void>(`/api/courses/${id}`, { method: "DELETE" }),
    getCourseRoadmap: (courseId: number, studentId: number) =>
      request<CourseRoadmapLessonDTO[]>(
        `/api/courses/${courseId}/roadmap?studentId=${studentId}`,
      ),
  },
  lessons: {
    getLessonsByCourse: (courseId: number) =>
      request<LessonResponseDTO[]>(`/api/lessons/course/${courseId}`),
    createLesson: (data: LessonRequestDTO) =>
      request<LessonResponseDTO>("/api/lessons", json(data)),
    getLessonActivity: (lessonId: number) =>
      request<ActivityResponseDTO>(`/api/lessons/${lessonId}/activity`),
    updateLesson: (id: number, data: LessonRequestDTO) =>
      request<LessonResponseDTO>(`/api/lessons/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    deleteLesson: (id: number) =>
      request<void>(`/api/lessons/${id}`, { method: "DELETE" }),
    completeLesson: (lessonId: number, studentId: number, score: number) =>
      request<CompleteLessonResponseDTO>(
        `/api/lessons/${lessonId}/complete?studentId=${studentId}`,
        json({ score } satisfies CompleteLessonRequestDTO),
      ),
  },
  activities: {
    createActivity: (data: ActivityRequestDTO) =>
      request<ActivityResponseDTO>("/api/activities", json(data)),
    updateActivity: (id: number, data: ActivityRequestDTO) =>
      request<ActivityResponseDTO>(`/api/activities/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    getActivity: (id: number) =>
      request<ActivityResponseDTO>(`/api/activities/${id}`),
  },
  subscriptions: {
    getStudentSubscriptions: (studentId: number) =>
      request<SubscriptionResponseDTO[]>(
        `/api/subscriptions/student/${studentId}`,
      ),
    createSubscription: (data: SubscriptionRequestDTO) =>
      request<SubscriptionResponseDTO>("/api/subscriptions", json(data)),
  },
  ebooks: {
    getEbooks: () => request<EbookResponseDTO[]>("/api/ebooks"),
    createEbook: (data: EbookRequestDTO) =>
      request<EbookResponseDTO>("/api/ebooks", json(data)),
    updateEbook: (id: number, data: EbookRequestDTO) =>
      request<EbookResponseDTO>(`/api/ebooks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    deleteEbook: (id: number) =>
      request<void>(`/api/ebooks/${id}`, { method: "DELETE" }),
    getStudentEbookPurchases: (studentId: number) =>
      request<EbookPurchaseResponseDTO[]>(
        `/api/ebook-purchases/student/${studentId}`,
      ),
    purchaseEbook: (data: EbookPurchaseRequestDTO) =>
      request<EbookPurchaseResponseDTO>("/api/ebook-purchases", json(data)),
    checkEbookAccess: (ebookId: number, studentId: number) =>
      request<EbookResponseDTO>(
        `/api/ebooks/${ebookId}/access?studentId=${studentId}`,
      ),
  },
  students: {
    getStudents: () => request<UserProfileResponseDTO[]>("/api/users/students"),
    updateStudentGraduation: (userId: number, graduated: boolean) =>
      request<UserProfileResponseDTO>(
        `/api/users/${userId}/graduation?graduated=${graduated}`,
        { method: "PATCH" },
      ),
    sendStudentReminder: (userId: number) =>
      request<void>(`/api/users/${userId}/send-reminder`, json({})),
    sendStudentCertificate: (userId: number) =>
      request<void>(`/api/users/${userId}/send-certificate`, json({})),
  },
  payments: {
    createPaymentPreference: (payload: PaymentPreferenceRequestDTO) =>
      request<PaymentPreferenceResponseDTO>(
        "/api/payments/create-preference",
        json(payload),
      ),
  },
};

export const {
  auth,
  courses,
  lessons,
  activities,
  subscriptions,
  ebooks,
  students,
  payments,
} = api;

export const {
  login,
  register,
  getMe,
  verifyPassword,
} = auth;
export const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseRoadmap,
} = courses;
export const {
  getLessonsByCourse,
  createLesson,
  getLessonActivity,
  updateLesson,
  deleteLesson,
  completeLesson,
} = lessons;
export const { createActivity, updateActivity, getActivity } = activities;
export const { getStudentSubscriptions, createSubscription } = subscriptions;
export const {
  getEbooks,
  createEbook,
  updateEbook,
  deleteEbook,
  getStudentEbookPurchases,
  purchaseEbook,
  checkEbookAccess,
} = ebooks;
export const {
  getStudents,
  updateStudentGraduation,
  sendStudentReminder,
  sendStudentCertificate,
} = students;
export const { createPaymentPreference } = payments;
