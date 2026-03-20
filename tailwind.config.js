/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#dc2626", // Red-600 from palette
          light: "#ef4444", // Red-500 for hovers
          dark: "#991b1b", // Red-800 for text
        },
        secondary: {
          DEFAULT: "#ece0cc", // Cream Background
          dark: "#ffd788", // Light gold
        },
        brown: {
          DEFAULT: "#8B5E3C", // Soft Brown Accent
          light: "#A07050",
        },
        accent: {
          DEFAULT: "#f8bf51", // Golden CTA Buttons
          hover: "#ffd788",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-inter)", "monospace"],
      },
    },
  },
  plugins: [],
};
