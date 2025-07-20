"use client";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { APP_NAME, SOCIAL_LINKS } from "@/lib/constants";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t flex flex-col items-center text-center text-sm text-muted-foreground dark:bg-slate-900  py-6 space-y-4">
            <div className="container mx-auto font-semibold">
                © {currentYear} {APP_NAME}
            </div>

            {/* Socials */}
            <div className="flex justify-center space-x-6">
                <a
                    href={SOCIAL_LINKS.GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-muted-foreground dark:hover:text-slate-400 transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full p-1"
                    aria-label="GitHub Profile"
                >
                    <FaGithub size={24} />
                </a>
                <a
                    href={SOCIAL_LINKS.INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-muted-foreground dark:hover:text-slate-400 transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full p-1"
                    aria-label="Instagram Profile"
                >
                    <FaInstagram size={24} />
                </a>
                <a
                    href={SOCIAL_LINKS.LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-muted-foreground dark:hover:text-slate-400 transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full p-1"
                    aria-label="LinkedIn Profile"
                >
                    <FaLinkedin size={24} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
