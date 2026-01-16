import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-stardom)', 'sans-serif'],
        amsterdam: ['var(--font-amsterdam)', 'cursive'],
        body: ['var(--font-switzer)', 'sans-serif'],
        brand: ['var(--font-outfit)', 'sans-serif'],
        futura: ['var(--font-jost)', 'sans-serif'],
        sans: ['var(--font-switzer)', 'sans-serif'], // Default sans to Switzer
        serif: ['var(--font-playfair-display)', 'serif'],
        script: ['var(--font-italianno)', 'cursive'],
        stardom: ['var(--font-stardom)', 'sans-serif'],
        switzer: ['var(--font-switzer)', 'sans-serif'],
        geist: ['var(--font-geist)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
    colors: {
      cream: '#F9F8F4',
      charcoal: '#222222',
      forest: '#1A3C34',
      gold: '#C5A368',
      'gold-light': '#E5D3B3',
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: {
          height: '0',
        },
        to: {
          height: 'var(--radix-accordion-content-height)',
        },
      },
      'accordion-up': {
        from: {
          height: 'var(--radix-accordion-content-height)',
        },
        to: {
          height: '0',
        },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      'infinite-scroll': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
      },
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      float: 'float 6s ease-in-out infinite',
      'infinite-scroll': 'infinite-scroll 40s linear infinite',
      'marquee': 'marquee 25s linear infinite',
      'fade-in-up': 'fadeInUp 1s ease-out forwards',
      'marquee-slow': 'marquee 60s linear infinite',
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
