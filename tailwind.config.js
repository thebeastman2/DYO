/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          base: '#070808',
          panel: '#101214',
          card: '#17191C',
          elevated: '#1C1F23',
          line: 'rgba(255,255,255,0.06)',
          lineHi: 'rgba(255,255,255,0.10)',
        },
        emerald: {
          DEFAULT: '#10B981',
          deep: '#059669',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        amber: {
          DEFAULT: '#D97706',
          soft: '#F59E0B',
          muted: '#92400E',
        },
        crimson: {
          DEFAULT: '#9f1239',
          soft: '#E11D48',
          muted: '#7f1d1d',
        },
        slate: {
          soft: '#8B929C',
          text: '#F4F5F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest: '0.18em',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'mesh': 'mesh 20s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'drift': 'drift 24s linear infinite',
        'scan': 'scanline 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        mesh: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(3%, -2%) scale(1.05)' },
          '66%': { transform: 'translate(-2%, 3%) scale(0.98)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-50%, -50%)' },
        },
      },
      boxShadow: {
        glass: '0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)',
        emerald: '0 0 12px rgba(16,185,129,0.15), inset 0 0 8px rgba(16,185,129,0.04)',
        card: '0 2px 8px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
};
