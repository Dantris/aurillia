// src/app/(marketing)/layout.tsx
import type { ReactNode } from "react";
import SiteNavbar from "@/components/navigation/site-navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <SiteNavbar />
            {children}
            {/* Add your <Footer /> later */}
        </>
    );
}
