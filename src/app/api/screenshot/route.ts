import { NextRequest, NextResponse } from "next/server";
import { ScreenshotSchema } from "@/app/lib/schemas";
import { takeScreenshot } from "@/app/lib/screenshot";
import { mapParams } from "@/app/lib/map-params";
import { ZodError } from "zod";

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;

    try {
        const raw = Object.fromEntries(searchParams.entries());
        const mapped = mapParams(raw);
        const params = ScreenshotSchema.parse(mapped);

        const image = await takeScreenshot(params);

        return new NextResponse(image, {
            headers: {
                "Content-Type": `image/${params.format}`,
                "Content-Disposition": `inline; filename="screenshot.${params.format}"`,
                "Cache-Control": "public, max-age=3600",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error: unknown) {
        console.error("Error:", error);

        let status = 500;
        let message = "Failed to take screenshot";

        if (error instanceof ZodError) {
            status = 400;
            message = error.issues.map((e) => e.message).join(". ");
        } else if (error instanceof Error) {
            message = error.message;
        }

        return NextResponse.json({ error: message }, { status });
    }
};
