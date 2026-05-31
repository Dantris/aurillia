import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import StructuredData from "@/components/seo/structured-data";
import { metadataForPage, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("en", "impressum");

export default function ImprintPage() {
  return (
    <>
      <StructuredData data={webPageJsonLd("en", "impressum")} />
      <LegalPage locale="en" kind="impressum" />
    </>
  );
}
