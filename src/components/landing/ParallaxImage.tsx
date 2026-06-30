"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "./cn";

// Capa de imagen con parallax sutil ligado al scroll.
// Colocar DENTRO de un contenedor `relative overflow-hidden`.
export function ParallaxImage({
  src,
  alt = "",
  className,
  range = 60,
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  range?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range / 2, range / 2]);

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
      <Image
        src={src}
        alt={alt}
        aria-hidden={alt === ""}
        fill
        priority={priority}
        sizes="100vw"
        className={cn("object-cover", className)}
      />
    </motion.div>
  );
}
