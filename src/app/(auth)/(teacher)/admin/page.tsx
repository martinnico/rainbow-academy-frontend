"use client";

import { useState } from "react";
import {
  Check,
  ClipboardList,
  Edit3,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";

type PaymentStatus = "vigente" | "adeuda";
type Sex = "Femenino" | "Masculino" | "Otro";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: Sex;
  email: string;
  phone: string;
  paymentStatus: PaymentStatus;
};

type StudentForm = Omit<Student, "id">;

const emptyForm: StudentForm = {
  firstName: "",
  lastName: "",
  age: 0,
  sex: "Femenino",
  email: "",
  phone: "",
  paymentStatus: "vigente",
};

const initialStudents: Student[] = [
  {
    id: 1,
    firstName: "Camila",
    lastName: "Fernández",
    age: 24,
    sex: "Femenino",
    email: "camila.fernandez@email.com",
    phone: "+54 9 3764 56-5439",
    paymentStatus: "vigente",
  },
  {
    id: 2,
    firstName: "Mateo",
    lastName: "Gómez",
    age: 19,
    sex: "Masculino",
    email: "mateo.gomez@email.com",
    phone: "+54 9 3764 22-1048",
    paymentStatus: "adeuda",
  },
  {
    id: 3,
    firstName: "Sofía",
    lastName: "Benítez",
    age: 31,
    sex: "Femenino",
    email: "sofia.benitez@email.com",
    phone: "+54 9 3764 88-2201",
    paymentStatus: "vigente",
  },
  {
    id: 4,
    firstName: "Tomás",
    lastName: "Ríos",
    age: 27,
    sex: "Masculino",
    email: "tomas.rios@email.com",
    phone: "+54 9 3764 41-7830",
    paymentStatus: "adeuda",
  },
];

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [form, setForm] = useState<StudentForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | PaymentStatus>(
    "todos",
  );

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim();
    const matchesSearch =
      `${student.firstName} ${student.lastName} ${student.email}`
        .toLowerCase()
        .includes(searchText);
    const matchesStatus =
      statusFilter === "todos" || student.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const currentTitle = editingId === null ? "Agregar alumno" : "Editar alumno";
  const currentButtonLabel =
    editingId === null ? "Guardar alumno" : "Guardar cambios";
  const activeStudents = students.filter(
    (student) => student.paymentStatus === "vigente",
  ).length;
  const studentsWithDebt = students.length - activeStudents;

  const updateField = <Field extends keyof StudentForm>(
    field: Field,
    value: StudentForm[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingId === null) {
      setStudents((current) => [
        ...current,
        {
          ...form,
          id: Date.now(),
          age: Number(form.age),
        },
      ]);
    } else {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingId
            ? { ...student, ...form, age: Number(form.age) }
            : student,
        ),
      );
    }

    resetForm();
  };

  const startEditing = (student: Student) => {
    setEditingId(student.id);
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
      sex: student.sex,
      email: student.email,
      phone: student.phone,
      paymentStatus: student.paymentStatus,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteStudent = (student: Student) => {
    const confirmed = window.confirm(
      `¿Querés borrar a ${student.firstName} ${student.lastName}?`,
    );

    if (!confirmed) {
      return;
    }

    setStudents((current) => current.filter((item) => item.id !== student.id));

    if (editingId === student.id) {
      resetForm();
    }
  };

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  return (
    <main className="min-h-screen bg-stone-50 pb-16">
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 10% 10%, rgba(232,216,122,.28), transparent 24%), radial-gradient(circle at 90% 40%, rgba(155,122,232,.16), transparent 30%), radial-gradient(circle at 50% 100%, rgba(122,174,232,.12), transparent 34%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7aaee8]">
                Panel de administración
              </p>
              <h1
                className="mt-3 text-4xl leading-tight text-stone-900 md:text-5xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Alumnos de Rainbow Academy
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600 md:text-base">
                Organizá los datos de tus alumnos y mantené sus cuotas al día
                desde un solo lugar.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[#e8d87a]/35 text-[#927f1c]">
                <ClipboardList className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                  Registros
                </p>
                <p className="mt-1 text-xl font-semibold text-stone-800">
                  {students.length} alumnos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-8 md:px-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Users className="size-5" />}
            label="Total de alumnos"
            value={students.length}
            color="#7aaee8"
          />
          <StatCard
            icon={<Check className="size-5" />}
            label="Cuotas vigentes"
            value={activeStudents}
            color="#8dc87a"
          />
          <StatCard
            icon={<ClipboardList className="size-5" />}
            label="Cuotas adeudadas"
            value={studentsWithDebt}
            color="#e8847a"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pt-8 md:px-12 xl:grid-cols-[350px_1fr]">
        <aside className="h-fit rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm xl:sticky xl:top-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
                {editingId === null
                  ? "Nuevo registro"
                  : "Registro seleccionado"}
              </p>
              <h2
                className="mt-2 text-2xl font-semibold text-stone-800"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {currentTitle}
              </h2>
            </div>
            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                aria-label="Cancelar edición"
                className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Nombre"
                value={form.firstName}
                onChange={(value) => updateField("firstName", value)}
                required
              />
              <FormField
                label="Apellido"
                value={form.lastName}
                onChange={(value) => updateField("lastName", value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Edad"
                type="number"
                min={1}
                max={120}
                value={form.age || ""}
                onChange={(value) => updateField("age", Number(value))}
                required
              />
              <label className="block text-xs font-semibold text-stone-600">
                Sexo
                <select
                  value={form.sex}
                  onChange={(event) =>
                    updateField("sex", event.target.value as Sex)
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm font-normal text-stone-700 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
                >
                  <option>Femenino</option>
                  <option>Masculino</option>
                  <option>Otro</option>
                </select>
              </label>
            </div>
            <FormField
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              required
            />
            <FormField
              label="Teléfono"
              type="tel"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              required
            />
            <label className="block text-xs font-semibold text-stone-600">
              Estado de cuota
              <select
                value={form.paymentStatus}
                onChange={(event) =>
                  updateField(
                    "paymentStatus",
                    event.target.value as PaymentStatus,
                  )
                }
                className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm font-normal text-stone-700 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
              >
                <option value="vigente">Vigente</option>
                <option value="adeuda">Adeuda</option>
              </select>
            </label>
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-800 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              {editingId === null ? (
                <Plus className="size-4" />
              ) : (
                <Edit3 className="size-4" />
              )}
              {currentButtonLabel}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full text-xs font-semibold text-stone-500 transition hover:text-stone-800"
              >
                Cancelar edición
              </button>
            )}
          </form>
        </aside>

        <div className="min-w-0 rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 border-b border-stone-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
                Directorio
              </p>
              <h2
                className="mt-2 text-2xl font-semibold text-stone-800"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Lista de alumnos
              </h2>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative block">
                <span className="sr-only">Buscar alumno</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar alumno..."
                  className="h-10 w-full rounded-xl border border-stone-200 bg-[#fffdfa] pl-9 pr-3 text-sm outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10 sm:w-52"
                />
              </label>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "todos" | PaymentStatus)
                }
                aria-label="Filtrar por estado de cuota"
                className="h-10 rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm text-stone-600 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
              >
                <option value="todos">Todas las cuotas</option>
                <option value="vigente">Vigentes</option>
                <option value="adeuda">Adeudadas</option>
              </select>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-100 text-[11px] uppercase tracking-[0.16em] text-stone-400">
                  <th className="px-3 pb-3 font-semibold">Alumno</th>
                  <th className="px-3 pb-3 font-semibold">Edad / sexo</th>
                  <th className="px-3 pb-3 font-semibold">Contacto</th>
                  <th className="px-3 pb-3 font-semibold">Cuota</th>
                  <th className="px-3 pb-3 text-right font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="group transition hover:bg-[#fffdfa]"
                  >
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                          style={{ background: avatarColor(student.id) }}
                        >
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </span>
                        <div>
                          <p className="font-semibold text-stone-800">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="mt-1 text-xs text-stone-400">
                            Alumno #{String(student.id).padStart(3, "0")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-stone-600">
                      <p>{student.age} años</p>
                      <p className="mt-1 text-xs text-stone-400">
                        {student.sex}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-sm text-stone-600">
                      <p className="flex items-center gap-2">
                        <Mail className="size-3.5 text-stone-400" />
                        {student.email}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-xs text-stone-400">
                        <Phone className="size-3.5" />
                        {student.phone}
                      </p>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${student.paymentStatus === "vigente" ? "bg-[#eaf5e5] text-[#3b6d11]" : "bg-[#fce9e6] text-[#ad4237]"}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${student.paymentStatus === "vigente" ? "bg-[#8dc87a]" : "bg-[#e8847a]"}`}
                        />
                        {student.paymentStatus}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => startEditing(student)}
                          aria-label={`Editar a ${student.firstName} ${student.lastName}`}
                          className="rounded-lg p-2 text-[#537da9] transition hover:bg-[#e6f1fb]"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteStudent(student)}
                          aria-label={`Borrar a ${student.firstName} ${student.lastName}`}
                          className="rounded-lg p-2 text-[#c45c52] transition hover:bg-[#fce9e6]"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <UserPlus className="size-8 text-stone-300" />
                <p className="mt-3 font-semibold text-stone-600">
                  No encontramos alumnos
                </p>
                <p className="mt-1 text-sm text-stone-400">
                  Probá con otro nombre o limpiá los filtros.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  required = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-semibold text-stone-600">
      {label}
      <input
        required={required}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-[#fffdfa] px-3 text-sm font-normal text-stone-700 outline-none transition focus:border-[#7aaee8] focus:ring-4 focus:ring-[#7aaee8]/10"
      />
    </label>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div
        className="flex size-11 items-center justify-center rounded-2xl text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-stone-400">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold text-stone-800">{value}</p>
      </div>
    </div>
  );
}

function avatarColor(id: number) {
  const colors = ["#e8847a", "#7aaee8", "#9b7ae8", "#8dc87a"];
  return colors[(id - 1) % colors.length];
}
