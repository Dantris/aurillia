import { supabaseServer } from "@/lib/supabaseServer";
import { ApartmentPlanner, Room } from "@/components/ApartmentPlanner";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function PlannerAdminDetailPage({ params }: Props) {
    const { id } = await params;
    const { data, error } = await supabaseServer
        .from("aur_planner_submissions")
        .select(
            "id, created_at, contact_name, contact_email, notes, rooms, widget_totals, status"
        )
        .eq("id", id)
        .single();

    if (error || !data) {
        console.error("Admin detail load error:", error);
        return (
            <main className="p-6 text-red-400">
                Could not load submission.
            </main>
        );
    }

    const rooms = data.rooms as Room[];

    return (
        <main className="px-6 pb-16 pt-10">
            <div className="mb-6">
                <p className="text-xs text-neutral-500">Submission ID: {data.id}</p>
                <h1 className="text-2xl font-semibold text-white">
                    Draft for {data.contact_email}
                </h1>
                <p className="mt-1 text-sm text-neutral-400">
                    Created at{" "}
                    {new Date(data.created_at).toLocaleString()} · status{" "}
                    <span className="font-medium text-neutral-100">{data.status}</span>
                </p>
                {data.notes && (
                    <p className="mt-2 text-sm text-neutral-300">
                        Notes: {data.notes}
                    </p>
                )}
            </div>

            <ApartmentPlanner
                initialRooms={rooms}
                readOnly={false}          // set true if you want view-only
                hideContactSection={true} // no need for public contact form here
            />
        </main>
    );
}
