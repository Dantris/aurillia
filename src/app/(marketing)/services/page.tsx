import Link from "next/link";

type Service = {
  title: string;
  href: string;
  desc: string;
  bullets: string[];
  tag?: string;
};

const SERVICES: Service[] = [
  {
    title: "Web Development",
    href: "/services/web",
    desc: "Marketing sites and product pages that feel premium and load fast.",
    bullets: ["Conversion-focused structure", "Performance baseline", "SEO + analytics setup"],
    tag: "Most popular",
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile",
    desc: "React Native / Expo apps with a clean codebase and smooth release flow.",
    bullets: ["MVP to v1 delivery", "Auth + data + dashboards", "Store release support"],
  },
  {
    title: "Full-Stack Systems",
    href: "/services/fullstack",
    desc: "Dashboards, portals, and internal tools that run your operations.",
    bullets: ["Role-based access", "Integrations + APIs", "Observability + logging"],
  },
  {
    title: "Cloud & AWS",
    href: "/services/cloud",
    desc: "Hosting, monitoring, and migrations without surprise bills or downtime.",
    bullets: ["CI/CD + environments", "Logs + alerts", "Performance & cost sanity"],
  },
  {
    title: "AI & Automation",
    href: "/services/ai",
    desc: "Assistants and workflows that save real time — built with guardrails.",
    bullets: ["Workflow design", "Tooling + evals", "UX integration"],
  },
  {
    title: "Hardware & IoT",
    href: "/services/hardware",
    desc: "Nodes, hubs, dashboards, and control apps — local-first when needed.",
    bullets: ["Device + app pairing", "Secure comms", "Monitoring + alerts"],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative">
      {/* subtle aura behind the top section (keeps brand consistent, still light pages OK) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
        style={{
          background:
            "radial-gradient(900px 520px at 18% 10%, rgba(230,199,122,.12), transparent 60%), radial-gradient(900px 520px at 72% 5%, rgba(120,160,255,.08), transparent 60%)",
        }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-10 md:pt-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--muted)]">
              SERVICES
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[color:var(--text)] md:text-5xl">
              Clear services. Clean delivery.
            </h1>
            <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
              Pick a track below — or tell us what you’re building and we’ll propose the simplest path to launch.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Get a launch plan
            </Link>
            <Link href="#packages" className="btn-secondary">
              See packages
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group rounded-3xl border border-[var(--border)] bg-[rgba(255,255,255,.03)] p-6 transition hover:bg-[rgba(255,255,255,.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-[color:var(--text)]">
                    {s.title}
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">
                    {s.desc}
                  </p>
                </div>

                {s.tag ? <span className="chip">{s.tag}</span> : <span className="chip">Details</span>}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-[color:var(--muted)]">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[.55rem] h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--text)]">
                Learn more
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="border-y border-[var(--border)] bg-[rgba(255,255,255,.02)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[color:var(--text)] md:text-3xl">
            Packages (easy to buy)
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
            Fixed-scope work ships faster. If you need something custom, we’ll still give you a clear estimate and milestones.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <PackageCard
              title="Launch Sprint"
              price="from 2 weeks"
              desc="A premium landing page + tracking + polish."
              bullets={["Design + copy structure", "Performance baseline", "SEO + analytics", "Deploy + handoff"]}
            />
            <PackageCard
              title="MVP Build"
              price="6–10 weeks"
              desc="A real product foundation you can extend."
              highlight
              bullets={["UI system + architecture", "Auth + core features", "Integrations/payments", "CI/CD + docs"]}
            />
            <PackageCard
              title="Care Plan"
              price="monthly"
              desc="Ongoing improvements, fixes, and iteration."
              bullets={["Priority queue", "Perf + UX work", "Small features shipped", "Roadmap support"]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="rounded-3xl border border-[var(--border)] bg-[rgba(255,255,255,.03)] p-8 md:p-12">
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-[color:var(--text)] md:text-2xl">
            Not sure which service fits?
          </h3>
          <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
            Send a short note with your goal and timeline — you’ll get a launch plan (scope, estimate, next steps).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Contact</Link>
            <a href="mailto:hello@aurillia.de" className="btn-secondary">hello@aurillia.de</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function PackageCard({
  title,
  price,
  desc,
  bullets,
  highlight,
}: {
  title: string;
  price: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-6",
        highlight
          ? "border-[color:var(--ring)] bg-[rgba(255,255,255,.05)] shadow-[0_30px_120px_rgba(230,199,122,.10)]"
          : "border-[var(--border)] bg-[rgba(255,255,255,.03)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-[color:var(--text)]">{title}</div>
          <div className="mt-1 text-sm text-[color:var(--muted)]">{desc}</div>
        </div>
        <span className="chip">{price}</span>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-[color:var(--muted)]">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[.55rem] h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href="/contact" className={highlight ? "btn-primary w-full" : "btn-secondary w-full"}>
          Get a launch plan
        </Link>
      </div>
    </div>
  );
}
