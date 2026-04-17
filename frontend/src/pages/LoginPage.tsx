import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { validateLoginForm } from "../utils/validators";
import LegalModal from "../components/LegalModal";

export default function LoginPage() {
  const [legalType, setLegalType] = useState<null | 'privacy' | 'support' | 'terms'>(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
    if (validationError) setValidationError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setValidationError("");

    const validation = validateLoginForm(identifier, password);
    if (!validation.valid) {
      setValidationError(validation.error || "");
      return;
    }

    setIsLoading(true);
    try {
      await login(identifier, password);
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-dim text-on-surface flex flex-col min-h-screen overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-secondary-container/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute z-20 top-6 left-6 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-surface-container-high/50 px-4 py-2 rounded-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Main Content Shell */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          {/* Brand Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="flex items-center gap-3 mb-2 group">
              <img 
                src="/trading_logo.png" 
                alt="TradeFlow Logo" 
                className="w-10 h-10 rounded-xl object-cover shadow-2xl shadow-cyan-400/20 ring-1 ring-cyan-400/20 group-hover:scale-110 transition-transform duration-300" 
              />
              <h1 className="font-headline font-black text-2xl tracking-tighter text-slate-50 uppercase">TradeFlow</h1>
            </div>
            <p className="font-label text-xs tracking-[0.2em] text-cyan-400 uppercase">Institutional Grade Infrastructure</p>
          </div>

          {/* Glassmorphism Card */}
          <div className="glass-panel p-8 md:p-12 rounded-xl shadow-2xl shadow-slate-950/50">
            <header className="mb-8">
              <h2 className="font-headline text-2xl font-extrabold text-slate-50 tracking-tight mb-2 text-center md:text-left">Secure Access</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed text-center md:text-left">Precision execution for institutional grade trading.</p>
            </header>

            {/* Form Section */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1" htmlFor="identifier">Email Address or Username</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">mail</span>
                  <input
                    className={`w-full bg-surface-container-highest/40 border-none rounded-lg py-4 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600 ${validationError ? "ring-1 ring-error/50" : ""}`}
                    id="identifier"
                    name="identifier"
                    placeholder={""}
                    type="text"
                    value={identifier}
                    onChange={handleIdentifierChange}
                    required
                  />
                </div>
                {validationError && (
                  <p className="text-error text-sm mt-1">{validationError}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1 px-1">
                  <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium" htmlFor="password">Access Key</label>
                  <a className="text-[10px] uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors" href="#">Forgot?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">lock</span>
                  <input
                    className="w-full bg-surface-container-highest/40 border-none rounded-lg py-4 pl-12 pr-12 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600"
                    id="password"
                    name="password"
                    placeholder=""
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-cyan-400 transition-colors pointer-events-auto z-10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {localError && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg text-sm">
                  {localError}
                </div>
              )}

              {/* Primary Action */}
              <div className="pt-4">
                <button
                  className="w-full py-4 rounded-lg bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-fixed font-label text-[11px] uppercase tracking-[0.2em] font-black hover:brightness-110 neon-glow transition-all active:scale-[0.98] duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Sign In"}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Alternative Action */}
            <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
              <p className="font-body text-sm text-on-surface-variant">
                New to the terminal?
                <Link to="/register" className="text-cyan-400 font-medium hover:underline decoration-cyan-400/30 underline-offset-4 ml-1">Create Account</Link>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <footer className="mt-8 flex justify-center gap-8 text-[10px] font-label uppercase tracking-widest text-slate-600">
            <button type="button" onClick={() => setLegalType('privacy')} className="hover:text-cyan-400 transition-colors uppercase">Privacy Protocol</button>
            <button type="button" onClick={() => setLegalType('support')} className="hover:text-cyan-400 transition-colors uppercase">Encrypted Support</button>
            <button type="button" onClick={() => setLegalType('terms')} className="hover:text-cyan-400 transition-colors uppercase">Terms of Access</button>
          </footer>
        </div>
      </main>

      {/* Side Graphic Decor */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 rotate-90 origin-left">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
          <span className="text-[9px] uppercase tracking-[0.5em] text-slate-700 font-headline font-bold">Encrypted End-To-End</span>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        </div>
      </div>

      {/* Legal Footer */}
      <footer className="relative z-10 w-full py-6 px-8 flex justify-center items-center">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-600">
          © {new Date().getFullYear()} TradeFlow Trading. Precision execution.
        </p>
      </footer>

      <LegalModal
        isOpen={!!legalType}
        onClose={() => setLegalType(null)}
        type={legalType}
      />
    </div>
  );
}
