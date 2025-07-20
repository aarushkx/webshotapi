"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/code-block";
import {
    AlertCircle,
    Settings2,
    TerminalSquare,
    Copy,
    CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { APP_NAME, APP_URL, API_BASE } from "@/lib/constants";

const PARAM_ROWS = [
    {
        param: "url",
        alias: "",
        type: "string (URL)",
        required: true,
        default: "—",
        description: "Website URL to capture.",
    },
    {
        param: "width",
        alias: "w",
        type: "number",
        required: false,
        default: "1920",
        description: "Viewport width (pixels)",
    },
    {
        param: "height",
        alias: "h",
        type: "number",
        required: false,
        default: "1080",
        description: "Viewport height (pixels)",
    },
    {
        param: "format",
        alias: "f",
        type: `enum ("png" | "jpeg" | "webp")`,
        required: false,
        default: "png",
        description: "Output image format.",
    },
    {
        param: "quality",
        alias: "q",
        type: "number (1-100)",
        required: false,
        default: "100",
        description: (
            <>
                Image compression quality
                <br />
                <span className="text-xs text-muted-foreground">
                    (ignored for{" "}
                    <Badge variant="secondary" className="inline">
                        png
                    </Badge>{" "}
                    format)
                </span>
            </>
        ),
    },
    {
        param: "fullPage",
        alias: "fp",
        type: "boolean",
        required: false,
        default: "false",
        description: "Capture full scrollable page if true",
    },
    {
        param: "mobile",
        alias: "m",
        type: "boolean",
        required: false,
        default: "false",
        description: "Emulate mobile viewport if true",
    },
    {
        param: "timeout",
        alias: "t",
        type: "number (ms)",
        required: false,
        default: "0",
        description: (
            <>
                Delay before capture in milliseconds
                <br />
                <span className="text-muted-foreground">
                    (max:{" "}
                    <Badge variant="secondary" className="inline">
                        9000ms
                    </Badge>{" "}
                    to fit serverless limits)
                </span>
            </>
        ),
    },
];

const EXAMPLE_URL = `${APP_URL}/api/screenshot?url=https://example.com&w=1280&h=720&f=jpeg&q=80&fp=true&m=true&t=6000`;
const EXAMPLE_CODE = `curl "${EXAMPLE_URL}" -o screenshot.jpeg`;

const DocsPage = () => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(API_BASE);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            toast.error("Failed to copy URL");
        }
    };

    return (
        <div className="min-h-screen pt-16 pb-14 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <motion.header
                className="container mx-auto px-6 py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">
                        {APP_NAME} Documentation
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Programmatically capture screenshots from any website in
                        a single API call
                    </p>
                </div>
            </motion.header>

            <div className="container mx-auto px-6 max-w-4xl space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-white">
                                <TerminalSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                API Endpoint
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Badge
                                    variant="outline"
                                    className="text-md px-3"
                                >
                                    GET
                                </Badge>
                                <Input value={API_BASE} readOnly />
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={handleCopyUrl}
                                    className="flex-shrink-0"
                                >
                                    {copySuccess ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                            <Separator />

                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-300">
                                    Example usage with cURL. This command
                                    downloads a customized screenshot of
                                    example.com as a JPEG file. Adjust
                                    parameters as needed for your use case.
                                </p>
                                <CodeBlock
                                    language="bash"
                                    filename=""
                                    code={EXAMPLE_CODE}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-white">
                                <Settings2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Query Parameters
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Parameter</TableHead>
                                            <TableHead>Alias</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Required</TableHead>
                                            <TableHead>Default</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PARAM_ROWS.map((row) => (
                                            <TableRow key={row.param}>
                                                <TableCell className="py-4">
                                                    <Badge variant="secondary">
                                                        {row.param}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {row.alias ? (
                                                        <Badge variant="secondary">
                                                            {row.alias}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">
                                                            —
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {row.type}
                                                </TableCell>
                                                <TableCell>
                                                    {row.required ? (
                                                        <Badge variant="destructive">
                                                            Required
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline">
                                                            Optional
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {row.default}
                                                </TableCell>
                                                <TableCell>
                                                    {row.description}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-white">
                                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                Notes and Limitations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                                <li>
                                    <strong className="text-slate-800 dark:text-white">
                                        Image Quality:
                                    </strong>{" "}
                                    The{" "}
                                    <Badge variant="secondary">quality</Badge>{" "}
                                    parameter is <strong>ignored</strong> when{" "}
                                    <Badge variant="secondary">format</Badge> is
                                    set to{" "}
                                    <Badge variant="secondary">png</Badge>. For
                                    PNG images, maximum lossless quality is
                                    always used.
                                </li>
                                <li>
                                    <strong className="text-slate-800 dark:text-white">
                                        Timeout:
                                    </strong>{" "}
                                    The{" "}
                                    <Badge variant="secondary">timeout</Badge>{" "}
                                    value can be{" "}
                                    <strong>0 to 9000ms (9s)</strong> maximum
                                    per request (to fit Vercel serverless
                                    function limitations).
                                </li>
                                <li>
                                    <strong className="text-slate-800 dark:text-white">
                                        Validation:
                                    </strong>{" "}
                                    All parameters are validated; invalid or
                                    missing required parameters will return a
                                    structured error response.
                                </li>
                                <li>
                                    <strong className="text-slate-800 dark:text-white">
                                        Response:
                                    </strong>{" "}
                                    On success, the endpoint responds with the
                                    screenshot image (<code>Content-Type</code>{" "}
                                    matches requested format). On failure, a
                                    JSON error response and appropriate HTTP
                                    code is returned.
                                </li>
                                <li>
                                    <strong className="text-slate-800 dark:text-white">
                                        Boolean Parameters:
                                    </strong>{" "}
                                    Parameters like{" "}
                                    <Badge variant="secondary">fullPage</Badge>,{" "}
                                    <Badge variant="secondary">mobile</Badge>,{" "}
                                    <Badge variant="secondary">fp</Badge>, and{" "}
                                    <Badge variant="secondary">m</Badge> accept{" "}
                                    <Badge variant="secondary">true</Badge> /{" "}
                                    <Badge variant="secondary">false</Badge>{" "}
                                    (case-insensitive) or{" "}
                                    <Badge variant="secondary">1</Badge> /{" "}
                                    <Badge variant="secondary">0</Badge> as
                                    values.
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default DocsPage;
