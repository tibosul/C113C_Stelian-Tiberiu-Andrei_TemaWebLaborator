import Header from './components/Header';
import ServerStatus from './components/ServerStatus';
import { useHealthCheck } from './hooks/useApi';

function App() {
  const status = useHealthCheck();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header title="Trading App" />
      <main className="p-6">
        <div className="bg-slate-800 rounded-lg p-6 max-w-md">
          <ServerStatus status={status} />
        </div>
      </main>
    </div>
  );
}

export default App