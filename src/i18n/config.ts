export const LOCALES = ["en", "de"] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = "de";
export const LOCALE_COOKIE = "aurillia_locale";

export function isLocale(v: unknown): v is Locale {
    return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}
