import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ufc: {
          vinho: "#b62e65",
          dourado: "#e8d2a1",
          dark: "#24272c",
        },
      },
    },
  },
  plugins: [],
};
export default config;