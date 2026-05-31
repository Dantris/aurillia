import type { Locale } from "./i18n";

export type LegalTaxStatus = "kleinunternehmer" | "regular" | "unknown";

function normalizeTaxStatus(value: string | undefined): LegalTaxStatus {
  switch (value?.trim().toLowerCase()) {
    case "kleinunternehmer":
    case "small-business":
    case "small_business":
      return "kleinunternehmer";
    case "regular":
    case "regelbesteuerung":
    case "vat":
      return "regular";
    default:
      return "unknown";
  }
}

export const legalConfig = {
  brandName: "Aurillia",
  ownerName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Adrian Dever",
  legalForm: process.env.NEXT_PUBLIC_LEGAL_FORM || "Einzelunternehmer",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@aurillia.de",
  phone: (process.env.NEXT_PUBLIC_LEGAL_PHONE || "").trim(),
  addressLines: (process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "Ziegelhof 6|96049 Bamberg|Deutschland")
    .split("|")
    .map((line) => line.trim())
    .filter(Boolean),
  taxStatus: normalizeTaxStatus(process.env.NEXT_PUBLIC_LEGAL_TAX_STATUS || "kleinunternehmer"),
  vatId: (process.env.NEXT_PUBLIC_LEGAL_VAT_ID || "").trim(),
  businessId: (process.env.NEXT_PUBLIC_LEGAL_BUSINESS_ID || "").trim(),
  registerCourt: (process.env.NEXT_PUBLIC_LEGAL_REGISTER_COURT || "").trim(),
  registerNumber: (process.env.NEXT_PUBLIC_LEGAL_REGISTER_NUMBER || "").trim(),
  updatedAtDe: "26. Mai 2026",
  updatedAtEn: "May 26, 2026",
};

export const hasLegalAddress = legalConfig.addressLines.length > 0;
export const hasLegalPhone = legalConfig.phone.length > 0;
export const hasVatId = legalConfig.vatId.length > 0;
export const hasBusinessId = legalConfig.businessId.length > 0;
export const hasRegisterEntry =
  legalConfig.registerCourt.length > 0 && legalConfig.registerNumber.length > 0;
export const isKleinunternehmer = legalConfig.taxStatus === "kleinunternehmer";

export function legalAddressLines() {
  return hasLegalAddress ? legalConfig.addressLines : ["Anschrift vor Veröffentlichung ergänzen"];
}

export function legalPhoneHref() {
  const normalized = legalConfig.phone.replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "";
}

