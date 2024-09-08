/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Adjust paths as needed
    'node_modules/flowbite/**/*.js', // Add this line
  ],
  theme: {
    spacing: {

    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {

    },
    container: {
      center: true,
      padding: {

      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
      forms: true,
      tooltips: true
    }),
  ]
};
