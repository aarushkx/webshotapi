import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/db-connect";
import { Stats } from "@/models/stats.model";

export const GET = async () => {
    try {
        await connectToDatabase();

        const stats = await Stats.findOne({});
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
};
