import puppeteer from "puppeteer";
import type { ScreenshotOptions } from "./schemas";
import { KnownDevices } from "puppeteer";

export const takeScreenshot = async (
    options: ScreenshotOptions
): Promise<string | undefined> => {
    const { url, width, height, format, quality, fullPage, mobile, timeout } =
        options;

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            `--window-size=${width},${height}`,
            "--disable-translate",
        ],
    });
    const page = await browser.newPage();

    try {
        await page.setViewport({ width, height, isMobile: mobile });

        if (mobile) await page.emulate(KnownDevices["iPhone 15 Pro"]);
        if (timeout > 0) page.setDefaultTimeout(timeout);

        await page.goto(url, { waitUntil: "networkidle2" });

        const screenshotOptions: any = {
            type: format,
            fullPage,
        };

        if (format !== "png") screenshotOptions.quality = quality;

        return await page.screenshot(screenshotOptions);
    } catch (error) {
        console.error("Error taking screenshot:", error);
        throw error;
    } finally {
        await browser.close();
    }
};
