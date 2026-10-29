import React, { useState } from 'react';

export default function ResourceNewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const articles = [
    {
      category: 'SCALING STRATEGY',
      title: '5 Mistakes CEOs Make When Scaling Past $5M ARR',
      excerpt: 'Discover why tactics that got you to $1M will actively hinder your progression to $10M.',
      readTime: '6 min read',
      date: 'Sept 2026',
      image: '/img/brand/service_roadmap.jpg',
    },
    {
      category: 'EXECUTIVE LEADERSHIP',
      title: 'How to Delegate Effectively Without Losing Quality Control',
      excerpt: 'The proven framework for empowering key leaders while maintaining strategic oversight.',
      readTime: '8 min read',
      date: 'Aug 2026',
      image: '/img/brand/service_coaching.jpg',
    },
    {
      category: 'TEAM & CULTURE',
      title: 'Building a High-Performance Culture in Remote Teams',
      excerpt: 'Practical systems for fostering accountability, alignment, and high trust in hybrid organizations.',
      readTime: '5 min read',
      date: 'Aug 2026',
      image: '/img/brand/service_roadmap.jpg',
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="blog" className="py-20 lg:py-28 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Insights & Resources
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Leadership Articles & Strategy Guides
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal">
            Actionable insights, executive playbooks, and business scaling tactics curated for modern founders.
          </p>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {articles.map((article, index) => (
            <article
              key={index}
              className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-cyan-400 text-[10px] font-bold tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center text-xs text-slate-400 gap-3 mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed mt-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <a
                    href="#"
                    className="inline-flex items-center text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors text-decoration-none"
                  >
                    <span>Read Full Article</span>
                    <svg className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA Block */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 border border-blue-800/80 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-400/30">
              FREE EXECUTIVE NEWSLETTER
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get Weekly Executive Growth Insights Delivered to Your Inbox
            </h3>

            <p className="text-sm sm:text-base text-slate-300 font-normal">
              Join 15,000+ CEOs, founders, and business leaders receiving actionable scaling strategies every Tuesday morning.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-sm font-bold animate-fadeIn">
                ✓ Thank you for subscribing! Check your inbox for your first executive guide.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your executive email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-400">
              🔒 No spam. Zero fluff. Unsubscribe at any time with 1-click.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
