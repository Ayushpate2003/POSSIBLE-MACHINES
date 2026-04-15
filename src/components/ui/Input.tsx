import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-canvas-base)] px-3 py-2 text-sm text-[var(--color-fg-primary)] shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-expo)]",
          "placeholder:text-[var(--color-fg-subtle)]",
          "focus-visible:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:shadow-[var(--color-accent-glow)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
