/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        night: {
          950: '#05070a',
          900: '#0a0e13',
          850: '#0d1219',
          800: '#111823',
          700: '#1a2330',
          600: '#263344',
        },
        phosphor: {
          50: '#eafff2',
          100: '#c9ffe0',
          200: '#96ffc6',
          300: '#5dfaa6',
          400: '#2ee984',
          500: '#00d26a',
          600: '#00a853',
          700: '#008340',
          800: '#006635',
        },
        amber: {
          glow: '#ffb454',
        },
        hot: {
          400: '#ff5c7a',
          500: '#ff3b5c',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 210, 106, 0.25)',
        'glow-sm': '0 0 12px rgba(0, 210, 106, 0.35)',
        'glow-amber': '0 0 24px rgba(255, 180, 84, 0.25)',
      },
      animation: {
        'blink': 'blink 1.1s step-end infinite',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 4s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.85' },
          '94%': { opacity: '1' },
          '97%': { opacity: '0.9' },
          '98%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
