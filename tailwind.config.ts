import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#030712",
        panel: "rgba(8, 20, 38, 0.6)",
        neon: "#22d3ee",
        positive: "#22c55e",
        negative: "#ef4444"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.3), 0 8px 24px rgba(34,211,238,0.15)",
        card: "0 10px 40px rgba(2, 6, 23, 0.6)"
      },
      backdropBlur: {
        xs: "2px"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(34,211,238,0.15) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
