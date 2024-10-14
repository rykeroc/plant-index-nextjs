import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        container: "var(--container)",

        primary: "var(--primary)",
        secondary: "var(--secondary)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",

        error: "var(--error)",
      },
    },
  },
  plugins: [],
};
export default config;
