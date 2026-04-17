import { Link } from "react-router-dom";

export default function StepNameDob({ formData, setFormData, onNext }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - 18 - i));

  // Extract parts formatted as YYYY-MM-DD
  const dobParts = formData.dob ? formData.dob.split('-') : ['', '', ''];
  const dobYear = dobParts.length === 3 ? dobParts[0] : '';
  const dobMonth = dobParts.length === 3 ? dobParts[1] : '';
  const dobDay = dobParts.length === 3 ? dobParts[2] : '';

  const updateDob = (y: string, m: string, d: string) => {
    setFormData({ ...formData, dob: `${y || ''}-${m || ''}-${d || ''}` });
  };

  return (
    <>
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></div>
        </div>
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
          Step <span className="text-cyan-400">01</span> of 04
        </span>
      </div>

      <header className="mb-6">
        <h2 className="font-headline text-2xl font-extrabold text-slate-50 tracking-tight mb-2">Create your identity</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">Please provide your legal details as they appear on your identification documents.</p>
      </header>

      {/* Form Content */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">First Name</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">person</span>
            <input 
              className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600" 
              placeholder="Enter first name" 
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Last Name</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl group-focus-within:text-cyan-400 transition-colors">person</span>
            <input 
              className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm placeholder:text-slate-600" 
              placeholder="Enter last name" 
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1">Date of Birth</label>
          <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-3">
            {/* Day */}
            <div className="relative group">
              <select 
                className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-4 pr-10 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm appearance-none outline-none cursor-pointer"
                value={dobDay}
                onChange={(e) => updateDob(dobYear, dobMonth, e.target.value)}
                required
              >
                <option value="" disabled>Day</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl pointer-events-none">expand_more</span>
            </div>

            {/* Month */}
            <div className="relative group">
              <select 
                className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-4 pr-10 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm appearance-none outline-none cursor-pointer"
                value={dobMonth}
                onChange={(e) => updateDob(dobYear, e.target.value, dobDay)}
                required
              >
                <option value="" disabled>Month</option>
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl pointer-events-none">expand_more</span>
            </div>

            {/* Year */}
            <div className="relative group">
              <select 
                className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 pl-4 pr-10 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm appearance-none outline-none cursor-pointer"
                value={dobYear}
                onChange={(e) => updateDob(e.target.value, dobMonth, dobDay)}
                required
              >
                <option value="" disabled>Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-xl pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6">
          <button 
            className="w-full px-8 py-3 rounded-lg bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-fixed font-label text-[11px] uppercase tracking-[0.2em] font-black hover:brightness-110 shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all active:scale-[0.98] duration-200 flex items-center justify-center gap-2" 
            type="submit"
          >
            Continue
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Secondary Link */}
        <div className="text-center pt-4">
          <p className="text-[11px] text-on-surface-variant">Already have an institutional account? <Link className="text-cyan-400 font-bold hover:underline" to="/login">Log in</Link></p>
        </div>
      </form>
    </>
  );
}
