import { Logo } from "./Logo";
import type { LandingDict } from "./types";

export function Footer({ t }: { t: LandingDict["footer"] }) {
  return (
    <footer className="relative border-t border-line/60 bg-bg-2">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <nav className="flex items-center gap-6 text-sm text-muted">
            <a href="#pricing" className="transition-colors hover:text-ink">
              {t.pricing}
            </a>
            <a href="#faq" className="transition-colors hover:text-ink">
              {t.faq}
            </a>
            <a href="/login" className="transition-colors hover:text-ink">
              {t.signIn}
            </a>
          </nav>
          <p className="flex items-center gap-1.5 text-sm text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.rights}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-line/50 pt-6 text-xs text-faint sm:justify-start">
          <a href="/privacidad" className="transition-colors hover:text-muted">
            Privacidad
          </a>
          <a href="/terminos" className="transition-colors hover:text-muted">
            Términos y condiciones
          </a>
          <a href="/cookies" className="transition-colors hover:text-muted">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
