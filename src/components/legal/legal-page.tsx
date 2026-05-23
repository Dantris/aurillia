import SiteFooter from "@/components/navigation/site-footer";
import { hasLegalAddress, legalAddressLines, legalConfig } from "@/lib/legal";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

type LegalPageKind = "impressum" | "datenschutz";

type Section = {
  title: string;
  body: string[];
  items?: string[];
};

const PRIVACY_SECTIONS: Record<Locale, Section[]> = {
  de: [
    {
      title: "1. Verantwortlicher",
      body: [
        "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:",
        `${legalConfig.brandName}, ${legalConfig.ownerName}. Kontakt: ${legalConfig.email}.`,
      ],
    },
    {
      title: "2. Hosting und technische Bereitstellung",
      body: [
        "Diese Website wird technisch über einen Hosting-Anbieter bereitgestellt. Beim Aufruf der Seiten können technische Zugriffsdaten verarbeitet werden, etwa IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene URL, Referrer, Browser- und Geräteinformationen sowie Server-Logdaten.",
        "Die Verarbeitung erfolgt zur sicheren, stabilen und schnellen Auslieferung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      title: "3. Kontaktformular und Projektanfragen",
      body: [
        "Wenn du das Kontaktformular nutzt, verarbeiten wir die von dir eingegebenen Daten, insbesondere Name, E-Mail-Adresse, Unternehmen, aktuelle Website, Zeitplan, Projektart und Nachricht.",
        "Die Daten werden verwendet, um deine Anfrage zu beantworten, ein mögliches Projekt einzuschätzen und die Kommunikation dazu zu führen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf eine Beauftragung gerichtet ist, sonst Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      title: "4. Speicherung von Leads und Nutzungsdaten",
      body: [
        "Projektanfragen und freiwillig übermittelte Kontaktdaten können in einer Datenbank gespeichert werden, damit Anfragen nachvollziehbar bearbeitet werden können. Dafür kann Supabase als technischer Dienstleister eingesetzt werden.",
        "Beim optionalen KI-Assistenten können zusätzlich technische Nutzungsdaten wie Zeitpunkt, grobe Anfrageart, Token-Nutzung und ein pseudonymisierter Fingerprint zur Missbrauchsbegrenzung und Kostenkontrolle protokolliert werden.",
      ],
    },
    {
      title: "5. Optionaler KI-Assistent",
      body: [
        "Der Chat-Assistent ist ein freiwilliges Angebot zur ersten Projekteinschätzung. Wenn er aktiviert ist, werden deine Chatnachrichten an einen KI-Dienstleister übermittelt, um eine Antwort zu erzeugen.",
        "Bitte gib im Chat keine sensiblen Daten, Passwörter, vertraulichen Kundendaten oder Geschäftsgeheimnisse ein. Kontaktdaten werden nur gespeichert, wenn du sie selbst freiwillig im Projektkontext angibst.",
      ],
    },
    {
      title: "6. E-Mail-Versand",
      body: [
        "Falls E-Mails automatisiert aus dem Kontaktformular versendet werden, kann ein E-Mail-Dienstleister wie Resend eingesetzt werden. Dabei werden die zur Zustellung erforderlichen Daten verarbeitet.",
        "Die konkrete Zustellung kann je nach Konfiguration auch intern weitergeleitet werden. Rechtsgrundlage ist die Bearbeitung deiner Anfrage nach Art. 6 Abs. 1 lit. b oder lit. f DSGVO.",
      ],
    },
    {
      title: "7. Lokale Speicherung im Browser",
      body: [
        "Die Website kann funktionale Einstellungen wie das gewählte Farbtheme im Local Storage deines Browsers speichern. Diese Speicherung dient nur der Bedienbarkeit der Website und ist kein Tracking.",
        "Aktuell werden keine Marketing-Cookies und keine externen Webanalyse-Cookies gesetzt.",
      ],
    },
    {
      title: "8. Schriftarten",
      body: [
        "Die verwendeten Schriftarten werden über die Anwendung selbst ausgeliefert. Dadurch ist für die Darstellung der Schriften kein direkter Abruf bei Google Fonts im Browser erforderlich.",
      ],
    },
    {
      title: "9. Speicherdauer",
      body: [
        "Personenbezogene Daten werden nur so lange gespeichert, wie es für die Bearbeitung der Anfrage, die Projektkommunikation, die Missbrauchsvermeidung oder gesetzliche Aufbewahrungspflichten erforderlich ist.",
        "Nicht mehr benötigte Daten werden gelöscht oder anonymisiert.",
      ],
    },
    {
      title: "10. Deine Rechte",
      body: [
        "Du hast nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen bestimmte Verarbeitungen.",
        "Du hast außerdem das Recht, dich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.",
      ],
    },
    {
      title: "11. Drittlandübermittlungen",
      body: [
        "Je nach eingesetzten Dienstleistern kann eine Verarbeitung außerhalb der Europäischen Union nicht vollständig ausgeschlossen werden. In diesen Fällen achten wir auf geeignete Garantien, etwa vertragliche Schutzmaßnahmen und Standardvertragsklauseln, soweit erforderlich.",
      ],
    },
    {
      title: "12. Änderungen",
      body: [
        "Diese Datenschutzerklärung kann angepasst werden, wenn sich Funktionen, Dienstleister oder rechtliche Anforderungen ändern.",
      ],
    },
  ],
  en: [
    {
      title: "1. Controller",
      body: [
        "The controller for personal data processed through this website is:",
        `${legalConfig.brandName}, ${legalConfig.ownerName}. Contact: ${legalConfig.email}.`,
      ],
    },
    {
      title: "2. Hosting and Technical Delivery",
      body: [
        "This website is delivered through a hosting provider. Technical access data may be processed when pages are requested, including IP address, date and time, requested URL, referrer, browser and device information, and server logs.",
        "This processing is necessary for secure, stable, and fast delivery of the website and is based on Art. 6(1)(f) GDPR.",
      ],
    },
    {
      title: "3. Contact Form and Project Inquiries",
      body: [
        "If you use the contact form, we process the information you provide, including name, email address, company, current website, timeline, project type, and message.",
        "The data is used to answer your inquiry, assess a potential project, and communicate about it. The legal basis is Art. 6(1)(b) GDPR where the inquiry relates to a potential contract, otherwise Art. 6(1)(f) GDPR.",
      ],
    },
    {
      title: "4. Lead Storage and Usage Logs",
      body: [
        "Project inquiries and voluntarily provided contact details may be stored in a database so that requests can be handled properly. Supabase may be used as a technical service provider for this purpose.",
        "If the optional AI assistant is enabled, technical usage data such as timestamp, rough inquiry type, token usage, and a pseudonymized fingerprint may be logged for abuse prevention and cost control.",
      ],
    },
    {
      title: "5. Optional AI Assistant",
      body: [
        "The chat assistant is an optional first-step project guidance tool. If enabled, your chat messages are sent to an AI provider to generate a reply.",
        "Please do not enter sensitive data, passwords, confidential customer data, or trade secrets into the chat. Contact details are stored only if you voluntarily provide them in a project context.",
      ],
    },
    {
      title: "6. Email Delivery",
      body: [
        "If emails are sent automatically from the contact form, an email delivery provider such as Resend may be used. The data required for delivery is processed for that purpose.",
        "Depending on configuration, messages may also be forwarded internally. The legal basis is handling your inquiry under Art. 6(1)(b) or Art. 6(1)(f) GDPR.",
      ],
    },
    {
      title: "7. Local Browser Storage",
      body: [
        "The website may store functional preferences such as the selected color theme in your browser's local storage. This is used only for usability and is not tracking.",
        "The website currently does not set marketing cookies or external analytics cookies.",
      ],
    },
    {
      title: "8. Fonts",
      body: [
        "Fonts are served by the application itself. The browser does not need to request Google Fonts directly to display them.",
      ],
    },
    {
      title: "9. Retention",
      body: [
        "Personal data is retained only as long as necessary to handle the inquiry, communicate about a project, prevent abuse, or comply with statutory retention obligations.",
        "Data that is no longer required is deleted or anonymized.",
      ],
    },
    {
      title: "10. Your Rights",
      body: [
        "Subject to the GDPR, you have rights of access, rectification, erasure, restriction of processing, data portability, and objection to certain processing.",
        "You also have the right to lodge a complaint with a competent data protection supervisory authority.",
      ],
    },
    {
      title: "11. International Transfers",
      body: [
        "Depending on the providers used, processing outside the European Union cannot be fully excluded. Where required, appropriate safeguards such as contractual protections and standard contractual clauses are used.",
      ],
    },
    {
      title: "12. Changes",
      body: [
        "This privacy notice may be updated if features, providers, or legal requirements change.",
      ],
    },
  ],
};

const IMPRESSUM_COPY = {
  de: {
    eyebrow: "Rechtliches",
    title: "Impressum",
    intro:
      "Anbieterkennzeichnung und Kontaktangaben für die Website aurillia.de.",
    providerTitle: "Angaben gemäß § 5 DDG",
    responsibleTitle: "Verantwortlich für den Inhalt",
    contactTitle: "Kontakt",
    disputeTitle: "Verbraucherstreitbeilegung",
    dispute:
      "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    addressMissing:
      "Vor dem öffentlichen Livegang muss hier noch die vollständige ladungsfähige Anschrift ergänzt werden.",
    updated: `Stand: ${legalConfig.updatedAtDe}`,
  },
  en: {
    eyebrow: "Legal",
    title: "Imprint",
    intro:
      "Provider identification and contact details for aurillia.de.",
    providerTitle: "Information pursuant to § 5 DDG",
    responsibleTitle: "Responsible for Content",
    contactTitle: "Contact",
    disputeTitle: "Consumer Dispute Resolution",
    dispute:
      "We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
    addressMissing:
      "Before public launch, the full summonable postal address still needs to be added here.",
    updated: `Last updated: ${legalConfig.updatedAtEn}`,
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    providerTitle: string;
    responsibleTitle: string;
    contactTitle: string;
    disputeTitle: string;
    dispute: string;
    addressMissing: string;
    updated: string;
  }
>;

const PRIVACY_COPY = {
  de: {
    eyebrow: "Datenschutz",
    title: "Datenschutz",
    intro:
      "Diese Erklärung beschreibt, welche Daten auf aurillia.de verarbeitet werden, wofür sie genutzt werden und welche Rechte du hast.",
    updated: `Stand: ${legalConfig.updatedAtDe}`,
    addressMissing:
      "Hinweis vor Veröffentlichung: Die Anschrift des Verantwortlichen muss noch ergänzt werden.",
  },
  en: {
    eyebrow: "Privacy",
    title: "Privacy Notice",
    intro:
      "This notice explains which data is processed on aurillia.de, why it is used, and which rights you have.",
    updated: `Last updated: ${legalConfig.updatedAtEn}`,
    addressMissing:
      "Pre-launch note: the controller's postal address still needs to be added.",
  },
} satisfies Record<Locale, { eyebrow: string; title: string; intro: string; updated: string; addressMissing: string }>;

export default function LegalPage({
  locale = "de",
  kind,
}: {
  locale?: Locale;
  kind: LegalPageKind;
}) {
  const isImpressum = kind === "impressum";
  const header = isImpressum ? IMPRESSUM_COPY[locale] : PRIVACY_COPY[locale];

  return (
    <>
      <main className="min-h-screen text-[var(--site-text)]">
        <section className="border-b border-[var(--site-line)]">
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {header.eyebrow}
            </p>
            <h1 className="mt-7 text-[clamp(3rem,7vw,5.8rem)] font-semibold leading-[1.02] tracking-normal text-[var(--site-strong)]">
              {header.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[var(--site-muted)] md:text-2xl md:leading-10">
              {header.intro}
            </p>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-[var(--site-cyan)]">
              {header.updated}
            </p>

            {!hasLegalAddress ? (
              <div className="mt-10 border border-[color-mix(in_oklch,var(--site-gold)_48%,var(--site-line))] bg-[color-mix(in_oklch,var(--site-gold)_10%,var(--site-panel))] p-5 text-base leading-7 text-[var(--site-strong)]">
                {isImpressum ? IMPRESSUM_COPY[locale].addressMissing : PRIVACY_COPY[locale].addressMissing}
              </div>
            ) : null}
          </div>
        </section>

        {isImpressum ? <ImpressumContent locale={locale} /> : <PrivacyContent locale={locale} />}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function ImpressumContent({ locale }: { locale: Locale }) {
  const copy = IMPRESSUM_COPY[locale];

  return (
    <section>
      <div className="mx-auto grid max-w-5xl gap-5 px-6 py-16 md:px-10 md:py-20">
        <LegalCard title={copy.providerTitle}>
          <p>{legalConfig.brandName}</p>
          <p>{legalConfig.ownerName}</p>
          {legalAddressLines().map((line) => (
            <p key={line}>{line}</p>
          ))}
        </LegalCard>

        <LegalCard title={copy.contactTitle}>
          <p>
            E-Mail:{" "}
            <a className="text-[var(--site-strong)] underline underline-offset-4" href={`mailto:${legalConfig.email}`}>
              {legalConfig.email}
            </a>
          </p>
        </LegalCard>

        <LegalCard title={copy.responsibleTitle}>
          <p>{legalConfig.ownerName}</p>
          {legalAddressLines().map((line) => (
            <p key={line}>{line}</p>
          ))}
        </LegalCard>

        <LegalCard title={copy.disputeTitle}>
          <p>{copy.dispute}</p>
        </LegalCard>
      </div>
    </section>
  );
}

function PrivacyContent({ locale }: { locale: Locale }) {
  return (
    <section>
      <div className="mx-auto grid max-w-5xl gap-5 px-6 py-16 md:px-10 md:py-20">
        <LegalCard title={locale === "de" ? "Kontaktdaten des Verantwortlichen" : "Controller Contact Details"}>
          <p>{legalConfig.brandName}</p>
          <p>{legalConfig.ownerName}</p>
          {legalAddressLines().map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="mt-4">
            E-Mail:{" "}
            <a className="text-[var(--site-strong)] underline underline-offset-4" href={`mailto:${legalConfig.email}`}>
              {legalConfig.email}
            </a>
          </p>
        </LegalCard>

        {PRIVACY_SECTIONS[locale].map((section) => (
          <LegalCard key={section.title} title={section.title}>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-2 w-2 shrink-0 bg-[var(--site-cyan)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </LegalCard>
        ))}
      </div>
    </section>
  );
}

function LegalCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="border border-[var(--site-line)] bg-[var(--site-panel)] p-6 md:p-8">
      <h2 className="text-[1.45rem] font-semibold leading-tight text-[var(--site-strong)] sm:text-2xl md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-lg leading-8 text-[var(--site-muted)]">{children}</div>
    </article>
  );
}
