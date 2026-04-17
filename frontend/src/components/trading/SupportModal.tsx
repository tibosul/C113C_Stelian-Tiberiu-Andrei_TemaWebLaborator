import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Headset,
  MessageSquare,
  Users,
  Send,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  ChevronRight,
  Search,
  HelpCircle,
  FileText,
  LifeBuoy,
} from "lucide-react";
import { clsx } from "clsx";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SupportCategory =
  | "overview"
  | "trading"
  | "account"
  | "technical"
  | "security";
type SupportView = "menu" | "form" | "success";

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [activeCategory, setActiveCategory] =
    useState<SupportCategory>("overview");
  const [view, setView] = useState<SupportView>("menu");
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setView("success");
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setView("menu");
      setForm({ subject: "", message: "" });
      setActiveCategory("overview");
    }, 300);
  };

  const categories = [
    {
      id: "overview",
      label: "General Overview",
      icon: <HelpCircle size={18} />,
    },
    { id: "trading", label: "Trading Help", icon: <Zap size={18} /> },
    { id: "account", label: "Account Management", icon: <Users size={18} /> },
    { id: "technical", label: "Technical Support", icon: <LifeBuoy size={18} /> },
    {
      id: "security",
      label: "Security Protocol",
      icon: <ShieldCheck size={18} />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Deep Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl"
          />

          {/* "Modal Page" Container - Occupies 95% of the screen */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[96%] h-[94%] bg-surface-dim border border-white/5 rounded-[40px] shadow-[0_0_120px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary-container/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[150px] pointer-events-none" />

            {/* Header / Top Navigation */}
            <header className="relative z-10 px-10 py-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  <Headset size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-manrope font-black text-white leading-tight">
                    TradeFlow Support
                  </h1>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                    Operational Assistance Center
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-xl mx-12 hidden lg:block">
                <div className="relative group">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search for solutions, guides or tickets..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-primary-container/40 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <Clock size={16} className="text-secondary" />
                  <span className="text-xs font-bold text-white">
                    Live: 2m wait
                  </span>
                </div>
                <button
                  onClick={resetAndClose}
                  className="p-3 rounded-2xl bg-white/5 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all border border-white/5"
                >
                  <X size={24} />
                </button>
              </div>
            </header>

            <div className="relative z-10 flex-1 flex overflow-hidden">
              {/* Internal Sidebar */}
              <aside className="w-80 border-r border-white/5 p-8 flex flex-col gap-10 bg-black/10">
                <div className="space-y-2">
                  <p className="px-4 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">
                    Categories
                  </p>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id as SupportCategory);
                        setView("menu");
                      }}
                      className={clsx(
                        "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                        activeCategory === cat.id
                          ? "bg-primary-container/10 text-primary-container shadow-[inset_0_0_20px_rgba(0,229,255,0.05)]"
                          : "text-on-surface-variant hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={clsx(
                            "p-2 rounded-lg transition-colors",
                            activeCategory === cat.id
                              ? "text-primary-container scale-110"
                              : "text-on-surface-variant group-hover:text-white",
                          )}
                        >
                          {cat.icon}
                        </span>
                        <span className="text-sm font-bold tracking-tight">
                          {cat.label}
                        </span>
                      </div>
                      {activeCategory === cat.id && (
                        <motion.div
                          layoutId="active-pill"
                          className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_10px_#00e5ff]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="p-6 bg-gradient-to-br from-primary-container/20 to-secondary/10 rounded-[32px] border border-white/10 space-y-4">
                    <MessageSquare
                      className="text-primary-container"
                      size={24}
                    />
                    <h4 className="text-sm font-bold text-white leading-tight">
                      Need instant help?
                    </h4>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
                      Start a secure chat with a human operator.
                    </p>
                    <button className="w-full py-3 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl">
                      Start Live Chat
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Content Pane */}
              <main className="flex-1 overflow-y-auto custom-scrollbar p-12">
                <AnimatePresence mode="wait">
                  {view === "menu" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-4xl space-y-12"
                    >
                      <div className="flex justify-between items-end">
                        <div>
                          <h2 className="text-4xl font-manrope font-black text-white mb-2">
                            {
                              categories.find((c) => c.id === activeCategory)
                                ?.label
                            }
                          </h2>
                          <p className="text-on-surface-variant font-medium">
                            Common solutions and operational guides.
                          </p>
                        </div>
                        <button
                          onClick={() => setView("form")}
                          className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                          Submit Ticket
                          <FileText size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FeatureCard
                          title="Login Issues"
                          description="Step-by-step guide for secure access recovery and 2FA reset."
                        />
                        <FeatureCard
                          title="Order Execution Time"
                          description="Latency analysis and reasons why an order may remain pending."
                        />
                        <FeatureCard
                          title="KYC Verification"
                          description="How to upload documents to upgrade to Tier-2 and unlimited trading."
                        />
                        <FeatureCard
                          title="Unfinished Deposits"
                          description="Instructions if your funds haven't appeared in your balance within 24 hours."
                        />
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <h3 className="text-lg font-bold text-white mb-6">
                          Latest Guides
                        </h3>
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <button
                              key={i}
                              className="w-full flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group"
                            >
                              <div className="flex items-center gap-6">
                                <span className="text-on-surface-variant font-mono text-sm leading-none opacity-40">
                                  0{i}
                                </span>
                                <span className="text-white font-bold group-hover:text-primary-container transition-colors">
                                  How to optimize your scalping strategy on the Crypto market
                                </span>
                              </div>
                              <ChevronRight
                                className="text-on-surface-variant group-hover:translate-x-1 transition-transform"
                                size={20}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {view === "form" && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      className="max-w-2xl"
                    >
                      <button
                        onClick={() => setView("menu")}
                        className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest"
                      >
                        <ArrowLeft size={16} />
                        Back to categories
                      </button>

                      <h2 className="text-3xl font-manrope font-black text-white mb-8">
                        Submit a Technical Message
                      </h2>

                      <form onSubmit={handleSend} className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-2">
                              Department
                            </label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary-container/40 transition-all appearance-none">
                              <option>Technical Support</option>
                              <option>Financial Issues</option>
                              <option>Account Security</option>
                              <option>Marketing</option>
                            </select>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-2">
                              Priority
                            </label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary-container/40 transition-all appearance-none">
                              <option>Standard</option>
                              <option>Urgent</option>
                              <option>Critical (15 min SLA)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-2">
                            Message Subject
                          </label>
                          <input
                            required
                            value={form.subject}
                            onChange={(e) =>
                              setForm({ ...form, subject: e.target.value })
                            }
                            type="text"
                            placeholder="Ticket subject..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-primary-container/40 transition-all text-lg font-medium"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-2">
                            Detailed Message
                          </label>
                          <textarea
                            required
                            rows={8}
                            value={form.message}
                            onChange={(e) =>
                              setForm({ ...form, message: e.target.value })
                            }
                            placeholder="Include as many details as possible (Transaction ID, symbol, logs)..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-primary-container/40 transition-all resize-none text-lg font-medium"
                          />
                        </div>

                        <button
                          disabled={isSending}
                          className="w-full py-6 rounded-2xl bg-primary-container text-on-primary-container font-black text-xl shadow-[0_20px_60px_rgba(0,229,255,0.2)] hover:shadow-[0_25px_80px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isSending ? (
                            <div className="w-8 h-8 border-4 border-on-primary-container/30 border-t-on-primary-container rounded-full animate-spin" />
                          ) : (
                            <>
                              Send Secure Ticket
                              <Send size={24} />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {view === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-20"
                    >
                      <div className="w-40 h-40 bg-secondary/10 rounded-[64px] flex items-center justify-center text-secondary relative mb-12">
                        <motion.div
                          className="absolute inset-0 rounded-[64px] border-4 border-secondary/20"
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <CheckCircle2 size={96} />
                      </div>

                      <h2 className="text-5xl font-manrope font-black text-white mb-6 tracking-tight">
                        Request Received
                      </h2>
                      <p className="text-xl text-on-surface-variant max-w-xl mx-auto leading-relaxed mb-12 font-medium">
                        Your message has been added to the prioritization queue. 
                        A specialist will analyze the data and you will receive an official response in the Notifications section.
                      </p>

                      <div className="flex gap-4">
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-left min-w-[240px]">
                          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2">
                            Ticket ID
                          </p>
                          <p className="text-2xl font-mono font-bold text-white tracking-widest">
                            #TF-{Math.floor(Math.random() * 90000) + 10000}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-left min-w-[240px]">
                          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2">
                            Status
                          </p>
                          <p className="text-2xl font-bold text-secondary uppercase tracking-tight">
                            Analyzing...
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={resetAndClose}
                        className="mt-16 px-16 py-6 bg-white text-slate-950 rounded-2xl font-black text-2xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-2xl active:scale-95"
                      >
                        Understood
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
            </div>

            {/* Bottom Meta Data */}
            <footer className="relative z-10 px-10 py-6 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-primary-container" />
                  SECURE HANDSHAKE: v4.2
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-secondary" />
                  LATENCY: 0.2ms
                </div>
              </div>
              <div>TRADEFLOW OPERATIONS SECTOR 7 // SUPPORT</div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <button className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-primary-container/20 group transition-all text-left space-y-4 hover:bg-white/[0.04] hover:-translate-y-1">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
        <HelpCircle size={24} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-container transition-colors">
          {title}
        </h4>
        <p className="text-sm text-on-surface-variant leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>
      <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-primary-container uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Vezi Articol <ArrowRight size={14} />
      </div>
    </button>
  );
}

function ArrowLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