export const legalServiceProviders = [
  {
    name: "Vercel Inc.",
    addressLines: ["440 N Barranca Ave #4133", "Covina, CA 91723", "USA"],
    url: "https://vercel.com/legal/dpa",
    purpose: {
      de: "Hosting, Deployment, Auslieferung der Website sowie Sicherheits- und Server-Logs.",
      en: "Hosting, deployment, website delivery, and security/server logs.",
    },
    data: {
      de: "IP-Adresse, aufgerufene URL, Datum und Uhrzeit, Referrer, Browser- und Geräteinformationen sowie technische Logdaten.",
      en: "IP address, requested URL, date and time, referrer, browser and device information, and technical log data.",
    },
    basis: {
      de: "Art. 6 Abs. 1 lit. f DSGVO; berechtigtes Interesse an sicherer und stabiler Bereitstellung der Website.",
      en: "Art. 6(1)(f) GDPR; legitimate interest in secure and stable website delivery.",
    },
    transfer: {
      de: "Die Verarbeitung kann in den USA oder an weiteren Standorten erfolgen; Absicherung über DPA und Standardvertragsklauseln, soweit erforderlich.",
      en: "Processing may take place in the United States or other locations; safeguarded by a DPA and standard contractual clauses where required.",
    },
  },
  {
    name: "Supabase, Inc.",
    addressLines: ["970 Toa Payoh North #07-04", "Singapore 318992", "Singapore"],
    url: "https://supabase.com/downloads/docs/Supabase%2BDPA%2B260317.pdf",
    purpose: {
      de: "Datenbank für Projektanfragen, freiwillige Kontaktdaten und optionale Nutzungsprotokolle des KI-Assistenten.",
      en: "Database for project inquiries, voluntarily provided contact details, and optional AI assistant usage logs.",
    },
    data: {
      de: "Name, E-Mail-Adresse, Projektnotiz, Interesse, Herkunft der Anfrage, technische Nutzungsdaten, Token-Werte und pseudonymisierte Fingerprints.",
      en: "Name, email address, project note, interest, inquiry source, technical usage data, token values, and pseudonymized fingerprints.",
    },
    basis: {
      de: "Art. 6 Abs. 1 lit. b DSGVO für Projektanbahnung, ansonsten Art. 6 Abs. 1 lit. f DSGVO.",
      en: "Art. 6(1)(b) GDPR for pre-contract project inquiries, otherwise Art. 6(1)(f) GDPR.",
    },
    transfer: {
      de: "Die Verarbeitung kann außerhalb der EU erfolgen; Absicherung über DPA und Standardvertragsklauseln, soweit erforderlich.",
      en: "Processing may take place outside the EU; safeguarded by a DPA and standard contractual clauses where required.",
    },
  },
  {
    name: "OpenAI Ireland Limited / OpenAI OpCo, LLC",
    addressLines: [
      "OpenAI Ireland Limited",
      "1st Floor, The Liffey Trust Centre",
      "117-126 Sheriff Street Upper",
      "Dublin 1, D01 YC43, Ireland",
      "OpenAI OpCo, LLC",
      "1455 3rd Street",
      "San Francisco, CA 94158, USA",
    ],
    url: "https://openai.com/en-GB/policies/data-processing-addendum/",
    purpose: {
      de: "Optionaler KI-Assistent, Moderation und Erzeugung von Antworten auf Chatnachrichten.",
      en: "Optional AI assistant, moderation, and generation of replies to chat messages.",
    },
    data: {
      de: "Chatnachrichten, Gesprächskontext, technische Anfrageinformationen und freiwillig übermittelte Kontaktdaten.",
      en: "Chat messages, conversation context, technical request information, and voluntarily provided contact details.",
    },
    basis: {
      de: "Art. 6 Abs. 1 lit. f DSGVO; bei konkreter Projektanfrage zusätzlich Art. 6 Abs. 1 lit. b DSGVO.",
      en: "Art. 6(1)(f) GDPR; for concrete project inquiries also Art. 6(1)(b) GDPR.",
    },
    transfer: {
      de: "OpenAI kann Daten an verbundene Unternehmen oder Unterauftragnehmer außerhalb der EU übermitteln; Absicherung über DPA und Standardvertragsklauseln, soweit erforderlich.",
      en: "OpenAI may transfer data to affiliates or subprocessors outside the EU; safeguarded by a DPA and standard contractual clauses where required.",
    },
  },
  {
    name: "Plus Five Five, Inc. (Resend)",
    addressLines: ["2261 Market Street #5039", "San Francisco, CA 94114", "USA"],
    url: "https://resend.com/legal/dpa",
    purpose: {
      de: "Transaktionaler E-Mail-Versand für Kontaktformular-Anfragen.",
      en: "Transactional email delivery for contact form inquiries.",
    },
    data: {
      de: "E-Mail-Adresse, Antwortadresse, Nachrichteninhalt, Betreff, Zustellungsdaten und technische Metadaten.",
      en: "Email address, reply-to address, message content, subject, delivery data, and technical metadata.",
    },
    basis: {
      de: "Art. 6 Abs. 1 lit. b DSGVO für Projektanbahnung, ansonsten Art. 6 Abs. 1 lit. f DSGVO.",
      en: "Art. 6(1)(b) GDPR for pre-contract project inquiries, otherwise Art. 6(1)(f) GDPR.",
    },
    transfer: {
      de: "Die Verarbeitung kann in den USA erfolgen; Absicherung über DPA, Data Privacy Framework und Standardvertragsklauseln, soweit erforderlich.",
      en: "Processing may take place in the United States; safeguarded by a DPA, Data Privacy Framework, and standard contractual clauses where required.",
    },
  },
  {
    name: "Cloudflare, Inc. (Turnstile)",
    addressLines: ["101 Townsend Street", "San Francisco, CA 94107", "USA"],
    url: "https://www.cloudflare.com/turnstile-privacy-policy/",
    purpose: {
      de: "Optionaler Bot- und Spam-Schutz für das Kontaktformular, sofern Turnstile aktiviert ist.",
      en: "Optional bot and spam protection for the contact form when Turnstile is enabled.",
    },
    data: {
      de: "IP-Adresse, User-Agent, TLS-Fingerprint, Sitekey, Origin und weitere technische Signale.",
      en: "IP address, user agent, TLS fingerprint, sitekey, origin, and further technical signals.",
    },
    basis: {
      de: "Art. 6 Abs. 1 lit. f DSGVO; berechtigtes Interesse an Spam- und Missbrauchsschutz.",
      en: "Art. 6(1)(f) GDPR; legitimate interest in spam and abuse protection.",
    },
    transfer: {
      de: "Die Verarbeitung kann außerhalb der EU erfolgen; Absicherung über DPA, Data Privacy Framework und Standardvertragsklauseln, soweit erforderlich.",
      en: "Processing may take place outside the EU; safeguarded by a DPA, Data Privacy Framework, and standard contractual clauses where required.",
    },
  },
] satisfies {
  name: string;
  addressLines: string[];
  url: string;
  purpose: Record<Locale, string>;
  data: Record<Locale, string>;
  basis: Record<Locale, string>;
  transfer: Record<Locale, string>;
}[];
