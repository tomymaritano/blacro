// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        grotesk: ['var(--font-darker-grotesque)', ...defaultTheme.fontFamily.sans],
        familjen: ['var(--font-familjen-grotesk)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#171717',
        secondary: '#fffcf7',
      },
    },
  },
  plugins: [],
};