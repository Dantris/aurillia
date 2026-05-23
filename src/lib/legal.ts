export const legalConfig = {
  brandName: "Aurillia",
  ownerName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Adrian Dever",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@aurillia.de",
  addressLines: (process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "Ziegelhof 6|96049 Bamberg|Deutschland")
    .split("|")
    .map((line) => line.trim())
    .filter(Boolean),
  updatedAtDe: "21. Mai 2026",
  updatedAtEn: "May 21, 2026",
};

export const hasLegalAddress = legalConfig.addressLines.length > 0;

export function legalAddressLines() {
  return hasLegalAddress ? legalConfig.addressLines : ["Anschrift vor Veröffentlichung ergänzen"];
}
