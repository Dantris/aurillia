// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import lineClamp from "@tailwindcss/line-clamp";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],   // scan everything under src
    theme: {

    },
    plugins: [lineClamp],
} satisfies Config;
