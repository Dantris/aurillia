import type { Metadata } from "next";
import ServicePage from "@/components/services/service-page";
import StructuredData from "@/components/seo/structured-data";
import { servicePages } from "@/lib/service-content";
import { metadataForPage, servicePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("en", "web");

export default function WebDevelopmentPage() {
  return (
    <>
      <StructuredData data={servicePageJsonLd("en", "web", servicePages.en.web)} />
      <ServicePage locale="en" {...servicePages.en.web} />
    </>
  );
}
