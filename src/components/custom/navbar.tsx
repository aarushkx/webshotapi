"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GITHUB_REPO_LINK } from "@/lib/constants";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full border-b bg-white dark:bg-slate-900 shadow-xs z-50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold">
                    WebShotAPI
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2 sm:gap-4">
                    <Button asChild size="sm" variant="ghost">
                        <Link href="/demo">Demo</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                        <Link href="/docs">Docs</Link>
                    </Button>
                    <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="px-2 sm:px-4"
                    >
                        <a
                            href={GITHUB_REPO_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                        >
                            Star on GitHub <FaGithub size={16} />
                        </a>
                    </Button>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <X /> : <Menu />}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            align="end"
                            className="w-44 p-2 flex flex-col items-start gap-2"
                        >
                            <Button
                                asChild
                                size="sm"
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                <Link
                                    href="/demo"
                                    onClick={() => setOpen(false)}
                                >
                                    Demo
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                <Link
                                    href="/docs"
                                    onClick={() => setOpen(false)}
                                >
                                    Docs
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <a
                                    href={GITHUB_REPO_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-1"
                                >
                                    Star on GitHub
                                    <FaGithub size={16} />
                                </a>
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
