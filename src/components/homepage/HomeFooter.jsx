import React from 'react';

export default function HomeFooter() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top CTA Conversion Prompt Card */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Scale Your Business to the Next Level?
            </h3>
            <p className="text-sm text-slate-300">
              Schedule a complimentary 30-minute discovery call to analyze your strategic bottlenecks.
            </p>
          </div>
          <a
            href="mailto:contact@jamesdavidcoach.com"
            className="px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all shrink-0 text-decoration-none"
          >
            Book Your Free Call Now
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block">
                  James David
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 block -mt-1">
                  Executive & Business Coach
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering CEOs, founders, and executive leadership teams to achieve sustainable scaling, high-performance culture, and operational freedom.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {['LinkedIn', 'Twitter/X', 'YouTube', 'Podcast', 'Instagram'].map((network) => (
                <a
                  key={network}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-blue-500/40 transition-colors text-decoration-none"
                  aria-label={network}
                >
                  {network[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</p>
            <ul className="space-y-2 text-xs">
              {['Home', 'About', 'Coaching', 'Success Stories', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-cyan-300 transition-colors text-decoration-none">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coaching Programs */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Programs</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#coaching" className="hover:text-cyan-300 transition-colors text-decoration-none">Strategic 1:1 Coaching</a></li>
              <li><a href="#coaching" className="hover:text-cyan-300 transition-colors text-decoration-none">90-Day Growth Roadmap</a></li>
              <li><a href="#coaching" className="hover:text-cyan-300 transition-colors text-decoration-none">Team Alignment Workshop</a></li>
              <li><a href="#coaching" className="hover:text-cyan-300 transition-colors text-decoration-none">CEO Mastermind Circle</a></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Office</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              San Francisco, CA & Global Remote Strategy Sessions
            </p>
            <p className="text-xs text-cyan-400 font-medium">
              contact@jamesdavidcoach.com
            </p>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} James David Executive Coaching. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 text-decoration-none">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 text-decoration-none">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 text-decoration-none">Client Portal</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
