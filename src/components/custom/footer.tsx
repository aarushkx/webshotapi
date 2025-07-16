"use client";

import { APP_NAME } from "@/app/lib/constants";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="h-16 border-t flex justify-center items-center text-center text-sm text-muted-foreground">
            <div className="container mx-auto">
                © {currentYear} {APP_NAME}
            </div>
        </footer>
    );
};

export default Footer;
