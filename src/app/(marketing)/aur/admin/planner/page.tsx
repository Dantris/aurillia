import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

export default async function PlannerAdminListPage() {
    const { data, error } = await supabaseServer
        .from("aur_planner_submissions")
        .select("id, created_at, contact_email, widget_totals, status")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading planner submissions:", error);
        return (
            <main className="px-6 py-10">
                <h1 className="mb-4 text-2xl font-semibold text-white">
                    Planner submissions
                </h1>
                <p className="text-sm text-red-400">
                    Could not load submissions. Check the console / server logs.
                </p>
            </main>
        );
    }

    const submissions = data ?? [];

    return (
        <main className="px-6 pb-16 pt-10">
            <h1 className="mb-2 text-2xl font-semibold text-white">
                Aurillia planner submissions
            </h1>
            <p className="mb-6 text-sm text-neutral-400">
                Internal view of drafts created with the apartment planner.
            </p>

            {submissions.length === 0 ? (
                <p className="text-sm text-neutral-500">
                    No submissions yet. Create one from <code>/aur/overview</code>.
                </p>
            ) : (
                <div className="space-y-2">
                    {submissions.map((s: any) => (
                        <div
                            key={s.id}
                            className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 md:flex-row md:items-center md:justify-between"
                        >
                            <div>
                                <p className="font-medium">{s.contact_email}</p>
                                <p className="text-xs text-neutral-500">
                                    {new Date(s.created_at).toLocaleString()} · status:{" "}
                                    <span className="font-semibold text-neutral-200">
                                        {s.status}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-300">
                                {s.widget_totals &&
                                    Object.entries(
                                        s.widget_totals as Record<string, number>
                                    ).map(([k, v]) => (
                                        <span
                                            key={k}
                                            className="rounded-full bg-neutral-800 px-2 py-0.5"
                                        >
                                            {k}: {v}
                                        </span>
                                    ))}
                                {/* quick link to raw JSON via Supabase row id */}
                                <Link
                                    href={`https://app.supabase.com/project/ooxrndbgjcphgdefqvpz/editor/18678?schema=public&table=aur_planner_submissions&filter=id.eq.${s.id}`}
                                    target="_blank"
                                    className="rounded-full border border-neutral-600 px-2 py-0.5 text-[11px] text-neutral-300 hover:border-emerald-500 hover:text-emerald-400"
                                >
                                    Open in Supabase ↗
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
