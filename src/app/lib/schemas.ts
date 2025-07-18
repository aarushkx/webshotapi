import { z } from "zod";

export const ScreenshotSchema = z.object({
    url: z.url(),
    width: z.coerce.number().min(1).default(1920),
    height: z.coerce.number().min(1).default(1080),
    format: z.enum(["png", "jpeg", "webp"]).default("png"),
    quality: z.coerce.number().min(1).max(100).default(100),
    fullPage: z.coerce.boolean().default(false),
    mobile: z.coerce.boolean().default(false),
    // Max allowed timeout is fixed to 9000ms (9s) to ensure Puppeteer has enough time
    // to process the request within Vercel's 10s serverless function limit allowed in the Hobby (Free) Plan
    timeout: z.coerce.number().min(0).max(9000).default(0),
});

export type ScreenshotOptions = z.infer<typeof ScreenshotSchema>;
