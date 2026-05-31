import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// add "content" here
const ALLOWED_CATEGORIES = [
    "web",
    "content",
    "mobile",
    "ai",
    "cloud",
    "hardware",
] as const;

type Category = (typeof ALLOWED_CATEGORIES)[number];

interface Body {
    category: Category | null;
}

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { category } = (await req.json()) as Body;

        if (category !== null && !ALLOWED_CATEGORIES.includes(category)) {
            return NextResponse.json({ error: "Invalid category" }, { status: 400 });
        }

        const { error } = await supabaseServer
            .from("leads")
            .update({ service_category: category })
            .eq("id", params.id);

        if (error) {
            console.error("Update lead category error:", error);
            return NextResponse.json(
                { error: "Unable to update category" },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Category route error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
