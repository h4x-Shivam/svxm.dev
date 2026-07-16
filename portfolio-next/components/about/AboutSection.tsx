import React from 'react';

const SKILLS = [
  'Full-Stack Engineering',
  'AI / LLM Integration',
  'Motion Design (GSAP)',
  'UI/UX Architecture',
  'Next.js & React Ecosystem',
  'Creative Development'
];

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] py-32 px-[4vw] z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 flex items-end justify-between border-b border-[var(--color-paper)]/10 pb-10">
          <h2 className="font-display font-bold text-[clamp(60px,10vw,180px)] leading-none uppercase tracking-tighter">
            About
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest hidden md:block mb-4">
            The Creator
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: The Hook */}
          <div className="lg:col-span-7">
            <h3 className="font-display font-medium text-[clamp(32px,4vw,64px)] leading-[1.1] tracking-tight">
              I bridge the gap between high-end design and robust engineering. Building digital experiences that perform as beautifully as they look.
            </h3>
          </div>

          {/* Right Column: The Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[clamp(16px,1.2vw,20px)] leading-relaxed opacity-80 text-justify mb-12">
                I am a full-stack creative partner obsessed with the intersection of aesthetics and functionality. Whether it's crafting complex AI-driven architectures or orchestrating pixel-perfect motion design, I hold both design and code to the exact same standard.
              </p>
              
              <div className="w-full">
                <h4 className="font-mono text-sm uppercase tracking-widest opacity-40 mb-6">Core Capabilities</h4>
                <ul className="flex flex-col gap-4 border-t border-[var(--color-paper)]/10 pt-6">
                  {SKILLS.map((skill, idx) => (
                    <li key={idx} className="font-display text-xl md:text-2xl tracking-tight flex items-center justify-between group cursor-default">
                      <span>{skill}</span>
                      <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-24 w-fit">
              <a href="mailto:hello@example.com" className="flex items-center gap-4 group cursor-pointer">
                <span className="font-display font-bold uppercase tracking-widest text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--color-paper)] after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-0 hover:after:origin-left">
                  Get In Touch
                </span>
                <div className="w-8 h-8 rounded-full border border-[var(--color-paper)] flex items-center justify-center group-hover:bg-[var(--color-paper)] group-hover:text-[var(--color-ink)] transition-colors duration-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
