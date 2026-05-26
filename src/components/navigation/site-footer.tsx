import Link from "next/link";
import type { ReactNode } from "react";
import { localizedPath, type Locale } from "@/lib/i18n";
import { hasLegalPhone, legalConfig, legalPhoneHref } from "@/lib/legal";

const FOOTER_COPY = {
  de: {
    description:
      "Aurillia baut klare Websites, ausgewählte mobile Erweiterungen und digitale Oberflächen, die verständlicher verkaufen, besser erklären und nach dem Launch weiter nutzbar bleiben.",
    availability: "Aktuell offen für ausgewählte Webprojekte.",
    contactTitle: "Projekt im Kopf?",
    contactBody:
      "Schick uns deine aktuelle Website, eine grobe Idee oder die Stellen, an denen es gerade hakt.",
    contactCta: "Kontakt aufnehmen",
    services: "Leistungen",
    serviceLinks: [
      ["Webentwicklung", "/services/web"],
      ["Mobile Apps", "/services/mobile"],
      ["Kontakt", "/contact"],
    ] as const,
    approach: "Worum wir uns kümmern",
    approachItems: ["Struktur & Text", "Designsystem", "Next.js Build", "SEO-Basics", "Launch & Care"],
    company: "Aurillia",
    companyItems: ["Deutsch / Englisch", "Remote aus Deutschland", "Antwort in 1-2 Werktagen"],
    legalTitle: "Rechtliches",
    legalLinks: [
      ["Impressum", "/impressum"],
      ["Datenschutz", "/datenschutz"],
    ] as const,
  },
  en: {
    description:
      "Aurillia builds clear websites, selected mobile extensions, and digital surfaces that explain better, sell more clearly, and remain useful after launch.",
    availability: "Currently open for selected web projects.",
    contactTitle: "Project on your mind?",
    contactBody:
      "Send the current site, a rough idea, or the places where the experience is getting stuck.",
    contactCta: "Get in touch",
    services: "Services",
    serviceLinks: [
      ["Web Development", "/services/web"],
      ["Mobile Apps", "/services/mobile"],
      ["Contact", "/contact"],
    ] as const,
    approach: "What we handle",
    approachItems: ["Structure & copy", "Design system", "Next.js build", "SEO basics", "Launch & care"],
    company: "Aurillia",
    companyItems: ["German / English", "Remote from Germany", "Reply in 1-2 business days"],
    legalTitle: "Legal",
    legalLinks: [
      ["Imprint", "/impressum"],
      ["Privacy", "/datenschutz"],
    ] as const,
  },
} satisfies Record<
  Locale,
  {
    description: string;
    availability: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    services: string;
    serviceLinks: readonly (readonly [string, string])[];
    approach: string;
    approachItems: string[];
    company: string;
    companyItems: string[];
    legalTitle: string;
    legalLinks: readonly (readonly [string, string])[];
  }
>;

export default function SiteFooter({ locale = "de" }: { locale?: Locale }) {
  const copy = FOOTER_COPY[locale];

  return (
    <footer className="border-t border-[var(--site-line)] text-[var(--site-text)] [background:color-mix(in_oklch,var(--site-bg)_88%,transparent)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr] md:px-10 md:py-16">
        <div>
          <Link href={localizedPath("/", locale)} className="inline-flex items-center gap-3 text-[var(--site-strong)]">
            <img src="/icon.svg" alt="Aurillia" className="h-8 w-8" aria-hidden="true" />
            <span className="text-[1.08rem] font-semibold tracking-[0.08em]">AURILLIA</span>
          </Link>
          <p className="mt-7 max-w-md text-base leading-7 text-[var(--site-muted)]">
            {copy.description}
          </p>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-[var(--site-cyan)]">
            {copy.availability}
          </p>
        </div>

        <FooterColumn title={copy.services}>
          {copy.serviceLinks.map(([label, href]) => (
            <Link key={href} href={localizedPath(href, locale)} className="footer-link">
              {label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title={copy.approach}>
          {copy.approachItems.map((item) => (
            <span key={item} className="footer-muted">
              {item}
            </span>
          ))}
        </FooterColumn>

        <div>
          <FooterColumn title={copy.company}>
            {copy.companyItems.map((item) => (
              <span key={item} className="footer-muted">
                {item}
              </span>
            ))}
          </FooterColumn>
          <div className="mt-8">
            <p className="text-base font-semibold text-[var(--site-strong)]">{copy.contactTitle}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--site-muted)]">{copy.contactBody}</p>
            <Link href={localizedPath("/contact", locale)} className="site-button site-button-secondary mt-5 w-full">
              {copy.contactCta}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--site-line)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm leading-6 text-[var(--site-muted)] md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} Aurillia.{" "}
            <a className="footer-link" href={`mailto:${legalConfig.email}`}>
              {legalConfig.email}
            </a>
            {hasLegalPhone ? (
              <>
                {" "}
                ·{" "}
                <a className="footer-link" href={legalPhoneHref()}>
                  {legalConfig.phone}
                </a>
              </>
            ) : null}
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label={copy.legalTitle}>
            {copy.legalLinks.map(([label, href]) => (
              <Link key={href} href={localizedPath(href, locale)} className="footer-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-base font-semibold text-[var(--site-strong)]">{title}</p>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}
