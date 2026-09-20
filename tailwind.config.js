/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#09090b',   // zinc-950 — app background
          raised: 'rgba(24, 24, 27, 0.50)',  // zinc-900/50 — floating panels
          overlay: 'rgba(24, 24, 27, 0.80)', // zinc-900/80 — overlays
        },
        cyan: {
          accent: '#06b6d4',      // softer cyan-500
          glow: 'rgba(6, 182, 212, 0.18)',
        },
        emerald: {
          accent: '#34d399',
        },
        amber: {
          accent: '#fbbf24',
        },
        sky: {
          accent: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.18)',
        'glow-cyan-lg': '0 0 30px rgba(6, 182, 212, 0.28)',
        'glow-emerald': '0 0 12px rgba(52, 211, 153, 0.20)',
        'glow-amber': '0 0 12px rgba(251, 191, 36, 0.15)',
        'filament': '0 0 8px rgba(56, 189, 248, 0.50)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.40)',
      },
      borderColor: {
        'edge': 'rgba(255, 255, 255, 0.06)',
        'edge-hover': 'rgba(255, 255, 255, 0.12)',
        'edge-subtle': 'rgba(255, 255, 255, 0.04)',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-spin': 'spin 4s linear infinite',
        'filament-pulse': 'filament-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'filament-pulse': {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
