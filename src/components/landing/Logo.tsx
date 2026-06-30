import { cn } from "./cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} role="img" aria-label="PUBLIK">
      <defs>
        <linearGradient id="pk-mark" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fdba74" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#pk-mark)" />
      <path d="M16 22.5V11.5" stroke="#2a1206" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="m11 15.5 5-5 5 5"
        stroke="#2a1206"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="25.4" r="1.15" fill="#2a1206" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="select-none text-lg font-extrabold tracking-[0.04em] text-white">
        PUBLI<span className="text-accent">K</span>
      </span>
    </span>
  );
}
