// src/components/navigation/site-navbar.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

type Item = { title: string; href: string; description?: string };

const SERVICES: Item[] = [
    { title: "Web Development", href: "/services/web", description: "Fast, modern sites that rank, convert, and are easy to update." },
    { title: "Mobile Apps", href: "/services/mobile", description: "iOS, Android, or PWA—built once, deployed everywhere." },
    { title: "Full-Stack Systems", href: "/services/fullstack", description: "Booking, inventory, dashboards—apps that run your business." },
    { title: "Hardware & IoT", href: "/services/hardware", description: "Custom sensors, enclosures, and on-site automation." },
    { title: "Cloud & AWS", href: "/services/cloud", description: "Migrations, hosting, and cost-efficient, secure setups." },
    { title: "AI & Automation", href: "/services/ai", description: "Chatbots, assistants, and workflows that save time." },
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
    const navRef = useRef<HTMLElement>(null);

    // Close on Escape / outside click
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setMobileOpen(false));
        const onClick = (e: MouseEvent) => {
            if (!navRef.current?.contains(e.target as Node)) setOpen(null);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("mousedown", onClick);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("mousedown", onClick);
        };
    }, []);

    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-50 w-full border-b border-neutral-800/70 bg-neutral-950/90 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/75"
            onMouseLeave={() => setOpen(null)}
        >
            {/* top bar */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
                {/* Brand */}
                <Link href="/" className="relative flex items-center gap-2 font-semibold tracking-tight text-white">
                    <span className="relative z-10 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                    <span className="relative z-10 text-lg">AURILLIA</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden items-center gap-8 md:flex">
                    <ThemeToggle />

                    <MenuTrigger
                        id="services-trigger"
                        controlsId="services-panel"
                        label="Services"
                        open={open === "services"}
                        onOpen={() => setOpen("services")}
                        onToggle={() => setOpen((s) => (s === "services" ? null : "services"))}
                    />

                    <span className="h-4 w-px bg-neutral-800/60" aria-hidden />

                    <MenuTrigger
                        id="aurillia-trigger"
                        controlsId="aurillia-panel"
                        label="Aurillia"
                        open={open === "aurillia"}
                        onOpen={() => setOpen("aurillia")}
                        onToggle={() => setOpen((s) => (s === "aurillia" ? null : "aurillia"))}
                    />

                    {/* Optional extra links (remove if not needed) */}
                    {/* <NavLink href="/cases" active={pathname === "/cases"}>Case Studies</NavLink>
          <NavLink href="/about" active={pathname === "/about"}>About</NavLink> */}

                    <Link href="/contact" className="pill-accent text-sm">
                        Contact
                    </Link>


                </div>

                {/* Mobile hamburger */}
                <button
                    className="relative z-50 inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 text-neutral-200 md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((s) => !s)}
                    type="button"
                >
                    <span className="sr-only">Open menu</span>
                    <Burger open={mobileOpen} />
                </button>
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

            {/* Mobile menu */}
            <div
                className={`md:hidden fixed inset-x-0 top-16 bottom-0 border-t border-neutral-800 bg-neutral-950 transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <ul className="space-y-2">
                        <MobileGroup title="Services" items={SERVICES} close={() => setMobileOpen(false)} />
                        <MobileGroup title="Aurillia" items={AURILLIA} close={() => setMobileOpen(false)} />
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

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors ${active ? "text-white" : "text-neutral-300 hover:text-white"
                }`}
        >
            {children}
        </Link>
    );
}

