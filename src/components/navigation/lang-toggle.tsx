// src/components/navigation/lang-toggle.tsx
"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/components/providers/i18n-provider";
import type { Locale } from "@/i18n/config";

export default function LangToggle() {
    const router = useRouter();
    const { locale } = useI18n();

    function setLocale(next: Locale) {
        // 1 year cookie, path=/
        document.cookie = `aur.lang=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
        router.refresh(); // re-fetch server data (new dict) and re-render
    }

    const btn = (code: Locale, label: string) => (
        <button
            onClick={() => setLocale(code)}
            className={
                "inline-flex h-8 items-center rounded-full px-3 text-sm border " +
                (locale === code
                    ? "border-[var(--accent)] bg-[color-mix(in_oklch,var(--accent)_18%,transparent)]"
                    : "border-default hover:bg-elev")
            }
            type="button"
            aria-pressed={locale === code}
        >
            {label}
        </button>
    );

    return (
        <div className="flex items-center gap-2">
            {btn("de", "DE")}
            {btn("en", "EN")}
        </div>
    );
}
