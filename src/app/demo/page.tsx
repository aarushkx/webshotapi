"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Copy,
    Download,
    Eye,
    Loader2,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { ScreenshotOptions, ScreenshotSchema } from "@/app/lib/schemas";
import { ZodError } from "zod";
import { APP_NAME, APP_URL } from "@/lib/constants";

const DemoPage = () => {
    const [formData, setFormData] = useState<ScreenshotOptions>({
        url: APP_URL,
        width: 1920,
        height: 1080,
        format: "png",
        quality: 100,
        fullPage: false,
        mobile: false,
        timeout: 0,
    });

    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [apiUrl, setApiUrl] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imageError, setImageError] = useState<boolean>(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [previewUrl]);

    const generateApiUrl = (data: ScreenshotOptions) => {
        const params = new URLSearchParams();
        params.append("url", data.url);

        if (data.width !== 1920) params.append("w", data.width.toString());
        if (data.height !== 1080) params.append("h", data.height.toString());
        if (data.format !== "png") params.append("f", data.format);
        if (data.quality !== 100) params.append("q", data.quality.toString());
        if (data.fullPage) params.append("fp", data.fullPage.toString());
        if (data.mobile) params.append("m", data.mobile.toString());
        if (data.timeout !== 0) params.append("t", data.timeout.toString());

        return `${APP_URL}/api/screenshot?${params.toString()}`;
    };

    const handleInputChange = (field: keyof ScreenshotOptions, value: any) => {
        switch (field) {
            case "width":
            case "height":
            case "quality":
            case "timeout":
                if (value === "") value = undefined;
                else if (!isNaN(value)) value = Number(value);
                else return;
                break;
            default:
                break;
        }

        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(apiUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            toast.error("Failed to copy URL");
        }
    };

    const handleTestApi = async () => {
        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);
        try {
            const response = await fetch(apiUrl);
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setPreviewUrl(imageUrl);
        } catch (error) {
            toast.error("Error taking screenshot");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (previewUrl) {
            const link = document.createElement("a");
            link.href = previewUrl;
            link.download = `${APP_NAME}-${Date.now()}.${formData.format}`;
            link.click();
        }
    };

    useEffect(() => {
        try {
            const validatedData = ScreenshotSchema.parse(formData);
            const url = generateApiUrl(validatedData);

            setApiUrl(decodeURIComponent(url));
            setPreviewUrl(url);
            setErrors({});
        } catch (error) {
            if (error instanceof ZodError) {
                const zodErrors: Record<string, string> = {};
                error.issues.forEach((e) => {
                    if (e.path[0]) zodErrors[e.path[0] as string] = e.message;
                });
                setErrors(zodErrors);
            }
        }
    }, [formData]);

    return (
        <div className="min-h-screen pt-16 pb-14 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-6 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">{APP_NAME} Demo</h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Test the API with different parameters and see the
                        results in real-time
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Controls */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                API Parameters
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* URL Input */}
                            <div className="space-y-2">
                                <Label htmlFor="url">
                                    Website URL
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={formData.url}
                                    onChange={(e) =>
                                        handleInputChange("url", e.target.value)
                                    }
                                    className={
                                        errors.url ? "border-red-500" : ""
                                    }
                                />
                                {errors.url && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.url}
                                    </p>
                                )}
                            </div>

                            {/* Dimensions */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="width">Width (px)</Label>
                                    <Input
                                        id="width"
                                        type="number"
                                        min="1"
                                        value={formData.width ?? ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "width",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.width ? "border-red-500" : ""
                                        }
                                    />
                                    {errors.width && (
                                        <p className="text-sm text-red-500">
                                            {errors.width}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height">Height (px)</Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        min="1"
                                        value={formData.height ?? ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "height",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.height
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {errors.height && (
                                        <p className="text-sm text-red-500">
                                            {errors.height}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Format */}
                            <div className="space-y-2">
                                <Label>Format</Label>
                                <Select
                                    value={formData.format}
                                    onValueChange={(v) =>
                                        handleInputChange("format", v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="png">PNG</SelectItem>
                                        <SelectItem value="jpeg">
                                            JPEG
                                        </SelectItem>
                                        <SelectItem value="webp">
                                            WebP
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Quality */}
                            <div className="space-y-2">
                                <Label>Quality: {formData.quality}%</Label>
                                <Slider
                                    value={[formData.quality]}
                                    onValueChange={(v) =>
                                        handleInputChange("quality", v[0])
                                    }
                                    max={100}
                                    min={1}
                                    step={1}
                                    className="w-full"
                                />
                            </div>

                            {/* Timeout */}
                            <div className="space-y-2">
                                <Label htmlFor="timeout">Timeout (ms)</Label>
                                <Input
                                    id="timeout"
                                    type="number"
                                    min="0"
                                    value={formData.timeout}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "timeout",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.timeout ? "border-red-500" : ""
                                    }
                                />
                                {errors.timeout && (
                                    <p className="text-sm text-red-500">
                                        {errors.timeout}
                                    </p>
                                )}
                            </div>

                            {/* Boolean Options */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="fullPage">
                                        Full Page Screenshot
                                    </Label>
                                    <Switch
                                        id="fullPage"
                                        checked={formData.fullPage}
                                        onCheckedChange={(f) =>
                                            handleInputChange("fullPage", f)
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="mobile">
                                        Mobile Device
                                    </Label>
                                    <Switch
                                        id="mobile"
                                        checked={formData.mobile}
                                        onCheckedChange={(f) =>
                                            handleInputChange("mobile", f)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Test Button */}
                            <Button
                                onClick={handleTestApi}
                                disabled={
                                    isLoading || Object.keys(errors).length > 0
                                }
                                className="w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    "Test API"
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Right Side - Preview */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Live Preview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Generated URL */}
                            <div className="space-y-2">
                                <Label>Generated API URL</Label>
                                <div className="flex gap-2">
                                    <Input value={apiUrl} readOnly />
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
                            </div>

                            {/* Preview Image */}
                            <div className="space-y-2">
                                <Label>Screenshot Preview</Label>
                                <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                                    {isLoading ? (
                                        <div className="h-64 flex items-center justify-center">
                                            <div className="text-center">
                                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                                                <p className="text-sm text-gray-500">
                                                    Generating screenshot
                                                    preview
                                                </p>
                                            </div>
                                        </div>
                                    ) : imageError ? (
                                        <div className="h-64 flex items-center justify-center">
                                            <div className="text-center">
                                                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                                                <p className="text-sm text-red-500">
                                                    Failed to load screenshot
                                                    preview
                                                </p>
                                            </div>
                                        </div>
                                    ) : previewUrl &&
                                      Object.keys(errors).length === 0 ? (
                                        <img
                                            src={previewUrl}
                                            alt="Screenshot preview"
                                            className="w-full h-auto max-h-96 object-contain"
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <div className="h-64 flex items-center justify-center">
                                            <div className="text-center">
                                                <Eye className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                                <p className="text-sm text-gray-500">
                                                    {Object.keys(errors)
                                                        .length > 0
                                                        ? "Fix errors to see preview"
                                                        : "Screenshot will appear here"}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Download Button */}
                            <Button
                                onClick={handleDownload}
                                disabled={
                                    !previewUrl ||
                                    Object.keys(errors).length > 0
                                }
                                variant="outline"
                                className="w-full"
                            >
                                <Download className="w-4 h-4" />
                                Download Screenshot
                            </Button>

                            {/* Active Parameters */}
                            <div className="space-y-2">
                                <Label>Active Parameters</Label>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">
                                        {formData.format.toUpperCase()}
                                    </Badge>
                                    <Badge variant="secondary">
                                        {formData.width}x{formData.height}
                                    </Badge>
                                    <Badge variant="secondary">
                                        {formData.quality}% quality
                                    </Badge>
                                    {formData.fullPage && (
                                        <Badge variant="secondary">
                                            Full Page
                                        </Badge>
                                    )}
                                    {formData.mobile && (
                                        <Badge variant="secondary">
                                            Mobile
                                        </Badge>
                                    )}
                                    <Badge variant="secondary">
                                        {formData.timeout}ms timeout
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DemoPage;
