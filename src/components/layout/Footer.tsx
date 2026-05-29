export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8 text-center">
      <p className="text-xs text-stone-400">
        © {new Date().getFullYear()} Rainbow Language Academy · Todos los
        derechos reservados
      </p>
    </footer>
  );
}
