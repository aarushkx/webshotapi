"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <motion.div
            className="fixed bottom-10 right-10 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-md relative overflow-hidden"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={theme === "dark" ? "sun" : "moon"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </motion.div>
                </AnimatePresence>
                <span className="sr-only">Toggle theme</span>
            </Button>
        </motion.div>
    );
};

export default ThemeToggle;
