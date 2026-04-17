export default function StepProfile({ formData, setFormData, onNext, onBack }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]"></div>
        </div>
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
          Step <span className="text-cyan-400">04</span> of 04
        </span>
      </div>

      <header className="mb-6">
        <h2 className="font-headline text-2xl font-extrabold text-slate-50 tracking-tight mb-2">Financial Profile</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">To ensure compliance and tailor your experience, please provide your professional and trading background.</p>
      </header>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Employment Status */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Employment Status</label>
          <div className="relative group">
            <select 
              className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-5 pr-12 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm outline-none appearance-none"
              name="employment_status"
              value={formData.employment_status || ""}
              onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
              required
            >
              <option disabled value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
              <option value="unemployed">Unemployed</option>
              <option value="other">Other</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Monthly Income (USD)</label>
          <div className="relative group">
            <select 
              className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-5 pr-12 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm outline-none appearance-none"
              name="monthly_income"
              value={formData.monthly_income || ""}
              onChange={(e) => setFormData({ ...formData, monthly_income: e.target.value })}
              required
            >
              <option disabled value="">Select range</option>
              <option value="under_10k">Under $10k</option>
              <option value="10k_25k">$10k - $25k</option>
              <option value="25k_50k">$25k - $50k</option>
              <option value="50k_100k">$50k - $100k</option>
              <option value="100k_250k">$100k - $250k</option>
              <option value="over_250k">Over $250k</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl pointer-events-none">account_balance_wallet</span>
          </div>
        </div>

        {/* Trading Experience */}
        <div className="space-y-3">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Trading Experience</label>
          <div className="grid grid-cols-5 gap-2">
            {/* None */}
            <label className="cursor-pointer">
              <input 
                className="peer sr-only" 
                name="experience" 
                type="radio" 
                value="none"
                checked={formData.experience === 'none'}
                onChange={() => setFormData({ ...formData, experience: 'none' })}
                required
              />
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-highest/20 border border-outline-variant/10 transition-all peer-checked:border-cyan-400/50 peer-checked:bg-cyan-400/10 group">
                <span className={`material-symbols-outlined text-xl mb-1 ${formData.experience === 'none' ? 'text-cyan-400' : 'text-on-surface-variant/50'}`}>block</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">None</span>
              </div>
            </label>
            {/* Beginner */}
            <label className="cursor-pointer">
              <input 
                className="peer sr-only" 
                name="experience" 
                type="radio" 
                value="beginner"
                checked={formData.experience === 'beginner'}
                onChange={() => setFormData({ ...formData, experience: 'beginner' })}
              />
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-highest/20 border border-outline-variant/10 transition-all peer-checked:border-cyan-400/50 peer-checked:bg-cyan-400/10">
                <span className={`material-symbols-outlined text-xl mb-1 ${formData.experience === 'beginner' ? 'text-cyan-400' : 'text-on-surface-variant/50'}`}>school</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">Begin</span>
              </div>
            </label>
            {/* Intermediate */}
            <label className="cursor-pointer">
              <input 
                className="peer sr-only" 
                name="experience" 
                type="radio" 
                value="intermediate"
                checked={formData.experience === 'intermediate'}
                onChange={() => setFormData({ ...formData, experience: 'intermediate' })}
              />
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-highest/20 border border-outline-variant/10 transition-all peer-checked:border-cyan-400/50 peer-checked:bg-cyan-400/10">
                <span className={`material-symbols-outlined text-xl mb-1 ${formData.experience === 'intermediate' ? 'text-cyan-400' : 'text-on-surface-variant/50'}`}>trending_up</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">Inter</span>
              </div>
            </label>
            {/* Experienced */}
            <label className="cursor-pointer">
              <input 
                className="peer sr-only" 
                name="experience" 
                type="radio" 
                value="experienced"
                checked={formData.experience === 'experienced'}
                onChange={() => setFormData({ ...formData, experience: 'experienced' })}
              />
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-highest/20 border border-outline-variant/10 transition-all peer-checked:border-cyan-400/50 peer-checked:bg-cyan-400/10">
                <span className={`material-symbols-outlined text-xl mb-1 ${formData.experience === 'experienced' ? 'text-cyan-400' : 'text-on-surface-variant/50'}`}>stars</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">Exp</span>
              </div>
            </label>
            {/* Professional */}
            <label className="cursor-pointer">
              <input 
                className="peer sr-only" 
                name="experience" 
                type="radio" 
                value="professional"
                checked={formData.experience === 'professional'}
                onChange={() => setFormData({ ...formData, experience: 'professional' })}
              />
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-highest/20 border border-outline-variant/10 transition-all peer-checked:border-cyan-400/50 peer-checked:bg-cyan-400/10">
                <span className={`material-symbols-outlined text-xl mb-1 ${formData.experience === 'professional' ? 'text-cyan-400' : 'text-on-surface-variant/50'}`}>verified_user</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">Pro</span>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">
          <button 
            className="flex-1 px-8 py-3 rounded-lg bg-surface-container-high text-on-surface-variant font-label text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-surface-container-highest transition-colors active:scale-[0.98] duration-200 flex items-center justify-center gap-2" 
            type="button"
            onClick={onBack}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
          <button 
            className="flex-[2] px-8 py-3 rounded-lg bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-fixed font-label text-[11px] uppercase tracking-[0.2em] font-black hover:brightness-110 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all active:scale-[0.98] duration-200 flex items-center justify-center gap-2" 
            type="submit"
          >
            Complete Setup
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </form>
    </>
  );
}
