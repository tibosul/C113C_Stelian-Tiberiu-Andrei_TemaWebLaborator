import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { api } from '../../utils/api';

export default function StepCredentials({ formData, setFormData, onNext, onBack }: any) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Key must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Keys do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/check-availability', {
        email: formData.email,
        username: formData.username
      });

      const { available, taken } = response.data;

      if (!available) {
        if (taken?.email) {
          setError('This corporate email is already registered.');
        } else if (taken?.username) {
          setError('This terminal handle is already in use.');
        } else {
          setError('Credentials already in use.');
        }
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onNext();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Network error checking availability.');
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'None', text: 'text-on-surface-variant', bg: 'bg-surface-container-highest' };
    if (pass.length >= 8) score += 1;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/\d/)) score += 1;
    if (pass.match(/[^a-zA-Z\d]/)) score += 1;

    switch (score) {
      case 0:
      case 1: return { score: 1, label: 'Weak', text: 'text-red-400', bg: 'bg-red-400' };
      case 2: return { score: 2, label: 'Fair', text: 'text-amber-400', bg: 'bg-amber-400' };
      case 3: return { score: 3, label: 'Good', text: 'text-cyan-400', bg: 'bg-cyan-400' };
      case 4: return { score: 4, label: 'Optimal', text: 'text-emerald-400', bg: 'bg-emerald-400' };
      default: return { score: 0, label: 'None', text: 'text-on-surface-variant', bg: 'bg-surface-container-highest' };
    }
  };

  const strength = getPasswordStrength(formData.password || '');

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></div>
        </div>
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
          Step <span className="text-cyan-400">02</span> of 04
        </span>
      </div>

      <header className="mb-6">
        <h2 className="font-headline text-2xl font-extrabold text-slate-50 tracking-tight mb-2">Security Credentials</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">Establish your access keys. Use a high-entropy passphrase for institutional-level security.</p>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 flex items-start gap-3">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <p className="text-sm font-body">{error}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Corporate Email</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">mail</span>
            <input
              className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600"
              placeholder="name@firm.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setError('');
              }}
              required
            />
          </div>
        </div>

        {/* Username Field */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Terminal Handle (Username)</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">person</span>
            <input
              className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600"
              placeholder="Alpha_Trader_01"
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setError('');
              }}
              required
            />
          </div>
        </div>

        {/* Password Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Access Key</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">lock</span>
              <input
                className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-12 pr-12 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600"
                placeholder=""
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setError('');
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-cyan-400 transition-colors pointer-events-auto z-10"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Confirm Key</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">verified_user</span>
              <input
                className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-12 pr-12 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600"
                placeholder=""
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={(e) => {
                  setFormData({ ...formData, confirm_password: e.target.value });
                  setError('');
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-cyan-400 transition-colors pointer-events-auto z-10"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Strength Visual */}
        <div className="pt-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Key Entropy</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${strength.text}`}>
              {strength.label}
            </span>
          </div>
          <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden flex gap-1">
            {[1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`h-full w-1/4 transition-colors duration-500 ${level <= strength.score ? strength.bg : 'bg-surface-container-highest/50'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">
          <button
            className="flex-1 px-8 py-3 rounded-lg bg-surface-container-high text-on-surface-variant font-label text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-surface-container-highest transition-colors active:scale-[0.98] duration-200 flex items-center justify-center gap-2"
            type="button"
            onClick={onBack}
            disabled={isLoading}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
          <button
            className="flex-[2] px-8 py-3 rounded-lg bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-fixed font-label text-[11px] uppercase tracking-[0.2em] font-black hover:brightness-110 shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all active:scale-[0.98] duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Continue to Verification'}
            {!isLoading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          </button>
        </div>
      </form>
    </>
  );
}
