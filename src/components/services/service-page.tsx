import { localizedPath, type Locale } from "@/lib/i18n";
import SiteFooter from "@/components/navigation/site-footer";

type Highlight = {
  label: string;
  value: string;
  detail: string;
};

type Capability = {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
};

type WorkflowStep = {
  title: string;
  body: string;
};

type Outcome = {
  title: string;
  body: string;
};

type Faq = {
  question: string;
  answer: string;
};

type ServiceSection<Item> = {
  eyebrow: string;
  title: string;
  intro: string;
  items: Item[];
};

type Concern = {
  title: string;
  body: string;
};

type TrustPoint = {
  value: string;
  label: string;
  body: string;
};

export type ServicePageProps = {
  locale?: Locale;
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  contactInterest?: string;
  highlights: Highlight[];
  concerns: ServiceSection<Concern>;
  capabilities: Capability[];
  workflow: WorkflowStep[];
  outcomes: Outcome[];
  trust: ServiceSection<TrustPoint>;
  fitTitle: string;
  fitBody: string;
  fitItems: string[];
  faq: Faq[];
  closingTitle: string;
  closingBody: string;
};

const SECTION_COPY: Record<
  Locale,
  {
    capabilitiesLabel: string;
    capabilitiesTitle: string;
    capabilitiesIntro: string;
    workflowLabel: string;
    workflowTitle: string;
    workflowIntro: string;
    fitLabel: string;
    outcomesLabel: string;
    outcomesTitle: string;
    faqLabel: string;
    faqTitle: string;
    closingEyebrow: string;
  }
> = {
  de: {
    capabilitiesLabel: "Was wir klären",
    capabilitiesTitle: "Erst die richtigen Antworten, dann das Design.",
    capabilitiesIntro:
      "Ein gutes digitales Angebot nimmt Nutzern Arbeit ab: verstehen, vergleichen, entscheiden und handeln.",
    workflowLabel: "So läuft es",
    workflowTitle: "Wir machen daraus einen sauberen Weg.",
    workflowIntro:
      "Du siehst jederzeit, was entschieden wird, was gerade entsteht und was bereit für den Launch ist.",
    fitLabel: "Wann es passt",
    outcomesLabel: "Was besser wird",
    outcomesTitle: "Am Ende soll die digitale Oberfläche spürbar mehr tragen.",
    faqLabel: "Häufige Fragen",
    faqTitle: "Kurz geklärt, bevor wir sprechen.",
    closingEyebrow: "Aurillia",
  },
  en: {
    capabilitiesLabel: "What You Get",
    capabilitiesTitle: "A complete web product surface, not loose pages.",
    capabilitiesIntro:
      "Strategy, interface, implementation, launch, and the details around them are treated as one system.",
    workflowLabel: "Workflow",
    workflowTitle: "Built in clear passes.",
    workflowIntro:
      "You always know what is being decided, what is being built, and what is ready to ship.",
    fitLabel: "Fit",
    outcomesLabel: "Outcomes",
    outcomesTitle: "The practical things the project should leave behind.",
    faqLabel: "Questions",
    faqTitle: "Short answers before the call.",
    closingEyebrow: "Aurillia",
  },
};

