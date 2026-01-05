// src/components/navigation/site-navbar.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";

type Item = { title: string; href: string; description?: string };

const SERVICES: Item[] = [
    {
        title: "Web Development",
        href: "/services/web",
        description:
            "Calm, fast marketing sites and product pages with a stack you own.",
    },
    {
        title: "Mobile Apps",
        href: "/services/mobile",
        description:
            "React Native / Expo or PWA—one codebase for iOS, Android, and web.",
    },
    {
        title: "Full-Stack Systems",
        href: "/services/fullstack",
        description: "Dashboards, portals, and tools that run your operations.",
    },
    {
        title: "Hardware & IoT",
        href: "/services/hardware",
        description: "Nodes, hubs, and control apps for spaces and devices.",
    },
    {
        title: "Cloud & AWS",
        href: "/services/cloud",
        description: "Hosting, monitoring, and migrations without surprises.",
    },
    {
        title: "AI & Automation",
        href: "/services/ai",
        description: "Assistants and workflows that actually save you time.",
    },
];

const AURILLIA: Item[] = [
    { title: "Aurillia Core", href: "/aur/core", description: "Backend brain of the system" },
    { title: "Aurillia Node", href: "/aur/node", description: "Wireless sensor & camera modules" },
    { title: "Aurillia Sense", href: "/aur/sense", description: "Motion, battery & environment monitoring" },
    { title: "Aurillia Link", href: "/aur/link", description: "Lightweight secure protocol" },
    { title: "Aurillia Watch", href: "/aur/watch", description: "App for control & monitoring" },
];

type OpenMenu = null | "services" | "aurillia";

