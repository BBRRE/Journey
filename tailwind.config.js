/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT")


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fontMain: 'Lusitiana',
        fontSecondary: 'IBM Plex Mono'
      },
      colors: {
        'primaryBg': {
          light: '#F2F2F2',
          dark: '#A4B8C7'
        },
        'secondaryAc': {
         light: '#9dc79a',
         dark: '#7BB377'
        },
        'teirtiaryAc': '#AAAAAA'
      }
    },
  },
}
)
