import { CometCard } from "@/components/ui/comet-card";
import Image from "next/image";

export default function CometCardDemo() {
  return (
    <div
      className="my-10 w-[300px] sm:w-[380px] md:w-[420px] lg:w-[460px] cursor-pointer md:my-10 mx-auto"
    >
      <CometCard>
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            fill
            priority
            className="absolute inset-0 h-full w-full bg-[#000000] object-cover contrast-[1.1] saturate-[0.3]"
            alt="Portrait"
            src="/project/WhatsApp Image 2026-06-21 at 23.44.39.jpeg"
          />
          {/* Deep black vignette to mood the image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_150%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
        </div>
      </CometCard>
    </div>
  );
}
