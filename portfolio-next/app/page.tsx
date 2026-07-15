'use client';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import Navbar from '@/components/hero/Navbar';
import ProjectsSection from '@/components/work/ProjectsSection';

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


      <Navbar />
      <HeroSection onMorphComplete={() => setLoaded(true)} />
      <ProjectsSection />
    </main>
  );
}
