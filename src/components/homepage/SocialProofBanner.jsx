import React from 'react';

export default function SocialProofBanner() {
  const logos = [
    { name: 'TechCorp', icon: '⚡ TechCorp' },
    { name: 'Apex Ventures', icon: '▲ Apex Ventures' },
    { name: 'NexaScale', icon: '❖ NexaScale' },
    { name: 'Horizon Global', icon: '🌐 Horizon Global' },
    { name: 'Vanguard Labs', icon: '🛡 Vanguard Labs' },
    { name: 'Summit Media', icon: '✦ Summit Media' },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Heading */}
        <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">
          Trusted by 500+ Entrepreneurs, CEOs, and High-Growth Founders
        </p>

        {/* Logos Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800/80 w-full text-center hover:border-blue-500/40 hover:bg-slate-800/50 transition-all duration-300 group"
            >
              <span className="text-base sm:text-lg font-bold text-slate-400 group-hover:text-cyan-300 transition-colors tracking-tight">
                {logo.icon}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
