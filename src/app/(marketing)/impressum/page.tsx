import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import StructuredData from "@/components/seo/structured-data";
import { metadataForPage, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("de", "impressum");

export default function ImpressumPage() {
  return (
    <>
      <StructuredData data={webPageJsonLd("de", "impressum")} />
      <LegalPage locale="de" kind="impressum" />
    </>
  );
}
