import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { legalConfig } from "@/lib/legal";

export type SeoPageId = "home" | "contact" | "web" | "mobile" | "impressum" | "datenschutz";

type SeoPage = {
  path: string;
  title: string;
  description: string;
};

type ServiceStructuredData = {
  title: string;
  intro: string;
  capabilities: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
};

const rawSiteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aurillia.de";
const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const seoConfig = {
  name: "Aurillia",
  siteUrl,
  metadataBase: new URL(siteUrl),
  contactEmail: legalConfig.email,
  contactPhone: legalConfig.phone,
  defaultLocale: "de" as Locale,
  ogImage: "/opengraph-image",
  organizationId: `${siteUrl}/#organization`,
  websiteId: `${siteUrl}/#website`,
};

export const seoPages: Record<Locale, Record<SeoPageId, SeoPage>> = {
  de: {
    home: {
      path: "/",
      title: "Aurillia - Webentwicklung für klare Unternehmenswebsites",
      description:
        "Aurillia entwickelt moderne Websites, Leistungsseiten und Websysteme für Unternehmen, die verständlicher auftreten und bessere Anfragen bekommen wollen.",
    },
    contact: {
      path: "/contact",
      title: "Kontakt - Website-Projekt mit Aurillia starten",
      description:
        "Schick uns deine aktuelle Website, Ziele und offene Fragen. Aurillia meldet sich mit einer ehrlichen Einschätzung für Website, Mobile App oder KI-Assistent.",
    },
    web: {
      path: "/services/web",
      title: "Webentwicklung für Unternehmen - Aurillia",
      description:
        "Website veraltet, unklar oder schwer zu pflegen? Aurillia plant, schreibt und baut Unternehmenswebsites mit klarer Struktur, SEO-Basics und sauberem Next.js-Fundament.",
    },
    mobile: {
      path: "/services/mobile",
      title: "Mobile Apps und PWA für Unternehmen - Aurillia",
      description:
        "Aurillia baut fokussierte mobile Apps und PWAs für Teams, Kunden und interne Abläufe, wenn Web allein nicht mehr reicht.",
    },
    impressum: {
      path: "/impressum",
      title: "Impressum - Aurillia",
      description:
        "Anbieterkennzeichnung, Kontaktangaben und rechtliche Informationen zu Aurillia.",
    },
    datenschutz: {
      path: "/datenschutz",
      title: "Datenschutz - Aurillia",
      description:
        "Datenschutzerklärung von Aurillia mit Informationen zu Kontaktformular, Hosting, optionalem KI-Assistenten und deinen Rechten.",
    },
  },
  en: {
    home: {
      path: "/en",
      title: "Aurillia - Web Development for Clear Business Websites",
      description:
        "Aurillia builds modern websites, service pages, and web systems for companies that want clearer positioning and better prepared inquiries.",
    },
    contact: {
      path: "/en/contact",
      title: "Contact - Start a Website Project with Aurillia",
      description:
        "Send your current website, goals, and open questions. Aurillia replies with a grounded next step for a website, mobile app, or AI assistant.",
    },
    web: {
      path: "/en/services/web",
      title: "Web Development for Companies - Aurillia",
      description:
        "Outdated, unclear, or hard-to-maintain website? Aurillia plans, writes, and builds business websites with clear structure, SEO basics, and a clean Next.js foundation.",
    },
    mobile: {
      path: "/en/services/mobile",
      title: "Mobile Apps and PWAs for Companies - Aurillia",
      description:
        "Aurillia builds focused mobile apps and PWAs for teams, customers, and internal workflows when the web alone is not enough.",
    },
    impressum: {
      path: "/en/impressum",
      title: "Imprint - Aurillia",
      description:
        "Provider identification, contact details, and legal information for Aurillia.",
    },
    datenschutz: {
      path: "/en/datenschutz",
      title: "Privacy Notice - Aurillia",
      description:
        "Aurillia privacy notice with information about the contact form, hosting, optional AI assistant, and your rights.",
    },
  },
};

