/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Lora"', 'Georgia', 'serif'],
      },
      colors: {
        void:         'var(--c-void)',
        surface:      'var(--c-surface)',
        'surface-hi': 'var(--c-surface-hi)',
        rim:          'var(--c-rim)',
        gold:         'var(--c-gold)',
        'gold-dim':   'var(--c-gold-dim)',
        ink:          'var(--c-ink)',
        'ink-dim':    'var(--c-ink-dim)',
        worship:      'var(--c-worship)',
        love:         'var(--c-love)',
        right:        'var(--c-right)',
        wrong:        'var(--c-wrong)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(14px, -10px) scale(1.04)' },
          '66%':      { transform: 'translate(-10px, 12px) scale(0.97)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':   'fade-in 0.4s ease-out both',
        'slide-up':  'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'drift':     'drift 14s ease-in-out infinite',
        'float':     'float 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
      },
    },
  },
  plugins: [],
};
