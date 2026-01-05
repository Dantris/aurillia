import { supabaseServer } from "@/lib/supabaseServer";
import { LeadsAdminList } from "./LeadsAdminList";

const CATEGORIES = [
    { value: null, label: "Uncategorised" },
    { value: "web", label: "Web" },
    { value: "content", label: "Content" },
    { value: "mobile", label: "Mobile" },
    { value: "ai", label: "AI" },
    { value: "cloud", label: "Cloud" },
    { value: "hardware", label: "Hardware" },
] as const;

export type ServiceCategory = (typeof CATEGORIES)[number]["value"];

export interface LeadRow {
    id: string;
    created_at: string;
    name: string | null;
    email: string | null;
    project_summary: string | null;
    service_category: ServiceCategory;
}

export interface PlannerDraftRow {
    id: string;
    created_at: string;
    contact_name: string | null;
    contact_email: string | null;
    notes: string | null;
}

export default async function LeadsAdminPage() {
    const { data, error } = await supabaseServer
        .from("leads")
        .select("id, created_at, name, email, project_summary, service_category")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading leads:", error);
        return (
            <main className="px-6 py-10">
                <h1 className="mb-4 text-2xl font-semibold text-white">
                    Leads (bot requests)
                </h1>
                <p className="text-sm text-red-400">
                    Could not load leads. Check server logs.
                </p>
            </main>
        );
    }

    const leads = (data ?? []) as LeadRow[];

    // load planner drafts (always hardware-type in your head)
    const { data: plannerData, error: plannerError } = await supabaseServer
        .from("aur_planner_submissions")
        .select("id, created_at, contact_name, contact_email, notes")
        .order("created_at", { ascending: false });

    if (plannerError) {
        console.error("Error loading planner drafts:", plannerError);
    }

    const plannerDrafts = (plannerData ?? []) as PlannerDraftRow[];

    return (
        <main className="px-6 pb-16 pt-10">
            <h1 className="mb-2 text-2xl font-semibold text-white">
                Leads (bot requests)
            </h1>
            <p className="mb-6 text-sm text-neutral-400">
                Drafts and inquiries sent via the bot, plus hardware planner drafts.
                Tag them by service type to keep your pipeline organised.
            </p>

            <LeadsAdminList
                leads={leads}
                plannerDrafts={plannerDrafts}
                categories={CATEGORIES}
            />
        </main>
    );
}
