/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#008d62',
      },
      backgroundImage: {
        banner: `url('../public/images/banner11.jpg')`,
        banner1: `url('../public/images/banner11.jpg')`,
        banner2: `url('../public/images/banner22.jpg')`,
        
      },
    },
  },
  plugins: [],
};
