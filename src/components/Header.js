export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-50">
      <h1 className="text-xl font-bold">Smart Nithy</h1>
      <nav className="flex gap-4 text-sm font-medium">
        <a href="#fans">Fans</a>
        <a href="#lights">Lights</a>
        <a href="#chars">Chars</a>
        <a href="#switches">Switches</a>
      </nav>
    </header>
  );
}