export const sitemapPages: {
  id: SeoPageId;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { id: "home", changeFrequency: "weekly", priority: 1 },
  { id: "web", changeFrequency: "weekly", priority: 0.9 },
  { id: "mobile", changeFrequency: "monthly", priority: 0.72 },
  { id: "contact", changeFrequency: "monthly", priority: 0.62 },
  { id: "impressum", changeFrequency: "yearly", priority: 0.2 },
  { id: "datenschutz", changeFrequency: "yearly", priority: 0.2 },
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${seoConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function languageAlternates(id: SeoPageId) {
  return {
    de: seoPages.de[id].path,
    en: seoPages.en[id].path,
    "x-default": seoPages.de[id].path,
  };
}

export function metadataForPage(locale: Locale, id: SeoPageId): Metadata {
  const page = seoPages[locale][id];
  const alternateLocale = locale === "de" ? "en_US" : "de_DE";

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
      languages: languageAlternates(id),
    },
    openGraph: {
      type: "website",
      url: page.path,
      siteName: seoConfig.name,
      title: page.title,
      description: page.description,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale,
      images: [
        {
          url: seoConfig.ogImage,
          width: 1200,
          height: 630,
          alt: "Aurillia Webentwicklung",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [seoConfig.ogImage],
    },
    robots: indexableRobots,
  };
}

export const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function withoutContext<T extends Record<string, unknown>>(node: T) {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": seoConfig.organizationId,
        name: seoConfig.name,
        url: seoConfig.siteUrl,
        logo: absoluteUrl("/icon.svg"),
        email: seoConfig.contactEmail,
        telephone: seoConfig.contactPhone || undefined,
        contactPoint: {
          "@type": "ContactPoint",
          email: seoConfig.contactEmail,
          telephone: seoConfig.contactPhone || undefined,
          contactType: "customer support",
          availableLanguage: ["de", "en"],
        },
      },
      {
        "@type": "WebSite",
        "@id": seoConfig.websiteId,
        name: seoConfig.name,
        url: seoConfig.siteUrl,
        inLanguage: ["de", "en"],
        publisher: {
          "@id": seoConfig.organizationId,
        },
      },
    ],
  };
}

export function webPageJsonLd(locale: Locale, id: SeoPageId, type = "WebPage") {
  const page = seoPages[locale][id];

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: locale,
    isPartOf: {
      "@id": seoConfig.websiteId,
    },
    publisher: {
      "@id": seoConfig.organizationId,
    },
  };
}

export function breadcrumbJsonLd(locale: Locale, id: SeoPageId) {
  const page = seoPages[locale][id];
  const home = seoPages[locale].home;
  const homeListItem = {
    "@type": "ListItem",
    position: 1,
    name: locale === "de" ? "Startseite" : "Home",
    item: absoluteUrl(home.path),
  };

  if (id === "home") {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [homeListItem],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      homeListItem,
      {
        "@type": "ListItem",
        position: 2,
        name: page.title.replace(` - ${seoConfig.name}`, "").replace(`${seoConfig.name} - `, ""),
        item: absoluteUrl(page.path),
      },
    ],
  };
}

export function contactPageJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      withoutContext(webPageJsonLd(locale, "contact", "ContactPage")),
      withoutContext(breadcrumbJsonLd(locale, "contact")),
      {
        "@type": "ContactPoint",
        "@id": `${absoluteUrl(seoPages[locale].contact.path)}#contact`,
        email: seoConfig.contactEmail,
        telephone: seoConfig.contactPhone || undefined,
        contactType: "customer support",
        availableLanguage: ["de", "en"],
        areaServed: locale === "de" ? "DE" : "Worldwide",
      },
    ],
  };
}

export function homePageJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      withoutContext(webPageJsonLd(locale, "home")),
      withoutContext(breadcrumbJsonLd(locale, "home")),
    ],
  };
}

export function servicePageJsonLd(
  locale: Locale,
  id: Extract<SeoPageId, "web" | "mobile">,
  service: ServiceStructuredData,
) {
  const page = seoPages[locale][id];
  const serviceType =
    id === "web"
      ? locale === "de"
        ? "Webentwicklung und Website Relaunch"
        : "Web development and website relaunch"
      : locale === "de"
        ? "Mobile App Entwicklung und PWA"
        : "Mobile app development and PWA";

  return {
    "@context": "https://schema.org",
    "@graph": [
      withoutContext(webPageJsonLd(locale, id, "ServicePage")),
      withoutContext(breadcrumbJsonLd(locale, id)),
      {
        "@type": "Service",
        "@id": `${absoluteUrl(page.path)}#service`,
        name: service.title,
        serviceType,
        description: service.intro,
        url: absoluteUrl(page.path),
        provider: {
          "@id": seoConfig.organizationId,
        },
        areaServed: locale === "de" ? "DE" : "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "de" ? "Aurillia Leistungen" : "Aurillia services",
          itemListElement: service.capabilities.map((capability) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: capability.title,
              description: capability.body,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(page.path)}#faq`,
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
