import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/contact-page";
import StructuredData from "@/components/seo/structured-data";
import { contactPageJsonLd, metadataForPage } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("de", "contact");

const PUBLIC_CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@aurillia.de";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sp = (await searchParams) ?? {};
  const raw = sp.sent;
  const sent = Array.isArray(raw) ? raw[0] === "1" : raw === "1";
  const rawError = sp.error;
  const error = Array.isArray(rawError) ? rawError[0] : rawError ?? null;
  const rawInterest = sp.interest;
  const selectedInterest = Array.isArray(rawInterest) ? rawInterest[0] : rawInterest ?? null;

  return (
    <>
      <StructuredData data={contactPageJsonLd("de")} />
      <ContactPageContent
        locale="de"
        sent={sent}
        error={error}
        contactEmail={PUBLIC_CONTACT_EMAIL}
        selectedInterest={selectedInterest}
        turnstileSiteKey={TURNSTILE_SITE_KEY}
      />
    </>
  );
}
