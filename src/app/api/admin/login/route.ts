import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { password } = (await req.json()) as { password?: string };

    const expectedPassword = process.env.AUR_ADMIN_PASSWORD;
    const token = process.env.AUR_ADMIN_TOKEN;

    if (!expectedPassword || !token) {
        return NextResponse.json(
            { error: "Admin auth not configured" },
            { status: 500 }
        );
    }

    if (!password || password !== expectedPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set("aur_admin", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
}
