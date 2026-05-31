"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const from = searchParams.get("from") || "/aur/admin/planner";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (!res.ok) {
                setError("Wrong password.");
                setLoading(false);
                return;
            }

            // success: cookie set, redirect to original page
            router.push(from);
        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
            <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-6 shadow-xl shadow-black/50">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                    Aurillia · Admin
                </p>
                <h1 className="mt-2 text-xl font-semibold text-white">
                    Admin login
                </h1>
                <p className="mt-1 text-xs text-neutral-400">
                    Protected area for planner drafts and clients.
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div>
                        <label className="mb-1 block text-xs text-neutral-400">
                            Admin password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-400">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Checking…" : "Enter admin area"}
                    </button>
                </form>
            </div>
        </main>
    );
}
