// src/components/marketing/landing-hero.tsx
export function LandingHero() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-ambient">
            <div className="bg-noise absolute inset-0" aria-hidden />
            <div className="pointer-events-none absolute -left-24 bottom-[-6rem] h-72 w-72 rounded-full bg-white/80 blur-3xl" />
            <div className="pointer-events-none absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-white/70 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />
            <section className="relative z-10 mx-auto max-w-7xl px-6 py-28">
                <div className="perspective-1200">
                    <div
                        className="glass peel soft-shadow mx-auto max-w-5xl rounded-[28px] p-12 md:p-16"
                        style={{ transform: "rotateX(2deg) rotateZ(-8deg) translateZ(0)", willChange: "transform" }}
                    >
                        <div className="space-y-6">
                            <h1 className="leading-[.95] text-5xl font-semibold tracking-tight text-neutral-900 md:text-7xl">
                                Building <span className="text-neutral-900/90">wellness</span> into the{" "}
                                <span className="text-neutral-900/90">City</span>
                            </h1>
                            <p className="max-w-xl text-neutral-600">
                                Rethinking urban land use to prioritise wellbeing, accessibility and community care.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="soft-shadow glass absolute right-6 top-20 hidden w-64 rotate-[6deg] rounded-2xl p-3 md:block">
                    <div className="h-36 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100" />
                </div>
            </section>
        </main>
    );
}
