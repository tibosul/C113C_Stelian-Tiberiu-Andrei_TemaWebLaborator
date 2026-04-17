import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import LegalModal from "../components/LegalModal";
import { CONTACT_INFO } from "../constants/contact";

export default function LandingPage() {
  const [legalType, setLegalType] = useState<
    | null
    | "privacy"
    | "support"
    | "terms"
    | "privacy_policy"
    | "terms_service"
    | "risk_disclosure"
    | "security"
    | "api_docs"
  >(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const GALLERY_IMAGES = [
    "/images/gallery/laptop.png",
    "/images/gallery/charts.png",
    "/images/gallery/dashboard.png",
    "/images/gallery/mobile.png",
  ];

  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container flex flex-col snap-y snap-proximity scroll-smooth overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[100] origin-left"
        style={{ scaleX }}
      />
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center h-20 px-8">
          <div className="flex items-center gap-12">
            <a
              className="flex items-center gap-3 text-2xl font-black tracking-tighter text-cyan-400 font-headline group"
              href="#"
            >
              <img
                src="/trading_logo.png"
                alt="TradeFlow Logo"
                className="w-10 h-10 rounded-xl object-cover shadow-2xl shadow-cyan-400/20 ring-1 ring-cyan-400/20 group-hover:scale-110 transition-transform duration-300"
              />
              TradeFlow
            </a>
            <nav className="hidden md:flex gap-8">
              <Link
                className="font-manrope tracking-tight text-slate-400 hover:text-slate-100 transition-colors"
                to="/markets"
              >
                Markets & Assets
              </Link>
              <Link
                className="font-manrope tracking-tight text-slate-400 hover:text-slate-100 transition-colors"
                to="/social"
              >
                Social
              </Link>
              <a
                className="font-manrope tracking-tight text-slate-400 hover:text-slate-100 transition-colors"
                href="#pricing"
              >
                Pricing
              </a>
              <Link
                className="font-manrope tracking-tight text-slate-400 hover:text-slate-100 transition-colors"
                to="/learn"
              >
                Learn
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 text-slate-400 hover:text-slate-100 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden hero-gradient snap-start">
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              className="w-full h-full object-cover"
              data-alt="Glowing neon cyan upward trending line graph with digital data particles on a deep slate background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQHuBFA1Ya0T_tbrnD9AHd9avyu2ltwjYOOaVR-JBjLdTm7xv3Ou47N1aAJgpl_lY_ECBkE5q_dHULhycO3BsKQFUZLr7E92IWtG6Fp6mXuH83MEdkxhOTh1W8rVF173cVt6K6-YcnPxuItDbgL3NWxDBMCNeL61HjeAm8oYbsuH10LPtKci-9q00izDrhkvZJUgUUGJe8tie9_tyhZSMal_oafohl6t6jbMa_C5FlVetSP8aF0vBDfjWPm7EPMumNdfRnbxPU_8fo"
            />
          </div>
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-secondary">
                  Join 1,248,302+ Traders
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-surface leading-[1.05] mb-8">
                Invest with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">
                  Zero Commissions
                </span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
                Access global markets with institutional-grade tools. Trade
                stocks, crypto, and ETFs without the hidden fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container text-lg font-bold rounded-xl shadow-xl shadow-cyan-900/20 hover:scale-105 transition-transform active:scale-95 flex items-center justify-center"
                >
                  Start Trading Now
                </Link>
                <a
                  href="#pricing"
                  className="px-8 py-4 bg-surface-container-high text-on-surface text-lg font-bold rounded-xl border border-outline-variant/30 hover:bg-surface-container-highest transition-colors active:scale-95 flex items-center justify-center"
                >
                  View Pricing
                </a>
              </div>
            </motion.div>
            <motion.div
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            >
              <motion.div
                className="glass-panel p-6 rounded-3xl border border-outline-variant/10 shadow-2xl relative overflow-hidden"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-on-surface-variant text-sm font-medium mb-1 uppercase tracking-widest">
                      Portfolio Value
                    </p>
                    <h3 className="text-4xl font-bold font-headline">
                      $42,912.84
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-secondary font-bold text-lg">+12.4%</p>
                    <p className="text-on-surface-variant text-xs">Past 24h</p>
                  </div>
                </div>
                <div className="h-64 relative">
                  <img
                    className="w-full h-full object-contain"
                    data-alt="Minimalist glowing cyan financial chart showing rapid upward trajectory with subtle grid lines"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4qa_UoPIJyypfWgOY9NbZYBUG8ja54ON9cqwrhdxjI5O-CT3Ptrvdob4PjggHBqZLfo4MJ4Ew77c5eG7ihvexHgpF-92Cia7t9K5KIz_1QvaXqqUQ_UdVbJGhaccLKxlWF3ePhN8T8ftdnwFSRfZLzFXANnFmJNEPCeIc5urYIjbV-F-p8d99xZmOZGp39Rin8_ZE7o-CMfpMM4NFmDcKBL1Z7XaLtaVb--qok2tAcN2rZWWRkRFEVJlg8UYIHiwvjHubhCLCvohz"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* Asset Showcase */}
        <section className="py-24 bg-surface-container-low overflow-hidden snap-start">
          <motion.div
            className="max-w-screen-2xl mx-auto px-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold font-headline tracking-tight mb-4">
                  Trending Assets
                </h2>
                <p className="text-on-surface-variant">
                  Real-time performance across our most popular markets.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest">
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button className="p-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {/* Stocks Group */}
              <motion.div
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-2">
                  Top Stocks
                </h3>
                <div className="space-y-2">
                  {/* Stock Row */}
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                        AAPL
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Apple Inc.</p>
                        <p className="text-xs text-on-surface-variant">
                          NASDAQ
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <img
                        className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity"
                        data-alt="Small green upward trending sparkline graph"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEZqLgcNNgtQWLZJhr2u7Ci5ZIcENWECcnSTw7uA5KTEp8a4kkCGvlOGVZ2lUSxxu3fMfp9EYFChPKcaH6n5ikgg8b2RaNe2h1hnLKFo1qzdkY_qNqQ0ygpQNpD_OMl2dY52FeYmwf_Di0MYaL5lcJtGp5HMApfHZ-wrH3OYh9FA0iFIEiJUD4YaMW1maZoP0gxpQpu7vRHFx4I373sYW3suZtUftQvNfz6Sceo6pctpITIDYw3e1wK2rs4mB88K6rQDBmqVFk25aJ"
                      />
                      <div>
                        <p className="font-bold">$189.24</p>
                        <p className="text-xs text-secondary">+1.42%</p>
                      </div>
                    </div>
                  </div>
                  {/* Stock Row */}
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                        TSLA
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Tesla</p>
                        <p className="text-xs text-on-surface-variant">
                          NASDAQ
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <img
                        className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity"
                        data-alt="Small red downward trending sparkline graph"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhQ_kKsJuo9YxWozPv4zG1TH4D_wWNeEgJ1euSoz9IF01JOwuJyZLaw2DKS1RYh86ohQ4iXSsx6FzbB97__-RJ2zKZSdKDLA1-Xu8e7FsbkMG5a788EAaEI33Z_pRKQ4TwLLa7Ma88ZAVxP-kO0xODYIN7Rh3Ob_nkAHTwcHM7lbJcjAFDvwjzNAxOgjaDP8vbn1SLPD8F7IhqXR1ndBDLycmcyRnItZ9E1mrYXpdV5YnMZcd3Ua3xRllFoF9adk07ugnYFL2_H6eX"
                      />
                      <div>
                        <p className="font-bold">$238.11</p>
                        <p className="text-xs text-error">-2.15%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Crypto Group */}
              <motion.div
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-2">
                  Crypto
                </h3>
                <div className="space-y-2">
                  {/* Crypto Row */}
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                        BTC
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Bitcoin</p>
                        <p className="text-xs text-on-surface-variant">
                          Coinbase
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <img
                        className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity"
                        data-alt="Small green upward trending sparkline graph"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOUQJaoOHdEfIkpmZ8teL8VGE0_czUbJRemKh7XAjjURKLnNvb4LjnoEMNLk60t4fLgIdKt0TEXF2bPVK8NT_Lp4ovKh6AHXL7nGPOyCD0Zp74a-mtaP4m-awYBAFVh4OCLVu1b0fvZOovTvvh05WNzu2SFwFRK_T_OP-u0X-yMJeVPOd8lbHFZgnKNFh6zlIcU_AxD7t3-8ka_jqfrXRcf68g8414idD6IS6glAuH9qkHOYXugvmH8Xv5WsY14SvT7o2lWMiP1IJU"
                      />
                      <div>
                        <p className="font-bold">$64,291.00</p>
                        <p className="text-xs text-secondary">+4.22%</p>
                      </div>
                    </div>
                  </div>
                  {/* Crypto Row */}
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                        ETH
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Ethereum</p>
                        <p className="text-xs text-on-surface-variant">
                          Coinbase
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <img
                        className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity"
                        data-alt="Small green upward trending sparkline graph"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXEQ0tqNG68q9sQEtd2bdOgPXDX1-A0cfeNSpFpxafim9d1KoZK5LZY2aBJNhFeBdK5s-xx1g7E2f40MIDIxuUBuKkE7JDGlZUDB9fmegOrHxy1kI_3706IDFlVXyYQF2IUzIrqB4Pf7us0HCkPrcMTQti48OC2-ipUnuljvPpnCqnxlpYreQdnTxaXyVdAcCKyZX24gezgsAq6LjTg8TA1YGl0_BYFMf0yixzV-gR0Q7vxUo6zfur733Oj6BTITqSw5Dim3BM7i50"
                      />
                      <div>
                        <p className="font-bold">$3,481.55</p>
                        <p className="text-xs text-secondary">+0.88%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* ETFs Group */}
              <motion.div
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant px-2">
                  ETFs
                </h3>
                <div className="space-y-2">
                  {/* ETF Row */}
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                        VOO
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">
                          Vanguard S&amp;P 500
                        </p>
                        <p className="text-xs text-on-surface-variant">ARCA</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <img
                        className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity"
                        data-alt="Small green upward trending sparkline graph"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAYhSutp0UgY0xYH_ZYECL7U8AO1noZcALEOkl1vWy2HTY-zLE3HAc-9PSdx145TQ7IlPJ0OEXB8AQL7cD_lHq9kS1s0oRiKLXHtPi9b8LC6U-qjZ12g80LJABfT4Tlg_R0O0zeWBwmRVn4jFUnF6RqUAsSCylKuIlUcHQ_ZZZ9ztBWIO6Y0n4Yj-hlY5YedIFUUFAPoemBjR9xNRBOKuPTmaSY66YADZxP5EoOUCWu_fYSBVEm7QthxO5GpoS23xAsaYbRqfPe5cT"
                      />
                      <div>
                        <p className="font-bold">$462.11</p>
                        <p className="text-xs text-secondary">+0.12%</p>
                      </div>
                    </div>
                  </div>
                  {/* ETF Row */}
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                        QQQ
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Invesco QQQ</p>
                        <p className="text-xs text-on-surface-variant">
                          NASDAQ
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <img
                        className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity"
                        data-alt="Small red downward trending sparkline graph"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC69xdzYe-PCc0fFleOf_hvIeSXmdkyDj51ZJ_nuucsPUE4vNFW-v36qzV6aPEKlWih-MT8U7UyEOEjSoe-mXgTTUXrdylGBhW-Ii68bMerCOkXAGP0XfYD-i5rdEpgDmA9DNh5EIwx-LKLZGu1LpSXYK0DPrx46vX6bo5Swh3oP66VK28c5FsLVs8LO3x6c97eYcoITEdxPUWURNm8YB3qLEo3P-dRrntITjR3ea49OsFnxzsPGuIIOWJ8ncy1trRQQYCuz6xP-l72"
                      />
                      <div>
                        <p className="font-bold">$408.84</p>
                        <p className="text-xs text-error">-0.45%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
        {/* Feature Sections */}
        <section className="py-24 space-y-32 snap-start">
          {/* Institutional Grade Charts */}
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center snap-start">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="absolute -inset-10 bg-cyan-500/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryIndex}
                    src={GALLERY_IMAGES[galleryIndex]}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                    alt="Platform Feature Showcase"
                  />
                </AnimatePresence>

                {/* Visual Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                  {GALLERY_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-700 ${
                        i === galleryIndex
                          ? "bg-cyan-400 w-12 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                          : "bg-white/20 w-4 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <h2 className="text-5xl font-black font-headline tracking-tight mb-8">
                Institutional Grade Charts
              </h2>
              <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                Don't just trade, analyze. Our proprietary charting engine
                offers 100+ technical indicators, multi-timeframe analysis, and
                instant order execution directly from the chart.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  </div>
                  <p className="text-on-surface font-medium">
                    Advanced Charting Engine
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  </div>
                  <p className="text-on-surface font-medium">
                    Real-time Level 2 Market Data
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  </div>
                  <p className="text-on-surface font-medium">
                    Advanced Algorithmic Order Types
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
          {/* Mobile Powerhouse */}
          <div className="max-w-screen-2xl mx-auto px-8 snap-start flex flex-col items-center text-center">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl font-black font-headline tracking-tight mb-8">
                Mobile Powerhouse
              </h2>
              <p className="text-xl text-on-surface-variant mb-12 leading-relaxed">
                Take the power of TradeFlow everywhere. Our mobile experience is
                built from the ground up for speed, security, and absolute
                precision.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="px-8 py-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center gap-4 hover:bg-surface-container-highest transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-3xl text-primary-container group-hover:scale-110 transition-transform">ios</span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant leading-none mb-1">
                      Download on
                    </p>
                    <p className="text-lg font-bold text-on-surface leading-none">
                      App Store
                    </p>
                  </div>
                </div>
                <div className="px-8 py-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center gap-4 hover:bg-surface-container-highest transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-3xl text-secondary group-hover:scale-110 transition-transform">play_arrow</span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant leading-none mb-1">
                      Get it on
                    </p>
                    <p className="text-lg font-bold text-on-surface leading-none">
                      Google Play
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Global Market Access */}
          <motion.div
            className="max-w-screen-2xl mx-auto px-8 snap-start"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-surface-container-high rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <img
                  className="w-full h-full object-cover"
                  data-alt="Abstract glowing digital world map made of connection points and data nodes on dark background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUK36T0LjY18TtowmNACdHLOVg2XgkdV60gOY9mVGF-GFz3gLZRcozD5K_V-SfLUGEZ1gvz1vSPcXPtOD-r-6fuQ1QRHeCJI8MjVkVOXogh20KrL-xbLrknYS9UrZ8GlyQQp-Lb7O2vW1V2zXngB-Blnq5Hu2-35whRmC9dLga07-tqEZWiAyKmFIxCaIJ4dNxUwF66Xe2btCaW87TtK4NUc32dAuHcEx2qgy4AOKlok6Tm8KxjXU9wQ1pfaHSsGzMdTFxpgRPrBrT"
                />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-5xl font-black font-headline tracking-tight mb-8">
                  Global Market Access
                </h2>
                <p className="text-lg text-on-surface-variant mb-12">
                  Trade over 5,000 instruments across US and international
                  exchanges. Diversify your portfolio with a single click.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-4xl font-black font-headline text-primary-container">
                      5,000+
                    </p>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">
                      Instruments
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-black font-headline text-primary-container">
                      15+
                    </p>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">
                      Exchanges
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-black font-headline text-primary-container">
                      0.0s
                    </p>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">
                      Execution
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-black font-headline text-primary-container">
                      24/7
                    </p>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">
                      Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        {/* Social Proof */}
        <section className="py-24 bg-surface-container-lowest snap-start">
          <div className="max-w-screen-2xl mx-auto px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1 mb-4 text-secondary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="ml-2 font-bold text-on-surface">
                  4.8/5 Rating
                </span>
              </div>
              <h2 className="text-5xl font-black font-headline tracking-tight">
                Trusted by Millions
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {/* Testimonial */}
              <motion.div
                className="glass-panel p-8 rounded-3xl border border-outline-variant/10"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1 },
                }}
              >
                <p className="text-on-surface italic mb-8 leading-relaxed">
                  "TradeFlow has completely changed how I manage my long-term
                  portfolio. The zero-commission model is truly transparent and
                  the execution speed is better than my previous institutional
                  broker."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    data-alt="Portrait of a professional man in his 30s smiling confidently"
                    src="../public/landing_profile1.png"
                  />
                  <div>
                    <p className="font-bold text-on-surface">Marcus Thorne</p>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                      Growth Investor
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Testimonial */}
              <motion.div
                className="glass-panel p-8 rounded-3xl border border-outline-variant/10"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1 },
                }}
              >
                <p className="text-on-surface italic mb-8 leading-relaxed">
                  "The mobile app is a masterpiece. I can set complex
                  stop-losses and trailing orders in seconds. It’s clean, fast,
                  and remarkably stable even during extreme market volatility."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    data-alt="Portrait of a young woman with a focused and professional expression"
                    src="../public/landing_profile2.png"
                  />
                  <div>
                    <p className="font-bold text-on-surface">Elena Rodriguez</p>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                      Active Day Trader
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Testimonial */}
              <motion.div
                className="glass-panel p-8 rounded-3xl border border-outline-variant/10"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1 },
                }}
              >
                <p className="text-on-surface italic mb-8 leading-relaxed">
                  "Finally a platform that treats retail traders with respect.
                  No hidden spreads, excellent educational resources, and a UI
                  that actually makes sense for high-stakes decision making."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    data-alt="Portrait of a middle-aged male investor looking towards the future"
                    src="../public/landing_profile3.png"
                  />
                  <div>
                    <p className="font-bold text-on-surface">David Chen</p>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                      Portfolio Manager
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Strategic Command (Map Section) */}
        <section className="py-24 bg-surface-container-lowest/50 snap-start">
          <div className="max-w-screen-2xl mx-auto px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/10 text-primary-container text-xs font-bold uppercase tracking-widest mb-6 border border-primary-container/20">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  Global Headquarters
                </div>
                <h2 className="text-5xl font-black font-headline tracking-tight mb-8">
                  Strategic Command
                </h2>
                <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                  Located in the heart of technological innovation, our
                  headquarters oversees global operations and ensuring the
                  absolute stability of the TradeFlow protocol.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-surface-container-high/50 border border-outline-variant/20">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-500 flex-shrink-0">
                      <span className="material-symbols-outlined">
                        apartment
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface mb-1">
                        Academia Tehnică Militară Ferdinand I
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Bulevardul George Coșbuc 39-49, București, România
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir//Academia+Tehnic%C4%83+Militar%C4%83+Ferdinand+I/@44.4181867,26.0864088,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-surface-container-highest text-on-surface font-bold hover:bg-white/10 transition-all group"
                  >
                    Get Directions
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 aspect-square lg:aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl bg-slate-900">
                  <iframe
                    title="Strategic Command Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.566!2d26.0838339!3d44.4181905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0b54881f97%3A0xae84d2f47f65a3a7!2sAcademia%20Tehnic%C4%83%20Militar%C4%83%20Ferdinand%20I!5e0!3m2!1sen!2sro!4v1713370000000!5m2!1sen!2sro"
                    className="w-full h-full grayscale invert-[0.9] contrast-[1.2] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-700"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Subtle glass overlay for that 'dashboard' look */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2.5rem]" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Membership Plans Section */}
        <section
          id="pricing"
          className="py-24 bg-surface-dim snap-start relative overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-black font-headline tracking-tighter mb-4">
                Membership Tiers
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                Institutional-grade technology, accessible to everyone. Choose
                the precision level that matches your trading velocity.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {/* Basic Plan */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-panel p-8 rounded-3xl border border-outline-variant/10 flex flex-col h-full hover:bg-surface-container-highest/20 transition-all duration-300 group"
              >
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block mb-2">
                    Entry Level
                  </span>
                  <h3 className="text-2xl font-black text-white">Basic</h3>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Standard 0.1% Trading Fees
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Community Support
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Core Market Data
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-outline-variant/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">$0</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      /mo
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Standard Plan */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-panel p-8 rounded-3xl border border-outline-variant/10 flex flex-col h-full hover:bg-emerald-400/5 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3">
                  <span className="bg-secondary-container/20 text-secondary text-[8px] font-black tracking-widest px-2 py-1 rounded-full uppercase">
                    Most Popular
                  </span>
                </div>
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block mb-2">
                    Optimized
                  </span>
                  <h3 className="text-2xl font-black text-white">Standard</h3>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Reduced 0.05% Fees
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Priority Email Support
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Advanced Analytics
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      API Access (Basic)
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-outline-variant/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">$49</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      /mo
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Premium Plan */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-panel p-8 rounded-3xl border-2 border-cyan-400/30 flex flex-col h-full shadow-2xl shadow-cyan-900/10 relative hover:bg-cyan-400/5 transition-all duration-300 group"
              >
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] block mb-2">
                    High Velocity
                  </span>
                  <h3 className="text-2xl font-black text-white">Premium</h3>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">
                      verified
                    </span>
                    <p className="text-sm text-on-surface leading-tight">
                      Ultra-Low 0.02% Fees
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">
                      verified
                    </span>
                    <p className="text-sm text-on-surface leading-tight">
                      24/7 Dedicated Support
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">
                      verified
                    </span>
                    <p className="text-sm text-on-surface leading-tight">
                      Level 2 Order Book
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">
                      verified
                    </span>
                    <p className="text-sm text-on-surface leading-tight">
                      Algorithm Builder
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-outline-variant/20">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">$199</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      /mo
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* VIP Plan */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-panel p-8 rounded-3xl border-dashed border-2 border-outline-variant/30 flex flex-col h-full hover:bg-slate-900/40 transition-all duration-300 group"
              >
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block mb-2">
                    Institutional
                  </span>
                  <h3 className="text-2xl font-black text-white">VIP</h3>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400/60 text-lg">
                      diamond
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Zero Maker Fees
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400/60 text-lg">
                      diamond
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Personal Manager
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400/60 text-lg">
                      diamond
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Full API Master Access
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400/60 text-lg">
                      diamond
                    </span>
                    <p className="text-sm text-on-surface-variant leading-tight">
                      Exclusive Insights
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-outline-variant/10">
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-white">
                      Custom Pricing
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">
                      Annual Billing
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Security Badge */}
            <div className="mt-16 flex items-center justify-center gap-2 opacity-50">
              <span className="material-symbols-outlined text-sm text-cyan-400">
                lock
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
                Institutional Grade Security Protocols Active
              </span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <motion.section
          className="py-24 snap-start"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="max-w-screen-2xl mx-auto px-8 text-center">
            <div className="bg-gradient-to-br from-primary-container to-secondary p-1 rounded-[3rem] shadow-2xl shadow-cyan-900/40">
              <div className="bg-background rounded-[2.9rem] py-20 px-8">
                <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8">
                  Ready to take control?
                </h2>
                <p className="text-xl text-on-surface-variant max-w-xl mx-auto mb-12">
                  Join over a million traders and start your journey with
                  TradeFlow today. Account setup takes less than 3 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="px-12 py-5 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container text-xl font-bold rounded-2xl hover:scale-105 transition-transform inline-block active:scale-95"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    to="/markets"
                    className="px-12 py-5 bg-surface-container-high text-on-surface text-xl font-bold rounded-2xl border border-outline-variant/30 hover:bg-surface-container-highest transition-colors active:scale-95 inline-flex items-center justify-center"
                  >
                    Explore Markets First
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      {/* Footer */}
      <footer className="bg-slate-950 w-full py-16 px-8 border-t border-slate-800/50 snap-start">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          {/* New Contact Section (Above) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12 border-b border-slate-900 justify-items-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                <span className="material-symbols-outlined text-xl">phone</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">
                  Phone
                </p>
                <p className="text-sm text-slate-300 font-manrope">
                  {CONTACT_INFO.phone}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                <span className="material-symbols-outlined text-xl">mail</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">
                  Email
                </p>
                <p className="text-sm text-slate-300 font-manrope">
                  {CONTACT_INFO.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                <span className="material-symbols-outlined text-xl">
                  terminal
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">
                  GitHub
                </p>
                <p className="text-sm text-slate-300 font-manrope">
                  {CONTACT_INFO.github}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                <span className="material-symbols-outlined text-xl">
                  location_on
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">
                  Location
                </p>
                <p className="text-sm text-slate-300 font-manrope">
                  {CONTACT_INFO.location}
                </p>
              </div>
            </div>
            <Link
              to="/social"
              className="flex flex-col items-center text-center gap-4 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                <span className="material-symbols-outlined text-xl">
                  photo_camera
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">
                  Instagram
                </p>
                <p className="text-sm text-slate-300 font-manrope">
                  {CONTACT_INFO.instagram}
                </p>
              </div>
            </Link>
            <Link
              to="/social"
              className="flex flex-col items-center text-center gap-4 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                <span className="material-symbols-outlined text-xl">
                  public
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">
                  Facebook
                </p>
                <p className="text-sm text-slate-300 font-manrope">
                  {CONTACT_INFO.facebook}
                </p>
              </div>
            </Link>
          </div>

          {/* Original Footer Content (Centred) */}
          <div className="flex flex-col items-center gap-8 text-center pt-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 group">
                <img
                  src="/trading_logo.png"
                  alt="TradeFlow Logo"
                  className="w-10 h-10 rounded-xl object-cover shadow-2xl shadow-cyan-400/20 ring-1 ring-cyan-400/20 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-lg font-bold text-slate-100 font-headline uppercase tracking-tighter">
                  TradeFlow
                </span>
              </div>
              <p className="font-manrope text-sm text-slate-500">
                © 2026 TradeFlow. Precision engineered for high-stakes markets.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <button
                onClick={() => setLegalType("privacy_policy")}
                className="font-manrope text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                id="footer-privacy-policy"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalType("terms_service")}
                className="font-manrope text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                id="footer-terms-of-service"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setLegalType("risk_disclosure")}
                className="font-manrope text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                id="footer-risk-disclosure"
              >
                Risk Disclosure
              </button>
              <button
                onClick={() => setLegalType("security")}
                className="font-manrope text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                id="footer-security"
              >
                Security
              </button>
              <button
                onClick={() => setLegalType("api_docs")}
                className="font-manrope text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                id="footer-api-docs"
              >
                API Documentation
              </button>
            </nav>
          </div>
        </div>
      </footer>
      <LegalModal
        isOpen={!!legalType}
        onClose={() => setLegalType(null)}
        type={legalType}
      />
    </div>
  );
}
