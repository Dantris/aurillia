import { ApartmentPlanner } from "@/components/ApartmentPlanner";

export default function OverviewPage() {
    return (
        <main className="px-6 pb-20 pt-16 md:px-10 lg:px-20">
            {/* Intro / hero */}
            <section className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400">
                    01 · Overview
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    How Aurillia fits together
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400 md:text-base">
                    Aurillia is a local-first hardware and software stack for homes and
                    small sites.{" "}
                    <span className="font-semibold text-neutral-100">Core</span> runs the
                    brains and automations,{" "}
                    <span className="font-semibold text-neutral-100">Node</span> and{" "}
                    <span className="font-semibold text-neutral-100">Sense</span> observe
                    and act in the environment,{" "}
                    <span className="font-semibold text-neutral-100">Link</span> connects
                    to your tools and protocols, and{" "}
                    <span className="font-semibold text-neutral-100">Watch</span> is the
                    control &amp; monitoring surface for people on-site or remote.
                </p>
            </section>

            {/* Interactive planner */}
            <ApartmentPlanner />

            {/* Closing blurb */}
            <section className="mt-16 max-w-2xl text-sm text-neutral-400">
                <p>
                    The planner above is a rough sketch tool, not a CAD editor. It lets
                    you think in rooms and roles first – hub, nodes, cameras, sensors –
                    while we take care of wiring, power, and radio details when we design
                    your actual kit.
                </p>
            </section>
        </main>
    );
}
