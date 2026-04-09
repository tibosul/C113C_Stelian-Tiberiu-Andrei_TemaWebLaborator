interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <h1 className="text-2xl font-bold text-emerald-400">{title}</h1>
    </header>
  );
}
