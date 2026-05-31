// src/i18n/get-dictionary.ts
import "server-only";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
    const cookieStore = await getCookies(); // 👈 await
    const raw = cookieStore.get(LOCALE_COOKIE)?.value;
    if (isLocale(raw)) return raw;

    const hdrs = await getHeaders();        // 👈 await
    const accept = hdrs.get("accept-language") ?? "";
    const first = accept.split(",")[0]?.trim().slice(0, 2);
    if (isLocale(first)) return first as Locale;

    return DEFAULT_LOCALE;
}

export async function getDictionary() {
    const locale = await getLocale();
    const dict = (await import(`./dictionaries/${locale}.json`)).default as Record<string, any>;
    return { locale, dict };
}
