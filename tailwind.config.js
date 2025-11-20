/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}', // ← ADD THIS
    './src/**/*.{js,jsx,ts,tsx}', // ← Optional, covers most cases
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#EB4335',
        primary_gray: '#3A3A42',
        secondary_gray: '#9A9AA3',
        gray_icon: '#6E6E76',
      },
    },
  },
  plugins: [],
};
