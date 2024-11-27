/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT"


export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'almost3XL': '1800px',
    },
    extend: {keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
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
