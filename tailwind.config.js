/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: 
      {
        brand: '#008d62',
        primary: {
          '100': '#E6FFFA',
            '200': '#B2F5EA',
            '300': '#81E6D9',
            '400': '#4FD1C5',
            '500': '#38B2AC',
            '600': '#319795',
            '700': '#2C7A7B',
            '800': '#285E61',
            '900': '#234E52',
        }
      },
      backgroundImage: {
        banner: `url('../public/images/banner11.jpeg')`,
        banner1: `url('../public/images/banner22.jpeg')`,
        
        
      },
      
    },
  },
  plugins: [],
};
