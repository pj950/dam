import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#D4AF37", // A richer, antique gold
                "background-light": "#F3F4F6",
                "background-dark": "#100c08", // A very dark, warm brown
                "surface-light": "#FFFFFF",
                "surface-dark": "#1C160C", // Dark brown surface
                "text-light": "#1F2937",
                "text-dark": "#E5E7EB",
                "subtext-light": "#6B7280",
                "subtext-dark": "#A1A1AA",
                "border-light": "#E5E7EB",
                "border-dark": "#44341b", // Golden-brown border
                "brand-red": "#991b1b", // Deep red for call to action
            },
            fontFamily: {
                display: ["'Noto Serif SC'", "serif"],
                sans: ["'Noto Serif SC'", "serif"], // Default to serif for this theme
            },
        },
    },
    plugins: [],
};
export default config;
