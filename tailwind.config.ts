import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './frontend/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fff8fb',
          100: '#fff0f7',
          200: '#fbd5e8',
          300: '#f7b8d9',
          400: '#f498c8',
          500: '#ed75b5',
          600: '#d94d9b',
          700: '#b83d83',
          800: '#8e3269',
          900: '#752b57',
          950: '#67234e',
        },
        amor: {
          ink: '#40263a',
          muted: '#856b7d',
          line: '#f0c7dd',
          surface: '#ffffff',
          'surface-subtle': '#fff5fa',
          dark: {
            bg: '#1f131c',
            surface: '#2b1a27',
            card: '#382233',
            border: '#53324c',
            text: '#fdf2f8',
            muted: '#c49eb7',
          },
        },
      },
      fontFamily: {
        sans: ['"Quicksand"', '"Nunito"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        amor: '0 8px 30px rgba(184, 61, 131, 0.08)',
        'amor-hover': '0 12px 36px rgba(184, 61, 131, 0.16)',
        'amor-pressed': 'inset 0 2px 4px rgba(184, 61, 131, 0.12)',
        'amor-glow': '0 0 20px rgba(237, 117, 181, 0.4)',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
