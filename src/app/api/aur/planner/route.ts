import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

type WidgetType = "Core" | "Node" | "Camera" | "Door Sensor" | "Window Sensor";

interface PlannerRoom {
    id: string;
    name: string;
    x: number;
    y: number;
    widgets: WidgetType[];
}

interface PlannerBody {
    rooms: PlannerRoom[];
    contact: {
        name?: string;
        email: string;
        notes?: string;
    };
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as PlannerBody;

        if (!body?.contact?.email || !Array.isArray(body.rooms)) {
            return NextResponse.json(
                { error: "Invalid payload" },
                { status: 400 }
            );
        }

        const { rooms, contact } = body;

        const widgetTotals = rooms.reduce<Record<WidgetType, number>>(
            (acc, room) => {
                room.widgets.forEach((w) => {
                    acc[w] = (acc[w] || 0) + 1;
                });
                return acc;
            },
            {} as Record<WidgetType, number>
        );

        const userAgent = req.headers.get("user-agent") ?? undefined;
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

        const { error } = await supabaseServer
            .from("aur_planner_submissions")
            .insert({
                contact_name: contact.name ?? null,
                contact_email: contact.email,
                notes: contact.notes ?? null,
                rooms,
                widget_totals: widgetTotals,
                status: "new",
                user_agent: userAgent,
                remote_ip: ip,
            });

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: "Unable to save submission" },
                { status: 500 }
            );
        }

        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error("Planner route error:", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
