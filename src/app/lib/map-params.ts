const aliases: Record<string, string> = {
    w: "width",
    h: "height",
    q: "quality",
    f: "format",
    fp: "fullPage",
    m: "mobile",
    t: "timeout",
};

const booleanParams = ["fullPage", "mobile", "fp", "m"];

export const mapParams = (
    params: Record<string, string>
): Record<string, string | boolean> => {
    const mapped: Record<string, string | boolean> = {};

    for (const [key, value] of Object.entries(params)) {
        const mappedKey = aliases[key] || key;

        mapped[mappedKey] =
            booleanParams.includes(key) || booleanParams.includes(mappedKey)
                ? value.toLowerCase() === "true" || value === "1"
                : value;
    }
    return mapped;
};
