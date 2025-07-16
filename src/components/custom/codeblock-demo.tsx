"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { APP_URL } from "@/lib/constants";

const CodeBlockDemo = () => {
    const code = `async function fetchScreenshot() {
  const endpoint = "${APP_URL}/api/screenshot?url=https://github.com";
  const response = await fetch(endpoint);

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  document.body.innerHTML = \`<img src="\${imageUrl}" alt="Screenshot"/>\`;
}

fetchScreenshot();
`;

    return (
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <CodeBlock
                    language="js"
                    filename="index.js"
                    highlightLines={[2, 3]}
                    code={code}
                />
            </div>
        </div>
    );
};

export default CodeBlockDemo;
