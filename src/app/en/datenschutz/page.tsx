import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import StructuredData from "@/components/seo/structured-data";
import { metadataForPage, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("en", "datenschutz");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData data={webPageJsonLd("en", "datenschutz")} />
      <LegalPage locale="en" kind="datenschutz" />
    </>
  );
}
