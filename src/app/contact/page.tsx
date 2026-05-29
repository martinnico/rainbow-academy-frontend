const whatsappMessage =
  "Hola, vengo de la pagina de Rainbow Academy. Mi consulta es:";
const whatsappLink = `https://wa.me/5493764565439?text=${encodeURIComponent(
  whatsappMessage,
)}`;
const contactEmail = "rainbowacademyposadas@gmail.com";

export default function ContactPage() {
  return (
    <main className="bg-stone-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute -top-24 right-[-10%] h-72 w-[60%] rounded-full blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(155,122,232,0.35), rgba(122,174,232,0.25), rgba(141,200,122,0.2), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-[-15%] h-64 w-[55%] rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(232,132,122,0.32), rgba(232,168,122,0.22), rgba(232,216,122,0.2), transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <p className="text-xs uppercase tracking-widest text-stone-500">
            Rainbow Academy
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-stone-900 mt-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Contacto directo
          </h1>
          <p className="text-base md:text-lg text-stone-600 mt-4 max-w-2xl">
            Elegi la via mas comoda: WhatsApp para respuesta inmediata o el
            formulario por correo para consultas detalladas.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-emerald-50 border border-emerald-100">
                <svg aria-hidden viewBox="0 0 32 32" className="h-8 w-8">
                  <path
                    fill="#25D366"
                    d="M16 3C9.383 3 4 8.383 4 15c0 2.3.654 4.463 1.884 6.318L4 29l7.908-1.846A12.93 12.93 0 0 0 16 27c6.617 0 12-5.383 12-12S22.617 3 16 3zm0 21.75c-1.74 0-3.422-.456-4.91-1.32l-.35-.204-4.688 1.095 1.015-4.567-.228-.373A9.64 9.64 0 0 1 6.25 15c0-5.382 4.368-9.75 9.75-9.75s9.75 4.368 9.75 9.75-4.368 9.75-9.75 9.75zm5.377-7.312c-.294-.147-1.736-.856-2.005-.954-.27-.098-.466-.147-.66.147-.196.294-.758.954-.93 1.15-.172.196-.344.22-.638.074-.294-.147-1.242-.458-2.365-1.462-.874-.78-1.464-1.745-1.636-2.04-.172-.294-.018-.453.129-.6.132-.132.294-.344.442-.516.147-.172.196-.294.294-.49.098-.196.049-.368-.025-.516-.074-.147-.66-1.594-.906-2.187-.239-.574-.482-.496-.66-.505l-.564-.01c-.196 0-.516.074-.786.368-.27.294-1.034 1.01-1.034 2.463s1.058 2.857 1.206 3.054c.147.196 2.08 3.18 5.04 4.46.704.304 1.252.486 1.68.622.705.224 1.347.192 1.854.116.566-.085 1.736-.708 1.98-1.392.245-.684.245-1.27.172-1.392-.074-.123-.27-.196-.564-.343z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  WhatsApp
                </p>
                <h2
                  className="text-2xl font-semibold text-stone-900"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Conversacion inmediata
                </h2>
              </div>
            </div>
            <p className="text-sm text-stone-600 mt-4">
              Habla con nuestro equipo y recibi respuesta rapida sobre niveles,
              horarios y promociones activas.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-500"
            >
              Abrir WhatsApp
              {/*<span className="text-white/80">+54 9 3764 56-5439</span>*/}
            </a>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-stone-100 border border-stone-200">
                <span className="text-2xl">@</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  Correo
                </p>
                <h2
                  className="text-2xl font-semibold text-stone-900"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Consulta detallada
                </h2>
              </div>
            </div>
            <p className="text-sm text-stone-600 mt-4">
              Dejanos tu correo y una descripcion para responder con toda la
              informacion que necesitas.
            </p>

            <form
              action={`mailto:${contactEmail}`}
              method="post"
              encType="text/plain"
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">
                  Tu correo
                </label>
                <input
                  name="correo"
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none focus:border-stone-400"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-stone-400">
                  Descripcion
                </label>
                <textarea
                  name="descripcion"
                  rows={4}
                  placeholder="Contanos en que podemos ayudarte"
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none focus:border-stone-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-stone-700"
              >
                Enviar correo
              </button>
            </form>

            <p className="text-xs text-stone-500 mt-4">
              Enviaremos tu mensaje a {contactEmail}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
