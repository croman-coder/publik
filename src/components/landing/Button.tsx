import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#1f0d04] font-semibold shadow-[0_10px_40px_-12px_rgba(249,115,22,0.7)] hover:bg-accent-2 hover:shadow-[0_14px_50px_-12px_rgba(251,146,60,0.85)]",
  secondary: "glass text-white font-medium hover:bg-white/[0.08] hover:border-white/20",
  ghost: "text-white/80 font-medium hover:text-white hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem] gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "group inline-flex cursor-pointer select-none items-center justify-center rounded-full transition-all duration-300 ease-out will-change-transform active:scale-[0.98]",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
