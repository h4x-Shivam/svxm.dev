'use client';
import { RotatingTitle } from './RotatingTitle';
import CometCardDemo from '@/components/comet-card-demo';

export default function HeroContent() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-12 px-[4vw]">
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col z-20 lg:col-span-7">
          <RotatingTitle />
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-center lg:col-span-5 w-full mt-8 lg:mt-0">
          <CometCardDemo />
        </div>

      </div>
    </div>
  );
}

