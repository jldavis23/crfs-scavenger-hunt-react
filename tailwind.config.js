/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        cabinSketch: ['Cabin Sketch', 'sans-serif'],
        monterrat: ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#74795a",
          "secondary": "#9e5d44",
          "accent": "#dbdfd6",
          "neutral": "#f4f4f4",
          "base-100": "#ffffff",
          "info": "#aebdf8",
          "success": "#b6bab0",
          "error": "#f4cccd",
        },
      }
    ]
  }
}

