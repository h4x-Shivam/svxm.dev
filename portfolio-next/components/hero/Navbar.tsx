'use client';

export default function Navbar() {
  return (
    <nav className="navbar fixed top-8 left-1/2 -translate-x-1/2 z-50 opacity-0 pointer-events-auto">
      <div className="flex gap-10 bg-white px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] font-display font-semibold text-[13px] uppercase tracking-[1px]">
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">Work</a>
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">Play</a>
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">About</a>
      </div>
    </nav>
  );
}
