"use client";

import * as React from "react";

type TabsProps = {
    labels: string[];
    initial?: number;
    underline?: boolean;
    className?: string;
    children: React.ReactNode; // one panel per label, in order
};

export default function Tabs({
    labels,
    initial = 0,
    underline = false,
    className = "",
    children,
}: TabsProps) {
    const [active, setActive] = React.useState(initial);
    const panels = React.Children.toArray(children);

    return (
        <div className={className}>
            <div className="flex flex-wrap items-center gap-6">
                {labels.map((label, i) => {
                    const isActive = i === active;
                    return (
                        <button
                            key={label}
                            onClick={() => setActive(i)}
                            className={[
                                "text-sm font-medium transition-colors",
                                isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200",
                            ].join(" ")}
                        >
                            {label}
                            {underline && (
                                <span
                                    className={[
                                        "block h-px",
                                        isActive ? "mt-2 w-10 bg-white" : "mt-2 w-0 bg-transparent",
                                    ].join(" ")}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-8">
                {panels.map((panel, i) => (
                    <div key={i} className={i === active ? "block" : "hidden"} role="tabpanel">
                        {panel}
                    </div>
                ))}
            </div>
        </div>
    );
}
