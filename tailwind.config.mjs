/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#ffed76',
        customWhite: '#ffffff',
        customRed: '#d24c07',
        customBlue: '#004aad',
      },
    },
  },
  plugins: [],
};