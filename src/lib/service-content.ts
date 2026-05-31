import type { ServicePageProps } from "@/components/services/service-page";
import type { Locale } from "@/lib/i18n";

export type ServiceSlug = "web" | "mobile";

export const servicePages: Record<Locale, Record<ServiceSlug, Omit<ServicePageProps, "locale">>> = {
  de: {
    web: {
      eyebrow: "Leistungen / Webentwicklung",
      title: "Eine Website, die euer Angebot schneller verständlich macht.",
      intro:
        "Wenn eure Website alt wirkt, unklar bleibt oder wichtige Fragen offenlässt, kostet das Anfragen, Bewerbungen und Vertrauen. Wir bringen Angebot, Inhalte, Design und Technik so zusammen, dass Besucher schneller verstehen, warum ihr die richtige Wahl seid.",
      primaryCta: "Website verbessern",
      secondaryCta: "Was wir übernehmen",
      contactInterest: "Web Development",
      highlights: [
        {
          label: "Worum es geht",
          value: "Klarheit",
          detail:
            "Eure Website soll nicht nur gut aussehen. Sie soll erklären, Vertrauen schaffen und den nächsten Schritt leicht machen.",
        },
        {
          label: "Umsetzung",
          value: "Next.js",
          detail:
            "Schnell, sauber strukturiert und so gebaut, dass Inhalte, SEO und spätere Erweiterungen nicht jedes Mal neu aufgesetzt werden müssen.",
        },
        {
          label: "Danach",
          value: "Betreuung",
          detail:
            "Auf Wunsch bleiben wir dabei: mit kleinen Änderungen, technischer Pflege, Analytics und gezielten Verbesserungen nach dem Start.",
        },
      ],
      concerns: {
        eyebrow: "Kommt euch das bekannt vor?",
        title: "Oft ist die Website nicht kaputt. Sie hilft nur nicht mehr richtig mit.",
        intro:
          "Ein Relaunch wird schnell groß, teuer und schwer greifbar. Deshalb starten wir dort, wo eure aktuelle Seite heute schon Zeit, Vertrauen oder gute Anfragen kostet.",
        items: [
          {
            title: "Die Seite sieht okay aus, aber erklärt zu wenig.",
            body:
              "Besucher verstehen nicht schnell genug, für wen ihr da seid, warum euer Angebot passt und was als Nächstes sinnvoll ist.",
          },
          {
            title: "Anfragen kommen ohne Kontext.",
            body:
              "Das Kontaktformular ist vorhanden, aber die Website bereitet Gespräche kaum vor. Ihr erklärt immer wieder dieselben Grundlagen.",
          },
          {
            title: "Niemand weiß genau, ob die Website wirkt.",
            body:
              "SEO, Analytics und Inhalte wurden irgendwann mitgedacht, aber nicht so, dass daraus verlässliche Entscheidungen entstehen.",
          },
          {
            title: "Der Relaunch wird immer wieder verschoben.",
            body:
              "Weil unklar ist, wer die Texte schreibt, wie viel Zeit gebraucht wird und womit ihr überhaupt anfangen sollt.",
          },
        ],
      },
      capabilities: [
        {
          eyebrow: "Klarheit",
          title: "Erst verstehen, dann gestalten",
          body:
            "Viele Websites scheitern nicht am Design, sondern an unklaren Angeboten, Zielgruppen und nächsten Schritten. Wir sortieren, was Besucher sofort verstehen müssen und welche Fragen die Website vor dem ersten Gespräch beantworten sollte.",
          items: [
            "Angebot, Zielgruppen und wichtigste Einwände",
            "Seitenstruktur für Startseite, Leistungen und Kontakt",
            "Natürliche Texte, die führen statt nur zu behaupten",
            "Kontaktwege, die hilfreichen Projektkontext sammeln",
          ],
        },
        {
          eyebrow: "Auftritt",
          title: "Modern, aber nicht künstlich",
          body:
            "Der Auftritt soll zu eurem Unternehmen passen: ruhig, hochwertig und klar lesbar, ohne dekorative Sektionen, die niemandem helfen. Daraus entsteht ein System für Seiten, Typografie, Bilder, Formulare und responsive Zustände.",
          items: [
            "Startseite, Leistungsseiten und Kontaktstrecke",
            "Responsive Layouts für Smartphone, Tablet und Desktop",
            "Wiederverwendbare Komponenten für spätere Seiten",
            "Saubere Zustände für Formulare, Buttons und Navigation",
          ],
        },
        {
          eyebrow: "Technik",
          title: "Schnell, auffindbar und pflegbar",
          body:
            "Unter der Oberfläche zählen Ladezeit, saubere Struktur, SEO-Grundlagen und eine Basis, die nach dem Start nicht stehen bleibt. Die Website soll erweiterbar bleiben, egal ob später Inhalte, Analytics, Assistenten oder neue Funktionen dazukommen.",
          items: [
            "Next.js- und TypeScript-Umsetzung",
            "Metadaten, sitemapfähige Struktur und Performance-Basics",
            "Kontaktformular, Analytics und sinnvolle Integrationen",
            "Repository-Struktur, Deployment und Übergabe zum Start",
          ],
        },
      ],
      workflow: [
        {
          title: "Sortieren",
          body:
            "Wir schauen uns an, was eure Website leisten soll, wo sie bremst und welche Zielgruppen zuerst überzeugt werden müssen.",
        },
        {
          title: "Schreiben und strukturieren",
          body:
            "Aus Angebot, Zielgruppenfragen und echten Einwänden entsteht eine Seitenstruktur mit Texten, die nicht nach Platzhaltern klingen.",
        },
        {
          title: "Gestalten und bauen",
          body:
            "Die Website wird zu einem responsiven Next.js-Projekt mit echter Inhaltsstruktur, Kontaktstrecke, SEO-Basics, Analytics und sauberem Deployment.",
        },
        {
          title: "Live gehen und nachschärfen",
          body:
            "Nach dem Livegang prüfen wir die Nutzung, glätten Kanten und übergeben sauber oder bleiben für Pflege und Verbesserungen an Bord.",
        },
      ],
      fitTitle: "Gut, wenn eure Website gerade mehr bremst als hilft.",
      fitBody:
        "Das passt, wenn ihr merkt: Das Angebot ist gut, aber online kommt es nicht klar genug an. Dann geht es nicht nur um einen neuen Look, sondern um Struktur, Vertrauen und einen besseren Weg zur Anfrage.",
      fitItems: [
        "Eure aktuelle Seite wirkt nicht mehr wie das Unternehmen, das heute dahintersteht.",
        "Besucher fragen Dinge, die die Website eigentlich schon beantworten sollte.",
        "Ihr braucht Leistungsseiten, einen klaren Kontaktweg und eine technische Basis, die direkt live gehen kann.",
        "Die Website soll später mit Inhalten, KI-Assistenten, Dashboard-Oberflächen oder mobilen Erweiterungen wachsen können.",
      ],
      outcomes: [
        {
          title: "Besucher verstehen schneller, worum es geht",
          body:
            "Angebot, Unterschiede und nächster Schritt werden schneller sichtbar, ohne dass jemand lange suchen muss.",
        },
        {
          title: "Anfragen kommen mit mehr Kontext",
          body:
            "Kontaktwege und Inhalte arbeiten zusammen, damit Gespräche besser vorbereitet beginnen.",
        },
        {
          title: "Ihr fangt bei Änderungen nicht wieder von vorn an",
          body:
            "Wiederverwendbare Komponenten, klare Sektionen und ein sauberer Codebestand machen spätere Anpassungen einfacher.",
        },
      ],
      trust: {
        eyebrow: "Wie wir arbeiten",
        title: "Persönlich genug zum Mitdenken. Strukturiert genug zum Fertigwerden.",
        intro:
          "Ihr müsst nicht mit fertigem Konzept, perfektem Text und komplettem Designsystem starten. Wir helfen, das Projekt in eine Form zu bringen, die entscheidbar und umsetzbar ist.",
        items: [
          {
            value: "01",
            label: "Erst ein klarer Blick",
            body:
              "Wir schauen auf Angebot, Zielgruppen, aktuelle Seite und Prioritäten, bevor Layouts entstehen.",
          },
          {
            value: "02",
            label: "Texte gehören in den Aufbau",
            body:
              "Inhalte sind kein Nachtrag. Struktur, Ton und der nächste Schritt werden früh zusammengebracht.",
          },
          {
            value: "03",
            label: "Der Start bleibt nicht allein",
            body:
              "Nach dem Start gibt es Übergabe, Pflege oder kleine Verbesserungen, je nachdem, was ihr intern übernehmen wollt.",
          },
        ],
      },
      faq: [
        {
          question: "Könnt ihr mit bestehendem Branding arbeiten?",
          answer:
            "Ja. Wenn die Marke eine gute Richtung hat, nutzen wir sie. Wenn sie online noch dünn oder uneinheitlich wirkt, bauen wir ein saubereres webfähiges System darum.",
        },
        {
          question: "Schreibt ihr auch die Texte?",
          answer:
            "Ja. Wir schärfen Seitenstruktur, Abschnittstexte und Angebotslogik. Wenn sehr viel Markenarbeit nötig ist, machen wir daraus eine eigene erste Phase.",
        },
        {
          question: "Kann die Website einen KI-Chatbot enthalten?",
          answer:
            "Ja. Die aktuelle Aurillia-Seite nutzt bereits einen Projektassistenten, der für Kundenseiten angepasst werden kann.",
        },
        {
          question: "Was passiert nach dem Start?",
          answer:
            "Ihr könnt selbst übernehmen oder eine Betreuung für Updates, technische Wartung, kleine Inhaltsänderungen und messbare Verbesserungen behalten.",
        },
      ],
      closingTitle:
        "Aus einer Website, die nur da ist, wird ein Auftritt, der mitarbeitet.",
      closingBody:
        "Schickt uns eure aktuelle Website, ein grobes Angebot oder ein paar Notizen zu dem, was sich ändern soll. Unsere erste Antwort sortiert, was wirklich geklärt werden muss, was zuerst gebaut werden sollte und wo die Website einfacher werden kann.",
    },
    mobile: {
      eyebrow: "Leistungen / Mobile Apps",
      title: "Apps für Abläufe, die unterwegs funktionieren müssen.",
      intro:
        "Aurillia übernimmt ausgewählte App-Projekte, wenn es einen klaren Produktgrund gibt: Außendienst, wiederkehrende Kundenaktionen, interne Abläufe oder eine Begleitfunktion, die nicht nur im Browser stattfinden sollte.",
      primaryCta: "App-Projekt planen",
      secondaryCta: "Passung ansehen",
      contactInterest: "Mobile Apps",
      highlights: [
        {
          label: "Passt, wenn",
          value: "Fokussiert",
          detail:
            "Eine App lohnt sich, wenn eine Aufgabe häufig, kontextabhängig oder zeitkritisch genug ist, um einen eigenen mobilen Ablauf zu rechtfertigen.",
        },
        {
          label: "Umsetzung",
          value: "Flexibel",
          detail:
            "React Native, Expo oder PWA, je nach Verteilung, Budget und realer Nutzungsumgebung.",
        },
        {
          label: "Reihenfolge",
          value: "Erst Web",
          detail:
            "Die meisten Projekte sollten mit einer starken Webbasis starten und erst dann mobil werden, wenn der Anwendungsfall bewiesen ist.",
        },
      ],
      concerns: {
        eyebrow: "Bevor es eine App wird",
        title: "Eine App lohnt sich erst, wenn der Alltag wirklich leichter wird.",
        intro:
          "Viele App-Ideen starten mit einer langen Featureliste. Wir drehen das um und fragen zuerst, welche Situation heute zu langsam, zu fehleranfällig oder zu umständlich ist.",
        items: [
          {
            title: "Der Browser ist unterwegs zu träge.",
            body:
              "Außendienst, Checklisten, Scans oder Statusmeldungen brauchen oft schnellere Wege als eine normale Website bieten kann.",
          },
          {
            title: "Informationen landen in Chats und Tabellen.",
            body:
              "Wenn Daten später zusammengesucht werden müssen, fehlt ein sauberer Ablauf für Teams, Kunden oder Partner.",
          },
          {
            title: "Die App-Idee ist groß, aber noch unscharf.",
            body:
              "Dann hilft kein riesiges Pflichtenheft, sondern ein kleiner erster Ablauf, der wirklich benutzt werden kann.",
          },
          {
            title: "Die App soll mit Website und Backend zusammenspielen.",
            body:
              "Eine App ist selten allein. Sie braucht Daten, Rechte, Updates und eine klare Verbindung zum restlichen System.",
          },
        ],
      },
      capabilities: [
        {
          eyebrow: "Produkt-Fit",
          title: "Eine kleinere erste Version",
          body:
            "App-Projekte werden teuer, wenn sie alles gleichzeitig können sollen. Wir reduzieren die erste Version auf die wichtigsten Abläufe und gestalten um echte Nutzungssituationen herum.",
          items: [
            "Begleit-Apps für Kunden",
            "Interne Tools für Teams und Außendienst",
            "Buchung, Reporting, Scans, Bewertungen und Statusflüsse",
            "Klare MVP-Grenze vor der Umsetzung",
          ],
        },
        {
          eyebrow: "Nutzung",
          title: "Schnelle Wege und ruhige Zustände",
          body:
            "Eine gute App fühlt sich selbstverständlich an. Wir gestalten Screens, leere Zustände, Ladezustände, Offline-Bedarf und Navigation so, dass sie auch unter Druck nützlich bleibt.",
          items: [
            "Fokussierte Abläufe und Screen-Übersichten",
            "Touchfreundliche Interface-Muster",
            "Offline-, Fehler- und Berechtigungszustände",
            "Push, Deep Links, Login und Account-Abläufe, wenn nötig",
          ],
        },
        {
          eyebrow: "Start",
          title: "Bereit über die Demo hinaus",
          body:
            "Die Umsetzung enthält auch die unspektakulären Teile, die aus einer Demo ein echtes Produkt machen: Release-Kanäle, Store-Vorbereitung, Crash-Reporting und Integration mit dem Webprodukt.",
          items: [
            "React Native-, Expo- oder PWA-Umsetzung",
            "API-Integration und typisierte Datenflüsse",
            "Vorbereitung für App Store und Play Store",
            "Monitoring, Updates und Übergabe",
          ],
        },
      ],
      workflow: [
        {
          title: "Grund für die App prüfen",
          body:
            "Wir klären, wer die App öffnet, wann sie genutzt wird, was erledigt werden muss und warum dieselbe Aufgabe auf der Website umständlich ist.",
        },
        {
          title: "Ersten nützlichen Ablauf gestalten",
          body:
            "Wir skizzieren den kleinsten vollständigen Ablauf, inklusive Account-Setup, Hauptaktionen, Benachrichtigungen, Randfällen und Supportwegen.",
        },
        {
          title: "App-Oberfläche bauen",
          body:
            "Die App wird mit einem passenden Stack umgesetzt, mit dem Backend verbunden und auf relevante Gerätegrößen und Zustände geprüft.",
        },
        {
          title: "Veröffentlichung und Weiterentwicklung vorbereiten",
          body:
            "Wir bereiten die App für die Verteilung vor, schaffen Sichtbarkeit und hinterlassen einen realistischen Plan für Updates nach der ersten Version.",
        },
      ],
      fitTitle: "Gut für App-Ideen, die eine klare Aufgabe haben.",
      fitBody:
        "Das passt nicht zu spekulativen App-Ideen ohne Produktkontext. Es passt zu Teams, die Ablauf, Zielgruppe und geschäftlichen Grund benennen können.",
      fitItems: [
        "Eure Nutzer wiederholen eine Aufgabe so oft, dass der Browser umständlich wirkt.",
        "Euer Team braucht ein zuverlässiges internes Tool für Außendienst, Checklisten, Reporting oder Kundenabläufe.",
        "Euer Webprodukt ist bereits nützlich und eine App würde Reibung in einem wichtigen Ablauf entfernen.",
        "Ihr möchtet eine fokussierte erste Version statt einer riesigen Roadmap, die nur MVP heißt.",
      ],
      outcomes: [
        {
          title: "Eine nützliche erste Version",
          body:
            "Die App startet mit den Abläufen, die zählen, und hat Platz zu wachsen, sobald echte Nutzung beginnt.",
        },
        {
          title: "Weniger Plattformaufwand",
          body:
            "Ein sinnvoller Stack hält iOS, Android und Web nah beieinander, ohne unnötige native Komplexität zu erzwingen.",
        },
        {
          title: "Ein verbundenes Produktsystem",
          body:
            "App, Web, Backend und Assistentenflüsse können wie ein System wirken, statt nachträglich zusammengesteckt zu sein.",
        },
      ],
      trust: {
        eyebrow: "Worauf wir achten",
        title: "Keine App aus Prinzip. Nur ein Ablauf, der mobil wirklich besser wird.",
        intro:
          "Wir prüfen früh, ob native App, PWA oder ein besserer Ablauf im Web die richtige Antwort ist. Das spart Budget und hält die erste Version realistisch.",
        items: [
          {
            value: "MVP",
            label: "Kleiner Start",
            body:
              "Die erste Version bleibt auf den Ablauf fokussiert, der den größten Unterschied macht.",
          },
          {
            value: "UX",
            label: "Echte Nutzung",
            body:
              "Offline-Zustände, Fehler, Berechtigungen und Touch-Wege werden früh mitgedacht.",
          },
          {
            value: "Ops",
            label: "Bereit für Betrieb",
            body:
              "Release-Kanäle, Monitoring, Updates und Übergabe gehören zum Produkt, nicht nur zur Technik.",
          },
        ],
      },
      faq: [
        {
          question: "Brauchen wir immer eine native App?",
          answer:
            "Nein. Wenn eine PWA das Problem mit weniger Wartung löst, ist das oft besser. Nativ lohnt sich, wenn Verteilung, Gerätefunktionen, Push oder Offline-Verhalten es rechtfertigen.",
        },
        {
          question: "Könnt ihr ein bestehendes Backend anbinden?",
          answer:
            "Ja. Bestehende APIs können genutzt werden, wenn sie stabil genug sind. Falls nicht, braucht das Projekt vielleicht zuerst eine kleine Backend-Aufräumphase.",
        },
        {
          question: "Kann eine App vor der Website kommen?",
          answer:
            "Manchmal, aber meist klärt die Webbasis zuerst Angebot, Datenmodell und Produktsprache. Eine App funktioniert am besten als Erweiterung eines klaren Kerns.",
        },
        {
          question: "Übernehmt ihr die Store-Einreichung?",
          answer:
            "Wir können App-Builds, Assets, Metadaten, Release-Kanäle und die Vorbereitung für die Einreichung übernehmen. Die Store-Accounts sollten bei euch bleiben.",
        },
      ],
      closingTitle: "Eine App nur bauen, wenn sie das Produkt einfacher macht.",
      closingBody:
        "Sagt uns, was eure Nutzer abseits des Desktops erledigen müssen. Wir helfen zu entscheiden, ob native App, PWA oder zuerst ein besserer Ablauf im Web die richtige Antwort ist.",
    },
  },
  en: {
    web: {
      eyebrow: "Services / Web Development",
      title: "A website that does not make customers hunt.",
      intro:
        "When your website feels dated or leaves the important questions open, it costs you inquiries, applicants, and trust. We bring offer, content, design, and engineering together so visitors understand faster why you are the right choice.",
      primaryCta: "Improve the website",
      secondaryCta: "What we handle",
      contactInterest: "Web Development",
      highlights: [
        {
          label: "The Point",
          value: "Clarity",
          detail:
            "The site should do more than look good. It should explain, build confidence, and make the next step easy.",
        },
        {
          label: "Build",
          value: "Next.js",
          detail:
            "Fast, structured, and maintainable, with content, SEO, and future additions treated as part of the system.",
        },
        {
          label: "Afterwards",
          value: "Care",
          detail:
            "Optional support for small changes, technical maintenance, analytics, and steady improvements after launch.",
        },
      ],
      concerns: {
        eyebrow: "Does this feel familiar?",
        title: "Often the website is not broken. It just stopped helping.",
        intro:
          "A relaunch can feel expensive, vague, and hard to start. We begin with the places where the current site is already costing time, trust, or better inquiries.",
        items: [
          {
            title: "The site looks fine, but explains too little.",
            body:
              "Visitors do not understand quickly enough who you help, why the offer fits, and what they should do next.",
          },
          {
            title: "Inquiries arrive with no context.",
            body:
              "The form exists, but the website does not prepare the conversation. Your team keeps explaining the same basics.",
          },
          {
            title: "Nobody knows whether the website works.",
            body:
              "SEO, analytics, and content were considered at some point, but not in a way that supports useful decisions.",
          },
          {
            title: "The relaunch keeps getting postponed.",
            body:
              "Because it is unclear who writes the copy, how much time it takes, and where the project should actually start.",
          },
        ],
      },
      capabilities: [
        {
          eyebrow: "Clarity",
          title: "Understand first, design second",
          body:
            "Many websites do not fail because of design. They fail because the offer, audience, and next step are hard to grasp. We sort out what visitors need to understand immediately and which questions the site should answer before the first call.",
          items: [
            "Offer, audience, and the strongest objections",
            "Page structure for home, services, and contact",
            "Natural copy that guides instead of just claiming",
            "Contact paths that collect useful project context",
          ],
        },
        {
          eyebrow: "Presence",
          title: "Modern without feeling artificial",
          body:
            "The look should fit the company: calm, sharp, readable, and free of decorative sections that do not help anyone. From that, we build a system for pages, typography, media, forms, and responsive states.",
          items: [
            "Home page, service pages, and contact path",
            "Responsive layouts for phone, tablet, and desktop",
            "Reusable components for future pages",
            "Clean states for forms, buttons, and navigation",
          ],
        },
        {
          eyebrow: "Engineering",
          title: "Fast, findable, and easy to maintain",
          body:
            "Under the surface, the work is about speed, structure, SEO foundations, and a base that does not stall after launch. The site can keep growing into new content, analytics, assistant flows, or product features.",
          items: [
            "Next.js and TypeScript implementation",
            "Metadata, sitemap-ready structure, and performance basics",
            "Contact forms, analytics, and practical integrations",
            "Repository structure, deployment, and launch handover",
          ],
        },
      ],
      workflow: [
        {
          title: "Sort it out",
          body:
            "We look at what the website needs to do, where the current version slows people down, and which audiences need to be convinced first.",
        },
        {
          title: "Write and structure",
          body:
            "The offer, audience questions, and real objections become a page structure with copy that does not read like placeholder text.",
        },
        {
          title: "Design and build",
          body:
            "The site becomes a responsive Next.js build with real content structure, contact handling, SEO basics, analytics, and deployment setup.",
        },
        {
          title: "Launch and sharpen",
          body:
            "After go-live, we check the real experience, smooth out rough edges, and either hand it over cleanly or stay involved for care and improvements.",
        },
      ],
      fitTitle: "Good when the current website is slowing you down.",
      fitBody:
        "This fits when the offer is strong, but the website is not making it clear enough. Then the work is not just a new look. It is structure, trust, and a better path to the inquiry.",
      fitItems: [
        "The current site no longer feels like the company behind it.",
        "Visitors ask questions the website should already answer.",
        "You need service pages, a contact flow, and a technical base that can launch.",
        "The site should later grow into content, AI assistants, dashboard surfaces, or mobile extensions.",
      ],
      outcomes: [
        {
          title: "Visitors understand the offer faster",
          body:
            "The offer, differences, and next step become easier to find without making people dig.",
        },
        {
          title: "Inquiries arrive with more context",
          body:
            "Contact paths and page content work together so conversations start better prepared.",
        },
        {
          title: "Future changes do not start from zero",
          body:
            "Reusable components, clear sections, and a clean codebase make later updates easier.",
        },
      ],
      trust: {
        eyebrow: "How We Work",
        title: "Personal enough to think with you. Structured enough to finish.",
        intro:
          "You do not need to arrive with a perfect brief, finished copy, and a complete design system. We help shape the project into something clear enough to decide and build.",
        items: [
          {
            value: "01",
            label: "Start with a clear read",
            body:
              "We look at the offer, audience, current site, and priorities before layouts take over.",
          },
          {
            value: "02",
            label: "Copy belongs in the build",
            body:
              "Content is not an afterthought. Structure, tone, and CTA logic are brought together early.",
          },
          {
            value: "03",
            label: "Launch is not the end",
            body:
              "After launch, you get handover, care, or small improvements depending on what your team wants to own.",
          },
        ],
      },
      faq: [
        {
          question: "Can you work from an existing brand?",
          answer:
            "Yes. If the brand already has useful direction, we keep it. If it is thin or inconsistent, we create a cleaner web-facing system around it.",
        },
        {
          question: "Do you handle copy?",
          answer:
            "Yes. We shape page structure, section copy, and offer language. If the project needs deeper brand work, we make that a dedicated first phase.",
        },
        {
          question: "Can the site include an AI chatbot?",
          answer:
            "Yes. The current Aurillia site already has a project assistant pattern, and similar assistant flows can be adapted for client sites.",
        },
        {
          question: "What happens after launch?",
          answer:
            "You can take ownership, or keep a care plan for updates, technical maintenance, small content changes, and measured improvements.",
        },
      ],
      closingTitle: "Turn a website that merely exists into a presence that works with you.",
      closingBody:
        "Send the current site, a rough offer, or a few notes about what needs to change. The first reply will sort out what needs clarifying, what should be built first, and where the site can become simpler.",
    },
    mobile: {
      eyebrow: "Services / Mobile Apps",
      title: "Mobile apps for workflows that belong in your pocket.",
      intro:
        "Aurillia takes on selected mobile projects when there is a clear product reason: field work, repeat customer actions, internal operations, or a companion experience that should not live only in the browser.",
      primaryCta: "Plan a mobile project",
      secondaryCta: "Explore the fit",
      contactInterest: "Mobile Apps",
      highlights: [
        {
          label: "Best When",
          value: "Focused",
          detail:
            "Mobile works when the job is frequent, contextual, or time-sensitive enough to deserve an app.",
        },
        {
          label: "Delivery",
          value: "Cross-platform",
          detail:
            "React Native, Expo, or PWA depending on distribution, budget, and the user’s real environment.",
        },
        {
          label: "Sequence",
          value: "After web",
          detail:
            "Most projects should start with a strong web foundation, then extend into mobile once the use case is proven.",
        },
      ],
      concerns: {
        eyebrow: "Before It Becomes An App",
        title: "Mobile is worth it when the day-to-day work actually gets easier.",
        intro:
          "Many app ideas begin as a long feature list. We turn that around and first ask which situation is currently too slow, too error-prone, or too awkward.",
        items: [
          {
            title: "The browser is too clumsy in the field.",
            body:
              "Field teams, checklists, scans, or status updates often need faster paths than a normal website can provide.",
          },
          {
            title: "Information lives in chats and spreadsheets.",
            body:
              "When data has to be collected later, the team is missing a clean workflow for staff, customers, or partners.",
          },
          {
            title: "The app idea is big but still blurry.",
            body:
              "That does not need a giant specification. It needs one small loop that people can actually use.",
          },
          {
            title: "Mobile needs to connect to web and backend.",
            body:
              "An app rarely stands alone. It needs data, permissions, updates, and a clear link to the rest of the system.",
          },
        ],
      },
      capabilities: [
        {
          eyebrow: "Product Fit",
          title: "A smaller first version",
          body:
            "Mobile gets expensive when it tries to do everything. We reduce the app to the workflows that matter most, then design around real usage conditions.",
          items: [
            "Customer companion apps",
            "Internal staff and field tools",
            "Booking, reporting, scanning, review, and status flows",
            "Clear MVP boundary before build starts",
          ],
        },
        {
          eyebrow: "Experience",
          title: "Fast paths and calm states",
          body:
            "A good mobile app feels obvious. We design the screens, empty states, loading states, offline needs, and navigation so the app stays useful under pressure.",
          items: [
            "Focused UX flows and screen maps",
            "Touch-friendly responsive interface patterns",
            "Offline, error, and permission states",
            "Push, deep links, auth, and account flows where needed",
          ],
        },
        {
          eyebrow: "Launch",
          title: "Ready beyond the demo",
          body:
            "The build includes the unglamorous parts that make mobile real: release channels, store preparation, crash visibility, and integration with the web product.",
          items: [
            "React Native, Expo, or PWA implementation",
            "API integration and typed data flows",
            "App Store and Play Store preparation",
            "Monitoring, updates, and handover",
          ],
        },
      ],
      workflow: [
        {
          title: "Validate the reason for mobile",
          body:
            "We define who opens the app, when they open it, what they need to finish, and why the same job is awkward on the website.",
        },
        {
          title: "Design the first useful loop",
          body:
            "We map the smallest complete workflow, including account setup, main actions, notifications, edge states, and support paths.",
        },
        {
          title: "Build the app surface",
          body:
            "The app is implemented with a practical stack, integrated with the backend, and tested across the relevant device sizes and states.",
        },
        {
          title: "Prepare release and iteration",
          body:
            "We package the app for distribution, wire up visibility, and leave a realistic plan for updates after the first release.",
        },
      ],
      fitTitle: "Best for mobile work that has a job to do.",
      fitBody:
        "This is not for speculative app ideas with no product context. It is for teams that can name the workflow, audience, and business reason.",
      fitItems: [
        "Your users repeat a task often enough that a browser feels clumsy.",
        "Your team needs a reliable internal tool for field work, checklists, reporting, or customer operations.",
        "Your web product is already useful, and mobile would remove friction from an important workflow.",
        "You want a focused first release instead of a giant product roadmap disguised as an MVP.",
      ],
      outcomes: [
        {
          title: "A useful first release",
          body:
            "The app ships around the workflows that matter, with room to grow after real usage starts.",
        },
        {
          title: "Less platform overhead",
          body:
            "A sensible stack keeps iOS, Android, and web concerns aligned without forcing unnecessary native complexity.",
        },
        {
          title: "A connected product system",
          body:
            "Mobile, web, backend, and assistant flows can share a consistent service experience instead of feeling bolted together.",
        },
      ],
      trust: {
        eyebrow: "What We Watch",
        title: "No app for its own sake. Only a mobile workflow that earns its place.",
        intro:
          "We test early whether native app, PWA, or a better web flow is the right answer. That protects budget and keeps the first release realistic.",
        items: [
          {
            value: "MVP",
            label: "Small start",
            body:
              "The first release stays focused on the workflow that creates the most practical difference.",
          },
          {
            value: "UX",
            label: "Real usage",
            body:
              "Offline states, errors, permissions, and touch paths are considered before the end.",
          },
          {
            value: "Ops",
            label: "Ready to run",
            body:
              "Release channels, monitoring, updates, and handover belong to the product, not just the code.",
          },
        ],
      },
      faq: [
        {
          question: "Do we always need a native app?",
          answer:
            "No. If a PWA solves the problem with less maintenance, that is usually the better move. Native makes sense when distribution, device features, push, or offline behavior justify it.",
        },
        {
          question: "Can you connect to an existing backend?",
          answer:
            "Yes. Existing APIs can be used when they are stable enough. If they are not, the project may need a small backend cleanup pass first.",
        },
        {
          question: "Can mobile come before the website?",
          answer:
            "Sometimes, but usually the web foundation clarifies the offer, data model, and product language first. Mobile works best when it extends a clear core.",
        },
        {
          question: "Do you handle store submissions?",
          answer:
            "We can prepare builds, assets, metadata, release channels, and submission guidance. Final account ownership should stay with the client.",
        },
      ],
      closingTitle: "Build mobile only when it makes the product simpler.",
      closingBody:
        "Tell us what your users need to do away from the desktop. We will help decide whether the right answer is native app, PWA, or simply a better web flow first.",
    },
  },
};
