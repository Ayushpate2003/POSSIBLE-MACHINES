import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-[all,transform] duration-300 ease-[var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas-base)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-accent)] text-white shadow-[var(--shadow-accent-glow)] hover:bg-[var(--color-accent-bright)] hover:shadow-[0_0_0_1px_rgba(124,181,24,0.6),0_6px_20px_rgba(124,181,24,0.3),inset_0_1px_0_0_rgba(255,255,255,0.3)]",
        secondary:
          "bg-[rgba(0,0,0,0.02)] text-[var(--color-fg-primary)] shadow-[inset_0_0_0_1px_var(--color-border-subtle)] hover:bg-[rgba(0,0,0,0.04)]",
        ghost:
          "text-[var(--color-fg-muted)] hover:bg-[rgba(0,0,0,0.04)] hover:text-[var(--color-fg-primary)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
