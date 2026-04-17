import React, { useEffect } from 'react';

type LegalType = 'privacy' | 'support' | 'terms' | 'privacy_policy' | 'terms_service' | 'risk_disclosure' | 'security' | 'api_docs' | null;

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !type) return null;

  const contentMap: Record<NonNullable<LegalType>, { title: string; body: React.ReactNode }> = {
    privacy: {
      title: 'Privacy Protocol',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed">
          <p>
            <strong className="text-cyan-400">Section 1: Data Encryption</strong><br/>
            All communication within the TradeFlow infrastructure is secured using military-grade RSA-4096 and AES-256 end-to-end encryption. User behavioral data, transaction hashes, and metadata are anonymized and stored offline in cold storage facilities.
          </p>
          <p>
            <strong className="text-cyan-400">Section 2: Telemetry</strong><br/>
            We collect mandatory telemetry essential for algorithmic stability and market-depth synchronization. None of this data is sold to third-party entities. Access is strictly audited and limited to Tier-4 cleared personnel.
          </p>
          <p>
            <strong className="text-cyan-400">Section 3: Right to Oblivion</strong><br/>
            You may request complete neural-net wipe of your trading footprint via the Encrypted Support channel. Deletion cascades across all sub-nodes within 72 hours.
          </p>
        </div>
      )
    },
    support: {
      title: 'Encrypted Support',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed">
          <p>
            Our support operatives monitor the dark-fiber network 24/7. Wait times vary based on your clearance Tier.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-cyan-400/80">
            <li><span className="text-on-surface-variant">Basic Tier: SLA 48h response</span></li>
            <li><span className="text-on-surface-variant">Standard Tier: SLA 12h response</span></li>
            <li><span className="text-on-surface-variant">Premium Tier: Priority routing, SLA 2h response</span></li>
            <li><span className="text-on-surface-variant">VIP Tier: Direct encrypted VoIP line to Account Manager</span></li>
          </ul>
          <p className="mt-4 border-l-2 border-primary-container pl-4 text-xs">
            Initiate a secure handshake by sending your PGP public key to: <br/>
            <code className="text-cyan-400 block mt-2 p-2 bg-surface-container-highest/50 rounded">
              GPG PGP: 0x8A2E 1F2B 3D4C 9E7A
            </code>
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Access',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed">
          <p>
            By accessing the TradeFlow Terminal, you agree to submit to the following operational parameters:
          </p>
          <p>
            <strong className="text-cyan-400">1. Execution Risks</strong><br/>
            Market slippage, liquidity vacuums, and sudden flash-crashes are inherent risks. TradeFlow is not liable for capital materialization failures.
          </p>
          <p>
            <strong className="text-cyan-400">2. Algorithmic Trading</strong><br/>
            HFT (High Frequency Trading) bots must be registered via the API portal. Unregistered automated pinging exceeding 10,000 req/min will trigger an automatic IP ban and capital quarantine.
          </p>
          <p>
            <strong className="text-cyan-400">3. Compliance</strong><br/>
            Users must comply with all local, planetary, and orbital trading regulations.
          </p>
        </div>
      )
    },
    privacy_policy: {
      title: 'Privacy Policy',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed">
          <p>
            TradeFlow respects your digital sovereignty. Beyond our Privacy Protocol, this policy details our compliance with global data protection standards (GDPR, CCPA).
          </p>
          <p>
            We process identity verification (KYC) data solely for regulatory compliance. This information is siloed from our active trading engine.
          </p>
          <p>
            Cookies are used only for session persistence and security tokens. Marketing trackers are strictly prohibited on all TradeFlow domains.
          </p>
        </div>
      )
    },
    terms_service: {
      title: 'Terms of Service',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed">
          <p>
            These terms govern your use of the TradeFlow ecosystem.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Users must be 18+ years of age.</li>
            <li>The terminal is provided "as is" without warranty of uptime.</li>
            <li>Misuse of system vulnerabilities will result in immediate termination of access.</li>
          </ul>
        </div>
      )
    },
    risk_disclosure: {
      title: 'Risk Disclosure',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed border-l-2 border-red-500/50 pl-4 bg-red-500/5">
          <p className="font-bold text-red-400 uppercase tracking-widest text-xs">High Risk Warning</p>
          <p>
            Trading assets involves substantial risk of loss. It is not suitable for all investors. Leveraged products amplify both gains and losses.
          </p>
          <p>
            Past performance is not indicative of future results. Only trade with capital you are prepared to lose entirely. Consult with a certified financial advisor before committing substantial capital.
          </p>
        </div>
      )
    },
    security: {
      title: 'Security Architecture',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed">
          <p>
            TradeFlow utilizes a decentralized security architecture. 
          </p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/10">
              <p className="text-cyan-400 font-bold text-xs uppercase mb-1">Vault</p>
              <p className="text-[10px]">98% of assets held in multi-signature cold storage.</p>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/10">
              <p className="text-cyan-400 font-bold text-xs uppercase mb-1">Defense</p>
              <p className="text-[10px]">AI-driven intrusion detection system (IDS) per node.</p>
            </div>
          </div>
        </div>
      )
    },
    api_docs: {
      title: 'API Documentation',
      body: (
        <div className="space-y-4 text-sm text-on-surface-variant font-body leading-relaxed">
          <p>
            Integrate directly with our low-latency execution engine via WebSocket and REST.
          </p>
          <code className="block bg-slate-900 p-4 rounded-lg font-mono text-[11px] text-cyan-300">
            GET https://api.tradeflow.io/v1/market/ticker?symbol=BTC-USD
          </code>
          <p className="text-xs italic">
            * API access requires Tier-2 clearance and a valid API Secret Key generated from your dashboard settings.
          </p>
        </div>
      )
    }
  };

  const { title, body } = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-dim border border-outline-variant/20 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/10 bg-surface-container/50">
          <h2 className="font-headline font-black text-lg tracking-widest text-slate-50 uppercase">{title}</h2>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-cyan-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {body}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline-variant/10 bg-surface-container/50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-primary-container text-on-primary-fixed px-6 py-2 rounded font-label text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)]"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
