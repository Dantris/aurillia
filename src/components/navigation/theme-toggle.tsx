"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";
    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-full border border-default bg-elev px-3 py-1.5 text-sm text-foreground hover:opacity-90"
            aria-label="Toggle theme"
        >
            {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
    );
}
