module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        text: '#F8FAFC',
        muted: '#94A3B8',
        card: '#0B1120',
        border: '#334155',
        primary: '#3B82F6',
        secondary: '#06B6D4',
        'primary-hover': '#2563eb',
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#22c55e',
        surface: {
          50: '#0f172a',
          100: '#111827',
          200: '#111b2e',
          300: '#1e293b',
          400: '#0d1322'
        }
      },
      boxShadow: {
        'glow-primary': '0 25px 60px rgba(59, 130, 246, 0.18)',
        'glow-secondary': '0 25px 60px rgba(6, 182, 212, 0.18)',
        inner: 'inset 0 1px 0 rgba(255,255,255,0.06)'
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' }
        }
      },
      animation: {
        'pulse-slow': 'pulse-slow 10s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};