export default function SiteNavbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState<OpenMenu>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSub, setMobileSub] = useState<OpenMenu>(null);
    const navRef = useRef<HTMLElement>(null);

    // Close on Escape / outside click
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(null);
                setMobileSub(null);
                setMobileOpen(false);
            }
        };
        const onClick = (e: MouseEvent) => {
            if (!navRef.current?.contains(e.target as Node)) {
                setOpen(null);
                setMobileSub(null);
            }
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("mousedown", onClick);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("mousedown", onClick);
        };
    }, []);

    // Close menus when the route changes
    useEffect(() => {
        setOpen(null);
        setMobileSub(null);
        setMobileOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile slide-down is open
    useEffect(() => {
        const el = document.documentElement;
        if (mobileOpen) {
            const prev = el.style.overflow;
            el.style.overflow = "hidden";
            return () => {
                el.style.overflow = prev;
            };
        }
    }, [mobileOpen]);

    const inServices = pathname?.startsWith("/services") ?? false;
    const inAur = pathname?.startsWith("/aur") ?? false;

    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-[#f7f7f8]/95 text-slate-900 backdrop-blur shadow-sm supports-[backdrop-filter]:bg-[#f7f7f8]/90"
            onMouseLeave={() => setOpen(null)}
        >
            {/* top bar */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
                {/* Brand */}
                <Link
                    href="/"
                    className="relative flex items-center gap-2 font-semibold tracking-tight text-slate-900"
                >
                    <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                    <span className="relative text-xl leading-none">AURILLIA</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden items-center gap-7 md:flex">
                    <ThemeToggle />
                    <LanguageToggle />

                    <MenuTrigger
                        id="services-trigger"
                        controlsId="services-panel"
                        label="Services"
                        open={open === "services"}
                        active={inServices}
                        onOpen={() => setOpen("services")}
                        onToggle={() =>
                            setOpen((s) => (s === "services" ? null : "services"))
                        }
                    />

                    <span className="h-4 w-px bg-slate-200" aria-hidden />

                    <MenuTrigger
                        id="aurillia-trigger"
                        controlsId="aurillia-panel"
                        label="Aurillia"
                        open={open === "aurillia"}
                        active={inAur}
                        onOpen={() => setOpen("aurillia")}
                        onToggle={() =>
                            setOpen((s) => (s === "aurillia" ? null : "aurillia"))
                        }
                    />

                    {/* Contact pill stays as-is */}
                    <Link
                        href="/contact"
                        className={`pill-accent text-sm ${pathname === "/contact"
                            ? "ring-2 ring-orange-400/60"
                            : ""
                            }`}
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile: theme / language + burger */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <LanguageToggle compact />
                    <button
                        className="relative z-50 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        onClick={() => {
                            setMobileOpen((s) => !s);
                            setMobileSub(null);
                        }}
                        type="button"
                    >
                        <span className="sr-only">Open menu</span>
                        <Burger open={mobileOpen} />
                    </button>
                </div>
            </div>

            {/* Desktop mega menus */}
            <MegaMenu
                open={open === "services"}
                onClose={() => setOpen(null)}
                heading="Services"
                items={SERVICES}
                panelId="services-panel"
                labelledById="services-trigger"
            />
            <MegaMenu
                open={open === "aurillia"}
                onClose={() => setOpen(null)}
                heading="Aurillia"
                items={AURILLIA}
                rightSlot={<AurilliaOverviewCard onClose={() => setOpen(null)} />}
                panelId="aurillia-panel"
                labelledById="aurillia-trigger"
            />

            {/* ---------- Mobile DROPDOWNS (tap labels) ---------- */}
            <div className="md:hidden">
                <MobileTopRow
                    onOpen={(which) => {
                        setMobileSub((cur) => (cur === which ? null : which));
                        setMobileOpen(false);
                    }}
                    active={mobileSub}
                />
                <MobileDropdown
                    open={mobileSub === "services"}
                    heading="Services"
                    items={SERVICES}
                    onClose={() => setMobileSub(null)}
                />
                <MobileDropdown
                    open={mobileSub === "aurillia"}
                    heading="Aurillia"
                    items={AURILLIA}
                    onClose={() => setMobileSub(null)}
                    rightSlot={
                        <AurilliaOverviewCard onClose={() => setMobileSub(null)} />
                    }
                />
            </div>

            {/* ---------- Mobile slide-down panel (hamburger) ---------- */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 transition-opacity md:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                aria-hidden="true"
                onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <div
                className={`fixed inset-x-0 top-16 bottom-0 z-50 border-t border-slate-200 bg-white transition-transform duration-300 md:hidden ${mobileOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="mx-auto flex h-full max-w-7xl flex-col overflow-y-auto overscroll-contain px-4 py-6">
                    <ul className="space-y-2">
                        <MobileGroup
                            title="Services"
                            items={SERVICES}
                            close={() => setMobileOpen(false)}
                        />
                        <MobileGroup
                            title="Aurillia"
                            items={AURILLIA}
                            close={() => setMobileOpen(false)}
                        />
                    </ul>

                    <div className="mt-6">
                        <Link
                            href="/contact"
                            onClick={() => setMobileOpen(false)}
                            className="inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-4 py-3 text-base font-medium text-white shadow hover:bg-orange-500"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

/* ---------- sub-components ---------- */

function MenuTrigger({
    label,
    open,
    onOpen,
    onToggle,
    id,
    controlsId,
    active,
}: {
    label: string;
    open: boolean;
    onOpen: () => void;
    onToggle: () => void;
    id: string;
    controlsId: string;
    active?: boolean;
}) {
    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
            const first = document
                .getElementById(controlsId)
                ?.querySelector<HTMLAnchorElement>('a[role="menuitem"]');
            first?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            onOpen();
            const items = Array.from(
                document
                    .getElementById(controlsId)
                    ?.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]') ??
                []
            );
            items[items.length - 1]?.focus();
        }
    };

    return (
        <button
            id={id}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={controlsId}
            className={`group inline-flex items-center gap-1 text-[0.94rem] font-medium ${open || active
                ? "text-slate-900"
                : "text-slate-600 hover:text-slate-900"
                }`}
            onMouseEnter={onOpen}
            onFocus={onOpen}
            onClick={onToggle}
            onKeyDown={onKeyDown}
            type="button"
        >
            {label}
            <svg
                className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                    }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
            </svg>
        </button>
    );
}

function MegaMenu({
    open,
    onClose,
    heading,
    items,
    rightSlot,
    panelId,
    labelledById,
}: {
    open: boolean;
    onClose: () => void;
    heading: string;
    items: Item[];
    rightSlot?: ReactNode;
    panelId: string;
    labelledById: string;
}) {
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (open) {
            const first = listRef.current?.querySelector<HTMLAnchorElement>(
                'a[role="menuitem"]'
            );
            first?.focus();
        }
    }, [open]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
            return;
        }
        const itemsEls = Array.from(
            listRef.current?.querySelectorAll<HTMLAnchorElement>(
                'a[role="menuitem"]'
            ) ?? []
        );
        if (!itemsEls.length) return;

        const i = itemsEls.indexOf(document.activeElement as HTMLAnchorElement);
        const focusAt = (idx: number) => itemsEls[idx]?.focus();

        if (e.key === "ArrowDown") {
            e.preventDefault();
            focusAt((i + 1 + itemsEls.length) % itemsEls.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            focusAt((i - 1 + itemsEls.length) % itemsEls.length);
        } else if (e.key === "Home") {
            e.preventDefault();
            focusAt(0);
        } else if (e.key === "End") {
            e.preventDefault();
            focusAt(itemsEls.length - 1);
        } else if (e.key === "Tab") {
            onClose();
        }
    };

    return (
        <div role="none" className="relative hidden md:block">
            <div
                id={panelId}
                role="menu"
                aria-labelledby={labelledById}
                aria-hidden={!open}
                onKeyDown={onKeyDown}
                className={`absolute left-0 right-0 origin-top border-t border-slate-200 bg-white/97 shadow-md shadow-slate-200/70 transition-all duration-200 ${open
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
            >
                <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-8">
                    {/* left: links */}
                    <div className="col-span-8">
                        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                            {heading}
                        </p>
                        <ul
                            ref={listRef}
                            role="none"
                            className="grid grid-cols-2 gap-2 lg:grid-cols-3"
                        >
                            {items.map((it) => (
                                <li key={it.href} role="none">
                                    <Link
                                        href={it.href}
                                        onClick={onClose}
                                        role="menuitem"
                                        tabIndex={open ? 0 : -1}
                                        className="group block rounded-lg px-3 py-2 hover:bg-slate-50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-900 group-hover:text-slate-950">
                                                {it.title}
                                            </span>
                                            <span
                                                aria-hidden
                                                className="text-slate-400 group-hover:text-slate-600"
                                            >
                                                ›
                                            </span>
                                        </div>
                                        {it.description && (
                                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                                {it.description}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* right: CTA / helper */}
                    <div className="col-span-4">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            {rightSlot ?? (
                                <>
                                    <p className="text-sm font-medium text-slate-900">
                                        Can’t find what you need?
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Send a short note and we&apos;ll work out the best
                                        approach.
                                    </p>
                                    <Link
                                        href="/contact"
                                        onClick={onClose}
                                        className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                                    >
                                        hello@aurillia.de
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AurilliaOverviewCard({ onClose }: { onClose: () => void }) {
    return (
        <>
            <p className="text-sm font-semibold text-slate-900">
                See how it fits together
            </p>
            <p className="mt-1 text-[0.9rem] leading-relaxed text-slate-650">
                Core, Node, Sense, Link, and Watch as one local-first stack.
            </p>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-700">
                    <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-[0.78rem] font-medium text-emerald-700">
                        Core
                    </span>
                    <span>↔</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.78rem]">
                        Node
                    </span>
                    <span>•</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.78rem]">
                        Sense
                    </span>
                    <span>•</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.78rem]">
                        Link
                    </span>
                    <span>•</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.78rem]">
                        Watch
                    </span>
                </div>
            </div>
            <Link
                href="/aur/overview"
                onClick={onClose}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
                Open overview
            </Link>
        </>
    );
}

function MobileGroup({
    title,
    items,
    close,
}: {
    title: string;
    items: Item[];
    close: () => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <li className="rounded-lg">
            <button
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-lg text-slate-900 hover:bg-slate-50"
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                type="button"
            >
                {title}
                <svg
                    className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""
                        }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
            </button>
            <ul
                className={`grid overflow-hidden pl-2 transition-[grid-template-rows] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <li className="min-h-0">
                    <div className="space-y-1 pb-2 pt-1">
                        {items.map((it) => (
                            <Link
                                key={it.href}
                                href={it.href}
                                onClick={close}
                                className="block rounded-md px-2 py-2 text-base text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            >
                                {it.title}
                            </Link>
                        ))}
                    </div>
                </li>
            </ul>
        </li>
    );
}

function Burger({ open }: { open: boolean }) {
    return (
        <span aria-hidden="true" className="relative block h-3.5 w-4">
            <span
                className={`absolute inset-x-0 top-0 h-0.5 origin-center bg-slate-800 transition-transform ${open ? "translate-y-1.5 rotate-45" : ""
                    }`}
            />
            <span
                className={`absolute inset-x-0 top-1.5 h-0.5 bg-slate-800 transition-opacity ${open ? "opacity-0" : ""
                    }`}
            />
            <span
                className={`absolute inset-x-0 top-3 h-0.5 origin-center bg-slate-800 transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
            />
        </span>
    );
}

/** ---------- Language toggle (DE/EN) ---------- */
function LanguageToggle({ compact = false }: { compact?: boolean }) {
    const [lang, setLang] = useState<Locale>("de");

    useEffect(() => {
        const current = (document.documentElement.lang as Locale) || "de";
        setLang(current);
    }, []);

    const setLocale = (next: Locale) => {
        const oneYear = 60 * 60 * 24 * 365;
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${oneYear}; samesite=lax`;
        window.location.reload();
    };

    const Btn = ({ code, label }: { code: Locale; label: string }) => (
        <button
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={lang === code}
            className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-[0.72rem] font-medium ${lang === code
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
        >
            {label}
        </button>
    );

    return (
        <div
            className={`inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white/80 p-0.5 ${compact ? "" : "ml-1"
                }`}
            role="group"
            aria-label="Select language"
        >
            <Btn code="de" label="DE" />
            <Btn code="en" label="EN" />
        </div>
    );
}

/** ---------- Mobile helpers ---------- */
function MobileTopRow({
    onOpen,
    active,
}: {
    onOpen: (which: OpenMenu) => void;
    active: OpenMenu;
}) {
    return (
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 pb-2 pt-1 md:hidden">
            <button
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm ${active === "services"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                onClick={() => onOpen("services")}
                type="button"
            >
                Services
                <ChevronDown small up={active === "services"} />
            </button>
            <button
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm ${active === "aurillia"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                onClick={() => onOpen("aurillia")}
                type="button"
            >
                Aurillia
                <ChevronDown small up={active === "aurillia"} />
            </button>
        </div>
    );
}

function MobileDropdown({
    open,
    heading,
    items,
    onClose,
    rightSlot,
}: {
    open: boolean;
    heading: string;
    items: Item[];
    onClose: () => void;
    rightSlot?: ReactNode;
}) {
    if (!open) return null;
    return (
        <div className="fixed left-4 right-4 top-16 z-[60] md:hidden">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                    <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                            {heading}
                        </p>
                        <ul className="max-h-[60vh] space-y-1 overflow-y-auto overscroll-contain pr-1">
                            {items.map((it) => (
                                <li key={it.href}>
                                    <Link
                                        href={it.href}
                                        className="group block rounded-lg px-3 py-2 hover:bg-slate-50"
                                        onClick={onClose}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-900 group-hover:text-slate-950">
                                                {it.title}
                                            </span>
                                            <span
                                                aria-hidden
                                                className="text-slate-400 group-hover:text-slate-600"
                                            >
                                                ›
                                            </span>
                                        </div>
                                        {it.description && (
                                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                                {it.description}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {rightSlot && (
                        <div className="hidden sm:block">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                {rightSlot}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-end border-t border-slate-200 px-4 py-2">
                    <button
                        type="button"
                        className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function ChevronDown({ up = false, small = false }: { up?: boolean; small?: boolean }) {
    return (
        <svg
            className={`transition-transform ${up ? "rotate-180" : ""} ${small ? "h-4 w-4" : "h-5 w-5"
                }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
        </svg>
    );
}
