'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface FloatingCardProps extends HTMLMotionProps<"div"> {
  innerRef?: React.Ref<HTMLDivElement>;
}

export function FloatingCard({ className, children, innerRef, ...props }: FloatingCardProps) {
  return (
    <motion.div
      ref={innerRef}
      className={cn(
        "absolute rounded-[20px] border border-[var(--color-paper)]/[0.08] bg-[var(--color-paper)]/[0.03] backdrop-blur-2xl shadow-[0_32px_64px_rgba(0,0,0,0.4)] overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
