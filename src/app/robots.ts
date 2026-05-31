import type { MetadataRoute } from "next";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const host = new URL(seoConfig.siteUrl).host;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/aur/admin/", "/*?sent=", "/*?error=", "/*?interest="],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host,
  };
}
