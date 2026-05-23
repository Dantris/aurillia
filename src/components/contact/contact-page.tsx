import type { Locale } from "@/lib/i18n";
import SiteFooter from "@/components/navigation/site-footer";

type ContactPageProps = {
  locale: Locale;
  sent: boolean;
  error?: string | null;
  contactEmail: string;
  selectedInterest?: string | null;
};

type ContactOption = {
  value: string;
  label: string;
  body: string;
};

const COPY = {
  de: {
    eyebrow: "Kontakt",
    title: "Erzähl uns, wo die Website gerade hakt.",
    intro:
      "Du brauchst kein fertiges Lastenheft. Ein Link, ein paar Sätze zum Angebot und die Stellen, an denen die aktuelle Seite nicht mehr trägt, reichen für den Anfang.",
    emailLabel: "E-Mail",
    replyLabel: "Typische Antwort",
    replyValue: "1-2 Werktage",
    firstMessageLabel: "Gute erste Nachricht",
    firstMessageValue: "Ziel, Kontext, grober Zeitplan und bestehende Links",
    success:
      "Danke. Deine Nachricht ist angekommen. Wir prüfen sie und melden uns mit einem praktischen nächsten Schritt.",
    errors: {
      invalid: "Bitte prüf Name, E-Mail und Nachricht. Die Nachricht sollte mindestens ein paar Sätze enthalten.",
      rate: "Es kamen gerade zu viele Nachrichten an. Versuch es in ein paar Minuten erneut.",
      send: "Die Nachricht konnte gerade nicht per E-Mail weitergeleitet werden. Schreib uns bitte direkt per E-Mail.",
      generic: "Das Formular konnte gerade nicht verarbeitet werden. Schreib uns bitte direkt per E-Mail.",
    },
    formTitle: "Kurze Projektnotiz",
    formIntro:
      "Je konkreter du die aktuelle Situation beschreibst, desto nützlicher können wir antworten.",
    name: "Name",
    namePlaceholder: "Vorname und Nachname",
    email: "E-Mail",
    emailPlaceholder: "name@unternehmen.de",
    company: "Unternehmen",
    companyPlaceholder: "Unternehmen, Praxis oder Marke",
    website: "Aktuelle Website",
    websitePlaceholder: "https://deine-domain.de",
    timeline: "Zeitplan",
    timelinePlaceholder: "z.B. Relaunch vor dem Quartalsstart",
    projectType: "Projektart",
    message: "Nachricht",
    messagePlaceholder:
      "Was passt aktuell nicht, was soll sich ändern und welche Seiten oder Angebote sind besonders wichtig?",
    formNote:
      "Kein Sales-Skript. Wir antworten mit nützlicher Richtung oder sagen ehrlich, wenn es nicht passt.",
    submit: "Projektnotiz senden",
    privacyNote:
      "Deine Angaben werden nur genutzt, um die Anfrage zu prüfen und zu beantworten.",
    promptEyebrow: "Was hilft",
    promptTitle: "Ein guter Start ist oft kleiner, als man denkt.",
    promptIntro:
      "Viele Projekte hängen, weil alle auf den perfekten Brief warten. Für eine erste Einschätzung brauchen wir vor allem Kontext.",
    promptItems: [
      {
        title: "Aktuelle Website oder Produktlink",
        body:
          "Damit wir sehen, was schon da ist, wo die Sprache bricht und welche technischen Grundlagen vorhanden sind.",
      },
      {
        title: "Was gerade nicht funktioniert",
        body:
          "Zu wenig Anfragen, falsche Erwartungen, schwierige Pflege, unklare Leistungen oder ein Auftritt, der nicht mehr zum Unternehmen passt.",
      },
      {
        title: "Was nach dem Launch leichter sein soll",
        body:
          "Zum Beispiel bessere Anfragen, klarere Leistungsseiten, weniger manuelle Erklärung oder eine Basis für spätere Funktionen.",
      },
    ],
    nextEyebrow: "Was dann passiert",
    nextTitle: "Von der ersten Nachricht zu einem Scope, den man wirklich entscheiden kann.",
    steps: [
      {
        title: "Wir lesen auf Kontext, nicht nur auf Features",
        body:
          "Der erste Blick gilt dem Geschäft, der aktuellen Oberfläche und der Frage, ob Web, Mobile oder Assistentenarbeit der richtige Startpunkt ist.",
      },
      {
        title: "Wir stellen die nützlichen Fragen",
        body:
          "Vielleicht kommen ein paar fokussierte Fragen zu Zielgruppe, Inhalten, Integrationen, Zeitplan oder den Stellen, an denen die aktuelle Erfahrung hakt.",
      },
      {
        title: "Wir schlagen eine erste Form vor",
        body:
          "Wenn es passt, ist der nächste Schritt ein kleiner Scope: was zuerst gebaut wird, was draußen bleibt und wie der Launch ohne Drift gelingt.",
      },
    ],
    options: [
      {
        value: "Web Development",
        label: "Webentwicklung",
        body: "Neue Website, Relaunch, Leistungsseiten oder bessere Anfragen.",
      },
      {
        value: "Mobile Apps",
        label: "Mobile Apps",
        body: "PWA, App oder interner mobiler Ablauf für Teams und Kunden.",
      },
      {
        value: "AI Chatbot / Assistant",
        label: "KI-Assistent",
        body: "Chatbot, Projektberater oder hilfreiche KI-Strecke auf der Website.",
      },
      {
        value: "Website Care",
        label: "Website Care",
        body: "Pflege, Inhalte, Analytics und kleine Verbesserungen nach dem Launch.",
      },
    ],
  },
  en: {
    eyebrow: "Contact",
    title: "Tell us what should exist next.",
    intro:
      "Share the shape of the project: what you are building, what is not working yet, and what a useful first version should accomplish.",
    emailLabel: "Email",
    replyLabel: "Typical reply",
    replyValue: "1-2 business days",
    firstMessageLabel: "Good first message",
    firstMessageValue: "Goal, context, rough timeline, and existing links",
    success:
      "Thanks. Your message is in. We will review it and come back with a practical next step.",
    errors: {
      invalid: "Please check name, email, and message. The message should include a little context.",
      rate: "Too many messages arrived just now. Try again in a few minutes.",
      send: "The message could not be forwarded by email right now. Please email us directly.",
      generic: "The form could not be processed right now. Please email us directly.",
    },
    formTitle: "Short project note",
    formIntro:
      "The more concrete the current situation is, the more useful our first reply can be.",
    name: "Name",
    namePlaceholder: "First and last name",
    email: "Email",
    emailPlaceholder: "name@company.com",
    company: "Company",
    companyPlaceholder: "Company, practice, or brand",
    website: "Current website",
    websitePlaceholder: "https://your-domain.com",
    timeline: "Timeline",
    timelinePlaceholder: "e.g. relaunch before next quarter",
    projectType: "Project type",
    message: "Message",
    messagePlaceholder:
      "What is not working right now, what should change, and which pages or offers matter most?",
    formNote:
      "No sales script. We will reply with useful direction or tell you if it is not a fit.",
    submit: "Send project note",
    privacyNote:
      "Your details are only used to review and answer the request.",
    promptEyebrow: "What Helps",
    promptTitle: "A good start is usually smaller than people think.",
    promptIntro:
      "Many projects get stuck because everyone waits for the perfect brief. For a first read, context matters most.",
    promptItems: [
      {
        title: "Current website or product link",
        body:
          "So we can see what already exists, where the language breaks, and what technical foundation is in place.",
      },
      {
        title: "What is not working right now",
        body:
          "Too few inquiries, wrong expectations, hard content updates, unclear services, or a site that no longer fits the company.",
      },
      {
        title: "What should become easier after launch",
        body:
          "For example better inquiries, clearer service pages, less manual explaining, or a base for future features.",
      },
    ],
    nextEyebrow: "What Happens Next",
    nextTitle: "From first note to a scope people can actually decide on.",
    steps: [
      {
        title: "We read for context",
        body:
          "The first pass is about understanding the business, the current surface, and whether web, mobile, or assistant work is the right starting point.",
      },
      {
        title: "We ask the useful questions",
        body:
          "You may get a few focused questions about audience, content, integrations, timeline, or where the current experience breaks down.",
      },
      {
        title: "We suggest a first shape",
        body:
          "If there is a fit, the next step is a small scope: what to build first, what to leave out, and how to launch without drift.",
      },
    ],
    options: [
      {
        value: "Web Development",
        label: "Web Development",
        body: "New site, relaunch, service pages, or better inquiries.",
      },
      {
        value: "Mobile Apps",
        label: "Mobile Apps",
        body: "PWA, app, or internal mobile workflow for teams and customers.",
      },
      {
        value: "AI Chatbot / Assistant",
        label: "AI Assistant",
        body: "Chatbot, project advisor, or useful AI path on the website.",
      },
      {
        value: "Website Care",
        label: "Website Care",
        body: "Maintenance, content, analytics, and small improvements after launch.",
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    emailLabel: string;
    replyLabel: string;
    replyValue: string;
    firstMessageLabel: string;
    firstMessageValue: string;
    success: string;
    errors: {
      invalid: string;
      rate: string;
      send: string;
      generic: string;
    };
    formTitle: string;
    formIntro: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    website: string;
    websitePlaceholder: string;
    timeline: string;
    timelinePlaceholder: string;
    projectType: string;
    message: string;
    messagePlaceholder: string;
    formNote: string;
    submit: string;
    privacyNote: string;
    promptEyebrow: string;
    promptTitle: string;
    promptIntro: string;
    promptItems: { title: string; body: string }[];
    nextEyebrow: string;
    nextTitle: string;
    steps: { title: string; body: string }[];
    options: ContactOption[];
  }
>;

export default function ContactPageContent({
  locale,
  sent,
  error,
  contactEmail,
  selectedInterest,
}: ContactPageProps) {
  const copy = COPY[locale];
  const errorMessage = error
    ? copy.errors[error as keyof typeof copy.errors] ?? copy.errors.generic
    : null;
  const normalizedInterest = copy.options.some((option) => option.value === selectedInterest)
    ? selectedInterest ?? "Web Development"
    : copy.options[0]?.value ?? "Web Development";

  return (
    <>
    <main className="min-h-screen text-[var(--site-text)]">
      <section className="relative overflow-hidden border-b border-[var(--site-line)]">
        <div className="pointer-events-none absolute inset-0 [background:var(--site-contact-wash)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-6xl">
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-[var(--site-cyan)]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-8 max-w-[18ch] text-[clamp(3.2rem,6.4vw,5.7rem)] font-semibold leading-[1.02] tracking-normal">
              {copy.title}
            </h1>
            <p className="mt-8 max-w-4xl text-xl leading-9 text-[var(--site-muted)] md:text-2xl md:leading-10">
              {copy.intro}
            </p>
          </div>

          <div className="mt-10 grid max-w-6xl gap-3 md:grid-cols-3">
            <InfoRow label={copy.emailLabel} value={contactEmail} href={`mailto:${contactEmail}`} />
            <InfoRow label={copy.replyLabel} value={copy.replyValue} />
            <InfoRow label={copy.firstMessageLabel} value={copy.firstMessageValue} />
          </div>

          <div className="mt-10 max-w-6xl">
            {sent ? (
              <div
                role="status"
                aria-live="polite"
                className="mb-5 rounded-lg border border-[color-mix(in_oklch,var(--site-cyan)_35%,transparent)] bg-[rgba(var(--site-cyan-rgb),.08)] p-5 text-base leading-7 text-[var(--site-strong)]"
              >
                {copy.success}
              </div>
            ) : null}

            {errorMessage ? (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-[color-mix(in_oklch,#ef4444_38%,var(--site-line))] bg-[color-mix(in_oklch,#ef4444_10%,transparent)] p-5 text-base leading-7 text-[var(--site-strong)]"
              >
                {errorMessage}{" "}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-[var(--site-cyan)] underline-offset-4 hover:underline">
                  {contactEmail}
                </a>
              </div>
            ) : null}

            <form action="/api/contact" method="POST" encType="multipart/form-data" className="contact-form-panel">
              <input type="hidden" name="locale" value={locale} />
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="mb-7">
                <p className="text-2xl font-semibold text-[var(--site-strong)]">{copy.formTitle}</p>
                <p className="mt-2 text-base leading-7 text-[var(--site-muted)]">{copy.formIntro}</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Field label={copy.name} htmlFor="name">
                  <input id="name" name="name" required className="contact-field" placeholder={copy.namePlaceholder} />
                </Field>
                <Field label={copy.email} htmlFor="email">
                  <input id="email" name="email" type="email" required className="contact-field" placeholder={copy.emailPlaceholder} />
                </Field>
                <Field label={copy.company} htmlFor="company">
                  <input id="company" name="company" className="contact-field" placeholder={copy.companyPlaceholder} />
                </Field>
                <Field label={copy.website} htmlFor="project-url">
                  <input id="project-url" name="projectUrl" className="contact-field" placeholder={copy.websitePlaceholder} inputMode="url" />
                </Field>
                <Field label={copy.timeline} htmlFor="timeline" className="sm:col-span-2 lg:col-span-1">
                  <input id="timeline" name="timeline" className="contact-field" placeholder={copy.timelinePlaceholder} />
                </Field>
                <ProjectTypeField label={copy.projectType} options={copy.options} selectedInterest={normalizedInterest} />
              </div>

              <Field className="mt-5" label={copy.message} htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  required
                  className="contact-field resize-y"
                  placeholder={copy.messagePlaceholder}
                />
              </Field>

              <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="text-base leading-7 text-[var(--site-muted)]">
                  <p>{copy.formNote}</p>
                  <p className="mt-1 text-sm text-[var(--site-muted-2)]">{copy.privacyNote}</p>
                </div>
                <button type="submit" className="site-button site-button-primary">
                  {copy.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)] bg-[var(--site-subtle-bg)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[.85fr_1.15fr] md:px-10 md:py-24">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {copy.promptEyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
              {copy.promptTitle}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--site-muted)]">
              {copy.promptIntro}
            </p>
          </div>

          <div className="grid gap-4">
            {copy.promptItems.map((item) => (
              <article key={item.title} className="border border-[var(--site-line)] bg-[var(--site-panel)] p-6">
                <h3 className="text-2xl font-semibold text-[var(--site-strong)]">{item.title}</h3>
                <p className="mt-3 text-lg leading-8 text-[var(--site-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {copy.nextEyebrow}
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
              {copy.nextTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {copy.steps.map((item) => (
              <article key={item.title} className="border border-[var(--site-line)] bg-[var(--site-panel)] p-7">
                <h3 className="text-2xl font-semibold text-[var(--site-strong)]">{item.title}</h3>
                <p className="mt-4 text-lg leading-8 text-[var(--site-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
    <SiteFooter locale={locale} />
    </>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="text-[var(--site-strong)] underline-offset-4 hover:underline">
      {value}
    </a>
  ) : (
    <span>{value}</span>
  );

  return (
    <div className="border border-[var(--site-line)] bg-[var(--site-card-bg)] p-5">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--site-cyan)]">{label}</p>
      <p className="mt-3 text-base leading-7 text-[var(--site-muted)]">{content}</p>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`}>
      <span className="mb-2.5 block font-mono text-sm uppercase tracking-[0.18em] text-[var(--site-cyan)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function ProjectTypeField({
  label,
  options,
  selectedInterest,
}: {
  label: string;
  options: ContactOption[];
  selectedInterest: string;
}) {
  return (
    <fieldset className="block sm:col-span-2 lg:col-span-3">
      <legend className="mb-2.5 block font-mono text-sm uppercase tracking-[0.18em] text-[var(--site-cyan)]">
        {label}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {options.map((option) => {
          const id = `interest-${option.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

          return (
            <div key={option.value} className="contact-choice">
              <input
                id={id}
                type="radio"
                name="interest"
                value={option.value}
                defaultChecked={option.value === selectedInterest}
              />
              <label htmlFor={id}>
              <strong>{option.label}</strong>
              <small>{option.body}</small>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