export default function ServicePage({
  locale = "de",
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
  contactInterest,
  highlights,
  concerns,
  capabilities,
  workflow,
  outcomes,
  trust,
  fitTitle,
  fitBody,
  fitItems,
  faq,
  closingTitle,
  closingBody,
}: ServicePageProps) {
  const section = SECTION_COPY[locale];
  const titleSize =
    locale === "de"
      ? "text-[clamp(3.05rem,6.2vw,5.25rem)]"
      : "text-[clamp(3.2rem,6.8vw,5.7rem)]";
  const contactHref = contactInterest
    ? `${localizedPath("/contact", locale)}?interest=${encodeURIComponent(contactInterest)}`
    : localizedPath("/contact", locale);

  return (
    <>
    <main className="min-h-screen text-[var(--site-text)]">
      <section className="relative overflow-hidden border-b border-[var(--site-line)]">
        <div className="pointer-events-none absolute inset-0 [background:var(--site-hero-wash)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,.65fr)] lg:items-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-[var(--site-cyan)]">
              {eyebrow}
            </p>
            <h1 className={`mt-8 max-w-[15ch] text-balance font-semibold leading-[1.02] tracking-normal ${titleSize}`}>
              {title}
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--site-muted)] md:text-2xl md:leading-10">
              {intro}
            </p>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <a className="site-button site-button-primary" href={contactHref}>
                {primaryCta}
              </a>
              <a className="site-button site-button-secondary" href="#capabilities">
                {secondaryCta}
              </a>
            </div>
          </div>

          <div className="grid gap-3 lg:max-w-[390px] lg:justify-self-end">
            {highlights.map((item) => (
              <article key={item.label} className="border border-[var(--site-line)] bg-[var(--site-card-bg)] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--site-cyan)]">
                  {item.label}
                </p>
                <p className="mt-4 text-4xl font-semibold text-[var(--site-strong)]">{item.value}</p>
                <p className="mt-3 text-base leading-7 text-[var(--site-muted)]">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)] bg-[var(--site-subtle-bg)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[.82fr_1.18fr] md:px-10 md:py-24">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {concerns.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
              {concerns.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--site-muted)]">
              {concerns.intro}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {concerns.items.map((item) => (
              <article
                key={item.title}
                className="border border-[var(--site-line)] bg-[var(--site-panel)] p-6"
              >
                <h3 className="text-2xl font-semibold leading-tight text-[var(--site-strong)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[var(--site-muted)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="border-b border-[var(--site-line)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
                {section.capabilitiesLabel}
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
                {section.capabilitiesTitle}
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-8 text-[var(--site-muted)]">
              {section.capabilitiesIntro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {capabilities.map((capability) => (
              <article key={capability.title} className="flex h-full flex-col border border-[var(--site-line)] bg-[var(--site-panel)] p-7 md:p-8">
                <p className="font-mono text-sm uppercase tracking-[0.22em] text-[var(--site-cyan)]">
                  {capability.eyebrow}
                </p>
                <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-normal text-[var(--site-strong)]">
                  {capability.title}
                </h3>
                <p className="mt-5 text-lg leading-8 text-[var(--site-muted)]">
                  {capability.body}
                </p>
                <ul className="mt-auto space-y-4 pt-8">
                  {capability.items.map((item) => (
                    <li key={item} className="flex min-h-14 gap-3 text-base leading-7 text-[var(--site-text)]">
                      <span className="mt-2.5 h-2 w-2 shrink-0 bg-[var(--site-cyan)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[.85fr_1.15fr] md:px-10 md:py-28">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {section.workflowLabel}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
              {section.workflowTitle}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--site-muted)]">
              {section.workflowIntro}
            </p>
          </div>
          <div className="grid gap-4">
            {workflow.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-6 border border-[var(--site-line)] bg-[var(--site-soft-bg)] p-6 md:grid-cols-[92px_1fr]"
              >
                <p className="font-mono text-lg text-[var(--site-cyan)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--site-strong)]">{step.title}</h3>
                  <p className="mt-3 text-lg leading-8 text-[var(--site-muted)]">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
                {section.fitLabel}
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
                {fitTitle}
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--site-muted)]">{fitBody}</p>
            </div>
            <div className="grid gap-4">
              {fitItems.map((item) => (
                <div key={item} className="border border-[var(--site-line)] bg-[var(--site-panel)] p-6 text-lg leading-8 text-[var(--site-text)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-12">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {section.outcomesLabel}
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
              {section.outcomesTitle}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="border border-[var(--site-line)] bg-[var(--site-soft-bg)] p-7">
                <h3 className="text-2xl font-semibold text-[var(--site-strong)]">{outcome.title}</h3>
                <p className="mt-4 text-lg leading-8 text-[var(--site-muted)]">{outcome.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[.75fr_1.25fr] md:px-10 md:py-28">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {trust.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
              {trust.title}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--site-muted)]">
              {trust.intro}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {trust.items.map((item) => (
              <article key={item.label} className="border border-[var(--site-line)] bg-[var(--site-panel)] p-7">
                <p className="text-4xl font-semibold text-[var(--site-cyan)]">{item.value}</p>
                <h3 className="mt-5 text-2xl font-semibold text-[var(--site-strong)]">{item.label}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--site-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--site-line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[.75fr_1.25fr] md:px-10 md:py-28">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
              {section.faqLabel}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
              {section.faqTitle}
            </h2>
          </div>
          <div className="grid gap-4">
            {faq.map((item) => (
              <article key={item.question} className="border border-[var(--site-line)] bg-[var(--site-panel)] p-6">
                <h3 className="text-xl font-semibold text-[var(--site-strong)]">{item.question}</h3>
                <p className="mt-3 text-lg leading-8 text-[var(--site-muted)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="border border-[var(--site-line)] p-7 [background:var(--site-closing-bg)] md:p-10">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--site-cyan)]">
                {section.closingEyebrow}
              </p>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-[var(--site-strong)] md:text-6xl">
                {closingTitle}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--site-muted)]">
                {closingBody}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter locale={locale} />
    </>
  );
}
