import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function ServicesSection() {
  const coachingImage = useBaseUrl('/img/brand/service_coaching.jpg');
  const roadmapImage = useBaseUrl('/img/brand/service_roadmap.jpg');

  const services = [
    {
      id: 'coaching',
      tag: '1-ON-1 MENTORSHIP',
      title: 'Strategic 1:1 Executive Coaching',
      description: 'Private, high-impact weekly coaching sessions designed to resolve strategic bottlenecks, refine leadership style, and navigate high-stakes decisions.',
      image: coachingImage,
      features: [
        'Weekly 60-min private advisory sessions',
        'Direct 24/7 Voxer/Slack emergency support',
        'Executive decision-making frameworks',
        'Leadership communication audit',
      ],
      cta: 'Explore 1:1 Coaching',
    },
    {
      id: 'roadmap',
      tag: 'STRATEGY & SCALING',
      title: 'Personalized Growth Roadmap',
      description: 'A bespoke 90-day strategic execution blueprint that optimizes your revenue funnels, pricing model, and operational unit economics.',
      image: roadmapImage,
      features: [
        'Comprehensive 360° business audit',
        '90-day milestone & KPI scorecards',
        'Pricing & margin expansion strategy',
        'Automated operational workflows',
      ],
      cta: 'Request Growth Blueprint',
    },
    {
      id: 'leadership',
      tag: 'TEAM & CULTURE',
      title: 'Team Leadership & Culture Alignment',
      description: 'Align your executive leadership team around shared OKRs, foster an owner mindset, and build a resilient organizational culture.',
      image: coachingImage,
      features: [
        'Executive leadership alignment workshops',
        'Organizational structure redesign',
        'High-performance talent hiring playbook',
        'Accountability & OKR tracking systems',
      ],
      cta: 'Align Your Team',
    },
    {
      id: 'mastermind',
      tag: 'PEER NETWORK',
      title: 'CEO Mastermind & Advisory Board',
      description: 'Join an elite peer advisory circle of 7-8 figure founders sharing battle-tested growth strategies, insights, and high-level networking.',
      image: roadmapImage,
      features: [
        'Monthly virtual mastermind sessions',
        'Bi-annual in-person executive retreats',
        'Warm introductions to investors & partners',
        'Private Slack founder channel',
      ],
      cta: 'Apply for Mastermind',
    },
  ];

  return (
    <section id="coaching" className="py-20 lg:py-28 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            How I Help You Grow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Programs Built for Your Business Stage
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal">
            Whether you need 1-on-1 strategic advisory or a complete organizational overhaul, choose the coaching model that accelerates your vision.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-slate-900 border border-slate-800/90 overflow-hidden hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail Header */}
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-cyan-400 text-[11px] font-bold tracking-wider">
                    {service.tag}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    {service.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2.5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-xs text-slate-300 font-medium">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-400 flex items-center justify-center mr-2.5 shrink-0">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Link */}
                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-sm font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors text-decoration-none"
                  >
                    <span>{service.cta}</span>
                    <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
