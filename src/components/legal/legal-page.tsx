import SiteFooter from "@/components/navigation/site-footer";
import {
  hasBusinessId,
  hasLegalAddress,
  hasLegalPhone,
  hasRegisterEntry,
  hasVatId,
  isKleinunternehmer,
  legalAddressLines,
  legalConfig,
  legalPhoneHref,
  legalServiceProviders,
} from "@/lib/legal";
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
        `${legalConfig.brandName}, ${legalConfig.ownerName}. Kontakt: ${legalConfig.email}${hasLegalPhone ? `, ${legalConfig.phone}` : ""}.`,
      ],
    },
    {
      title: "2. Hosting und technische Bereitstellung über Vercel",
      body: [
        "Diese Website wird über Vercel bereitgestellt. Beim Aufruf der Seiten können technische Zugriffsdaten verarbeitet werden, etwa IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene URL, Referrer, Browser- und Geräteinformationen sowie Server-Logdaten.",
        "Die Verarbeitung erfolgt zur sicheren, stabilen und schnellen Auslieferung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      title: "3. Kontaktformular und Projektanfragen",
      body: [
        "Wenn du das Kontaktformular nutzt oder uns per E-Mail oder Telefon kontaktierst, verarbeiten wir die von dir übermittelten Daten, insbesondere Name, E-Mail-Adresse, Telefonnummer, Unternehmen, aktuelle Website, Zeitplan, Projektart und Nachricht.",
        "Wir verwenden diese Daten, um deine Anfrage zu beantworten, ein mögliches Projekt einzuschätzen, Rückfragen zu stellen und dazu mit dir zu kommunizieren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf eine Beauftragung gerichtet ist, ansonsten Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      title: "4. Speicherung von Leads und Nutzungsdaten über Supabase",
      body: [
        "Projektanfragen und freiwillig übermittelte Kontaktdaten können in Supabase gespeichert werden, damit Anfragen nachvollziehbar bearbeitet werden können.",
        "Beim optionalen KI-Assistenten können zusätzlich technische Nutzungsdaten wie Zeitpunkt, grobe Anfrageart, Token-Nutzung und ein pseudonymisierter Fingerprint protokolliert werden, um Missbrauch zu begrenzen und Kosten zu kontrollieren.",
      ],
    },
    {
      title: "5. Optionaler KI-Assistent über OpenAI",
      body: [
        "Der Chat-Assistent ist ein freiwilliges Angebot zur ersten Projekteinschätzung. Wenn er aktiviert ist, werden deine Chatnachrichten an OpenAI übermittelt, um eine Antwort zu erzeugen und Inhalte auf Missbrauch zu prüfen.",
        "Bitte gib im Chat keine sensiblen Daten, Passwörter, vertraulichen Kundendaten oder Geschäftsgeheimnisse ein. Kontaktdaten werden nur gespeichert, wenn du sie selbst freiwillig im Projektkontext angibst.",
        "Der KI-Assistent trifft keine rechtlich bindenden Entscheidungen über dich und ersetzt keine individuelle Beratung oder ein konkretes Angebot.",
      ],
    },
    {
      title: "6. E-Mail-Versand über Resend",
      body: [
        "Für die Weiterleitung von Kontaktformular-Anfragen kann Resend eingesetzt werden. Dabei verarbeitet Resend die Daten, die für die Zustellung erforderlich sind.",
        "Die konkrete Zustellung kann je nach Konfiguration auch intern weitergeleitet werden. Rechtsgrundlage ist die Bearbeitung deiner Anfrage nach Art. 6 Abs. 1 lit. b oder lit. f DSGVO.",
      ],
    },
    {
      title: "7. Bot- und Spam-Schutz über Cloudflare Turnstile",
      body: [
        "Das Kontaktformular kann Cloudflare Turnstile verwenden, wenn der Schutz technisch aktiviert ist. Turnstile hilft, automatisierte oder missbräuchliche Formularnutzung zu erkennen.",
        "Dabei können technische Signale wie IP-Adresse, User-Agent, TLS-Fingerprint, Sitekey, Origin und ähnliche Sicherheitsdaten verarbeitet werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      title: "8. Lokale Speicherung im Browser",
      body: [
        "Die Website kann funktionale Einstellungen wie das gewählte Farbtheme im Local Storage deines Browsers speichern. Diese Speicherung dient nur der Bedienbarkeit der Website und ist kein Tracking.",
        "Aktuell werden keine Marketing-Cookies und keine externen Webanalyse-Cookies gesetzt.",
      ],
    },
    {
      title: "9. Schriftarten",
      body: [
        "Die verwendeten Schriftarten werden über die Anwendung selbst ausgeliefert. Dadurch ist für die Darstellung der Schriften kein direkter Abruf bei Google Fonts im Browser erforderlich.",
      ],
    },
    {
      title: "10. Speicherdauer",
      body: [
        "Personenbezogene Daten werden nur so lange gespeichert, wie es für die Bearbeitung der Anfrage, die Projektkommunikation, die Missbrauchsvermeidung oder gesetzliche Aufbewahrungspflichten erforderlich ist.",
        "Nicht mehr benötigte Daten werden gelöscht oder anonymisiert.",
      ],
    },
    {
      title: "11. Deine Rechte",
      body: [
        "Du hast nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen bestimmte Verarbeitungen.",
        "Du hast außerdem das Recht, dich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.",
      ],
    },
    {
      title: "12. Drittlandübermittlungen",
      body: [
        "Einige eingesetzte Dienstleister haben ihren Sitz außerhalb der Europäischen Union oder verarbeiten Daten technisch auch außerhalb der EU. In diesen Fällen achten wir, soweit erforderlich, auf geeignete Garantien wie Auftragsverarbeitungsverträge, Data Privacy Framework-Zertifizierungen und Standardvertragsklauseln.",
      ],
    },
    {
      title: "13. Pflicht zur Bereitstellung und automatisierte Entscheidungen",
      body: [
        "Die Bereitstellung von Kontakt- und Projektinformationen ist freiwillig. Ohne die für eine Antwort erforderlichen Kontaktdaten oder ohne ausreichende Projektangaben können wir deine Anfrage möglicherweise nicht bearbeiten.",
        "Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO statt.",
      ],
    },
    {
      title: "14. Änderungen",
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
        `${legalConfig.brandName}, ${legalConfig.ownerName}. Contact: ${legalConfig.email}${hasLegalPhone ? `, ${legalConfig.phone}` : ""}.`,
      ],
    },
    {
      title: "2. Hosting and Technical Delivery via Vercel",
      body: [
        "This website is delivered through Vercel. Technical access data may be processed when pages are requested, including IP address, date and time, requested URL, referrer, browser and device information, and server logs.",
        "This processing is necessary for secure, stable, and fast delivery of the website and is based on Art. 6(1)(f) GDPR.",
      ],
    },
    {
      title: "3. Contact Form and Project Inquiries",
      body: [
        "If you use the contact form or contact us by email or phone, we process the information you provide, including name, email address, phone number, company, current website, timeline, project type, and message.",
        "The data is used to answer your inquiry, assess a potential project, ask follow-up questions, and communicate about it. The legal basis is Art. 6(1)(b) GDPR where the inquiry relates to a potential contract, otherwise Art. 6(1)(f) GDPR.",
      ],
    },
    {
      title: "4. Lead Storage and Usage Logs via Supabase",
      body: [
        "Project inquiries and voluntarily provided contact details may be stored in Supabase so that requests can be handled properly.",
        "If the optional AI assistant is enabled, technical usage data such as timestamp, rough inquiry type, token usage, and a pseudonymized fingerprint may be logged for abuse prevention and cost control.",
      ],
    },
    {
      title: "5. Optional AI Assistant via OpenAI",
      body: [
        "The chat assistant is an optional first-step project guidance tool. If enabled, your chat messages are sent to OpenAI to generate a reply and check for abusive content.",
        "Please do not enter sensitive data, passwords, confidential customer data, or trade secrets into the chat. Contact details are stored only if you voluntarily provide them in a project context.",
        "The AI assistant does not make legally binding decisions about you and does not replace individual advice or a concrete offer.",
      ],
    },
    {
      title: "6. Email Delivery via Resend",
      body: [
        "Resend may be used to forward contact form inquiries by email. The data required for delivery is processed for that purpose.",
        "Depending on configuration, messages may also be forwarded internally. The legal basis is handling your inquiry under Art. 6(1)(b) or Art. 6(1)(f) GDPR.",
      ],
    },
    {
      title: "7. Bot and Spam Protection via Cloudflare Turnstile",
      body: [
        "The contact form may use Cloudflare Turnstile when this protection is technically enabled. Turnstile helps detect automated or abusive form usage.",
        "Technical signals such as IP address, user agent, TLS fingerprint, sitekey, origin, and similar security data may be processed. The legal basis is Art. 6(1)(f) GDPR.",
      ],
    },
    {
      title: "8. Local Browser Storage",
      body: [
        "The website may store functional preferences such as the selected color theme in your browser's local storage. This is used only for usability and is not tracking.",
        "The website currently does not set marketing cookies or external analytics cookies.",
      ],
    },
    {
      title: "9. Fonts",
      body: [
        "Fonts are served by the application itself. The browser does not need to request Google Fonts directly to display them.",
      ],
    },
    {
      title: "10. Retention",
      body: [
        "Personal data is retained only as long as necessary to handle the inquiry, communicate about a project, prevent abuse, or comply with statutory retention obligations.",
        "Data that is no longer required is deleted or anonymized.",
      ],
    },
    {
      title: "11. Your Rights",
      body: [
        "Subject to the GDPR, you have rights of access, rectification, erasure, restriction of processing, data portability, and objection to certain processing.",
        "You also have the right to lodge a complaint with a competent data protection supervisory authority.",
      ],
    },
    {
      title: "12. International Transfers",
      body: [
        "Some service providers are based or technically process data outside the European Union. Where required, appropriate safeguards such as data processing agreements, Data Privacy Framework certifications, and standard contractual clauses are used.",
      ],
    },
    {
      title: "13. Requirement to Provide Data and Automated Decisions",
      body: [
        "Providing contact and project information is voluntary. Without contact details needed for a reply or without sufficient project information, we may not be able to handle your inquiry.",
        "No automated decision-making, including profiling within the meaning of Art. 22 GDPR, takes place.",
      ],
    },
    {
      title: "14. Changes",
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
      "Anbieterkennzeichnung und Kontaktangaben für aurillia.de.",
    providerTitle: "Angaben gemäß § 5 DDG",
    businessTitle: "Unternehmens- und Steuerstatus",
    responsibleTitle: "Verantwortlich für Inhalte nach § 18 Abs. 2 MStV, soweit anwendbar",
    contactTitle: "Kontakt",
    liabilityTitle: "Haftung für Inhalte und Links",
    liabilityBody: [
      "Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Eine Gewähr für Vollständigkeit, Richtigkeit und Aktualität kann jedoch nicht übernommen werden; die Haftung nach den gesetzlichen Vorschriften bleibt unberührt.",
      "Für externe Links sind die jeweiligen Anbieter verantwortlich. Verlinkte Seiten wurden zum Zeitpunkt der Verlinkung auf erkennbare Rechtsverstöße geprüft. Eine dauerhafte Kontrolle fremder Inhalte ist ohne konkrete Hinweise nicht zumutbar. Werden rechtswidrige Inhalte bekannt, entfernen wir die betroffenen Links.",
    ],
    copyrightTitle: "Urheberrecht",
    copyrightBody: [
      "Die auf dieser Website veröffentlichten Inhalte, Texte, Gestaltungselemente, Marken- und Produktbezeichnungen sowie sonstigen Werke unterliegen den jeweils anwendbaren Schutzrechten.",
      "Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Nutzung außerhalb gesetzlicher Erlaubnisse bedürfen der vorherigen Zustimmung des jeweiligen Rechteinhabers. Inhalte Dritter werden, soweit erkennbar, entsprechend gekennzeichnet.",
    ],
    disputeTitle: "Verbraucherstreitbeilegung",
    dispute:
      "Wir sind zur Teilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit (§ 36 VSBG). Die frühere Online-Streitbeilegungsplattform der Europäischen Kommission wurde zum 20. Juli 2025 eingestellt.",
    addressMissing:
      "Vor dem öffentlichen Livegang muss hier noch die vollständige ladungsfähige Anschrift ergänzt werden.",
    phoneMissing:
      "Vor dem öffentlichen Livegang muss hier noch die Telefonnummer ergänzt werden.",
    updated: `Stand: ${legalConfig.updatedAtDe}`,
  },
  en: {
    eyebrow: "Legal",
    title: "Imprint",
    intro:
      "Provider identification and contact details for aurillia.de.",
    providerTitle: "Information pursuant to § 5 DDG",
    businessTitle: "Business and Tax Status",
    responsibleTitle: "Responsible for Content pursuant to § 18(2) MStV, where applicable",
    contactTitle: "Contact",
    liabilityTitle: "Liability for Content and Links",
    liabilityBody: [
      "The contents of this website have been prepared with care. No guarantee is given for completeness, accuracy, or timeliness; liability under applicable law remains unaffected.",
      "External links are the responsibility of their respective providers. Linked pages were checked for apparent legal violations when they were linked. Continuous monitoring of third-party content is not reasonable without specific indications. If unlawful content becomes known, affected links will be removed.",
    ],
    copyrightTitle: "Copyright",
    copyrightBody: [
      "The content, text, design elements, brand and product names, and other works published on this website are subject to the applicable intellectual property rights.",
      "Reproduction, editing, distribution, or other use beyond statutory permissions requires prior consent from the relevant rights holder. Third-party content is marked as such where identifiable.",
    ],
    disputeTitle: "Consumer Dispute Resolution",
    dispute:
      "We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board (§ 36 VSBG). The former European Commission online dispute resolution platform was discontinued on 20 July 2025.",
    addressMissing:
      "Before public launch, the full summonable postal address still needs to be added here.",
    phoneMissing:
      "Before public launch, the phone number still needs to be added here.",
    updated: `Last updated: ${legalConfig.updatedAtEn}`,
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    providerTitle: string;
    businessTitle: string;
    responsibleTitle: string;
    contactTitle: string;
    liabilityTitle: string;
    liabilityBody: string[];
    copyrightTitle: string;
    copyrightBody: string[];
    disputeTitle: string;
    dispute: string;
    addressMissing: string;
    phoneMissing: string;
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
    phoneMissing:
      "Hinweis vor Veröffentlichung: Die Telefonnummer des Verantwortlichen muss noch ergänzt werden.",
  },
  en: {
    eyebrow: "Privacy",
    title: "Privacy Notice",
    intro:
      "This notice explains which data is processed on aurillia.de, why it is used, and which rights you have.",
    updated: `Last updated: ${legalConfig.updatedAtEn}`,
    addressMissing:
      "Pre-launch note: the controller's postal address still needs to be added.",
    phoneMissing:
      "Pre-launch note: the controller's phone number still needs to be added.",
  },
} satisfies Record<Locale, { eyebrow: string; title: string; intro: string; updated: string; addressMissing: string; phoneMissing: string }>;

const SERVICE_PROVIDER_COPY = {
  de: {
    title: "Eingesetzte Dienstleister",
    intro:
      "Die folgenden Dienstleister können für Betrieb, Kontaktformular, Datenbank, E-Mail-Versand, optionalen KI-Assistenten und Spam-Schutz eingesetzt werden.",
    address: "Anschrift",
    purpose: "Zweck",
    data: "Verarbeitete Daten",
    basis: "Rechtsgrundlage",
    transfer: "Drittlandübermittlung",
    details: "Weitere Informationen",
  },
  en: {
    title: "Service Providers Used",
    intro:
      "The following service providers may be used for operation, contact form handling, database storage, email delivery, optional AI assistant features, and spam protection.",
    address: "Address",
    purpose: "Purpose",
    data: "Data Processed",
    basis: "Legal Basis",
    transfer: "International Transfers",
    details: "More Information",
  },
} satisfies Record<
  Locale,
  {
    title: string;
    intro: string;
    address: string;
    purpose: string;
    data: string;
    basis: string;
    transfer: string;
    details: string;
  }
>;

export default function LegalPage({
  locale = "de",
  kind,
}: {
  locale?: Locale;
  kind: LegalPageKind;
}) {
  const isImpressum = kind === "impressum";
  const header = isImpressum ? IMPRESSUM_COPY[locale] : PRIVACY_COPY[locale];
  const missingItems = [
    !hasLegalAddress ? header.addressMissing : null,
    !hasLegalPhone ? header.phoneMissing : null,
  ].filter((item): item is string => Boolean(item));

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

            {missingItems.length ? (
              <div className="mt-10 border border-[color-mix(in_oklch,var(--site-gold)_48%,var(--site-line))] bg-[color-mix(in_oklch,var(--site-gold)_10%,var(--site-panel))] p-5 text-base leading-7 text-[var(--site-strong)]">
                <ul className="space-y-2">
                  {missingItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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

        <LegalCard title={copy.businessTitle}>
          <BusinessStatusContent locale={locale} />
        </LegalCard>

        <LegalCard title={copy.contactTitle}>
          <p>
            E-Mail:{" "}
            <a className="text-[var(--site-strong)] underline underline-offset-4" href={`mailto:${legalConfig.email}`}>
              {legalConfig.email}
            </a>
          </p>
          <LegalPhone locale={locale} />
        </LegalCard>

        <LegalCard title={copy.responsibleTitle}>
          <p>{legalConfig.ownerName}</p>
          {legalAddressLines().map((line) => (
            <p key={line}>{line}</p>
          ))}
        </LegalCard>

        <LegalCard title={copy.liabilityTitle}>
          {copy.liabilityBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </LegalCard>

        <LegalCard title={copy.copyrightTitle}>
          {copy.copyrightBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </LegalCard>

        <LegalCard title={copy.disputeTitle}>
          <p>{copy.dispute}</p>
        </LegalCard>
      </div>
    </section>
  );
}

function BusinessStatusContent({ locale }: { locale: Locale }) {
  const tradeName =
    locale === "de"
      ? `${legalConfig.brandName} ist eine Geschäftsbezeichnung von ${legalConfig.ownerName}.`
      : `${legalConfig.brandName} is a trading name of ${legalConfig.ownerName}.`;
  const legalFormLabel = locale === "de" ? "Rechtsform" : "Legal form";
  const registerText = hasRegisterEntry
    ? locale === "de"
      ? `Registergericht: ${legalConfig.registerCourt}. Registernummer: ${legalConfig.registerNumber}.`
      : `Register court: ${legalConfig.registerCourt}. Register number: ${legalConfig.registerNumber}.`
    : locale === "de"
      ? "Keine Eintragung im Handelsregister."
      : "No commercial register entry.";
  const taxText = isKleinunternehmer
    ? locale === "de"
      ? "Umsatzsteuer wird aufgrund der Kleinunternehmerregelung gemäß § 19 UStG nicht ausgewiesen."
      : "VAT is not shown due to the small-business VAT exemption under § 19 UStG."
    : legalConfig.taxStatus === "regular"
      ? locale === "de"
        ? "Umsatzsteuer wird, soweit gesetzlich erforderlich, nach den allgemeinen Vorschriften ausgewiesen."
        : "VAT is charged under the general rules where legally required."
      : locale === "de"
        ? "Der Steuerstatus ist für die öffentliche Darstellung noch nicht konfiguriert."
        : "The tax status has not yet been configured for public display.";

  return (
    <>
      <p>{tradeName}</p>
      <p>
        {legalFormLabel}: {legalConfig.legalForm}
      </p>
      <p>{registerText}</p>
      <p>{taxText}</p>
      {hasVatId ? (
        <p>
          {locale === "de" ? "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG" : "VAT identification number"}:{" "}
          {legalConfig.vatId}
        </p>
      ) : null}
      {hasBusinessId ? (
        <p>
          {locale === "de" ? "Wirtschafts-Identifikationsnummer gemäß § 139c AO" : "Business identification number"}:{" "}
          {legalConfig.businessId}
        </p>
      ) : null}
    </>
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
          <LegalPhone locale={locale} />
        </LegalCard>

        <ServiceProvidersContent locale={locale} />

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

function LegalPhone({ locale }: { locale: Locale }) {
  const label = locale === "de" ? "Telefon" : "Phone";
  const missing = locale === "de" ? "Telefonnummer vor Veröffentlichung ergänzen" : "Add phone number before public launch";
  const href = legalPhoneHref();

  return (
    <p className="mt-4">
      {label}:{" "}
      {hasLegalPhone && href ? (
        <a className="text-[var(--site-strong)] underline underline-offset-4" href={href}>
          {legalConfig.phone}
        </a>
      ) : (
        <span>{missing}</span>
      )}
    </p>
  );
}

function ServiceProvidersContent({ locale }: { locale: Locale }) {
  const copy = SERVICE_PROVIDER_COPY[locale];

  return (
    <LegalCard title={copy.title}>
      <p>{copy.intro}</p>
      <div className="space-y-7 pt-2">
        {legalServiceProviders.map((provider) => (
          <div key={provider.name} className="border-t border-[var(--site-line)] pt-6 first:border-t-0 first:pt-0">
            <h3 className="text-xl font-semibold text-[var(--site-strong)]">{provider.name}</h3>
            <div className="mt-4 grid gap-4 text-base leading-7 md:grid-cols-2">
              <ProviderDetail label={copy.address}>
                {provider.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </ProviderDetail>
              <ProviderDetail label={copy.purpose}>{provider.purpose[locale]}</ProviderDetail>
              <ProviderDetail label={copy.data}>{provider.data[locale]}</ProviderDetail>
              <ProviderDetail label={copy.basis}>{provider.basis[locale]}</ProviderDetail>
              <ProviderDetail label={copy.transfer}>{provider.transfer[locale]}</ProviderDetail>
              <ProviderDetail label={copy.details}>
                <a
                  className="text-[var(--site-strong)] underline underline-offset-4"
                  href={provider.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.details}
                </a>
              </ProviderDetail>
            </div>
          </div>
        ))}
      </div>
    </LegalCard>
  );
}

function ProviderDetail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--site-cyan)]">{label}</p>
      <div className="mt-2 text-[var(--site-muted)]">{children}</div>
    </div>
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
