import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // AnduBer Brand Colors - Dark Mode (Primary)
        plum: {
          50: "#fdf8fa",
          100: "#f5e6ec",
          200: "#e8c9d5",
          300: "#d4a3b8",
          400: "#b87393",
          500: "#8B7355", // muted bronze (text-muted)
          600: "#6d4a5a",
          700: "#3D1525", // background tertiary
          800: "#2A0E1A", // background secondary
          900: "#1E0A14", // background primary (exact logo background)
          950: "#120008",
        },
        teal: {
          50: "#f0fdfc",
          100: "#ccfbf7",
          200: "#99f6ef",
          300: "#5eeade",
          400: "#2DD4BF", // accent teal light (hover states)
          500: "#1A7B7A", // accent teal (logo figures)
          600: "#166564",
          700: "#145251",
          800: "#144142",
          900: "#133636",
          950: "#041a1a",
        },
        gold: {
          50: "#fefdf7",
          100: "#F5E6C8", // accent gold light (glow/highlights)
          200: "#edd9a8",
          300: "#e2c57c",
          400: "#D4AA6A", // accent gold (golden orb)
          500: "#c9956c", // accent copper
          600: "#C9956C", // accent copper (bronze accents)
          700: "#a87545",
          800: "#8a5f3b",
          900: "#724e34",
          950: "#3d281a",
        },
        cream: {
          50: "#FDF8F3", // light mode background primary
          100: "#F5EDE4", // light mode background secondary
          200: "#F5E6C8", // text primary (dark mode)
          300: "#D4A57B", // text secondary (rose gold)
          400: "#C9956C", // copper
          500: "#B8865A", // light mode accent gold
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-gold": "radial-gradient(circle, rgba(212, 170, 106, 0.3) 0%, transparent 70%)",
        "glow-teal": "radial-gradient(circle, rgba(26, 123, 122, 0.3) 0%, transparent 70%)",
        "glow-copper": "radial-gradient(circle, rgba(201, 149, 108, 0.3) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-gold": "0 0 40px rgba(212, 170, 106, 0.3)",
        "glow-gold-lg": "0 0 80px rgba(212, 170, 106, 0.4)",
        "glow-teal": "0 0 40px rgba(26, 123, 122, 0.3)",
        "glow-teal-lg": "0 0 80px rgba(26, 123, 122, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.1)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "glow-pulse-teal": "glowPulseTeal 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "draw-line": "drawLine 2s ease-out forwards",
        "node-pulse": "nodePulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 40px rgba(212, 170, 106, 0.3)" },
          "50%": { boxShadow: "0 0 80px rgba(212, 170, 106, 0.5)" },
        },
        glowPulseTeal: {
          "0%, 100%": { boxShadow: "0 0 40px rgba(26, 123, 122, 0.3)" },
          "50%": { boxShadow: "0 0 80px rgba(26, 123, 122, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        nodePulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
