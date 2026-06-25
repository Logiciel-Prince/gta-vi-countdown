/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Themeable tokens driven by CSS custom properties (see styles/index.css)
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--bg-soft) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        neon: {
          pink: 'rgb(var(--neon-pink) / <alpha-value>)',
          purple: 'rgb(var(--neon-purple) / <alpha-value>)',
          blue: 'rgb(var(--neon-blue) / <alpha-value>)',
          orange: 'rgb(var(--neon-orange) / <alpha-value>)',
        },
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgb(var(--accent) / 0.55), 0 0 60px rgb(var(--accent) / 0.25)',
        'glow-lg': '0 0 30px rgb(var(--accent) / 0.65), 0 0 90px rgb(var(--accent-2) / 0.35)',
        card: '0 10px 40px -10px rgb(0 0 0 / 0.5)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, rgb(var(--neon-pink)), rgb(var(--neon-purple)) 50%, rgb(var(--neon-blue)))',
        'sunset': 'linear-gradient(180deg, rgb(var(--neon-orange)), rgb(var(--neon-pink)) 55%, rgb(var(--neon-purple)))',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridmove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 40px' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        gridmove: 'gridmove 4s linear infinite',
      },
    },
  },
  plugins: [],
}
