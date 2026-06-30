import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "./cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start text-left")}
    >
      <span className="mb-4 inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
        <span className="h-px w-7 bg-accent/60" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl font-display text-3xl font-medium leading-[1.1] tracking-[-0.01em] text-balance sm:text-4xl md:text-[2.9rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
