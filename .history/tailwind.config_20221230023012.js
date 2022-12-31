/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F823422',
      },
      backgroundImage: {
        banner: `url('../public/images/banner2.jpg')`,
      },
    },
  },
  plugins: [],
};
