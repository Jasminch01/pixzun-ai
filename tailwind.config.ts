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
        "button-gradient":
          "linear-gradient(104deg, #BB25D8 -4.77%, #3444D8 100%)",
        "shape-gradient": "linear-gradient(120deg, #A42BD8, #6531F6)",
        "bg-lighter":
          "linear-gradient(to bottom, rgba(187, 37, 216, 0.5) 5%, rgba(43, 46, 61, 0.0))",
        "bg-gradient": "linear-gradient(to right, #191B27, #2B2E3D)",
        "border-gradient": "linear-gradient(180deg, #672a73, #2B2D3C)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      lineHeight: {
        "extra-loose": "1.5",
      },
    },
  },
  plugins: [],
};
export default config;
