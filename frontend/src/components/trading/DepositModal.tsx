import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Landmark,
  Apple,
  Wallet,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Info,
  ArrowLeft,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "amount" | "payment-method" | "success";

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<string>("1000");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = async () => {
    if (step === "amount") {
      setStep("payment-method");
    } else if (step === "payment-method") {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setStep("success");
    }
  };

  const handleBack = () => {
    if (step === "payment-method") setStep("amount");
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep("amount");
      setAmount("1000");
      setIsProcessing(false);
    }, 300);
  };

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

          {/* "Modal Page" Container */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[92%] h-[88%] bg-surface-dim border border-white/5 rounded-[40px] shadow-[0_0_120px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary-container/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[150px] pointer-events-none" />

            {/* Header / Top Navigation */}
            <header className="relative z-10 px-10 py-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-manrope font-black text-white leading-tight">
                    Deposit Funds
                  </h1>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                    Guaranteed Banking Security
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="hidden md:flex items-center gap-8">
                <StepIndicator 
                  active={step === "amount"} 
                  completed={step !== "amount"} 
                  label="Amount" 
                  number="01" 
                />
                <div className="w-8 h-[1px] bg-white/5" />
                <StepIndicator 
                  active={step === "payment-method"} 
                  completed={step === "success"} 
                  label="Method" 
                  number="02" 
                />
                <div className="w-8 h-[1px] bg-white/5" />
                <StepIndicator 
                  active={step === "success"} 
                  completed={false} 
                  label="Finish" 
                  number="03" 
                />
              </div>

              <button
                onClick={resetAndClose}
                className="p-3 rounded-2xl bg-surface-container-high/40 text-on-surface-variant hover:text-white hover:bg-surface-container-highest transition-all group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </header>

            {/* Main Content Pane */}
            <main className="flex-1 relative overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                {step === "amount" && (
                  <motion.div
                    key="amount"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-2xl px-6 space-y-10"
                  >
                    <div className="text-center space-y-2">
                       <h2 className="text-4xl font-manrope font-black text-white">How much do you want to deposit?</h2>
                       <p className="text-on-surface-variant">Enter the amount you want to add to your portfolio.</p>
                    </div>

                    <div className="relative group max-w-[400px] mx-auto">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary opacity-20 blur-xl group-focus-within:opacity-40 transition-opacity rounded-[32px]" />
                      <div className="relative flex items-center">
                        <span className="absolute left-8 text-5xl font-manrope font-black text-on-surface-variant group-focus-within:text-primary-container transition-colors">
                          $
                        </span>
                        <input
                          type="text"
                          autoFocus
                          value={amount}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            if (val.length <= 7 && (!val || parseInt(val) <= 1000000)) {
                              setAmount(val);
                            }
                          }}
                          className="w-full bg-slate-900/50 border border-white/10 rounded-[32px] py-10 pl-16 pr-8 text-6xl font-manrope font-black text-white text-center focus:outline-none focus:border-primary-container/50 transition-all"
                        />
                      </div>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mt-4 text-center">Max limit: $1,000,000</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {["500", "1000", "2500", "5000"].map((val) => (
                        <button
                          key={val}
                          onClick={() => setAmount(val)}
                          className={clsx(
                            "group relative p-6 rounded-3xl border-2 transition-all duration-300",
                            amount === val
                              ? "bg-primary-container/10 border-primary-container text-primary-container shadow-2xl shadow-primary-container/10"
                              : "bg-surface-container-high/20 border-white/5 text-on-surface-variant hover:border-white/20"
                          )}
                        >
                          <span className="text-sm font-bold opacity-60 mb-1 block">$</span>
                          <span className="text-2xl font-black">{val}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                       <div className="flex-1 p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                            <Info size={20} />
                          </div>
                          <p className="text-sm text-on-surface-variant leading-relaxed">
                            Funds deposited via card are processed <strong>instantly</strong>. Bank transfers can take up to 24h.
                          </p>
                       </div>
                       <button
                        type="button"
                        onClick={handleNext}
                        disabled={!amount || parseInt(amount) < 10}
                        className="group relative overflow-hidden rounded-[32px] px-12 py-6 shrink-0 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-secondary group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-[1px] bg-slate-950 rounded-[31px]" />
                        <div className="relative flex items-center gap-3">
                           <span className="font-manrope font-black text-white text-lg">Continue</span>
                           <ChevronRight size={20} className="text-primary-container group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "payment-method" && (
                  <motion.div
                    key="methods"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full max-w-4xl px-10 grid grid-cols-1 lg:grid-cols-2 gap-12"
                  >
                    <div className="space-y-8">
                       <button 
                        onClick={handleBack}
                        className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                       >
                         <ArrowLeft size={16} /> Back to amount
                       </button>
                       <div className="space-y-2">
                        <h2 className="text-4xl font-manrope font-black text-white">Payment Method</h2>
                        <p className="text-on-surface-variant">Choose how you want to fund your account.</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                         <PaymentOption
                            id="card"
                            icon={<CreditCard size={24} />}
                            title="Bank Card"
                            desc="Instant & Secure"
                            selected={paymentMethod === "card"}
                            onSelect={setPaymentMethod}
                          />
                          <PaymentOption
                            id="apple"
                            icon={<Apple size={24} />}
                            title="Apple Pay"
                            desc="Fast one-tap payment"
                            selected={paymentMethod === "apple"}
                            onSelect={setPaymentMethod}
                          />
                          <PaymentOption
                            id="bank"
                            icon={<Landmark size={24} />}
                            title="Bank Transfer"
                            desc="No amount limits"
                            selected={paymentMethod === "bank"}
                            onSelect={setPaymentMethod}
                          />
                          <PaymentOption
                            id="paypal"
                            icon={<Wallet size={24} />}
                            title="PayPal"
                            desc="Digital wallet"
                            selected={paymentMethod === "paypal"}
                            onSelect={setPaymentMethod}
                          />
                       </div>
                    </div>

                    <div className="relative">
                       <div className="sticky top-0 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-8">
                          <div className="flex items-center justify-between pb-6 border-b border-white/5">
                             <span className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Total Amount</span>
                             <span className="text-3xl font-manrope font-black text-white">${amount}</span>
                          </div>

                          {paymentMethod === 'card' && (
                            <div className="space-y-4">
                               <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant ml-1">Card Number</label>
                                  <input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary-container transition-all"
                                  />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant ml-1">Expires at</label>
                                    <input 
                                      type="text" 
                                      placeholder="MM/YY"
                                      className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary-container transition-all"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant ml-1">CVV</label>
                                    <input 
                                      type="password" 
                                      placeholder="***"
                                      className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary-container transition-all"
                                    />
                                  </div>
                               </div>
                            </div>
                          )}

                          <button
                            onClick={handleNext}
                            disabled={isProcessing}
                            className={clsx(
                              "w-full py-6 rounded-3xl font-manrope font-black text-lg transition-all flex items-center justify-center gap-3 relative overflow-hidden",
                              isProcessing 
                                ? "bg-white/5 text-white/20 cursor-wait"
                                : "bg-primary-container text-on-primary-container shadow-[0_8px_32px_rgba(0,229,255,0.25)] hover:shadow-[0_12px_48px_rgba(0,229,255,0.4)] hover:-translate-y-1"
                            )}
                          >
                            {isProcessing ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Finish Payment
                                <ShieldCheck size={20} />
                              </>
                            )}
                          </button>

                          <div className="flex items-center justify-center gap-2 opacity-40">
                             <ShieldAlert size={14} className="text-secondary" />
                             <span className="text-[10px] font-bold uppercase tracking-widest">256-bit encrypted transaction</span>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-8"
                  >
                    <div className="w-40 h-40 bg-secondary/10 rounded-[48px] flex items-center justify-center text-secondary relative mb-4">
                      <motion.div
                        className="absolute inset-0 rounded-[48px] border-2 border-secondary"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      />
                      <CheckCircle2 size={80} strokeWidth={1.5} />
                    </div>

                    <div className="space-y-4 px-6">
                      <h2 className="text-5xl font-manrope font-black text-white">Transaction Successful!</h2>
                      <p className="text-on-surface-variant text-lg max-w-lg mx-auto">
                        The amount of <span className="text-white font-black">${amount}</span> has been credited instantly. 
                        Take advantage of the next market opportunity!
                      </p>
                    </div>

                    <div className="flex gap-4 w-full max-w-md px-6 pt-4">
                      <button
                        onClick={resetAndClose}
                        className="flex-1 py-5 rounded-3xl bg-surface-container-high text-white font-black text-lg hover:bg-surface-container-highest transition-all"
                      >
                        Close
                      </button>
                      <button
                        onClick={resetAndClose}
                        className="px-1 group relative overflow-hidden rounded-3xl flex-1"
                      >
                         <div className="absolute inset-0 bg-primary-container" />
                         <div className="relative bg-slate-950 m-[1px] py-5 rounded-[23px] flex items-center justify-center gap-2">
                             <span className="font-black text-white">Markets</span>
                             <Zap size={18} className="text-primary-container" />
                         </div>
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">
                       Reference ID: TF-{Math.random().toString(36).substring(7).toUpperCase()}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Secure Footer Bar */}
            <footer className="relative z-10 px-10 py-6 border-t border-white/5 bg-slate-950/20 backdrop-blur-md flex items-center justify-between">
               <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 opacity-50">
                    <ShieldCheck size={14} className="text-primary-container" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">PCI-DSS Level 1</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">System Operational</span>
                  </div>
               </div>
               <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <div className="text-xs font-black italic text-white">VISA</div>
                  <div className="text-xs font-black italic text-white underline underline-offset-4">Mastercard</div>
                  <div className="text-xs font-black italic text-white ring-1 ring-white/20 px-2 py-0.5 rounded">PayPal</div>
               </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function StepIndicator({ active, completed, label, number }: { active: boolean; completed: boolean; label: string; number: string }) {
  return (
    <div className={clsx(
      "flex items-center gap-3 transition-opacity duration-300",
      active ? "opacity-100" : "opacity-40"
    )}>
      <div className={clsx(
        "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold border",
        active ? "bg-primary-container border-primary-container text-on-primary-container shadow-[0_0_15px_rgba(0,229,255,0.4)]" : "border-white/20 text-white",
        completed && "bg-secondary border-secondary text-on-secondary"
      )}>
        {completed ? <CheckCircle2 size={14} /> : number}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-white">{label}</span>
    </div>
  );
}

function PaymentOption({
  id,
  icon,
  title,
  desc,
  selected,
  onSelect,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={clsx(
        "group relative p-6 rounded-[32px] border-2 text-left transition-all duration-300",
        selected
          ? "bg-primary-container/10 border-primary-container shadow-2xl shadow-primary-container/10"
          : "bg-white/[0.02] border-white/5 hover:border-white/20"
      )}
    >
      <div className={clsx(
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 mb-4",
        selected ? "bg-primary-container text-on-primary-container shadow-lg" : "bg-slate-900 text-on-surface-variant group-hover:text-white"
      )}>
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className={clsx(
          "font-bold transition-colors",
          selected ? "text-white" : "text-on-surface-variant group-hover:text-white"
        )}>{title}</h3>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-medium opacity-60 leading-tight">{desc}</p>
      </div>
      
      {selected && (
        <motion.div 
          layoutId="activeMethod"
          className="absolute top-4 right-4 text-primary-container"
        >
          <CheckCircle2 size={20} />
        </motion.div>
      )}
    </button>
  );
}
