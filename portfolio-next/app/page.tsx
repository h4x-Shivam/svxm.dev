'use client';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import Navbar from '@/components/hero/Navbar';
import ProjectsSection from '@/components/work/ProjectsSection';
import AboutSection from '@/components/about/AboutSection';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Force scroll to top and disable automatic scroll restoration on reload
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      document.body.classList.remove('locked');
    } else {
      document.body.classList.add('locked');
    }
  }, [loaded]);

  return (
    <main>


      <Navbar />
      <HeroSection onMorphComplete={() => setLoaded(true)} />
      <ProjectsSection />
      <AboutSection />
    </main>
  );
}
