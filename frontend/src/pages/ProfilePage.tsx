import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  Lock, 
  Camera,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TopNav from '../components/layout/TopNav';
import { api } from '../utils/api';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country_code || '',
    password: '',
    confirmPassword: ''
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      setIsSaving(false);
      return;
    }

    try {
      const response = await api.put('/auth/update-profile', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        country_code: formData.country,
        password: formData.password || undefined
      });

      updateUser(response.data.user);
      setSuccessMsg('Profile updated successfully!');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-on-background overflow-x-hidden flex flex-col font-body">
      <TopNav />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div variants={itemVariants} className="glass-panel p-8 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-50" />
              
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-3xl bg-surface-container-highest border-2 border-outline-variant/20 flex items-center justify-center text-primary-container shadow-2xl relative overflow-hidden">
                   <User size={64} />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera size={24} className="text-white" />
                   </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-background border-4 border-surface-dim">
                  <CheckCircle2 size={16} />
                </div>
              </div>

              <h1 className="text-2xl font-black tracking-tighter text-white mb-1">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-sm text-on-surface-variant font-medium mb-6">
                @{user?.username} • Active Trader
              </p>

              <div className="w-full flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/10">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Member Since</span>
                  <span className="text-sm text-white font-medium">{new Date(user?.created_at || '').toLocaleDateString('ro-RO')}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/10">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Account Tier</span>
                  <span className="text-sm text-primary-container font-black tracking-tight">{user?.tier || 'BASIC'}</span>
                </div>
              </div>
            </motion.div>

            {/* Security Pulse Mock */}
            <motion.div variants={itemVariants} className="glass-panel p-6 bg-primary-container/5 border-primary-container/10">
               <div className="flex items-center gap-3 mb-4">
                 <ShieldCheck className="text-primary-container" size={24} />
                 <h3 className="text-sm font-black text-white tracking-tight uppercase">Security Pulse</h3>
               </div>
               <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden mb-3">
                 <div className="h-full bg-primary-container w-[94%] shadow-[0_0_10px_#00e5ff]" />
               </div>
               <p className="text-xs text-on-surface-variant leading-relaxed">
                 Your account security is <strong>94%</strong>. Enable 2FA to reach 100% and unlock higher withdrawal limits.
               </p>
            </motion.div>
          </div>

          {/* Right Column: Detailed Forms */}
          <div className="lg:col-span-8">
            <motion.div variants={itemVariants} className="glass-panel p-8 lg:p-12 relative overflow-hidden">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Account Preferences</h2>
                  <p className="text-on-surface-variant text-sm font-medium">Update your personal information and security settings.</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-12">
                {/* Personal Information */}
                <section>
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-1 h-6 bg-primary-container rounded-full" />
                    <h3 className="text-sm font-black text-on-surface-variant tracking-widest uppercase">Personal Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField 
                      label="First Name" 
                      value={formData.firstName} 
                      onChange={(v) => setFormData({...formData, firstName: v})} 
                      icon={<User size={18} />}
                    />
                    <ProfileField 
                      label="Last Name" 
                      value={formData.lastName} 
                      onChange={(v) => setFormData({...formData, lastName: v})} 
                      icon={<User size={18} />}
                    />
                    <ProfileField 
                      label="Username" 
                      value={formData.username} 
                      onChange={(v) => setFormData({...formData, username: v})} 
                      icon={<span className="text-xs font-bold ring-1 ring-on-surface-variant/30 rounded px-1">@</span>}
                    />
                    <ProfileField 
                      label="Email Address" 
                      value={formData.email} 
                      onChange={(v) => setFormData({...formData, email: v})} 
                      icon={<Mail size={18} />}
                      type="email"
                    />
                    <ProfileField 
                      label="Phone Number" 
                      value={formData.phone} 
                      onChange={(v) => setFormData({...formData, phone: v})} 
                      icon={<Phone size={18} />}
                    />
                    <ProfileField 
                      label="Country / Region" 
                      value={formData.country} 
                      onChange={(v) => setFormData({...formData, country: v})} 
                      icon={<Globe size={18} />}
                    />
                  </div>
                </section>

                <div className="h-px bg-outline-variant/10 w-full" />

                {/* Security Section */}
                <section>
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-1 h-6 bg-secondary rounded-full" />
                    <h3 className="text-sm font-black text-on-surface-variant tracking-widest uppercase">Security & Password</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField 
                      label="New Password" 
                      value={formData.password} 
                      onChange={(v) => setFormData({...formData, password: v})} 
                      icon={<Lock size={18} />}
                      type="password"
                      placeholder="••••••••"
                    />
                    <ProfileField 
                      label="Confirm Password" 
                      value={formData.confirmPassword} 
                      onChange={(v) => setFormData({...formData, confirmPassword: v})} 
                      icon={<Lock size={18} />}
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </section>

                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {successMsg && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium"
                      >
                        <CheckCircle2 size={18} /> {successMsg}
                      </motion.div>
                    )}
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium"
                      >
                        <AlertCircle size={18} /> {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    disabled={isSaving}
                    className="w-full md:w-fit px-12 py-4 bg-primary-container text-background font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 self-end"
                  >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Decorative Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

function ProfileField({ label, value, onChange, icon, type = "text", placeholder = "" }: { 
  label: string, 
  value: string, 
  onChange: (v: string) => void, 
  icon: React.ReactNode, 
  type?: string,
  placeholder?: string
}) {
  const [showVisibility, setShowVisibility] = useState(false);
  const inputType = type === "password" ? (showVisibility ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors">
          {icon}
        </div>
        <input 
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-3.5 pl-12 ${type === "password" ? "pr-12" : "pr-4"} text-sm text-white focus:outline-none focus:border-primary-container/50 focus:ring-4 focus:ring-primary-container/5 transition-all placeholder:text-on-surface-variant/30`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowVisibility(!showVisibility)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary-container transition-colors pointer-events-auto z-10"
            aria-label={showVisibility ? "Hide password" : "Show password"}
          >
            {showVisibility ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
