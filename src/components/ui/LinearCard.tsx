"use client";

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export interface LinearCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const LinearCard = React.forwardRef<HTMLDivElement, LinearCardProps>(
  ({ className, glass = false, children, ...props }, ref) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    return (
      <div
        className={cn(
          "group relative rounded-2xl border border-[var(--color-border-subtle)] bg-gradient-to-b from-[rgba(0,0,0,0.01)] to-transparent transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-linear-hover)] shadow-[var(--shadow-linear-card)] overflow-hidden",
          glass && "bg-white/40 backdrop-blur-md",
          className
        )}
        onMouseMove={handleMouseMove}
        ref={ref}
        {...props}
      >
        {/* Mouse tracking spotlight effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                var(--color-accent-glow),
                transparent 80%
              )
            `,
          }}
        />
        {/* Subtle inner top highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] mix-blend-overlay" />
        
        <div className="relative z-10 w-full h-full p-6">
          {children}
        </div>
      </div>
    )
  }
)
LinearCard.displayName = "LinearCard"
