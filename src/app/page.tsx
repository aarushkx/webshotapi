"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import CodeBlockDemo from "@/components/custom/codeblock-demo";
import { ArrowRight, Users } from "lucide-react";
import { APP_NAME } from "./lib/constants";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <section className="container mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <div className="max-w-2xl mt-8 text-center lg:text-left">
                        <h1 className="text-5xl font-bold sm:font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-6 leading-tight text-center lg:text-left">
                            Capture Website Screenshots with{" "}
                            <PointerHighlight containerClassName="inline-flex justify-center lg:justify-start">
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {APP_NAME}
                                </span>
                            </PointerHighlight>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                            Simple, fast, and reliable screenshot API for your
                            applications. Generate high-quality screenshots in
                            seconds with our robust infrastructure.
                        </p>

                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                            <Badge
                                variant="outline"
                                className="px-3 py-1 text-sm"
                            >
                                <Users className="w-3 h-3 mr-1" />
                                28,000+ screenshots generated
                            </Badge>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                asChild
                                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            >
                                <Link href="/demo">
                                    Try the Demo{" "}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <Link href="/docs">View Documentation</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full max-w-none md:max-w-xl lg:max-w-lg">
                        <CodeBlockDemo />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
