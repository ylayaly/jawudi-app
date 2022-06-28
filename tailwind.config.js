/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./slices/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
        xs: '479px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1380px',
        '2xl': '1536px',
        '3xl': '1920px'
    },
    extend: {
      spacing:{
        18 : '4.5rem',
        26 : '6.5rem',
        39 : '9.75rem',
        46 : '11.5rem'
      },
      colors: {
        "jw" : {
          "turquoise-1" : "#50D6D1",
          "turquoise-2" : "#247F8C",
          "dark-blue" : "#051834",
          "green-1" : "#83FCBA",
          "green-2" : "#81E1AF",
          "green-3" : "#2B8D93",
          "green-4" : "#3BBCC4",
          "green-5" : "#4a957e"
        }
      },
      height: {
        'hero': '74rem'
      },
      minHeight: {
        'hero': '90vh',
      },
      fontSize : {
        'xxs' : "7px",
        '9' : "9px",
        '22' : "1.375rem",
        'h1' : "2rem",
        'h3' : "1.75rem",
        'h6' : ".67rem",
        '13' : '3.25rem'
      },
      letterSpacing: {
        widest: '.2em',
        xl: '.3em',
      }
    }
  },
  plugins: [],
}
