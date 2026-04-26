/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkColor: '#151515',
        lightColor: '#52525b',
        lightOrange: '#fca99b',
        lightBlue: '#7688db',
        darkBlue: '#6c7fd8',
        darkText: '#686e7d',
        lightBg: '#f8f8fb',
      },
    },
  },
  plugins: [],
};
