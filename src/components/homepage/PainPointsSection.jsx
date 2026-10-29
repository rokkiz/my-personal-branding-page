import React from 'react';

export default function PainPointsSection() {
  const painPoints = [
    {
      title: 'Struggling to Scale Revenue Past Plateaus',
      description: 'Hit an invisible growth ceiling despite working harder and investing more capital into traditional tactics.',
    },
    {
      title: 'Wearing Too Many Hats in Operations',
      description: 'Trapped in the weeds of daily firefighting with zero bandwidth to focus on high-leverage strategic initiatives.',
    },
    {
      title: 'Lack of Strategic Clarity & Direction',
      description: 'Overwhelmed by competing priorities and second-guessing critical business decisions without an expert sounding board.',
    },
    {
      title: 'Ineffective Team Delegation & Accountability',
      description: 'Frustrated by team execution bottlenecks, requiring constant supervision to maintain output quality.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            Common Founder Challenges
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Feeling Stuck or Overwhelmed as a Business Owner?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Building a multi-million dollar business shouldn't mean sacrificing your sanity or personal life. Recognize any of these growth barriers?
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Pain Points List with Blue Check Indicators */}
          <div className="lg:col-span-6 space-y-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Interactive / Highlighting Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Highlight Card 1: Growth Stuck */}
            <div className="p-7 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  Status: Revenue Plateau
                </span>
                <span className="text-2xl">📉</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Growth Stuck</h4>
              <p className="text-sm text-slate-300 mb-4 font-normal">
                Stuck at $1M–$5M ARR with stagnant profit margins and rising customer acquisition costs.
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>With Strategic Coaching:</span>
                <span className="font-bold text-cyan-400">+180% Revenue Expansion Roadmap</span>
              </div>
            </div>

            {/* Highlight Card 2: Wearing Too Many Hats */}
            <div className="p-7 rounded-3xl bg-white text-slate-900 shadow-lg border border-slate-200 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Status: 70+ Hours / Week
                </span>
                <span className="text-2xl">⏳</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Wearing Too Many Hats</h4>
              <p className="text-sm text-slate-600 mb-4 font-normal">
                Acting as Sales Rep, HR Manager, and Tech Support instead of leading as CEO.
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>With Executive Delegation:</span>
                <span className="font-bold text-blue-600">Reclaim 20+ Hours / Week</span>
              </div>
            </div>

            {/* Highlight Card 3: Lack of Clarity */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-blue-900 to-slate-900 text-white shadow-xl border border-blue-800/60 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  Solution: Executive Roadmap
                </span>
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Lack of Strategic Clarity</h4>
              <p className="text-sm text-slate-300 mb-4 font-normal">
                Uncertain about market positioning, pricing strategy, and leadership succession.
              </p>
              <div className="pt-4 border-t border-blue-800/80 flex items-center justify-between text-xs text-slate-300">
                <span>The Transformation:</span>
                <span className="font-bold text-cyan-300">Actionable 90-Day Execution Plan</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
