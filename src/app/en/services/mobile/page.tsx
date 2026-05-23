import type { Metadata } from "next";
import ServicePage from "@/components/services/service-page";
import StructuredData from "@/components/seo/structured-data";
import { servicePages } from "@/lib/service-content";
import { metadataForPage, servicePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("en", "mobile");

export default function MobileAppsPage() {
  return (
    <>
      <StructuredData data={servicePageJsonLd("en", "mobile", servicePages.en.mobile)} />
      <ServicePage locale="en" {...servicePages.en.mobile} />
    </>
  );
}
