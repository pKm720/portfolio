/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#fffcf3',
        darkTheme: '#0a0a0a',
        accent: '#ff4d00',
        accentDark: '#e04400',
      },
      fontFamily: {
        Whyte: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        Array: ['Space Grotesk', 'Outfit', 'sans-serif'],
        Ovo: ['Outfit', 'Inter', 'sans-serif'],
        bubblegum: ['"Comic Neue"', 'cursive', 'sans-serif'],
        batman: ['"Cinzel"', '"Bebas Neue"', 'Impact', 'serif'],
        hand: ['Caveat', '"Patrick Hand"', 'cursive'],
        marker: ['"Permanent Marker"', '"Caveat Brush"', 'cursive'],
        doodle: ['"Gaegu"', '"Patrick Hand SC"', '"Finger Paint"', 'cursive'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'star-btn': 'star-rotate 4s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'star-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
