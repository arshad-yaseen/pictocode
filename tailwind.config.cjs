const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
          light: "hsl(var(--error-light))",
          lighter: "hsl(var(--error-lighter))",
          hover: "hsl(var(--error-hover))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          DEFAULT: "var(--gray1)",
          foreground: "var(--gray12)",
          1: "hsl(var(--gray1))",
          2: "hsl(var(--gray2))",
          3: "hsl(var(--gray3))",
          4: "hsl(var(--gray4))",
          5: "hsl(var(--gray5))",
          6: "hsl(var(--gray6))",
          7: "hsl(var(--gray7))",
          8: "hsl(var(--gray8))",
          9: "hsl(var(--gray9))",
          10: "hsl(var(--gray10))",
          11: "hsl(var(--gray11))",
          12: "hsl(var(--gray12))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        border: "var(--shadow-border)",
        small: "var(--shadow-small)",
        "border-small": "var(--shadow-border-small)",
        medium: "var(--shadow-medium)",
        "border-medium": "var(--shadow-border-medium)",
        large: "var(--shadow-large)",
        "border-large": "var(--shadow-border-large)",
        tooltip: "var(--shadow-tooltip)",
        popover: "var(--shadow-dialog)",
        dialog: "var(--shadow-dialog)",
        fullscreen: "var(--shadow-fullscreen)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        inter: ["var(--font-inter)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
