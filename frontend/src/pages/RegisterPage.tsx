import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Import our new step components
import StepNameDob from './register/StepNameDob';
import StepCredentials from './register/StepCredentials';
import StepContact from './register/StepContact';
import StepProfile from './register/StepProfile';
import StepTier from './register/StepTier';
import LegalModal from '../components/LegalModal';

export default function RegisterPage() {
  const [legalType, setLegalType] = useState<null | 'privacy' | 'support' | 'terms'>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    dob: '',
    country: 'us',
    phone_country_code: '+1',
    phone: '',
    employment_status: '',
    monthly_income: '',
    experience: 'intermediate',
    tier: '', // To be filled on the final step
  });

  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    setLocalError('');
    // Validations could be added here per-step
    if (step === 2 && formData.password !== formData.confirm_password) {
      setLocalError('Passwords do not match');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setLocalError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectTier = async (tier: string) => {
    setLocalError('');
    setFormData((prev) => ({ ...prev, tier }));
    setIsLoading(true);

    try {
      // The current backend register schema might not take all fields, but we pass them anyway
      await register({ ...formData, tier });
      // Redirect to login after successful registration!
      navigate('/login?registered=true');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-dim min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden">
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
      
      <main className={`w-full ${step === 5 ? 'max-w-7xl' : 'max-w-xl'} px-6 py-6 z-10 flex flex-col items-center`}>
        
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

        {step < 5 ? (
          <div className="glass-panel p-6 md:p-8 rounded-xl shadow-2xl shadow-slate-950/50 w-full relative">
            {localError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                {localError}
              </div>
            )}
            
            {step === 1 && <StepNameDob formData={formData} setFormData={setFormData} onNext={handleNext} />}
            {step === 2 && <StepCredentials formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <StepContact formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
            {step === 4 && <StepProfile formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
          </div>
        ) : (
          <div className="w-full relative flex flex-col items-center">
            {localError && (
              <div className="mb-4 max-w-xl w-full bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                {localError}
              </div>
            )}
            <StepTier formData={formData} onSelectTier={handleSelectTier} onBack={handleBack} isRegistering={isLoading} />
          </div>
        )}

        {/* Footer (Steps 1-4) */}
        {step < 5 && (
          <footer className="mt-6 flex justify-center gap-6 text-[10px] font-label uppercase tracking-widest text-slate-600">
            <button type="button" onClick={() => setLegalType('privacy')} className="hover:text-cyan-400 transition-colors uppercase">Privacy Protocol</button>
            <button type="button" onClick={() => setLegalType('support')} className="hover:text-cyan-400 transition-colors uppercase">Encrypted Support</button>
            <button type="button" onClick={() => setLegalType('terms')} className="hover:text-cyan-400 transition-colors uppercase">Terms of Access</button>
          </footer>
        )}
      </main>

      {/* Side Graphic Decor */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 rotate-90 origin-left">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
          <span className="text-[9px] uppercase tracking-[0.5em] text-slate-700 font-headline font-bold">Encrypted End-To-End</span>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        </div>
      </div>

      <LegalModal 
        isOpen={!!legalType} 
        onClose={() => setLegalType(null)} 
        type={legalType} 
      />
    </div>
  );
}
