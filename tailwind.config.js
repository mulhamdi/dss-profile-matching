/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'miku': {
          DEFAULT: '#39D0FF', // Main Miku blue
          'dark': '#2BA3CC', // Darker shade for hover
          'light': '#7DE0FF', // Lighter shade for accents
          'accent': '#FF69B4', // Pink accent
          'accent-dark': '#FF1493', // Darker pink for hover
          'accent-light': '#FFB6C1', // Light pink for subtle accents
        },
        'dark': {
          DEFAULT: '#111827',
          'lighter': '#1F2937',
          'light': '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
} 