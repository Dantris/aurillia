"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

export type WidgetType =
    | "Core"
    | "Node"
    | "Camera"
    | "Door Sensor"
    | "Window Sensor";

export interface Room {
    id: string;
    name: string;
    x: number;
    y: number;
    widgets: WidgetType[];
}

type SaveStatus = "idle" | "saving" | "success" | "error";

const AVAILABLE_WIDGETS: WidgetType[] = [
    "Core",
    "Node",
    "Camera",
    "Door Sensor",
    "Window Sensor",
];

const GRID_SIZE = 48; // px grid for snapping + background

const INITIAL_ROOMS: Room[] = [
    { id: "bathroom", name: "Bathroom", x: GRID_SIZE * 1, y: GRID_SIZE * 1.5, widgets: [] },
    {
        id: "living",
        name: "Living Room",
        x: GRID_SIZE * 5,
        y: GRID_SIZE * 2,
        widgets: ["Node", "Camera"],
    },
    { id: "bedroom", name: "Bedroom", x: GRID_SIZE * 9, y: GRID_SIZE * 1.5, widgets: ["Node"] },
    { id: "corridor", name: "Corridor", x: GRID_SIZE * 5, y: GRID_SIZE * 5, widgets: ["Core"] },
];

interface ApartmentPlannerProps {
    initialRooms?: Room[];
    readOnly?: boolean;
    hideContactSection?: boolean;
}

