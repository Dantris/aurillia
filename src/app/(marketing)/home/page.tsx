import GlitchHero from "@/components/hero/glitch-hero";
import type { Metadata } from "next";
import StructuredData from "@/components/seo/structured-data";
import { homePageJsonLd, metadataForPage } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("de", "home");

export default function Page() {
  return (
    <>
      <StructuredData data={homePageJsonLd("de")} />
      <GlitchHero locale="de" />
    </>
  );
}
