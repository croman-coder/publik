"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { LangToggle } from "./LangToggle";
import { IconMenu, IconX } from "./Icons";
import { cn } from "./cn";
import type { LandingDict } from "./types";

export function Nav({ t }: { t: LandingDict["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: t.how, href: "#how" },
    { label: t.pricing, href: "#pricing" },
    { label: t.faq, href: "#faq" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent",
        )}
      >
        <a href="#top" aria-label="PUBLIK" className="shrink-0">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LangToggle />
          <Button href="/login" variant="ghost" size="md">
            {t.signIn}
          </Button>
          <Button href="/login" variant="primary" size="md">
            {t.tryFree}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          >
            {open ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-bg/95 px-6 pt-24 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/60 py-4 font-display text-2xl text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button href="/login" variant="secondary" size="lg" onClick={() => setOpen(false)}>
                {t.signIn}
              </Button>
              <Button href="/login" variant="primary" size="lg" onClick={() => setOpen(false)}>
                {t.tryFree}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
