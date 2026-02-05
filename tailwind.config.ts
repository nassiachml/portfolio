import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bordeaux: {
          50: "#faf5f5",
          100: "#f5ebeb",
          200: "#ead6d6",
          300: "#d9b8b8",
          400: "#c49494",
          500: "#b07070",
          600: "#9c5a5a",
          700: "#8b4a4a",
          800: "#7a3d3d",
          900: "#6b3333",
          950: "#4d1f1f",
        },
        // Couleurs par catégorie portfolio
        dev: {
          // Développement - Bleu (tech)
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Sites internet (bleu)
        siteInternet: {
          200: "#93c5fd",
          300: "#60a5fa",
          400: "#3b82f6",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#1e3a8a",
        },
        // Petits code (teal / cyan)
        petitCode: {
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        graphisme: {
          // Graphisme - Violet/Purple (créatif)
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        communication: {
          // Communication - Orange/Jaune (social)
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        webtv: {
          // WebTV et loisirs - Vert/Emerald (dynamique)
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        audiovisuel: {
          // Audiovisuel - Rose/Pink (média)
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9f1239",
          900: "#831843",
        },
        dark: {
          bg: "#0a0a0a",
          surface: "#111111",
          card: "#1a1a1a",
          border: "#2a2a2a",
        },
        // Palette bien-être FitTrack (introspective, élégante)
        wellness: {
          beige: "#F4F1EC",
          sand: "#E8E4DE",
          brown: "#3A2F28",
          "brown-light": "#5C4D44",
          sage: "#8FAF9A",
          "sage-light": "#A8C4B5",
          "sage-muted": "#6B8A7A",
          black: "#1E1E1E",
          "off-white": "#FAFAF8",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-bordeaux": "linear-gradient(135deg, #6b3333 0%, #7a3d3d 50%, #8b4a4a 100%)",
        "gradient-dev": "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
        "gradient-site-internet": "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
        "gradient-petit-code": "linear-gradient(135deg, #134e4a 0%, #0d9488 50%, #2dd4bf 100%)",
        "gradient-graphisme": "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #8b5cf6 100%)",
        "gradient-communication": "linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f97316 100%)",
        "gradient-webtv": "linear-gradient(135deg, #14532d 0%, #16a34a 50%, #22c55e 100%)",
        "gradient-audiovisuel": "linear-gradient(135deg, #831843 0%, #db2777 50%, #ec4899 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

