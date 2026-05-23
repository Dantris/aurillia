import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates, seoPages, sitemapPages } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const locales: Locale[] = ["de", "en"];

  return sitemapPages.flatMap((page) =>
    locales.map((locale) => ({
      url: absoluteUrl(seoPages[locale][page.id].path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(page.id)).map(([language, path]) => [
            language,
            absoluteUrl(path),
          ]),
        ),
      },
    })),
  );
}
