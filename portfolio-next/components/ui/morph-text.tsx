"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface MorphTextProps {
  /**
   * Array of words / phrases to cycle through.
   * @default ["CREATE", "DESIGN", "DEVELOP"]
   */
  words?: React.ReactNode[];
  /**
   * Duration (ms) each word is displayed before transitioning.
   * @default 3000
   */
  interval?: number;
  /**
   * Optional subtext rendered beneath the morphing word.
   */
  subtext?: string;
  /**
   * Font size passed as a CSS value (e.g. "clamp(3rem, 15vw, 10rem)").
   * Defaults to a fluid clamp that scales with the viewport.
   */
  fontSize?: string;
  /**
   * Font family. Defaults to `"Space Grotesk", sans-serif`.
   */
  fontFamily?: string;
  /** Extra CSS classes on the root wrapper. */
  className?: string;
  /** Extra CSS classes on the morphing text container. */
  textClassName?: string;
  /** Extra CSS classes on the subtext element. */
  subtextClassName?: string;
  /** Alignment of the text. Defaults to "center" */
  align?: "left" | "center";
}

// ─── Component ──────────────────────────────────────────────────────────────

export function MorphText({
  words = ["CREATE", "DESIGN", "DEVELOP"],
  interval = 3000,
  subtext,
  fontSize = "clamp(3rem, 15vw, 10rem)",
  fontFamily = '"Space Grotesk", sans-serif',
  className,
  textClassName,
  subtextClassName,
  align = "center",
}: MorphTextProps) {
  // Unique ID so multiple instances don't share filter IDs
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;

  const totalDuration = (interval / 1000) * words.length; // seconds
  const wordDuration = interval / 1000;

  // Build per-word keyframe + delay styles
  const wordStyles = words.map((_, i) => ({
    animationDelay: `${i * wordDuration}s`,
    animationDuration: `${totalDuration}s`,
  }));

  const isLeft = align === "left";
  const animName = isLeft ? "morph-word-rotate-left" : "morph-word-rotate";
  const singleAnimName = isLeft ? "morph-word-enter-left" : "morph-word-enter";

  return (
    <div className={cn(`morph-text-root relative flex flex-col ${isLeft ? 'items-start' : 'items-center'}`, className)}>
      {/* ── Threshold SVG filter (hidden) ─────────────────────────── */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Morphing word container ────────────────────────────────── */}
      <div
        className={cn("morph-text-container relative select-none", textClassName)}
        style={{
          fontSize,
          fontWeight: 700,
          filter: `url(#${filterId})`,
          fontFamily,
        }}
      >
        {/* word rotator */}
        <div
          className={`morph-word-rotator relative flex ${isLeft ? 'items-start justify-start' : 'items-center justify-center'}`}
          style={{ height: "2.2em", minWidth: "14ch" }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="morph-word absolute"
              style={{
                top: isLeft ? "0" : "50%",
                left: isLeft ? "0" : "50%",
                transform: isLeft ? "translate(0, 0)" : "translate(-50%, -50%)",
                opacity: 0,
                whiteSpace: "nowrap",
                animationName: words.length > 1 ? animName : singleAnimName,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: words.length > 1 ? "infinite" : "1",
                animationFillMode: "both",
                animationDelay: words.length > 1 ? `${i * wordDuration}s` : "0s",
                animationDuration: words.length > 1 ? `${totalDuration}s` : "2s",
                transformOrigin: isLeft ? "left top" : "center",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Optional subtext ──────────────────────────────────────── */}
      {subtext && (
        <p
          className={cn(
            "morph-subtext mt-8 uppercase tracking-[0.2em] text-[#888]",
            subtextClassName
          )}
          style={{
            fontSize: "1.2rem",
            opacity: 0,
            animation: "morph-fade-up 1s ease-out 1s forwards",
            fontFamily,
          }}
        >
          {subtext}
        </p>
      )}

      {/* ── Scoped keyframes ──────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');

        @keyframes morph-word-rotate {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(0.8);
          }
          5% {
            opacity: 0.5;
            filter: blur(10px);
          }
          15%, 35% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1);
          }
          45% {
            opacity: 0.5;
            filter: blur(10px);
          }
          50%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        
        @keyframes morph-word-rotate-left {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(0, 0) scale(0.8);
          }
          5% {
            opacity: 0.5;
            filter: blur(10px);
          }
          15%, 35% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(0, 0) scale(1);
          }
          45% {
            opacity: 0.5;
            filter: blur(10px);
          }
          50%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(0, 0) scale(1.2);
          }
        }
        
        @keyframes morph-word-enter {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes morph-word-enter-left {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(0, 0) scale(0.8);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes morph-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default MorphText;
