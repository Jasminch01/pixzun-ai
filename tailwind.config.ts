const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BB25D8",
        secondary: "#2B2E3D",
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
          "linear-gradient(to bottom, rgba(187, 37, 216, 0.3), rgba(72, 93, 143, 0.0))",
        "bg-card-lighter":
          "linear-gradient(to bottom, rgba(187, 37, 216, 0.1), rgba(72, 93, 143, 0.0))",
        "bg-lighter2":
          "linear-gradient(to right, rgba(187, 37, 216, 1.05), rgba(72, 93, 143, 1.05))",
        "lighter-gradient":
          "linear-gradient(to right, rgba(187, 37, 216, 0.3), rgba(187, 37, 216, 0.3))",
        "bg-gradient": "linear-gradient(to right, #191B27, #2B2E3D)",
        "border-gradient": "linear-gradient(180deg, #672a73, #672a73)",
        "pricing-gradient":
          "linear-gradient(154deg, #282A38 -22.12%, #32354E 104.23%)",
        "footer-gradient":
          "linear-gradient(0deg, #232633 -70.5%, #2E3037 198.56%)",
        "join-button":
          "linear-gradient(104deg, #BB25D8 -4.77%, #A536E6 47.09%, #9146F3 100%)",
        "gredient-button":
          "linear-gradient(319deg, #3444D8 -41.2%, #E458FF 134.95%)",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
      },
      lineHeight: {
        "extra-loose": "1.5",
      },
    },
  },
  plugins: [],
};
export default config;
