import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function AboutSection() {
  const coachImage = useBaseUrl('/img/brand/coach_hero.jpg');
  const stats = [
    { value: '10+', label: 'Years Experience', detail: 'Executive & Business Coaching' },
    { value: '12+', label: 'Industry Awards', detail: 'Recognized Leadership Mentor' },
    { value: '$150M+', label: 'Client Growth', detail: 'Revenue Generated for Clients' },
    { value: '500+', label: 'CEOs Coached', detail: 'Founders & Executive Leaders' },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Key Badges Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              <img
                src={coachImage}
                alt="James David Executive Coach"
                className="w-full h-auto object-cover rounded-3xl"
              />
              
              {/* Floating Stat Badge Top Right */}
              <div className="absolute top-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-cyan-300 font-bold text-lg">
                    🏆
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">#1 Business Coach 2025</p>
                    <p className="text-xs text-slate-400">Global Executive Mentorship Award</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Stats Grid */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tag & Heading */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                Meet Your Coach
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Empowering Visionary Leaders to Build High-Impact Enterprises
              </h2>
            </div>

            {/* Narrative Bio */}
            <div className="space-y-4 text-slate-300 text-base leading-relaxed font-normal">
              <p>
                Hi, I'm <strong className="text-white">James David</strong>. Over the last decade, I've served as a trusted strategic advisor to tech founders, CEOs, and executive teams across scaling companies worldwide.
              </p>
              <p>
                After founding and scaling two multi-million dollar ventures myself, I realized that true business growth isn't about working more hours—it's about mastering organizational clarity, executive leadership, and scalable systems.
              </p>
              <p>
                My methodology combines data-driven growth strategy with high-performance executive mindset coaching to help you unlock sustainable momentum without burnout.
              </p>
            </div>

            {/* Stat Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-center hover:border-blue-500/50 transition-colors"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-white mt-1">{stat.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{stat.detail}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all text-decoration-none"
              >
                <span>Schedule a 1-on-1 Strategy Session</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
