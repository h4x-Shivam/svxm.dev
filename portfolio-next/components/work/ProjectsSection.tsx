import React from 'react';
import Image from 'next/image';

const PROJECTS = [
  {
    id: '01',
    title: 'SwingsterV2',
    category: 'SaaS Platform',
    year: '2025',
    image: '/project/Screenshot 2026-07-15 204735.png',
    description: 'SwingsterV2, an AI-powered stock pattern intelligence platform that transforms market noise into actionable opportunities. It scans thousands of stocks, detects institutional-grade chart patterns, filters them through a multi-stage quantitative engine, and delivers only the highest-conviction trade setups via a modern SaaS dashboard.'
  },
  {
    id: '02',
    title: 'VerdictX',
    category: 'AI Research Engine',
    year: '2026',
    image: '/project/Screenshot 2026-07-15 211205.png',
    description: 'VerdictX is an intelligent investment research engine built for the Indian stock market. By combining live financial data and real-time news with a unique Multi-Agent AI architecture, VerdictX forces "Bull" and "Bear" AI agents to debate a stock\'s potential. A neutral "Judge" agent then delivers a final, data-driven verdict, providing users with institutional-grade insights in seconds.'
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative w-full min-h-screen bg-white text-[var(--color-ink)] py-32 px-[4vw] z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 flex items-end justify-between border-b border-[var(--color-ink)]/10 pb-10">
          <h2 className="font-display font-bold text-[clamp(60px,10vw,180px)] leading-none uppercase tracking-tighter">
            Projects
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest hidden md:block mb-4">
            Selected Works
          </p>
        </div>

        <div className="flex flex-col gap-32 w-full">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left Side: Image */}
              <div className="lg:col-span-7 relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* Right Side: Description */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-6 mb-8 opacity-60">
                  <span className="font-mono text-sm uppercase tracking-widest">
                    {project.id}
                  </span>
                  <div className="w-12 h-[1px] bg-[var(--color-ink)]" />
                  <span className="font-mono text-sm uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-[clamp(40px,4vw,64px)] leading-none tracking-tight mb-8">
                  {project.title}
                </h3>
                
                <p className="font-mono text-[clamp(16px,1.2vw,20px)] leading-relaxed opacity-80 text-justify">
                  {project.description}
                </p>
                
                <div className="mt-12 flex items-center gap-4 group cursor-pointer w-fit">
                  <span className="font-display font-bold uppercase tracking-widest text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--color-ink)] after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-0 hover:after:origin-left">
                    View Project
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[var(--color-ink)] flex items-center justify-center group-hover:bg-[var(--color-ink)] group-hover:text-white transition-colors duration-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
