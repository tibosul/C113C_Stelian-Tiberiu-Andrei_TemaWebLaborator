interface ServerStatusProps {
  status: string;
}

export default function ServerStatus({ status }: ServerStatusProps) {
  const isOnline = status === 'Online';

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-400'}`} />
      <span className="text-slate-400">Status Server:</span>
      <span className={`font-mono ${isOnline ? 'text-emerald-400' : 'text-red-400'}`}>
        {status}
      </span>
    </div>
  );
}
