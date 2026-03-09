import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "@/components/providers/theme-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { getDictionary } from "@/i18n/get-dictionary";
import SiteNavbar from "@/components/navigation/site-navbar";
import AurilliaChatWidget from "@/components/AurilliaChatWidget";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurillia.de"),
  title: "Aurillia",
  description: "Hardware & web solutions",
};

// src/app/layout.tsx
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, dict } = await getDictionary();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
className={`${poppins.variable} ${poppins.className} antialiased bg-[var(--bg)] text-[var(--text)]`}      >
        <I18nProvider locale={locale} dict={dict}>
          <AppThemeProvider>
            <SiteNavbar />
            {/* Reserve space for the fixed navbar (64/80px + safe area) */}
            <main
            >
              {children}
              <AurilliaChatWidget />
            </main>
          </AppThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
