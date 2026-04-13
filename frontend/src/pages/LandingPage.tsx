import { Link } from "react-router-dom";
import { ArrowRight, Shield, TrendingUp, Zap, BarChart3, Lock, Globe, Check } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold">TradeFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Funcționalități</a>
            <a href="#security" className="hover:text-foreground transition-colors">Siguranță</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Prețuri</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Login
            </Link>
            <Link to="/register" className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Start Trading
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" />
          Trading profesional, simplu și rapid
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto mb-6">
          Investește inteligent cu <span className="text-primary">TradeFlow</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Platforma de trading de ultima generație. Grafice profesionale, execuție rapidă, zero comisioane. Tot ce ai nevoie, într-un singur loc.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/register" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/login" className="inline-flex items-center gap-2 border border-border px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-secondary transition-colors">
            Login
          </Link>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 max-w-lg mx-auto mt-16 gap-8">
          {[
            { value: "50K+", label: "Utilizatori activi" },
            { value: "$2B+", label: "Volum tranzacționat" },
            { value: "0.01s", label: "Viteză de execuție" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features / De ce noi? */}
      <section id="features" className="border-t border-border bg-card/50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">De ce TradeFlow?</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
            Instrumentele de care ai nevoie pentru a lua decizii informate, într-o interfață construită pentru performanță.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, title: "Grafice Profesionale", desc: "Analiză tehnică avansată cu grafice candlestick în timp real, indicatori și instrumente de desen." },
              { icon: Zap, title: "Execuție Rapidă", desc: "Ordine executate în milisecunde. Ordine market, limit și stop-loss disponibile." },
              { icon: Globe, title: "Piețe Globale", desc: "Acces la acțiuni americane, ETF-uri și criptomonede, toate dintr-un singur cont." },
              { icon: Shield, title: "Securitate Maximă", desc: "Datele tale sunt protejate cu criptare end-to-end și autentificare în doi pași." },
              { icon: Lock, title: "Zero Comisioane", desc: "Tranzacționează fără comisioane ascunse. Ce vezi e ce plătești." },
              { icon: TrendingUp, title: "Portofoliu Inteligent", desc: "Urmărește performanța investițiilor tale cu analize detaliate și rapoarte lunare." },
            ].map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="border-t border-border py-24">
        <div className="container mx-auto px-6 text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Siguranța fondurilor tale</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            Folosim cele mai înalte standarde de securitate din industrie pentru a-ți proteja contul și investițiile.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {["Criptare SSL/TLS 256-bit", "Autentificare 2FA", "Fonduri separate", "Audit de securitate regulat", "Conformitate cu regulamentele", "Suport 24/7"].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border bg-card/50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Planuri simple, transparente</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
            Alege planul potrivit pentru stilul tău de trading.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Starter", price: "Gratuit", features: ["Tranzacții fără comision", "Grafice de bază", "3 watchlists", "Suport email"], highlight: false },
              { name: "Pro", price: "$9.99/lună", features: ["Tot din Starter", "Grafice avansate", "Watchlists nelimitate", "Analiză portofoliu", "Suport prioritar"], highlight: true },
              { name: "Enterprise", price: "Custom", features: ["Tot din Pro", "API dedicat", "Manager de cont", "SLA garantat", "Integrări custom"], highlight: false },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-xl border p-8 flex flex-col ${plan.highlight ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card"}`}>
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <div className="text-3xl font-bold mt-2 mb-6">{plan.price}</div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`text-center py-3 rounded-lg font-semibold text-sm transition-all ${
                    plan.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contactează-ne" : "Începe acum"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold">TradeFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 TradeFlow. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
