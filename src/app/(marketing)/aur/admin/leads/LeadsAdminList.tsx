"use client";

import { useState } from "react";
import type {
    LeadRow,
    ServiceCategory,
    PlannerDraftRow,
} from "./page";

interface CategoryOption {
    value: ServiceCategory;
    label: string;
}

interface Props {
    leads: LeadRow[];
    plannerDrafts: PlannerDraftRow[];
    categories: readonly CategoryOption[];
}

export function LeadsAdminList({ leads, plannerDrafts, categories }: Props) {
    const [localLeads, setLocalLeads] = useState<LeadRow[]>(leads);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [filter, setFilter] = useState<ServiceCategory | "all">("all");

    const updateCategory = async (id: string, category: ServiceCategory) => {
        try {
            setSavingId(id);

            const res = await fetch(`/api/admin/leads/${id}/category`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category }),
            });

            if (!res.ok) {
                console.error("Failed to update category");
                return;
            }

            setLocalLeads((prev) =>
                prev.map((lead) =>
                    lead.id === id ? { ...lead, service_category: category } : lead
                )
            );
        } finally {
            setSavingId(null);
        }
    };

    if (localLeads.length === 0 && plannerDrafts.length === 0) {
        return (
            <p className="text-sm text-neutral-500">
                No leads yet. Once the bot or planner collects some, they&apos;ll
                appear here.
            </p>
        );
    }

    const filteredLeads =
        filter === "all"
            ? localLeads
            : localLeads.filter((lead) =>
                filter === null
                    ? lead.service_category === null
                    : lead.service_category === filter
            );

    const showPlannerDrafts = filter === "all" || filter === "hardware";

    return (
        <div className="space-y-4">
            {/* Category filter bar */}
            <div className="flex flex-wrap gap-2 text-xs">
                <button
                    type="button"
                    onClick={() => setFilter("all")}
                    className={[
                        "rounded-full border px-3 py-1",
                        filter === "all"
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                            : "border-neutral-700 bg-neutral-900 text-neutral-300",
                    ].join(" ")}
                >
                    All
                </button>
                {categories.map((c) => (
                    <button
                        key={c.label}
                        type="button"
                        onClick={() => setFilter(c.value)}
                        className={[
                            "rounded-full border px-3 py-1",
                            filter === c.value
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                                : "border-neutral-700 bg-neutral-900 text-neutral-300",
                        ].join(" ")}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Bot leads */}
            {filteredLeads.map((lead) => {
                const currentCategory =
                    categories.find((c) => c.value === lead.service_category) ||
                    categories[0]; // fall back to "Uncategorised"

                const hasCategory = lead.service_category !== null;

                return (
                    <div
                        key={lead.id}
                        className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100"
                    >
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="font-medium">
                                    {lead.name || "Unknown"}{" "}
                                    <span className="text-neutral-400">
                                        &lt;{lead.email || "no-email"}&gt;
                                    </span>
                                </p>
                                <p className="text-xs text-neutral-500">
                                    {new Date(lead.created_at).toLocaleString()}
                                </p>
                            </div>

                            {/* pill like the Planner · Hardware one */}
                            <span
                                className={[
                                    "rounded-full px-3 py-1 text-xs",
                                    hasCategory
                                        ? "bg-emerald-500/10 text-emerald-300"
                                        : "bg-neutral-800 text-neutral-300",
                                ].join(" ")}
                            >
                                Lead · {currentCategory.label}
                            </span>
                        </div>

                        {lead.project_summary && (
                            <p className="mb-3 whitespace-pre-line text-xs text-neutral-300">
                                {lead.project_summary}
                            </p>
                        )}

                        {/* category chooser – subtle row of pills */}
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-neutral-500">Set category:</span>
                            {categories.map((c) => {
                                const isActive = lead.service_category === c.value;
                                const value = c.value ?? null;

                                return (
                                    <button
                                        key={c.label}
                                        type="button"
                                        disabled={savingId === lead.id}
                                        onClick={() => updateCategory(lead.id, value)}
                                        className={[
                                            "rounded-full px-3 py-1 border",
                                            isActive
                                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                                                : "border-neutral-700 bg-neutral-900 text-neutral-200",
                                            savingId === lead.id ? "opacity-60" : "",
                                        ].join(" ")}
                                    >
                                        {c.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* Planner drafts – unchanged, still your favourite style */}
            {showPlannerDrafts && plannerDrafts.length > 0 && (
                <div className="mt-4 border-t border-neutral-800 pt-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Hardware planner drafts
                    </p>

                    <div className="space-y-3">
                        {plannerDrafts.map((draft) => (
                            <div
                                key={draft.id}
                                className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100"
                            >
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="font-medium">
                                            {draft.contact_name || "Unknown"}{" "}
                                            <span className="text-neutral-400">
                                                &lt;{draft.contact_email || "no-email"}&gt;
                                            </span>
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {new Date(draft.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                                        Planner · Hardware
                                    </span>
                                </div>

                                {draft.notes && (
                                    <p className="whitespace-pre-line text-xs text-neutral-300">
                                        {draft.notes}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
