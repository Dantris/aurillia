export const defaultLocale = "de" as const;
export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export function localeFromPathname(pathname?: string | null): Locale {
  return pathname?.startsWith("/en") ? "en" : defaultLocale;
}

export function stripLocale(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizedPath(pathname: string, locale: Locale) {
  const strippedPath = stripLocale(pathname).replace(/\/+$/, "") || "/";
  const cleanPath = strippedPath === "/home" ? "/" : strippedPath;

  if (locale === "en") {
    return cleanPath === "/" ? "/en" : `/en${cleanPath}`;
  }

  return cleanPath;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  return localizedPath(pathname, locale);
}
