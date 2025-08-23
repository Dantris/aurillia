import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "@/components/providers/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurillia",
  description: "Hardware & web solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${poppins.className} antialiased bg-surface text-foreground`}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
