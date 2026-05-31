import type { Metadata } from "next";
import GlitchHero from "@/components/hero/glitch-hero";
import SiteFooter from "@/components/navigation/site-footer";
import StructuredData from "@/components/seo/structured-data";
import { homePageJsonLd, metadataForPage } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("en", "home");

export default function Page() {
  return (
    <>
      <StructuredData data={homePageJsonLd("en")} />
      <GlitchHero locale="en" />
      <SiteFooter locale="en" />
    </>
  );
}
