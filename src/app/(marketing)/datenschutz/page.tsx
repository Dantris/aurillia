import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import StructuredData from "@/components/seo/structured-data";
import { metadataForPage, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("de", "datenschutz");

export default function DatenschutzPage() {
  return (
    <>
      <StructuredData data={webPageJsonLd("de", "datenschutz")} />
      <LegalPage locale="de" kind="datenschutz" />
    </>
  );
}
