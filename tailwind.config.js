/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F2E7',
        ink: '#000000',
        cyan: '#00FFFF',
        /* Semantic Color Roles (Dynamic based on data-preset) */
        canvas: 'rgb(var(--rgb-canvas) / <alpha-value>)',
        struct: 'rgb(var(--rgb-struct) / <alpha-value>)',
        accent: 'rgb(var(--rgb-accent) / <alpha-value>)',
        relief: 'rgb(var(--rgb-relief) / <alpha-value>)',

        /* Legacy Aliases (to prevent breakage before full refactor) */
        primary: 'rgb(var(--rgb-canvas) / <alpha-value>)',  
        mono: '#6B7AA1',
        background: 'rgb(var(--rgb-canvas) / <alpha-value>)',
        foreground: 'rgb(var(--rgb-struct) / <alpha-value>)',
        'nav-bg': 'rgb(var(--rgb-canvas) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--al-font)'],
        mono: ['var(--al-mono)'],
        geist: ['Geist', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        nb: '6px 6px 0 0 var(--foreground)',
        'nb-lg': '8px 8px 0 0 var(--foreground)',
        'nb-w': '6px 6px 0 0 #FFF',
      },
      borderWidth: {
        nb: '2px',
      },
      borderRadius: {
        nb: '0px',
      },
      letterSpacing: {
        widest2: '0.18em',
      },
      keyframes: {
        'bob-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'bounce-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'bob-y': 'bob-y 1.6s ease-in-out infinite',
        'bounce-x': 'bounce-x 1s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
    },
  },
  plugins: [],
};
