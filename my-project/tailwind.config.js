/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        extendPurple: '#9f59d1',
        extendBlack: '#303030',
        extendLightPurple: '#a274c8',
        extendLightGray: '#c7c7c7',
        extendGrayText: '#797979'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