function MenuTrigger({
    label,
    open,
    onOpen,
    onToggle,
    id,
    controlsId,
}: {
    label: string;
    open: boolean;
    onOpen: () => void;
    onToggle: () => void;
    id: string;
    controlsId: string;
}) {
    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
            const first = document.getElementById(controlsId)?.querySelector<HTMLAnchorElement>('a[role="menuitem"]');
            first?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            onOpen();
            const items = Array.from(
                document.getElementById(controlsId)?.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]') ?? []
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
            className={`group inline-flex items-center gap-1 text-sm font-medium ${open ? "text-white" : "text-neutral-300 hover:text-white"
                }`}
            onMouseEnter={onOpen}
            onFocus={onOpen}
            onClick={onToggle}
            onKeyDown={onKeyDown}
            type="button"
        >
            {label}
            <svg className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
            const first = listRef.current?.querySelector<HTMLAnchorElement>('a[role="menuitem"]');
            first?.focus();
        }
    }, [open]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
            return;
        }
        const itemsEls = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]') ?? []);
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
                className={`absolute left-0 right-0 origin-top border-t border-neutral-800 bg-neutral-950/98 transition-all duration-200 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
            >
                <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-8">
                    {/* left: links */}
                    <div className="col-span-8">
                        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">{heading}</p>
                        <ul ref={listRef} role="none" className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                            {items.map((it) => (
                                <li key={it.href} role="none">
                                    <Link
                                        href={it.href}
                                        onClick={onClose}
                                        role="menuitem"
                                        tabIndex={open ? 0 : -1}
                                        className="group block rounded-lg px-3 py-2 hover:bg-neutral-900"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-neutral-100 group-hover:text-white">{it.title}</span>
                                            <span aria-hidden className="text-neutral-500 group-hover:text-neutral-300">›</span>
                                        </div>
                                        {it.description && <p className="mt-1 line-clamp-2 text-xs text-neutral-400">{it.description}</p>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* right: CTA / helper */}
                    <div className="col-span-4">
                        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
                            {rightSlot ?? (
                                <>
                                    <p className="text-sm font-medium text-white">Can’t find what you need?</p>
                                    <p className="mt-1 text-sm text-neutral-300">Write to us and we’ll figure it out together.</p>
                                    <Link
                                        href="/contact"
                                        onClick={onClose}
                                        className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
                                    >
                                        Hello@aurillia.dev
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
            <p className="text-sm font-semibold text-white">See how it fits together</p>
            <p className="mt-1 text-sm text-neutral-300">Core, Node, Sense, Link, and Watch as one system.</p>
            <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
                <div className="flex items-center justify-center gap-3 text-xs text-neutral-400">
                    <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-emerald-400">Core</span>
                    <span>↔</span>
                    <span className="rounded-md bg-neutral-800 px-2 py-1">Node</span>
                    <span>•</span>
                    <span className="rounded-md bg-neutral-800 px-2 py-1">Sense</span>
                    <span>•</span>
                    <span className="rounded-md bg-neutral-800 px-2 py-1">Link</span>
                    <span>•</span>
                    <span className="rounded-md bg-neutral-800 px-2 py-1">Watch</span>
                </div>
            </div>
            <Link
                href="/aur/overview"
                onClick={onClose}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
            >
                Open overview
            </Link>
        </>
    );
}

function MobileGroup({ title, items, close }: { title: string; items: Item[]; close: () => void }) {
    const [open, setOpen] = useState(false);
    return (
        <li className="rounded-lg">
            <button
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-lg text-neutral-100 hover:bg-neutral-900"
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                type="button"
            >
                {title}
                <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
            </button>
            <ul className={`overflow-hidden pl-2 transition-[grid-template-rows] ${open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"}`}>
                <li className="min-h-0">
                    <div className="space-y-1 pb-2 pt-1">
                        {items.map((it) => (
                            <Link key={it.href} href={it.href} onClick={close} className="block rounded-md px-2 py-2 text-base text-neutral-200 hover:bg-neutral-900">
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
            <span className={`absolute inset-x-0 top-0 h-0.5 origin-center bg-neutral-200 transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-1.5 h-0.5 bg-neutral-200 transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 top-3 h-0.5 origin-center bg-neutral-200 transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </span>
    );
}
