import GlitchHero from "@/components/hero/glitch-hero";
import SiteFooter from "@/components/navigation/site-footer";
import StructuredData from "@/components/seo/structured-data";
import { homePageJsonLd, metadataForPage } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = metadataForPage("de", "home");

export default function Page() {
  return (
    <>
      <StructuredData data={homePageJsonLd("de")} />
      <GlitchHero locale="de" />
      <SiteFooter locale="de" />
    </>
  );
}
