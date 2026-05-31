// src/components/providers/i18n-provider.tsx
"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/i18n/config";

type Dict = Record<string, any>;
type I18nCtx = {
    locale: Locale;
    dict: Dict;
    t: (path: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nCtx>({
    locale: "de",
    dict: {},
    t: (k, fb) => fb ?? k,
});

export function I18nProvider({
    locale,
    dict,
    children,
}: {
    locale: Locale;
    dict: Dict;
    children: React.ReactNode;
}) {
    const t = useMemo(() => {
        const lookup = (path: string, fallback?: string) => {
            const parts = path.split(".");
            let cur: any = dict;
            for (const p of parts) cur = cur?.[p];
            return typeof cur === "string" ? cur : (fallback ?? path);
        };
        return lookup;
    }, [dict]);

    const value = useMemo(() => ({ locale, dict, t }), [locale, dict, t]);
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    return useContext(I18nContext);
}
export function useT() {
    return useContext(I18nContext).t;
}
export function useLocale() {
    return useContext(I18nContext).locale;
}
