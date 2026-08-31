/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        os: {
          bg: '#0a0e17',
          surface: '#111827',
          raised: '#1a2235',
          overlay: '#1e293b',
          border: '#1e293b',
          accent: '#38bdf8',
          'accent-dim': '#0e7490',
          text: '#e2e8f0',
          muted: '#94a3b8',
          dim: '#64748b',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
          purple: '#a78bfa',
          pink: '#f472b6',
          orange: '#fb923c',
          green: '#4ade80',
        },
      },
      animation: {
        'window-open': 'windowOpen 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        windowOpen: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
