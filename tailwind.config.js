/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#008d62',
      },
      backgroundImage: {
        banner: `url('../public/images/banner2.jpg')`,
      },
    },
  },
  plugins: [],
};
