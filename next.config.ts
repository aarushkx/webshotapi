import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
};

export default nextConfig;
