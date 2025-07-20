import type { ScreenshotOptions } from "./schemas";
import { KnownDevices } from "puppeteer";

export const takeScreenshot = async (
    options: ScreenshotOptions
): Promise<string | Buffer | undefined> => {
    const { url, width, height, format, quality, fullPage, mobile, timeout } =
        options;

    let browser;

    if (process.env.NODE_ENV === "production") {
        const chromiumModule = await import("@sparticuz/chromium");
        const puppeteerModule = await import("puppeteer-core");

        const chromium = chromiumModule.default || chromiumModule;
        const puppeteer = puppeteerModule.default || puppeteerModule;

        if (chromium.setGraphicsMode) chromium.setGraphicsMode = false;

        const execPath = await chromium.executablePath();

        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: (chromium as any).defaultViewport,
            executablePath: execPath,
            headless: (chromium as any).headless,
        });
    } else {
        const puppeteerModule = await import("puppeteer");
        const puppeteer = puppeteerModule.default || puppeteerModule;

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
