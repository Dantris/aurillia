import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SiteNavbar from "@/components/navigation/site-navbar";
import AurilliaChatWidget from "@/components/AurilliaChatWidget";
import StructuredData from "@/components/seo/structured-data";
import { indexableRobots, seoConfig, siteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: seoConfig.metadataBase,
  applicationName: seoConfig.name,
  title: {
    default: "Aurillia - Webentwicklung für klare Unternehmenswebsites",
    template: "%s",
  },
  description:
    "Aurillia entwickelt moderne Websites, Leistungsseiten und Websysteme für Unternehmen, die verständlicher auftreten und bessere Anfragen bekommen wollen.",
  authors: [{ name: seoConfig.name, url: seoConfig.siteUrl }],
  creator: seoConfig.name,
  publisher: seoConfig.name,
  robots: indexableRobots,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const themeInitScript = `
(() => {
  const language = window.location.pathname.startsWith("/en") ? "en" : "de";
  document.documentElement.lang = language;

  try {
    const stored = window.localStorage.getItem("aurillia-theme-v2");
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} antialiased text-[var(--site-text)]`}>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="site-backdrop" aria-hidden="true" />
        <div className="site-shell">
          <StructuredData data={siteJsonLd()} />
          <SiteNavbar />
          <main>
            {children}
            <AurilliaChatWidget />
          </main>
        </div>
      </body>
    </html>
  );
}
