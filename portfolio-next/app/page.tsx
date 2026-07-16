'use client';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import ProjectsSection from '@/components/work/ProjectsSection';
import AboutSection from '@/components/about/AboutSection';
import TechStackSection from '@/components/tech/TechStackSection';
import Footer from '@/components/footer/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      // Critical: Refresh all GSAP ScrollTriggers after the loading screen morphs and unlocks the body
      // This recalculates all section heights and prevents pinning overlaps
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    } else {
      document.body.classList.add('locked');
    }
  }, [loaded]);

  return (
    <main>
      <HeroSection onMorphComplete={() => setLoaded(true)} />
      <ProjectsSection />
      <TechStackSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
