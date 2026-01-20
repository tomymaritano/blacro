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
        sans: ['var(--font-familjen-grotesk)', ...defaultTheme.fontFamily.sans],
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        grotesk: ['var(--font-darker-grotesque)', ...defaultTheme.fontFamily.sans],
        familjen: ['var(--font-familjen-grotesk)', ...defaultTheme.fontFamily.sans],
        darker: ['var(--font-darker-grotesque)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#171717',
        secondary: '#fffcf7',
        background: '#FFFDF9',
        foreground: '#171717',
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#71717a',
        },
        accent: {
          DEFAULT: '#f4f4f5',
          foreground: '#171717',
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.8)',
          secondary: '#272727',
        },
      },
      fontSize: {
        // Mobile sizes
        'hero-subtitle-sm': ['0.875rem', { lineHeight: '1.5' }],      // 14px
        'hero-title-sm': ['1.25rem', { lineHeight: '1.3' }],          // 20px
        'footer-sm': ['0.875rem', { lineHeight: '1.5' }],             // 14px
        'footer-copyright-sm': ['0.75rem', { lineHeight: '1.5' }],    // 12px

        // Desktop sizes (from Figma)
        'hero-subtitle': ['1.5625rem', { lineHeight: '1.5' }],        // 25px
        'hero-title': ['2.5rem', { lineHeight: '1.3' }],              // 40px
        'footer-lg': ['1.375rem', { lineHeight: '1.5' }],             // 22px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        'navbar': '5rem',      // 80px
        'footer': '4.5rem',    // 72px approx
      },
      aspectRatio: {
        'hero': '4 / 3',
      },
      animation: {
        'marquee-left': 'marquee-left 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slider-fade': 'sliderFade 0.8s ease-in-out',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        sliderFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#171717',
            fontFamily: 'Darker Grotesque, sans-serif',
          },
        },
      },
    },
  },
  plugins: [],
};
