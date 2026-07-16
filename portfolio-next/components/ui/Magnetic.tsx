'use client';
import { useRef, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export default function Magnetic({ children, strength = 40 }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el || typeof window !== 'undefined' && window.innerWidth < 768) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      gsap.to(el, {
        x: (x / width) * strength,
        y: (y / height) * strength,
        duration: 1,
        ease: 'power3.out'
      });
    };

    const onMouseLeave = () => {
      setIsHovered(false);
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    const onMouseEnter = () => setIsHovered(true);

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseenter', onMouseEnter);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isHovered, strength]);

  return (
    <div ref={magneticRef} className="inline-block relative">
      {children}
    </div>
  );
}
