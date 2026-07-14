'use client';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import Navbar from '@/components/hero/Navbar';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      document.body.classList.remove('locked');
    } else {
      document.body.classList.add('locked');
    }
  }, [loaded]);

  return (
    <main>
      <div className="fixed inset-0 flex justify-between px-[4vw] pointer-events-none z-[1]">
        <span className="w-[1px] h-full bg-[var(--color-ink)] opacity-[0.04]"></span>
        <span className="w-[1px] h-full bg-[var(--color-ink)] opacity-[0.04]"></span>
        <span className="w-[1px] h-full bg-[var(--color-ink)] opacity-[0.04]"></span>
        <span className="w-[1px] h-full bg-[var(--color-ink)] opacity-[0.04]"></span>
        <span className="w-[1px] h-full bg-[var(--color-ink)] opacity-[0.04]"></span>
      </div>

      <Navbar />
      <HeroSection onMorphComplete={() => setLoaded(true)} />
      <section className="relative z-[5] h-screen flex items-center justify-center font-mono text-2xl text-[var(--color-paper)] bg-[var(--color-ink)]">
        Rest of the page continues here ↓
      </section>
    </main>
  );
}
