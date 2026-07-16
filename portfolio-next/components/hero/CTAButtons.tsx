'use client';

export function CTAButtons() {
  return (
    <div className="flex flex-wrap items-center gap-6 mt-10">
      {/* Primary Button */}
      <a 
        href="#work" 
        className="group relative flex items-center justify-center h-14 px-8 rounded-full bg-[var(--color-paper)] text-[var(--color-ink)] font-display font-bold uppercase tracking-[0.1em] text-sm overflow-hidden transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
      >
        <span className="relative z-10">View My Work</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      </a>

      {/* Secondary Button */}
      <a 
        href="#connect" 
        className="group relative flex items-center justify-center h-14 px-8 rounded-full border border-[var(--color-paper)]/30 text-[var(--color-paper)] font-display font-bold uppercase tracking-[0.1em] text-sm overflow-hidden transition-all duration-500 hover:-translate-y-[2px] hover:border-[var(--color-paper)] hover:shadow-[0_12px_24px_rgba(255,255,255,0.05)] hover:scale-[1.02]"
      >
        <span className="relative z-10">Let's Connect</span>
        <div className="absolute inset-0 bg-[var(--color-paper)] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      </a>
    </div>
  );
}
