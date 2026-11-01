"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, BookOpen, ClipboardList, Pencil, Plus, Trash2, Users } from "lucide-react";
import ActivityEditor from "@/components/admin/ActivityEditor";
import { courses, ebooks, lessons, students, verifyPassword } from "@/lib/api";
import type {
  CourseRequestDTO,
  CourseResponseDTO,
  EbookRequestDTO,
  EbookResponseDTO,
  LessonRequestDTO,
  LessonResponseDTO,
  UserProfileResponseDTO,
} from "@/types/api";

const inputClass = "mt-2 h-11 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm text-stone-700 outline-none focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10";
const emptyCourse: CourseRequestDTO = { title: "", description: "", level: "BEGINNER", monthlyPrice: 0, active: true };
const emptyLesson: LessonRequestDTO = { courseId: 0, orderIndex: 1, title: "", videoUrl: "", description: "" };
const emptyEbook: EbookRequestDTO = { title: "", description: "", price: 0, filePath: "", coverUrl: "" };

type Section = "courses" | "students" | "ebooks";
type Layer = "courses" | "lessons" | "lesson-editor";

export default function AdminPage() {
  const [section, setSection] = useState<Section>("courses");
  const [courseList, setCourseList] = useState<CourseResponseDTO[]>([]);
  const [ebookList, setEbookList] = useState<EbookResponseDTO[]>([]);
  const [studentList, setStudentList] = useState<UserProfileResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [nextCourses, nextEbooks, nextStudents] = await Promise.all([
        courses.getCourses(),
        ebooks.getEbooks(),
        students.getStudents(),
      ]);
      setCourseList(nextCourses);
      setEbookList(nextEbooks);
      setStudentList(nextStudents);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No pudimos cargar el panel.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);
  const showNotice = (value: string) => {
    setNotice(value);
    window.setTimeout(() => setNotice(null), 3500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50/70 via-purple-50/50 to-sky-50/70 pb-16">
      <header className="border-b border-purple-100/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-10 md:px-12">
          <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7aaee8]">Panel de administración</p><h1 className="mt-2 text-4xl text-stone-900" style={{ fontFamily: "var(--font-playfair)" }}>Rainbow Academy</h1></div>
          <button type="button" onClick={() => void load()} className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600">Actualizar</button>
          <nav className="flex w-full flex-wrap gap-2">
            {([["courses", "Cursos y contenido", BookOpen], ["students", "Alumnos", Users], ["ebooks", "Ebooks", ClipboardList]] as const).map(([key, label, Icon]) => (
              <button key={key} type="button" onClick={() => setSection(key)} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold ${section === key ? "bg-gradient-to-r from-pink-100 via-purple-100 to-sky-100 text-[#8062c4]" : "border border-purple-100 bg-white text-stone-500"}`}><Icon className="size-4" />{label}</button>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-12">
        {loading && <Notice tone="info">Cargando datos del backend...</Notice>}
        {error && <Notice tone="error">{error}<button type="button" onClick={() => void load()} className="ml-3 underline">Reintentar</button></Notice>}
        {notice && <Notice tone="success">{notice}</Notice>}
        {!loading && !error && section === "courses" && <CourseDrillDown courses={courseList} onCoursesChange={setCourseList} onNotice={showNotice} onError={setError} />}
        {!loading && !error && section === "students" && <StudentsPanel data={studentList} onChange={setStudentList} onNotice={showNotice} onError={setError} />}
        {!loading && !error && section === "ebooks" && <EbooksPanel data={ebookList} onChange={setEbookList} onNotice={showNotice} onError={setError} />}
      </div>
    </main>
  );
}

function CourseDrillDown({ courses: courseList, onCoursesChange, onNotice, onError }: { courses: CourseResponseDTO[]; onCoursesChange: (items: CourseResponseDTO[]) => void; onNotice: (message: string) => void; onError: (message: string) => void }) {
  const [layer, setLayer] = useState<Layer>("courses");
  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDTO | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonResponseDTO | null>(null);
  const [lessonList, setLessonList] = useState<LessonResponseDTO[]>([]);
  const [courseForm, setCourseForm] = useState<CourseRequestDTO>(emptyCourse);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [lessonForm, setLessonForm] = useState<LessonRequestDTO>(emptyLesson);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ kind: "course" | "lesson"; id: number; name: string } | null>(null);

  const openCourse = async (course: CourseResponseDTO) => {
    setSelectedCourse(course);
    setLessonList(await lessons.getLessonsByCourse(course.id));
    setLayer("lessons");
  };
  const saveCourse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const saved = editingCourseId === null ? await courses.createCourse(courseForm) : await courses.updateCourse(editingCourseId, courseForm);
      onCoursesChange(editingCourseId === null ? [...courseList, saved] : courseList.map((item) => item.id === saved.id ? saved : item));
      setCourseForm(emptyCourse); setEditingCourseId(null); onNotice("Curso guardado correctamente.");
    } catch (saveError) { onError(saveError instanceof Error ? saveError.message : "No pudimos guardar el curso."); }
  };
  const saveLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const saved = editingLessonId === null ? await lessons.createLesson(lessonForm) : await lessons.updateLesson(editingLessonId, lessonForm);
      setLessonList((items) => editingLessonId === null ? [...items, saved].sort((a, b) => a.orderIndex - b.orderIndex) : items.map((item) => item.id === saved.id ? saved : item));
      setLessonForm({ ...emptyLesson, courseId: selectedCourse?.id ?? 0 }); setEditingLessonId(null); onNotice("Lección guardada correctamente.");
    } catch (saveError) { onError(saveError instanceof Error ? saveError.message : "No pudimos guardar la lección."); }
  };
  const confirmDelete = async (password: string) => {
    if (!deleteTarget) return;
    try {
      await verifyPassword(password);
      if (deleteTarget.kind === "course") {
        await courses.deleteCourse(deleteTarget.id);
        onCoursesChange(courseList.filter((item) => item.id !== deleteTarget.id));
        if (selectedCourse?.id === deleteTarget.id) setLayer("courses");
      } else {
        await lessons.deleteLesson(deleteTarget.id);
        setLessonList((items) => items.filter((item) => item.id !== deleteTarget.id));
      }
      setDeleteTarget(null); onNotice("Eliminado correctamente.");
    } catch (deleteError) { onError(deleteError instanceof Error ? deleteError.message : "Contraseña incorrecta"); }
  };
  const saveEditorLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLesson) return;
    try {
      const saved = await lessons.updateLesson(selectedLesson.id, lessonForm);
      setSelectedLesson(saved);
      setLessonList((items) => items.map((item) => item.id === saved.id ? saved : item));
      onNotice("Video y descripción actualizados.");
    } catch (saveError) {
      onError(saveError instanceof Error ? saveError.message : "No pudimos actualizar la lección.");
    }
  };

  if (layer === "lesson-editor" && selectedLesson && selectedCourse) {
    return <section className="space-y-5"><button type="button" onClick={() => setLayer("lessons")} className="inline-flex items-center gap-2 text-sm font-semibold text-[#527db3]"><ArrowLeft className="size-4" />Volver a Lecciones de {selectedCourse.title}</button><div className="rounded-[1.75rem] border border-purple-100 bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7aaee8]">Lección #{selectedLesson.orderIndex}</p><h2 className="mt-2 text-3xl font-semibold text-stone-800">{selectedLesson.title}</h2><p className="mt-2 text-sm text-stone-500">Editor de video, descripción y actividad.</p><FormCard title="Video y descripción" onSubmit={saveEditorLesson}><Field label="URL del video" value={lessonForm.videoUrl} onChange={(value) => setLessonForm({ ...lessonForm, videoUrl: value })} /><Field label="Descripción" value={lessonForm.description} onChange={(value) => setLessonForm({ ...lessonForm, description: value })} textarea /><button className="rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-white">Guardar cambios</button></FormCard><div className="mt-6"><ActivityEditor key={selectedLesson.id} courses={[selectedCourse]} lessons={[selectedLesson]} selectedCourseId={selectedCourse.id} initialLessonId={selectedLesson.id} onCourseChange={() => undefined} onError={onError} onNotice={onNotice} /></div></div></section>;
  }
  if (layer === "lessons" && selectedCourse) {
    return <section className="space-y-6"><div className="flex flex-wrap items-center justify-between gap-4"><button type="button" onClick={() => setLayer("courses")} className="inline-flex items-center gap-2 text-sm font-semibold text-[#527db3]"><ArrowLeft className="size-4" />Volver a Cursos</button><button type="button" onClick={() => { setEditingLessonId(null); setLessonForm({ ...emptyLesson, courseId: selectedCourse.id }); }} className="rounded-full bg-stone-800 px-4 py-2 text-sm font-semibold text-white">+ Nueva Lección en este Curso</button></div><h2 className="text-3xl font-semibold text-stone-800">{selectedCourse.title}</h2><div className="grid gap-4 md:grid-cols-2">{lessonList.map((lesson) => <article key={lesson.id} className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-[#7aaee8]">Lección {lesson.orderIndex}</p><h3 className="mt-2 text-lg font-semibold text-stone-800">{lesson.title}</h3><p className="mt-2 text-sm text-stone-500">{lesson.description}</p><span className="mt-3 inline-flex rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">{lesson.activity ? `${lesson.activity.type === "QUIZ" ? "❓ Quiz" : "🧩 Sopa de Letras"}: ${lesson.activity.title}` : "Sin actividad"}</span><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => { setSelectedLesson(lesson); setLessonForm(lesson); setLayer("lesson-editor"); }} className="rounded-xl bg-purple-100 px-3 py-2 text-xs font-semibold text-purple-700">🎬 Configurar Lección y Actividad</button><button type="button" onClick={() => { setEditingLessonId(lesson.id); setLessonForm(lesson); }} className="rounded-xl bg-sky-100 px-3 py-2 text-xs font-semibold text-sky-700">✏️ Editar Datos</button><button type="button" onClick={() => setDeleteTarget({ kind: "lesson", id: lesson.id, name: lesson.title })} className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700">🗑️ Eliminar</button></div></article>)}</div><FormCard title={editingLessonId === null ? "Nueva lección" : "Editar lección"} onSubmit={saveLesson}><Field label="Título" value={lessonForm.title} onChange={(value) => setLessonForm({ ...lessonForm, title: value })} /><Field label="Orden" type="number" value={lessonForm.orderIndex} onChange={(value) => setLessonForm({ ...lessonForm, orderIndex: Number(value) })} /><Field label="URL del video" value={lessonForm.videoUrl} onChange={(value) => setLessonForm({ ...lessonForm, videoUrl: value })} /><Field label="Descripción" value={lessonForm.description} onChange={(value) => setLessonForm({ ...lessonForm, description: value })} textarea /><button className="rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-white">Guardar lección</button></FormCard>{deleteTarget && <PasswordModal target={deleteTarget.name} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />}</section>;
  }
  return <section className="space-y-6"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7aaee8]">Capa 1 · Cursos y contenido</p><h2 className="mt-2 text-3xl font-semibold text-stone-800">Cursos</h2></div><button type="button" onClick={() => { setEditingCourseId(null); setCourseForm(emptyCourse); }} className="rounded-full bg-stone-800 px-4 py-2 text-sm font-semibold text-white"><Plus className="mr-1 inline size-4" />Crear Nuevo Curso</button></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{courseList.map((course) => <article key={course.id} className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><h3 className="text-xl font-semibold text-stone-800">{course.title}</h3><p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#7aaee8]">{course.level}</p><p className="mt-3 text-sm text-stone-500">{course.description}</p><p className="mt-3 font-semibold text-stone-800">${course.monthlyPrice.toLocaleString("es-AR")}</p><div className="mt-5 grid gap-2"><button type="button" onClick={() => void openCourse(course)} className="rounded-xl bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-700">📂 Entrar al Curso (Ver Lecciones)</button><button type="button" onClick={() => { setEditingCourseId(course.id); setCourseForm(course); }} className="rounded-xl bg-sky-100 px-3 py-2 text-sm font-semibold text-sky-700"><Pencil className="mr-1 inline size-4" />Editar</button><button type="button" onClick={() => setDeleteTarget({ kind: "course", id: course.id, name: course.title })} className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700"><Trash2 className="mr-1 inline size-4" />Eliminar</button></div></article>)}</div><FormCard title={editingCourseId === null ? "Nuevo curso" : "Editar curso"} onSubmit={saveCourse}><Field label="Título" value={courseForm.title} onChange={(value) => setCourseForm({ ...courseForm, title: value })} /><Field label="Descripción" value={courseForm.description} onChange={(value) => setCourseForm({ ...courseForm, description: value })} textarea /><Field label="Precio" type="number" value={courseForm.monthlyPrice} onChange={(value) => setCourseForm({ ...courseForm, monthlyPrice: Number(value) })} /><label className="text-xs font-semibold text-stone-600">Nivel<select value={courseForm.level} onChange={(event) => setCourseForm({ ...courseForm, level: event.target.value as CourseRequestDTO["level"] })} className={inputClass}><option value="BEGINNER">BEGINNER</option><option value="INTERMEDIATE">INTERMEDIATE</option><option value="ADVANCED">ADVANCED</option></select></label><button className="rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-white">Guardar curso</button></FormCard>{deleteTarget && <PasswordModal target={deleteTarget.name} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />}</section>;
}

function PasswordModal({ target, onCancel, onConfirm }: { target: string; onCancel: () => void; onConfirm: (password: string) => Promise<void> }) {
  const [password, setPassword] = useState("");
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 p-4"><form onSubmit={(event) => { event.preventDefault(); void onConfirm(password); }} className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl"><h2 className="text-xl font-semibold text-stone-800">Confirmar eliminación</h2><p className="mt-3 text-sm text-stone-600">¿Estás segura de que querés eliminar &quot;{target}&quot;? Esta acción no se puede deshacer.</p><label className="mt-5 block text-sm font-semibold text-stone-700">Ingresá tu contraseña<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} /></label><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded-xl px-4 py-2 text-sm text-stone-500">Cancelar</button><button className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white">Confirmar</button></div></form></div>;
}

function StudentsPanel({ data, onChange, onNotice, onError }: { data: UserProfileResponseDTO[]; onChange: (items: UserProfileResponseDTO[]) => void; onNotice: (message: string) => void; onError: (message: string) => void }) {
  return <section className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold text-stone-800">Alumnos</h2><div className="mt-5 grid gap-3">{data.map((student) => <article key={student.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fffdfa] p-4"><div><p className="font-semibold text-stone-800">{student.fullName}</p><p className="text-sm text-stone-500">{student.email ?? student.username}</p></div><button type="button" onClick={() => void students.updateStudentGraduation(student.id, !student.graduated).then((updated) => { onChange(data.map((item) => item.id === updated.id ? updated : item)); onNotice(updated.graduated ? "Alumno graduado." : "Graduación quitada."); }).catch((actionError: unknown) => onError(actionError instanceof Error ? actionError.message : "No pudimos actualizar el alumno."))} className="rounded-xl bg-purple-100 px-3 py-2 text-xs font-semibold text-purple-700">{student.graduated ? "Desgraduar" : "Graduar"}</button></article>)}</div></section>;
}

function EbooksPanel({ data, onChange, onNotice, onError }: { data: EbookResponseDTO[]; onChange: (items: EbookResponseDTO[]) => void; onNotice: (message: string) => void; onError: (message: string) => void }) {
  const [form, setForm] = useState<EbookRequestDTO>(emptyEbook);
  const [deleteTarget, setDeleteTarget] = useState<EbookResponseDTO | null>(null);
  const save = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); try { const saved = await ebooks.createEbook(form); onChange([...data, saved]); setForm(emptyEbook); onNotice("Ebook creado correctamente."); } catch (saveError) { onError(saveError instanceof Error ? saveError.message : "No pudimos guardar el ebook."); } };
  const remove = async (password: string) => { if (!deleteTarget) return; try { await verifyPassword(password); await ebooks.deleteEbook(deleteTarget.id); onChange(data.filter((item) => item.id !== deleteTarget.id)); setDeleteTarget(null); onNotice("Ebook eliminado correctamente."); } catch (deleteError) { onError(deleteError instanceof Error ? deleteError.message : "Contraseña incorrecta"); } };
  return <section className="space-y-5"><FormCard title="Nuevo ebook" onSubmit={save}><Field label="Título" value={form.title} onChange={(value) => setForm({ ...form, title: value })} /><Field label="Descripción" value={form.description} onChange={(value) => setForm({ ...form, description: value })} textarea /><Field label="Precio" type="number" value={form.price} onChange={(value) => setForm({ ...form, price: Number(value) })} /><Field label="Ruta del archivo" value={form.filePath} onChange={(value) => setForm({ ...form, filePath: value })} /><button className="rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-white">Guardar ebook</button></FormCard><div className="grid gap-4 md:grid-cols-2">{data.map((ebook) => <article key={ebook.id} className="rounded-3xl border border-purple-100 bg-white p-5"><h3 className="font-semibold text-stone-800">{ebook.title}</h3><p className="mt-2 text-sm text-stone-500">{ebook.description}</p><button type="button" onClick={() => setDeleteTarget(ebook)} className="mt-4 rounded-xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700">🗑️ Eliminar</button></article>)}</div>{deleteTarget && <PasswordModal target={deleteTarget.title} onCancel={() => setDeleteTarget(null)} onConfirm={remove} />}</section>;
}

function FormCard({ title, onSubmit, children }: { title: string; onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>; children: ReactNode }) { return <form onSubmit={onSubmit} className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold text-stone-800">{title}</h3><div className="mt-4 grid gap-4">{children}</div></form>; }
function Field({ label, value, onChange, type = "text", textarea = false }: { label: string; value: string | number; onChange: (value: string) => void; type?: string; textarea?: boolean }) { return <label className="text-xs font-semibold text-stone-600">{label}{textarea ? <textarea required value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} h-24 py-3`} /> : <input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />}</label>; }
function Notice({ tone, children }: { tone: "info" | "error" | "success"; children: ReactNode }) { const styles = { info: "bg-[#f5f8fc] text-[#527db3]", error: "bg-[#fff0ed] text-[#a34d45]", success: "bg-[#eaf5e5] text-[#3b6d11]" }; return <div className={`mb-4 rounded-2xl border border-white p-4 text-sm ${styles[tone]}`}>{children}</div>; }
