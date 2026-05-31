import type { Metadata } from "next";
import ServicePage from "@/components/services/service-page";
import StructuredData from "@/components/seo/structured-data";
import { servicePages } from "@/lib/service-content";
import { metadataForPage, servicePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("de", "web");

export default function WebDevelopmentPage() {
  return (
    <>
      <StructuredData data={servicePageJsonLd("de", "web", servicePages.de.web)} />
      <ServicePage locale="de" {...servicePages.de.web} />
    </>
  );
}
