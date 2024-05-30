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
        primary: "#BB25D8",
      },
      backgroundColor: {
        primary: "#BB25D8",
        secondary: "#2B2E3D",
      },
      backgroundImage: {
        "button-gradient": "linear-gradient(to right, #BB25D8, #3444D8)",
        "bg-lighter":
          "linear-gradient(to bottom, rgba(187, 37, 216, 0.5) 5%, rgba(43, 46, 61, 0.5))",
        "bg-gradient": "linear-gradient(to right, #191B27, #2B2E3D)",
        "border-gradient": "linear-gradient(180deg, #672a73, #2B2D3C)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
