/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Same token names the app already used, remapped to a brand new
        // "signal" palette: electric indigo + coral on a soft violet-white base.
        ink: '#171123',
        'ink-soft': '#241A38',
        'ink-line': '#3A2C54',
        porcelain: '#F5F3FC',
        'porcelain-dim': '#EAE5F8',
        gold: '#5B3DF5',
        'gold-soft': '#8A72FF',
        teal: '#12B76A',
        slate: '#6F6B85',
        coral: '#FF5A3C',
        'coral-soft': '#FF8266',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -6px rgba(91,61,245,0.45)',
        'glow-teal': '0 0 40px -6px rgba(18,183,106,0.45)',
        'glow-coral': '0 0 40px -6px rgba(255,90,60,0.45)',
        card: '0 20px 60px -20px rgba(23,17,35,0.18)',
        'card-dark': '0 20px 60px -20px rgba(0,0,0,0.5)',
      },
      keyframes: {
        'spotlight-pulse': {
          '0%, 100%': { opacity: 0.35, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-10px) translateX(6px)' },
        },
        'blob-morph': {
          '0%, 100%': { borderRadius: '42% 58% 65% 35% / 45% 40% 60% 55%', transform: 'rotate(0deg) scale(1)' },
          '33%': { borderRadius: '65% 35% 40% 60% / 55% 65% 35% 45%', transform: 'rotate(8deg) scale(1.04)' },
          '66%': { borderRadius: '35% 65% 55% 45% / 40% 50% 50% 60%', transform: 'rotate(-6deg) scale(0.98)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.4 },
          '40%': { transform: 'scale(1)', opacity: 1 },
        },
        'wave-bar': {
          '0%, 100%': { transform: 'scaleY(0.25)' },
          '50%': { transform: 'scaleY(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'drift-particle': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(-120px) translateX(20px)', opacity: 0 },
        },
        'pop-in': {
          '0%': { opacity: 0, transform: 'scale(0.9) translateY(10px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'ring-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(91,61,245,0.35)' },
          '50%': { boxShadow: '0 0 0 10px rgba(91,61,245,0)' },
        },
        'ring-pulse-teal': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(18,183,106,0.35)' },
          '50%': { boxShadow: '0 0 0 10px rgba(18,183,106,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.7) rotate(0deg)' },
          '50%': { opacity: 1, transform: 'scale(1.15) rotate(20deg)' },
        },
        'underline-in': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'sheen-sweep': {
          '0%': { transform: 'translateX(-150%) skewX(-15deg)' },
          '100%': { transform: 'translateX(250%) skewX(-15deg)' },
        },
        'rise-fade': {
          '0%': { opacity: 0, transform: 'translateY(14px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spotlight-pulse': 'spotlight-pulse 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'blob-morph': 'blob-morph 12s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(.16,1,.3,1) forwards',
        'bounce-dot': 'bounce-dot 1.4s ease-in-out infinite',
        'wave-bar': 'wave-bar 1s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'drift-particle': 'drift-particle 5s ease-in infinite',
        'pop-in': 'pop-in 0.5s cubic-bezier(.16,1,.3,1) forwards',
        'gradient-pan': 'gradient-pan 4s ease infinite',
        'ring-pulse': 'ring-pulse 2.2s ease-out infinite',
        'ring-pulse-teal': 'ring-pulse-teal 2.2s ease-out infinite',
        marquee: 'marquee 22s linear infinite',
        sparkle: 'sparkle 2.6s ease-in-out infinite',
        'underline-in': 'underline-in 0.35s cubic-bezier(.16,1,.3,1) forwards',
        'sheen-sweep': 'sheen-sweep 1.8s ease-in-out infinite',
        'rise-fade': 'rise-fade 0.6s cubic-bezier(.16,1,.3,1) forwards',
        wiggle: 'wiggle 0.5s ease-in-out',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
};
