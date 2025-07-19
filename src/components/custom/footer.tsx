"use client";

import { APP_NAME } from "@/lib/constants";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="h-16 border-t flex justify-center items-center text-center text-sm text-muted-foreground dark:bg-slate-900">
            <div className="container mx-auto">
                © {currentYear} {APP_NAME}
            </div>
        </footer>
    );
};

export default Footer;
