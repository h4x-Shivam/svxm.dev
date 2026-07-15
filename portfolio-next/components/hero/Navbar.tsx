'use client';

export default function Navbar() {
  return (
    <nav className="navbar fixed top-8 left-1/2 -translate-x-1/2 z-50 opacity-0 pointer-events-auto">
      <div className="flex gap-8 bg-white px-10 py-3.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] font-display font-semibold text-[15px] uppercase tracking-normal">
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">Work</a>
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">Play</a>
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">About</a>
      </div>
    </nav>
  );
}
