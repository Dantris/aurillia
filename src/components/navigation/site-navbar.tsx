"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { localeFromPathname, localizedPath, stripLocale, switchLocalePath, type Locale } from "@/lib/i18n";

type ServiceItem = {
  title: string;
  href: string;
  description: string;
  highlights: string[];
};

const SERVICES: Record<Locale, ServiceItem[]> = {
  de: [
    {
      title: "Webentwicklung",
      href: "/services/web",
      description: "Websites, Relaunches und Leistungsseiten, die euer Angebot schneller verständlich machen.",
      highlights: ["Website", "SEO", "Start"],
    },
    {
      title: "Mobile Apps",
      href: "/services/mobile",
      description: "Wenn Kunden oder Teams unterwegs schnell etwas erledigen sollen.",
      highlights: ["iOS", "Android", "PWA"],
    },
    {
      title: "KI-Assistenten",
      href: "/contact?interest=AI%20Chatbot%20%2F%20Assistant",
      description: "Chatbots, Projektberater und hilfreiche KI-Assistenz für Websites.",
      highlights: ["Chat", "Wissen", "Leads"],
    },
    {
      title: "Website-Betreuung",
      href: "/contact?interest=Website%20Care",
      description: "Pflege, Inhalte, Analytics und kleine Verbesserungen nach dem Start.",
      highlights: ["Inhalte", "Analytics", "Pflege"],
    },
  ],
  en: [
    {
      title: "Web Development",
      href: "/services/web",
      description: "Websites, relaunches, and service pages that are understood faster.",
      highlights: ["Website", "SEO", "Launch"],
    },
    {
      title: "Mobile Apps",
      href: "/services/mobile",
      description: "When customers or teams need to get things done on the go.",
      highlights: ["iOS", "Android", "PWA"],
    },
    {
      title: "AI Assistants",
      href: "/contact?interest=AI%20Chatbot%20%2F%20Assistant",
      description: "Chatbots, project advisors, and useful AI paths for websites.",
      highlights: ["Chat", "Knowledge", "Leads"],
    },
    {
      title: "Website Care",
      href: "/contact?interest=Website%20Care",
      description: "Maintenance, content, analytics, and small improvements after launch.",
      highlights: ["Content", "Analytics", "Care"],
    },
  ],
};

const NAV_COPY = {
  de: {
    services: "Leistungen",
    contact: "Kontakt",
    switchLanguage: "Zur englischen Version wechseln",
    toggleMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    mobileInfoTitle: "Die meisten Projekte starten im Web",
    mobileInfoBody:
      "Eine klare Website gibt App- und KI-Projekten eine stabilere Grundlage.",
    developmentTitle: "So greift es ineinander",
    developmentBody:
      "Website, Inhalte, Technik und Betreuung gehören zusammen. Apps und KI kommen dazu, wenn sie einen echten Ablauf leichter machen.",
    flow: ["Struktur", "Text", "Design", "Umsetzung", "Start"],
    support: ["SEO", "Formulare", "Analytics", "Pflege"],
    openWeb: "Webentwicklung öffnen",
  },
  en: {
    services: "Services",
    contact: "Contact",
    switchLanguage: "Zu Deutsch wechseln",
    toggleMenu: "Toggle menu",
    closeMenu: "Close menu",
    mobileInfoTitle: "Most projects start on web",
    mobileInfoBody:
      "A clear website gives mobile and AI assistant work a stronger foundation.",
    developmentTitle: "How it fits together",
    developmentBody:
      "Website, content, engineering, and care belong together. Mobile and AI are added when they make a real workflow easier.",
    flow: ["Structure", "Copy", "Design", "Build", "Launch"],
    support: ["SEO", "Forms", "Analytics", "Care"],
    openWeb: "Open web development",
  },
} satisfies Record<
  Locale,
  {
    services: string;
    contact: string;
    switchLanguage: string;
    toggleMenu: string;
    closeMenu: string;
    mobileInfoTitle: string;
    mobileInfoBody: string;
    developmentTitle: string;
    developmentBody: string;
    flow: string[];
    support: string[];
    openWeb: string;
  }
>;

type OpenMenu = null | "services";
type ThemeName = "dark" | "light";

const THEME_STORAGE_KEY = "aurillia-theme-v2";

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme preference still applies for the current page when storage is unavailable.
  }

  window.dispatchEvent(new CustomEvent<ThemeName>("aurillia-theme-change", { detail: theme }));
}

