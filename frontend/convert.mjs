import fs from 'fs';

const htmlFile = './src/pages/stitch_landing.html';
const reactFile = './src/pages/LandingPage.tsx';

let html = fs.readFileSync(htmlFile, 'utf8');

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}
let bodyContent = bodyMatch[1];

// Convert to JSX
bodyContent = bodyContent.replace(/class=/g, 'className=');
bodyContent = bodyContent.replace(/<img(.*?)>/g, (match, g1) => {
    if (match.endsWith('/>')) return match;
    return `<img${g1} />`;
});
bodyContent = bodyContent.replace(/<br>/g, '<br />');
bodyContent = bodyContent.replace(/<hr>/g, '<hr />');

// Specific replacements:
bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    // very basic style to object conversion for this specific case
    if (styleString.includes("font-variation-settings: 'FILL' 1;")) {
        return `style={{ fontVariationSettings: "'FILL' 1" }}`;
    }
    return match;
});

// React Router Links
bodyContent = bodyContent.replace(/<button className="px-5 py-2[^"]*">Sign In<\/button>/g, '<Link to="/login" className="px-5 py-2 text-slate-400 hover:text-slate-100 font-medium transition-colors">Sign In</Link>');
bodyContent = bodyContent.replace(/<button className="px-6 py-2.5[^"]*">Get Started<\/button>/g, '<Link to="/register" className="px-6 py-2.5 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300">Get Started</Link>');
bodyContent = bodyContent.replace(/<button className="px-12 py-5 bg-gradient-to-br[^"]*">Create Free Account<\/button>/g, '<Link to="/register" className="px-12 py-5 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container text-xl font-bold rounded-2xl hover:scale-105 transition-transform inline-block">Create Free Account</Link>');

// Wrap inside component
const componentSource = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function LandingPage() {
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);

  const footerLinks = [
    { title: "Terms of Service", label: "Terms", content: "Generați termeni de utilizare plasați temporar ca un pop-up. Utilizând aplicația sunteți de acord cu standardele noastre interne de funcționare." },
    { title: "Privacy Policy", label: "Privacy", content: "Platforma colectează și stochează în siguranță datele tale conform directivelor GDPR în vigoare. Nu vindem date către terți." },
    { title: "Security", label: "Security", content: "Folosim infrastructură de ultimă generație pentru a cripta parolele și a asigura securitatea fondurilor. Monitorizare asiduă 24/7." },
    { title: "System Status", label: "Status", content: "Toate sistemele și serviciile funcționează perfect. Nu raportam nicio întrerupere în ultimele 30 de zile." },
    { title: "Community", label: "Community", content: "Alătură-te comunității noastre fantastice de investitori inteligenți pe Discord, Twitter și forumul nostru principal!" },
    { title: "Documentation", label: "Docs", content: "Folosește API-ul nostru robust. Mai multe detalii tehnice și endpoint-uri vor fi disponibile pe hub-ul dezvolatorului." },
    { title: "Contact Us", label: "Contact", content: "Ne poți aborda pe support@tradeflow.com pentru orice speță de securitate sau legată de funcționarea backend-ului." },
  ];

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container">
      ${bodyContent}

      {/* Generic Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-surface-container-high w-full max-w-lg rounded-2xl border border-outline-variant/30 p-8 shadow-2xl relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold mb-4 pr-8 text-on-surface font-headline">{activeModal.title}</h2>
            <div className="w-12 h-1 bg-primary-container rounded-full mb-6"></div>
            
            <p className="text-on-surface-variant leading-relaxed mb-8">
              {activeModal.content}
            </p>
            
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full bg-secondary hover:bg-secondary/80 text-on-secondary font-semibold py-3 rounded-xl transition-colors"
            >
              Am înțeles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync(reactFile, componentSource);
console.log('Done converting LandingPage!');
