import React from 'react';

export default function CaseStudySection() {
  const testimonials = [
    {
      quote: "James helped us re-architect our sales strategy and hire our VP of Growth. In less than 12 months, our EBITDA doubled while working 20 fewer hours a week.",
      author: 'Elena Rostova',
      role: 'CEO & Founder, Apex Retail Technologies',
      growth: '2.4x EBITDA',
    },
    {
      quote: "Before working with James, I was drowning in daily micro-management. His leadership frameworks gave my team full autonomy and boosted our execution velocity.",
      author: 'David Sterling',
      role: 'Founder, Sterling SaaS Solutions',
      growth: '3x Velocity',
    },
  ];

  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Soft Orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Client Transformations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Results from Real Founders
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal">
            Discover how ambitious business owners scaled revenue, built high-performing executive teams, and reclaimed personal freedom.
          </p>
        </div>

        {/* Featured Main Case Study Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 p-8 sm:p-12 shadow-2xl mb-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Client Headshot & Identity */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-xl">
                <img
                  src="/img/brand/client_ceo.jpg"
                  alt="Marcus Vance CEO NexaTech"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Marcus Vance</h3>
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  Founder & CEO, NexaTech
                </p>
                <p className="text-xs text-slate-400 mt-1">Enterprise SaaS Platform</p>
              </div>
            </div>

            {/* Right Column: Case Study Narrative & Metrics */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-400/30">
                CASE STUDY: 6X REVENUE SCALING
              </div>

              <blockquote className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed italic">
                "Working with James fundamentally shifted how I lead. We eliminated our operational bottlenecks, restructured our executive tier, and scaled from $2M to $12M ARR in just 18 months—all while reclaiming my weekends."
              </blockquote>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <p className="text-2xl font-extrabold text-cyan-400">+500% ARR</p>
                  <p className="text-xs text-slate-400 mt-0.5">$2M → $12M Growth</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <p className="text-2xl font-extrabold text-blue-400">15 hrs/wk</p>
                  <p className="text-xs text-slate-400 mt-0.5">CEO Time Saved</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <p className="text-2xl font-extrabold text-cyan-300">94%</p>
                  <p className="text-xs text-slate-400 mt-0.5">Executive Retention</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Secondary Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-7 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition-colors space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
                <span className="px-3 py-1 rounded-full bg-blue-950 text-cyan-400 text-xs font-bold border border-blue-800">
                  {t.growth}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-normal italic">
                "{t.quote}"
              </p>
              <div className="pt-3 border-t border-slate-800/80">
                <p className="text-sm font-bold text-white">{t.author}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