export default function SiteNavbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const [open, setOpen] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const locale = localeFromPathname(pathname);
  const copy = NAV_COPY[locale];
  const services = SERVICES[locale];
  const inServices = stripLocale(pathname ?? "").startsWith("/services");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpen(null);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;

    if (mobileOpen) {
      html.style.overflow = "hidden";
    }

    return () => {
      html.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 z-50 w-full border-b border-[var(--site-line)] text-[var(--site-text)] backdrop-blur-xl [background:var(--site-nav-bg)]"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6 md:h-[86px] md:px-10">
          <Link href={localizedPath("/", locale)} className="flex min-w-0 items-center gap-2 text-[var(--site-strong)] sm:gap-3">
            <img src="/icon.svg" alt="" className="h-7 w-auto shrink-0 sm:h-8" aria-hidden="true" />
            <span className="truncate text-[1rem] font-semibold tracking-[0.07em] sm:text-[1.08rem] md:text-[1.18rem]">
              AURILLIA
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <button
              id="services-trigger"
              aria-haspopup="menu"
              aria-expanded={open === "services"}
              aria-controls="services-panel"
              type="button"
              onMouseEnter={() => setOpen("services")}
              onFocus={() => setOpen("services")}
              onClick={() =>
                setOpen((current) => (current === "services" ? null : "services"))
              }
              className={`inline-flex items-center gap-2 text-base font-medium transition ${
                open === "services" || inServices
                  ? "text-[var(--site-strong)]"
                  : "text-[var(--site-muted)] hover:text-[var(--site-strong)]"
              }`}
            >
              {copy.services}
              <span
                className={`text-sm transition-transform duration-200 ${
                  open === "services" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ˅
              </span>
            </button>

            <Link
              href={localizedPath("/contact", locale)}
              className="nav-contact-button"
            >
              {copy.contact}
            </Link>

            <LanguageToggle locale={locale} pathname={pathname ?? "/"} label={copy.switchLanguage} />
            <ThemeToggle locale={locale} />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:hidden">
            <LanguageToggle locale={locale} pathname={pathname ?? "/"} label={copy.switchLanguage} compact />
            <ThemeToggle locale={locale} compact />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--site-line)] bg-[var(--site-soft-bg)] text-[var(--site-strong)] transition hover:bg-[var(--site-soft-bg-hover)] sm:h-11 sm:w-11"
              aria-label={mobileOpen ? copy.closeMenu : copy.toggleMenu}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setOpen(null);
              }}
            >
              <Burger open={mobileOpen} />
            </button>
          </div>
        </div>

        <DesktopServicesMenu
          open={open === "services"}
          onClose={() => setOpen(null)}
          locale={locale}
          services={services}
          copy={copy}
        />
      </nav>

      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 bg-[var(--site-overlay)] transition-opacity sm:top-[76px] md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {mobileOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-50 border-t border-[var(--site-line)] bg-[var(--site-mobile-panel-bg)] sm:top-[76px] md:hidden"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.22em] text-[var(--site-cyan)]">
              {copy.services}
            </p>

            <div className="space-y-3">
              {services.map((item) => (
                <Link
                  key={item.href}
                  href={localizedPath(item.href, locale)}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg border border-[var(--site-soft-line)] bg-[var(--site-soft-bg)] p-4 transition hover:bg-[var(--site-soft-bg-hover)] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-[var(--site-strong)]">{item.title}</p>
                      <p className="mt-2 text-base leading-7 text-[var(--site-muted)]">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-[var(--site-muted-2)]">›</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--site-soft-line)] bg-[var(--site-soft-bg)] px-3 py-1 text-sm text-[var(--site-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-[color-mix(in_oklch,var(--site-cyan)_24%,transparent)] bg-[rgba(var(--site-cyan-rgb),.06)] p-4 sm:mt-6 sm:p-5">
              <p className="text-base font-semibold text-[var(--site-strong)]">{copy.mobileInfoTitle}</p>
              <p className="mt-2 text-base leading-7 text-[var(--site-muted)]">
                {copy.mobileInfoBody}
              </p>
            </div>

            <Link
              href={localizedPath("/contact", locale)}
              onClick={() => setMobileOpen(false)}
              className="nav-contact-button mt-6 w-full"
            >
              {copy.contact}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

function LanguageToggle({
  locale,
  pathname,
  label,
  compact = false,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  compact?: boolean;
}) {
  const nextLocale: Locale = locale === "de" ? "en" : "de";

  return (
    <Link
      href={switchLocalePath(pathname, nextLocale)}
      className={`inline-flex items-center justify-center rounded-full border border-[var(--site-line)] bg-[var(--site-soft-bg)] font-mono font-semibold uppercase tracking-[0.08em] text-[var(--site-strong)] transition hover:bg-[var(--site-soft-bg-hover)] ${
        compact ? "h-10 min-w-10 px-2 text-[0.78rem] sm:h-11 sm:min-w-11 sm:px-3 sm:text-sm" : "h-11 min-w-[52px] px-3 text-sm"
      }`}
      aria-label={label}
      title={label}
      hrefLang={nextLocale}
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}

function ThemeToggle({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const [theme, setTheme] = useState<ThemeName>("dark");

  useEffect(() => {
    const syncTheme = () => {
      const activeTheme =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";
      setTheme(activeTheme);
    };

    const onThemeChange = (event: Event) => {
      const next = (event as CustomEvent<ThemeName>).detail;
      setTheme(next === "light" ? "light" : "dark");
    };

    syncTheme();
    window.addEventListener("aurillia-theme-change", onThemeChange);

    return () => {
      window.removeEventListener("aurillia-theme-change", onThemeChange);
    };
  }, []);

  const nextTheme = theme === "light" ? "dark" : "light";
  const label =
    locale === "de"
      ? nextTheme === "light"
        ? "Hellmodus aktivieren"
        : "Dunkelmodus aktivieren"
      : `Switch to ${nextTheme} mode`;
  return (
    <button
      type="button"
      className={`theme-toggle ${compact ? "theme-toggle-compact" : ""}`}
      aria-label={label}
      aria-pressed={theme === "light"}
      title={label}
      onClick={() => {
        const current =
          document.documentElement.dataset.theme === "light" ? "light" : "dark";
        applyTheme(current === "light" ? "dark" : "light");
      }}
    >
      <span className="theme-toggle-icon" aria-hidden="true" />
    </button>
  );
}

function DesktopServicesMenu({
  open,
  onClose,
  locale,
  services,
  copy,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  services: ServiceItem[];
  copy: (typeof NAV_COPY)[Locale];
}) {
  return (
    <div
      id="services-panel"
      role="menu"
      aria-labelledby="services-trigger"
      aria-hidden={!open}
      className={`absolute inset-x-0 top-full z-40 hidden border-t border-[var(--site-line)] shadow-[0_28px_90px_var(--site-menu-shadow)] transition-all duration-200 [background:var(--site-nav-panel-bg)] md:block ${
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 md:px-10 lg:grid-cols-[1.75fr_.95fr]">
        <div>
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.22em] text-[var(--site-cyan)]">
            AURILLIA
          </p>

          <div className="grid gap-x-9 gap-y-7 sm:grid-cols-2">
            {services.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(item.href, locale)}
                onClick={onClose}
                role="menuitem"
                className="group -mx-3 rounded-lg px-3 py-2 transition hover:bg-[var(--site-soft-bg-hover)]"
              >
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <p className="text-base font-semibold text-[var(--site-strong)]">{item.title}</p>
                    <p className="mt-1 max-w-[34ch] text-sm leading-6 text-[var(--site-muted)]">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.highlights.map((tag, index) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                            index === 0
                              ? "border-[color-mix(in_oklch,var(--site-cyan)_28%,transparent)] bg-[rgba(var(--site-cyan-rgb),.1)] text-[var(--site-cyan)]"
                              : "border-[var(--site-soft-line)] bg-[var(--site-soft-bg)] text-[var(--site-muted)]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="mt-1 text-lg text-[var(--site-muted-2)] transition group-hover:translate-x-0.5 group-hover:text-[var(--site-strong)]">
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[var(--site-soft-line)] bg-[var(--site-soft-bg)] p-5">
          <p className="text-base font-semibold text-[var(--site-strong)]">{copy.developmentTitle}</p>

          <p className="mt-2 text-base leading-7 text-[var(--site-muted)]">
            {copy.developmentBody}
          </p>

          <div className="mt-5 rounded-lg border border-[var(--site-soft-line)] bg-[var(--site-subtle-bg)] p-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--site-muted)]">
              {copy.flow.map((step, index) => (
                <React.Fragment key={step}>
                  <FlowPill tone={index === 0 ? "cyan" : undefined}>{step}</FlowPill>
                  {index < copy.flow.length - 1 ? <FlowArrow /> : null}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {copy.support.map((item) => (
                <SupportPill key={item}>{item}</SupportPill>
              ))}
            </div>
          </div>

          <Link
            href={localizedPath("/services/web", locale)}
            onClick={onClose}
            className="nav-panel-cta mt-5"
          >
            {copy.openWeb}
          </Link>
        </div>
      </div>
    </div>
  );
}

function FlowPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "cyan";
}) {
  const classes =
    tone === "cyan"
      ? "border-[color-mix(in_oklch,var(--site-cyan)_24%,transparent)] bg-[rgba(var(--site-cyan-rgb),.1)] text-[var(--site-cyan)]"
      : "border-[var(--site-soft-line)] bg-[var(--site-soft-bg)] text-[var(--site-strong)]";

  return (
    <span className={`rounded-full border px-3 py-1.5 text-sm font-medium ${classes}`}>
      {children}
    </span>
  );
}

function SupportPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--site-soft-line)] bg-[var(--site-soft-bg)] px-3 py-1.5 text-sm text-[var(--site-muted)]">
      {children}
    </span>
  );
}

function FlowArrow() {
  return <span className="text-[var(--site-muted-2)]">→</span>;
}

function Burger({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-4">
      <span
        className={`absolute inset-x-0 top-0 h-0.5 origin-center bg-[var(--site-strong)] transition-transform ${
          open ? "translate-y-1.5 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute inset-x-0 top-1.5 h-0.5 bg-[var(--site-strong)] transition-opacity ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute inset-x-0 top-3 h-0.5 origin-center bg-[var(--site-strong)] transition-transform ${
          open ? "-translate-y-1.5 -rotate-45" : ""
        }`}
      />
    </span>
  );
}
