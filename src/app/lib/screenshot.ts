import puppeteer, { type Browser } from "puppeteer";
import type { ScreenshotOptions } from "./schemas";
import { KnownDevices } from "puppeteer";

export const takeScreenshot = async (
    options: ScreenshotOptions
): Promise<string | Buffer | undefined> => {
    const { url, width, height, format, quality, fullPage, mobile, timeout } =
        options;

    let browser: Browser | undefined | null;

    if (process.env.NODE_ENV === "production") {
        const chromium = require("@sparticuz/chromium");
        chromium.setGraphicsMode = false;
        const puppeteer = require("puppeteer-core");
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
    } else {
        const puppeteer = require("puppeteer");
        browser = await puppeteer.launch({
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
    }

    if (!browser) throw new Error("Failed to launch browser");

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
