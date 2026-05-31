"use client";

import { LOCALES, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { useLocale } from "@/components/providers/i18n-provider";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();

    function setLocale(next: Locale) {
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
        router.refresh();
    }

    return (
        <div className="inline-flex gap-1 rounded-full border border-default px-2 py-1 bg-elev">
            {LOCALES.map((l) => (
                <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-2 py-0.5 rounded-full text-sm ${l === locale ? "bg-surface" : "opacity-70 hover:opacity-100"}`}
                    aria-pressed={l === locale}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
