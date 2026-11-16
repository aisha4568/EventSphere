export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050B1B',
        bgAlt: '#0B1530',
        card: '#111E38',
        primary: '#3987FF',
        accent: '#8957FF',
        text: '#FFFFFF',
        muted: '#A8B4CC',
      },
      borderColor: { DEFAULT: 'rgba(255,255,255,0.10)' },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3987FF 0%, #8957FF 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(57,135,255,0.15) 0%, rgba(137,87,255,0.15) 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(57,135,255,0.35)',
        'glow-purple': '0 0 40px rgba(137,87,255,0.35)',
        card: '0 8px 32px rgba(0,0,0,0.4)',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        pulse2: 'pulse2 2s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulse2: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
      },
    },
  },
  plugins: [],
};