export function ApartmentPlanner({
    initialRooms,
    readOnly = false,
    hideContactSection = false,
}: ApartmentPlannerProps) {
    const [rooms, setRooms] = useState<Room[]>(initialRooms ?? INITIAL_ROOMS);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [notes, setNotes] = useState("");
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

    const snapToGrid = (value: number) =>
        Math.round(value / GRID_SIZE) * GRID_SIZE;

    // --- room interactions -----------------------------------------------------

    const handleDragEnd = (id: string, info: PanInfo) => {
        if (readOnly) return;

        setRooms((prev) =>
            prev.map((room) => {
                if (room.id !== id) return room;

                const rawX = room.x + info.offset.x;
                const rawY = room.y + info.offset.y;

                const snappedX = snapToGrid(rawX);
                const snappedY = snapToGrid(rawY);

                return { ...room, x: snappedX, y: snappedY };
            })
        );
    };

    const addWidget = (roomId: string, widget: WidgetType) => {
        if (readOnly || !widget) return;
        setRooms((prev) =>
            prev.map((room) =>
                room.id === roomId && !room.widgets.includes(widget)
                    ? { ...room, widgets: [...room.widgets, widget] }
                    : room
            )
        );
    };

    const removeWidget = (roomId: string, widget: WidgetType) => {
        if (readOnly) return;
        setRooms((prev) =>
            prev.map((room) =>
                room.id === roomId
                    ? { ...room, widgets: room.widgets.filter((w) => w !== widget) }
                    : room
            )
        );
    };

    const addRoom = () => {
        if (readOnly) return;

        const id =
            typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `room-${Date.now()}-${Math.random()}`;

        setRooms((prev) => [
            ...prev,
            {
                id,
                name: `New room ${prev.length + 1}`,
                x: snapToGrid(80 + prev.length * 30),
                y: snapToGrid(80 + prev.length * 30),
                widgets: [],
            },
        ]);
    };

    const renameRoom = (roomId: string, name: string) => {
        if (readOnly) return;
        setRooms((prev) =>
            prev.map((room) => (room.id === roomId ? { ...room, name } : room))
        );
    };

    const deleteRoom = (roomId: string) => {
        if (readOnly) return;
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
    };

    const resetRooms = () => {
        if (readOnly) return;
        setRooms(INITIAL_ROOMS);
    };

    // --- summary ---------------------------------------------------------------

    const widgetTotals = rooms.reduce<Record<WidgetType, number>>(
        (acc, room) => {
            room.widgets.forEach((w) => {
                acc[w] = (acc[w] || 0) + 1;
            });
            return acc;
        },
        {} as Record<WidgetType, number>
    );

    // --- save to backend -------------------------------------------------------

    const handleSave = async () => {
        if (readOnly) return;
        if (!contactEmail) {
            setSaveStatus("error");
            return;
        }

        setSaveStatus("saving");
        try {
            const res = await fetch("/api/aur/planner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rooms,
                    contact: {
                        name: contactName,
                        email: contactEmail,
                        notes,
                    },
                }),
            });

            if (!res.ok) throw new Error("Request failed");
            setSaveStatus("success");
        } catch (err) {
            console.error(err);
            setSaveStatus("error");
        }
    };

    // ---------------------------------------------------------------------------

    return (
        <section className="mt-16 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 to-neutral-900 px-6 py-8">
            {/* header row */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
                        Aurillia Planner
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">
                        Sketch your apartment setup
                    </h2>
                    <p className="mt-1 max-w-xl text-sm text-neutral-400">
                        Drag rooms around, name them, and assign hardware. We&apos;ll turn
                        your sketch into a proper blueprint and app setup.
                    </p>
                </div>

                <div className="space-y-2 text-xs text-neutral-300">
                    {!readOnly && (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={addRoom}
                                className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300 hover:bg-emerald-500/20"
                            >
                                + Add room
                            </button>
                            <button
                                type="button"
                                onClick={resetRooms}
                                className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-neutral-300 hover:bg-neutral-800"
                            >
                                Reset to example
                            </button>
                        </div>
                    )}
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 px-4 py-3">
                        <p className="mb-2 font-medium text-white">Hardware summary</p>
                        <div className="flex flex-wrap gap-2">
                            {AVAILABLE_WIDGETS.map((w) => (
                                <span
                                    key={w}
                                    className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    {w}
                                    <span className="ml-1 text-neutral-400">
                                        × {widgetTotals[w] ?? 0}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* canvas */}
            <div
                className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[radial-gradient(circle_at_top,_#111827,_#020617)] md:h-[620px]"
            >
                {/* blueprint grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.16) 1px, transparent 1px)",
                        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                    }}
                />

                {/* center crosshair */}
                <div className="pointer-events-none absolute inset-0 opacity-30">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/20" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-500/20" />
                </div>

                {rooms.map((room) => (
                    <motion.div
                        key={room.id}
                        className="absolute w-64 cursor-grab rounded-2xl border border-neutral-800 bg-neutral-900/95 p-4 shadow-lg shadow-black/40"
                        style={{ x: room.x, y: room.y }}
                        drag={!readOnly}
                        dragMomentum={false}
                        onDragEnd={(_, info) => handleDragEnd(room.id, info)}
                        whileDrag={{
                            scale: 1.03,
                            boxShadow: "0 18px 45px rgba(0,0,0,0.6)",
                            borderColor: "rgba(16,185,129,0.6)",
                        }}
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    >
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                                    Room
                                </p>
                                {readOnly ? (
                                    <p className="truncate text-sm font-semibold text-white">
                                        {room.name}
                                    </p>
                                ) : (
                                    <input
                                        value={room.name}
                                        onChange={(e) => renameRoom(room.id, e.target.value)}
                                        className="w-full bg-transparent text-sm font-semibold text-white outline-none ring-0 focus:border-b focus:border-emerald-500/60"
                                        placeholder="Room name"
                                    />
                                )}
                            </div>
                            {!readOnly && (
                                <button
                                    type="button"
                                    onClick={() => deleteRoom(room.id)}
                                    className="rounded-full bg-neutral-800 px-2 py-1 text-[10px] text-neutral-400 hover:bg-red-500/10 hover:text-red-400"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="mb-1 block text-xs text-neutral-400">
                                Add hardware
                            </label>
                            <select
                                disabled={readOnly}
                                className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-xs text-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
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
                                {AVAILABLE_WIDGETS.map((w) => (
                                    <option key={w} value={w}>
                                        {w}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {room.widgets.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {room.widgets.map((w) => (
                                    <button
                                        key={w}
                                        type="button"
                                        onClick={() => removeWidget(room.id, w)}
                                        disabled={readOnly}
                                        className="group inline-flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-1 text-[11px] text-neutral-100 disabled:cursor-default"
                                    >
                                        {w}
                                        {!readOnly && (
                                            <span className="text-neutral-500 group-hover:text-red-400">
                                                ✕
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[11px] text-neutral-500">
                                No hardware yet. Add a hub, node, camera…
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* contact + save – hidden for admin views */}
            {!hideContactSection && (
                <div className="mt-6 flex flex-col gap-4 border-t border-neutral-800 pt-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-md text-[11px] text-neutral-400">
                        <p className="font-medium text-neutral-200">
                            Save this layout and send it to Aurillia
                        </p>
                        <p className="mt-1">
                            We&apos;ll review your rooms and hardware, then come back with a
                            proposal and price. After payment, we turn this into your actual
                            app &amp; deployment plan.
                        </p>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 md:max-w-xl">
                        <div className="flex flex-col gap-2 md:flex-row">
                            <input
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="Your name"
                                className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-neutral-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                            />
                            <input
                                type="email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="Email to send the proposal to"
                                className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-neutral-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                            />
                        </div>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Anything special about your apartment, network, or security needs?"
                            rows={2}
                            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-neutral-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                        />
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saveStatus === "saving"}
                                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-neutral-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saveStatus === "saving"
                                    ? "Saving…"
                                    : saveStatus === "success"
                                        ? "Saved – we’ll be in touch"
                                        : "Save draft & send"}
                                <span className="text-lg leading-none">↗</span>
                            </button>

                            {saveStatus === "error" && (
                                <p className="text-[11px] text-red-400">
                                    Couldn&apos;t send. Check your email and try again.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ApartmentPlanner;
