import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(0, 173, 239)',
        'secondary':'rgb(255, 205, 56)',
        'default':'rgb(255, 255, 255)',
        'inputbg': 'rgb(246, 246, 246)',
        'inputbgsecond': 'rgb(249, 249, 249)',
        'placeholder':'rgb(127, 132, 136)',
      },
    },
  },
  plugins: [],
};
export default config;
