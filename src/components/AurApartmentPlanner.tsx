"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

type WidgetType = "Core" | "Node" | "Camera" | "Door Sensor" | "Window Sensor";

interface Room {
    id: string;
    name: string;
    x: number;
    y: number;
    widgets: WidgetType[];
}

const WIDGETS: WidgetType[] = [
    "Core",
    "Node",
    "Camera",
    "Door Sensor",
    "Window Sensor",
];

const INITIAL_ROOMS: Room[] = [
    { id: "bathroom", name: "Bathroom", x: 40, y: 80, widgets: [] },
    { id: "living", name: "Living Room", x: 280, y: 120, widgets: ["Node", "Camera"] },
    { id: "bedroom", name: "Bedroom", x: 540, y: 80, widgets: ["Node"] },
    { id: "corridor", name: "Corridor", x: 280, y: 320, widgets: ["Core"] },
];

export function AurApartmentPlanner() {
    const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);

    const handleDragEnd = (
        id: string,
        _e: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        setRooms((prev) =>
            prev.map((room) =>
                room.id === id
                    ? {
                        ...room,
                        x: room.x + info.offset.x,
                        y: room.y + info.offset.y,
                    }
                    : room
            )
        );
    };

    const addWidget = (roomId: string, widget: WidgetType) => {
        if (!widget) return;
        setRooms((prev) =>
            prev.map((room) =>
                room.id === roomId && !room.widgets.includes(widget)
                    ? { ...room, widgets: [...room.widgets, widget] }
                    : room
            )
        );
    };

    const removeWidget = (roomId: string, widget: WidgetType) => {
        setRooms((prev) =>
            prev.map((room) =>
                room.id === roomId
                    ? {
                        ...room,
                        widgets: room.widgets.filter((w) => w !== widget),
                    }
                    : room
            )
        );
    };

    // aggregate widget counts for summary
    const totals = rooms.reduce<Record<WidgetType, number>>((acc, room) => {
        room.widgets.forEach((w) => {
            acc[w] = (acc[w] || 0) + 1;
        });
        return acc;
    }, {} as Record<WidgetType, number>);

    return (
        <section className="mt-16 rounded-[24px] border border-neutral-800/80 bg-neutral-950/80 px-6 py-8 backdrop-blur">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/80">
                        Aurillia Planner
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">
                        Sketch your apartment setup
                    </h2>
                    <p className="mt-1 max-w-xl text-sm text-neutral-400">
                        Drag rooms around to roughly match your floor plan and assign hubs,
                        nodes, cameras, and sensors. We&apos;ll turn this into a hardware
                        kit and deployment plan.
                    </p>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-xs text-neutral-200">
                    <p className="mb-2 font-medium text-white">Hardware summary</p>
                    <div className="flex flex-wrap gap-2">
                        {WIDGETS.map((w) => (
                            <span
                                key={w}
                                className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {w}
                                <span className="ml-1 text-neutral-400">
                                    × {totals[w] ?? 0}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* canvas */}
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[radial-gradient(circle_at_top,#1f2937,#020617)]">
                {/* subtle crosshair lines to hint blueprint */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-700/40" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-700/40" />
                </div>

                {rooms.map((room) => (
                    <motion.div
                        key={room.id}
                        className="absolute w-[260px] cursor-grab rounded-2xl border border-neutral-800 bg-neutral-900/95 p-4 text-xs text-neutral-100 shadow-[0_18px_45px_rgba(0,0,0,0.6)]"
                        style={{ x: room.x, y: room.y }}
                        drag
                        dragMomentum={false}
                        onDragEnd={handleDragEnd.bind(null, room.id)}
                        whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.75)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                                    Room
                                </p>
                                <p className="truncate text-sm font-semibold text-white">
                                    {room.name}
                                </p>
                            </div>
                            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                                drag to position
                            </span>
                        </div>

                        {/* widget selector */}
                        <div className="mb-3">
                            <label className="mb-1 block text-[11px] text-neutral-400">
                                Add hardware to this room
                            </label>
                            <select
                                className="w-full rounded-xl border border-neutral-700/80 bg-neutral-900 px-2 py-1.5 text-[11px] text-neutral-100 outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/60"
                                defaultValue=""
                                onChange={(e) => {
                                    const value = e.target.value as WidgetType;
                                    addWidget(room.id, value);
                                    e.target.value = "";
                                }}
                            >
                                <option value="" disabled>
                                    Select a device…
                                </option>
                                {WIDGETS.map((w) => (
                                    <option key={w} value={w}>
                                        {w}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* chips */}
                        {room.widgets.length ? (
                            <div className="flex flex-wrap gap-1.5">
                                {room.widgets.map((w) => (
                                    <button
                                        key={w}
                                        type="button"
                                        onClick={() => removeWidget(room.id, w)}
                                        className="group inline-flex items-center gap-1 rounded-full bg-neutral-800/90 px-2 py-1 text-[11px] text-neutral-50"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                                        {w}
                                        <span className="text-neutral-500 group-hover:text-red-400">
                                            ×
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[11px] text-neutral-500">
                                No hardware yet. Add a hub, node, camera or sensors for this
                                room.
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* you can hook this button up to a form / API later */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] text-neutral-500">
                    This is a rough sketch only. We&apos;ll use it as a starting point to
                    propose hardware and wiring.
                </p>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-neutral-950 hover:bg-emerald-400"
                >
                    Send this layout to Aurillia
                    <span className="text-lg leading-none">↗</span>
                </button>
            </div>
        </section>
    );
}
