import { useState, useEffect } from 'react';
import { allowedCountries } from '../../utils/countries';
import { api } from '../../utils/api';

export default function StepContact({ formData, setFormData, onNext, onBack }: any) {
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Debounced availability check
  useEffect(() => {
    const fullPhone = `${formData.phone_country_code}${formData.phone}`;
    
    // Only check if we have a reasonably long phone number
    if (formData.phone.length < 6) {
      setIsAvailable(null);
      setError('');
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      setError('');
      try {
        const response = await api.post('/auth/check-availability', {
          phone: fullPhone
        });

        if (response.data.available) {
          setIsAvailable(true);
          setError('');
        } else {
          setIsAvailable(false);
          setError('This mobile number is already linked to another institutional account.');
        }
      } catch (err: any) {
        console.error('Phone check error:', err);
        // Don't show error for network issues during typing, just log it
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.phone, formData.phone_country_code]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAvailable && formData.phone.length >= 6) return;
    onNext();
  };

  const isButtonDisabled = isChecking || (isAvailable === false && formData.phone.length >= 6) || !formData.phone || !formData.country;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></div>
        </div>
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
          Step <span className="text-cyan-400">03</span> of 04
        </span>
      </div>

      <header className="mb-6">
        <h2 className="font-headline text-2xl font-extrabold text-slate-50 tracking-tight mb-2">Secure Contact</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">Verification ensures institutional-grade security for your TradeFlow account.</p>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <p className="text-sm font-body">{error}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Resident Country */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1" htmlFor="country">Resident Country</label>
          <div className="relative group">
            <select 
              className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 px-4 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm appearance-none" 
              id="country"
              name="country"
              value={formData.country}
              onChange={(e) => {
                const selectedCountryCode = e.target.value;
                const selectedCountry = allowedCountries.find(c => c.code === selectedCountryCode);
                setFormData({ 
                  ...formData, 
                  country: selectedCountryCode,
                  phone_country_code: selectedCountry ? selectedCountry.prefix : formData.phone_country_code
                });
              }}
              required
            >
              <option value="" disabled>Select your country</option>
              {allowedCountries.map(country => (
                <option key={country.code} value={country.code}>{country.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-on-surface-variant/50">
              <span className="material-symbols-outlined text-xl">expand_more</span>
            </div>
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.1em] text-on-surface-variant font-medium ml-1" htmlFor="phone">Phone Number</label>
          <div className="flex gap-3">
            <div className="w-32 relative">
              <select 
                className="w-full bg-surface-container-highest/40 border-none rounded-lg py-3 px-4 text-on-surface focus:ring-1 focus:ring-cyan-400/50 transition-all font-body text-sm appearance-none"
                name="phone_country_code"
                value={formData.phone_country_code}
                onChange={(e) => setFormData({ ...formData, phone_country_code: e.target.value })}
              >
                <option value="" disabled>Code</option>
                {allowedCountries.map(country => (
                  <option key={`prefix-${country.code}`} value={country.prefix}>{country.prefix} ({country.code})</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-on-surface-variant/50">
                <span className="material-symbols-outlined text-lg">unfold_more</span>
              </div>
            </div>
            <div className="flex-grow relative">
              <input 
                className={`w-full bg-surface-container-highest/40 border-none rounded-lg py-3 px-4 text-on-surface focus:ring-1 transition-all font-body text-sm placeholder:text-slate-600 ${
                  isAvailable === false ? 'focus:ring-red-400/50 ring-1 ring-red-400/30' : 
                  isAvailable === true ? 'focus:ring-emerald-400/50 ring-1 ring-emerald-400/30' : 'focus:ring-cyan-400/50'
                }`} 
                id="phone" 
                placeholder="000 000 0000" 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                required
              />
              {isChecking && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                </div>
              )}
              {!isChecking && isAvailable === true && (
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-lg">check_circle</span>
              )}
            </div>
          </div>
        </div>

        {/* Verification Info Box */}
        <div className="bg-surface-container-low/50 rounded-lg p-4 flex gap-4 items-start border border-outline-variant/10">
          <span className="material-symbols-outlined text-cyan-400 mt-0.5 text-xl">verified_user</span>
          <p className="text-xs text-on-surface-variant leading-normal">
            A verification code will be sent to this number. TradeFlow uses multi-factor authentication to protect your institutional assets.
          </p>
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
            className="flex-[2] px-8 py-3 rounded-lg bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-fixed font-label text-[11px] uppercase tracking-[0.2em] font-black hover:brightness-110 shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all active:scale-[0.98] duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
            type="submit"
            disabled={isButtonDisabled}
          >
            {isChecking ? 'Verifying...' : 'Continue to Profile'}
            {!isChecking && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          </button>
        </div>
      </form>
    </>
  );
}

