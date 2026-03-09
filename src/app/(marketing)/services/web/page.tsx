"use client";

import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.72s ease ${delay}s, transform 0.72s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default function AurilliaWebPage() {
  const [hovered, setHovered] = useState(null);

  const deliverables = [
    {
      num: "01",
      label: "Foundation",
      title: "A codebase you'll be proud to hand to your next dev",
      body: "Next.js, TypeScript, and a design system with real structure. We set sensible defaults for performance, accessibility, and long-term maintainability — so you're not fighting the site two years from now.",
      items: ["Green Core Web Vitals", "Fully responsive layouts", "Accessible by default"],
    },
    {
      num: "02",
      label: "Content & SEO",
      title: "A CMS that editors actually enjoy",
      body: "We set up a headless CMS — Sanity, Contentful, or headless WP — shaped around your content model, not a generic one. SEO is wired into the components, not bolted on at the end.",
      items: ["Blog, docs, case studies", "Per-page titles, meta & OG", "Analytics events to your tools"],
    },
    {
      num: "03",
      label: "Integrations",
      title: "Connected to your stack on day one",
      body: "Contact forms that land in your CRM. Notification hooks. Optional AI helpers for FAQ or lead triage. The site talks to the rest of your business, not just to itself.",
      items: ["Lead & project request flows", "Works with tools you already use", "Optional AI-powered helpers"],
    },
  ];

  const packages = [
    {
      id: "launch",
      name: "Launch page",
      tag: "New product or feature",
      desc: "One focused page that tells the story clearly — strong hero, a few key sections, basic SEO, and a lead capture flow. Enough to go live and start talking to customers.",
      price: "From €X,XXX",
      timeline: "1–2 weeks",
    },
    {
      id: "marketing",
      name: "Marketing site + CMS",
      tag: "Small teams & studios",
      desc: "4–8 pages (Home, Product, Pricing, About, Contact) plus a blog or case studies section you can update yourself. The foundation most growing products need.",
      price: "From €Y,YYY",
      timeline: "3–5 weeks",
      featured: true,
    },
    {
      id: "product",
      name: "Product + docs + integrations",
      tag: "Tools & platforms",
      desc: "Marketing site plus product docs, simple dashboards or account views, and deeper integrations. If you're building a platform, this is where we start the real conversation.",
      price: "Custom quote",
      timeline: "5–8 weeks",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0f0f0e;
          --surface: #181817;
          --surface2: #201f1e;
          --border: rgba(255,255,255,0.08);
          --text: #f0ede8;
          --muted: #8a8680;
          --accent: #c9a84c;
          --accent-dim: rgba(201,168,76,0.12);
        }

        body { background: var(--bg); }

        .page {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.028;
          pointer-events: none;
          z-index: 0;
        }

        .wrap { max-width: 1120px; margin: 0 auto; padding: 0 28px; position: relative; z-index: 1; }

        /* NAV */
        .nav {
          border-bottom: 1px solid var(--border);
          padding: 18px 0;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .nav-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .nav-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }

        /* HERO */
        .hero {
          padding: 100px 0 80px;
          border-bottom: 1px solid var(--border);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .hero-eyebrow-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 500;
          color: var(--muted);
        }
        .hero-eyebrow-text {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .hero-h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.6rem, 5vw, 4.1rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          color: var(--text);
          max-width: 680px;
        }
        .hero-h1 em {
          font-style: italic;
          color: var(--accent);
        }

        .hero-body {
          margin-top: 28px;
          font-size: 1.05rem;
          line-height: 1.72;
          color: var(--muted);
          max-width: 560px;
          font-weight: 300;
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 32px;
        }
        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid var(--border);
          font-size: 0.73rem;
          font-weight: 400;
          color: var(--muted);
          background: var(--surface);
        }
        .tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        .hero-cta {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 40px;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #0f0f0e;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: 100px;
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .hero-aside-note {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ASIDE CARD */
        .aside-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          background: var(--surface);
        }
        .aside-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .aside-desc {
          font-size: 0.88rem;
          line-height: 1.68;
          color: var(--muted);
          font-weight: 300;
        }
        .aside-desc strong { color: var(--text); font-weight: 500; }
        .aside-stats {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .aside-stat {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.82rem;
        }
        .aside-stat-key { color: var(--muted); }
        .aside-stat-val { color: var(--text); font-weight: 500; }

        /* DELIVERABLES */
        .section { padding: 88px 0; border-bottom: 1px solid var(--border); }
        .section-head { margin-bottom: 56px; }
        .section-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }
        .section-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text);
          max-width: 560px;
        }
        .section-sub {
          margin-top: 14px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 560px;
          font-weight: 300;
        }

        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          background: var(--border);
        }
        @media (max-width: 820px) {
          .deliverables-grid { grid-template-columns: 1fr; }
        }

        .del-card {
          background: var(--surface);
          padding: 36px 32px 32px;
          transition: background 0.2s;
          cursor: default;
        }
        .del-card:hover { background: var(--surface2); }

        .del-num {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .del-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          line-height: 1.22;
          color: var(--text);
          margin-bottom: 14px;
        }
        .del-body {
          font-size: 0.84rem;
          line-height: 1.72;
          color: var(--muted);
          font-weight: 300;
        }
        .del-items {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .del-item {
          font-size: 0.78rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .del-item::before {
          content: '';
          display: block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* FIT SECTION */
        .fit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          background: var(--border);
        }
        @media (max-width: 720px) { .fit-grid { grid-template-columns: 1fr; } }

        .fit-col {
          background: var(--surface);
          padding: 36px 32px;
        }
        .fit-col-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .fit-col-label.yes { color: var(--accent); }
        .fit-col-label.no { color: var(--muted); }

        .fit-col-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 22px;
        }
        .fit-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .fit-item {
          font-size: 0.84rem;
          line-height: 1.62;
          color: var(--muted);
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-weight: 300;
        }
        .fit-icon { flex-shrink: 0; margin-top: 3px; font-size: 0.7rem; }
        .fit-icon.yes { color: var(--accent); }
        .fit-icon.no { color: #554e46; }

        /* PACKAGES */
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 820px) { .packages-grid { grid-template-columns: 1fr; } }

        .pkg-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          background: var(--surface);
          position: relative;
          transition: border-color 0.2s, background 0.2s;
          cursor: default;
        }
        .pkg-card.featured {
          border-color: rgba(201,168,76,0.3);
          background: linear-gradient(160deg, rgba(201,168,76,0.06) 0%, var(--surface) 60%);
        }
        .pkg-card:hover { border-color: rgba(201,168,76,0.25); }

        .pkg-badge {
          position: absolute;
          top: -11px;
          left: 20px;
          background: var(--accent);
          color: #1a1200;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .pkg-tag {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .pkg-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: var(--text);
          margin-bottom: 14px;
          line-height: 1.2;
        }
        .pkg-desc {
          font-size: 0.83rem;
          line-height: 1.7;
          color: var(--muted);
          font-weight: 300;
        }
        .pkg-foot {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .pkg-price {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text);
        }
        .pkg-timeline {
          font-size: 0.75rem;
          color: var(--muted);
        }

        /* CTA */
        .cta-section {
          padding: 80px 0 100px;
        }
        .cta-box {
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 52px 56px;
          background: var(--surface);
          position: relative;
          overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (max-width: 680px) {
          .cta-box { padding: 36px 28px; }
        }

        .cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        @media (max-width: 760px) {
          .cta-inner { flex-direction: column; align-items: flex-start; }
        }

        .cta-h {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          line-height: 1.18;
          color: var(--text);
          max-width: 480px;
          letter-spacing: -0.015em;
        }
        .cta-sub {
          margin-top: 12px;
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--muted);
          font-weight: 300;
          max-width: 440px;
        }
        .cta-actions { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          color: var(--muted);
          font-size: 0.8rem;
          font-weight: 400;
          padding: 9px 18px;
          border-radius: 100px;
          cursor: pointer;
          border: 1px solid var(--border);
          text-align: center;
          justify-content: center;
          transition: border-color 0.2s, color 0.2s;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: var(--text); }
      `}</style>

      <div className="page">
        {/* NAV */}
        <nav className="nav">
          <div className="wrap">
            <div className="nav-inner">
              <span className="nav-logo">Aurillia</span>
              <span className="nav-pill">
                <span className="nav-dot" />
                Services · Web
              </span>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-num">01</span>
              <span className="hero-eyebrow-text">Web development</span>
            </div>

            <div className="hero-grid">
              <div>
                <h1 className="hero-h1">
                  Your product deserves a site that's <em>built like one.</em>
                </h1>
                <p className="hero-body">
                  Aurillia builds fast, calm websites on Next.js for founders and small teams
                  who are tired of sites that look fine but fall apart the moment someone
                  actually tries to edit them.
                </p>

                <div className="hero-tags">
                  {["Next.js + TypeScript", "Performance & Core Web Vitals", "SEO, analytics & forms"].map((t) => (
                    <span key={t} className="tag">
                      <span className="tag-dot" />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="hero-cta">
                  <a href="/contact" className="btn-primary">
                    Talk about your project ↗
                  </a>
                  <span className="hero-aside-note">
                    Or drop a short brief in the chat. <br />
                    Either works.
                  </span>
                </div>
              </div>

              <aside>
                <div className="aside-card">
                  <p className="aside-label">Typical engagement</p>
                  <p className="aside-desc">
                    A <strong>founder or small team</strong> with a real product — and a site that
                    either isn't there yet, or makes them wince when they share the link.
                  </p>
                  <div className="aside-stats">
                    <div className="aside-stat">
                      <span className="aside-stat-key">Timeline</span>
                      <span className="aside-stat-val">2–6 weeks</span>
                    </div>
                    <div className="aside-stat">
                      <span className="aside-stat-key">Deliverable</span>
                      <span className="aside-stat-val">Production site + repo</span>
                    </div>
                    <div className="aside-stat">
                      <span className="aside-stat-key">Handover</span>
                      <span className="aside-stat-val">Full — you own it</span>
                    </div>
                    <div className="aside-stat">
                      <span className="aside-stat-key">Team size</span>
                      <span className="aside-stat-val">Small & focused</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="section">
          <div className="wrap">
            <FadeIn>
              <div className="section-head">
                <p className="section-label">What you get</p>
                <h2 className="section-h2">Three things that make it feel like a product, not a template</h2>
                <p className="section-sub">
                  Most sites are built with the wrong frame of reference. We build yours
                  like we'd build a product: with a technical base you can grow on,
                  a content layer you can actually use, and integrations that talk to
                  the rest of your business.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="deliverables-grid">
                {deliverables.map((d) => (
                  <div key={d.num} className="del-card">
                    <p className="del-num">{d.num} · {d.label}</p>
                    <h3 className="del-title">{d.title}</h3>
                    <p className="del-body">{d.body}</p>
                    <div className="del-items">
                      {d.items.map((item) => (
                        <span key={item} className="del-item">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FIT */}
        <section className="section">
          <div className="wrap">
            <FadeIn>
              <div className="section-head">
                <p className="section-label">Good fit?</p>
                <h2 className="section-h2">Honest about who this is for</h2>
                <p className="section-sub">
                  Aurillia is intentionally small. That means tighter collaboration and
                  better output — but it's not right for every situation.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="fit-grid">
                <div className="fit-col">
                  <p className="fit-col-label yes">A good match if you're…</p>
                  <ul className="fit-list">
                    {[
                      "A founder or small team whose site doesn't reflect the quality of the product.",
                      "On a slow or fragile site where publishing a new page feels risky.",
                      "Thinking ahead — docs, a small app view, or AI flows might come later.",
                      "Ready to invest once in a solid base instead of redesigning every 18 months.",
                    ].map((text) => (
                      <li key={text} className="fit-item">
                        <span className="fit-icon yes">✦</span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="fit-col" style={{ borderTop: "none" }}>
                  <p className="fit-col-label no">Probably not if you…</p>
                  <ul className="fit-list">
                    {[
                      "Just need a template with your logo swapped in. That's fine — but it's not what this is.",
                      "Need to migrate a huge legacy CMS 1:1 with all the edge cases intact.",
                      "Need a full in-house team available every day. We're small on purpose.",
                    ].map((text) => (
                      <li key={text} className="fit-item">
                        <span className="fit-icon no">—</span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="section">
          <div className="wrap">
            <FadeIn>
              <div className="section-head">
                <p className="section-label">Starting points</p>
                <h2 className="section-h2">Three shapes a project usually takes</h2>
                <p className="section-sub">
                  Exact scope and pricing gets figured out in the first conversation.
                  These are reference points — you'll get a fixed quote before we start.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="packages-grid">
                {packages.map((pkg) => (
                  <div key={pkg.id} className={`pkg-card ${pkg.featured ? "featured" : ""}`}>
                    {pkg.featured && <span className="pkg-badge">Most common</span>}
                    <p className="pkg-tag">{pkg.tag}</p>
                    <h3 className="pkg-name">{pkg.name}</h3>
                    <p className="pkg-desc">{pkg.desc}</p>
                    <div className="pkg-foot">
                      <span className="pkg-price">{pkg.price}</span>
                      <span className="pkg-timeline">{pkg.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="wrap">
            <FadeIn>
              <div className="cta-box">
                <div className="cta-inner">
                  <div>
                    <h2 className="cta-h">
                      Have a project in mind? Let's make it concrete.
                    </h2>
                    <p className="cta-sub">
                      Share a link to what you have, or a few sentences about what
                      you're building. Aurillia will come back with a plain-English
                      plan, a rough timeline, and a fixed price range.
                    </p>
                  </div>
                  <div className="cta-actions">
                    <a href="/contact" className="btn-primary">
                      Start the conversation ↗
                    </a>
                    <a href="/contact" className="btn-ghost">
                      Send a short brief instead
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}
