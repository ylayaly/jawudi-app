/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./slices/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
        'xs': '479px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1380px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px'
    },
    extend: {
      spacing:{
        7 : '1.75rem',
        18 : '4.5rem',
        22 : '5.5rem',
        26 : '6.5rem',
        33 : '8.25rem',
        39 : '9.75rem',
        46 : '11.5rem',
        74 : '18.5rem',
        76 : '19rem',
        109 : '23vw',
        110 : '27.5rem',
        112 : '28rem',
        114 : '28.25rem',
        120 : '30rem',
        144 : '36rem',
        160 : '40rem',
        166 : '41.5rem',
        180 : '45rem',
        200 : '50rem',
        220 : '55rem',
        256 : '64rem',
        280 : '70rem',
        296 : '74rem',
        'header' : 'var(--header-height)',
        'slide' : 'calc((23vw * 4) + 2.25rem)',
        'slide-t' : 'calc(30vw + 0.75rem)',
        'slide-w' : 'calc(23vw + 0.75rem)'
      },
      colors: {
        "jw" : {
          "turquoise-1" : "#50D6D1",
          "turquoise-2" : "#247F8C",
          "turquoise-3" : "#83FCF7",
          "turquoise-4" : "#64D6AC",
          "turquoise-5" : "#16546D",
          "turquoise-6" : "#309E9A",
          "dark-blue" : "#051834",
          "blue-1" : "#091832",
          "blue-2" : "#18AED1",
          "blue-3" : "#159EC0",
          "green-1" : "#83FCBA",
          "green-2" : "#81E1AF",
          "green-3" : "#2B8D93",
          "green-4" : "#3BBCC4",
          "green-5" : "#4a957e",
          "green-6" : "#268689",
          "green-7" : "#1F6D7D",
          "green-8" :"#87B9C0",
          "gray" : "#C6C6C6",
          "gray-2": "#707070",
          "gray-3": "#A8A8A8",
          "gray-4" : "#C9C9C9",
          "gray-5" : "#BCBCBC",
          "golden" : "#E1C381"
        }
      },
      height: {
        'hero': '74rem',
        'simple-hero' : "56.5rem"
      },
      maxWidth: (theme) => ({
        'max': '2560px',
        ...theme('spacing')
      }),
      minWidth: (theme) => ({
        ...theme('spacing')
      }),
      minHeight: (theme) => ({
        'hero': '90vh',
        ...theme('spacing')
      }),
      maxHeight: {
        'hero' : 'calc(100vh - var(--header-height))'
      },
      fontSize : {
        '1.5' : "6px",
        'xxs' : "7px",
        2 : "8px",
        '9' : "9px",
        '22' : "1.375rem",
        'h1' : "2rem",
        'h3' : "1.75rem",
        'h6' : ".67rem",
        '11' : '2.75rem',
        '13' : '3.25rem'
      },
      letterSpacing: {
        lg: '.1em',
        widest: '.2em',
        '2lg': '.2em',
        xl: '.3em',
      },
      fontFamily : {
        'lato': ['lato'],
        'aeonik': ['Aeonik'],
        'helvetica': ['Helvetica Neue'],
        'neutrafaceText': ['Neutraface Text'],
        'neutrafaceCondensed': ['Neutraface Condensed'],
        'neutrafaceCondensedTitling': ['Neutraface Condensed Titling'],
        'neutrafaceDisplay': ['Neutraface Display'],
        'neutrafaceDisplayTitling': ['Neutraface Display Titling']
      },
      transitionProperty: {
        'spacing': 'margin, padding',
      },
      backgroundSize: {
        '110x' : '110%',
        '150x' : '150%'
      },
      marginLeft: {
        "1/4" : "25%"
      },
      borderWidth: {
        '3': '3px',
      },
      keyframes: {
        show: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        showNext: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.7' },
        },
        hide: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        showMobile: {
          '0%': { opacity: '0', 'maxHeight': '0rem' },
          '100%': { opacity: '1', 'maxHeight': '80rem' },
        },
        hideMobile: {
          '0%': { opacity: '1', 'maxHeight': '80rem' },
          '100%': { opacity: '0', 'maxHeight': '0rem' },
        },
        showFull: {
          '0%': { 'width': '0px' },
          '100%': { 'width': '100%' },
        },
        pulseBtn: {
          '0%': { 'transform': 'scale(1.0)', 'border-width' : '3px' },
          '100%': { 'transform': 'scale(1.4)', 'border-width' : '1px'},
        },
        upQR: {
          '0%': { 'bottom': '-50%' },
          '100%': { 'bottom': '0%'},
        },
        pulseTextQR: {
          '0%': { color: 'rgba(255,255,255,0.3)' },
          '50%': { color: 'rgba(255,255,255,1)' },
          '100%': { color: 'rgba(255,255,255,0.3)' },
        },
      },
      animation: {
        show: 'show 1s ease-in-out',
        showNext: 'showNext 1s ease-in-out',
        hide: 'hide 1s ease-in-out',
        showMobile: 'showMobile 1s ease-in-out',
        hideMobile: 'hideMobile 1s ease-in-out',
        showFull: 'showFull 3s ease-in-out',
        showFullDark: 'showFull 3s ease-in-out',
        pulseBtn: 'pulseBtn 3s linear infinite',
        upQR: 'upQR 3s ease-in-out',
        pulseTextQR: 'pulseTextQR 2s linear infinite'
      },
      borderRadius: {
        'xxl': '14px',
        '4xl': '1.8rem'
      },
      zIndex: {
        'form': '200',
      },
      gridTemplateColumns : {
        'hero-video': '1.4fr 0.6fr',
        'hero-image': '1.3fr 0.7fr',
        'hero-image-mobile': '1.5fr 0.5fr',
        'hero-image-mobile-text': '1.7fr 0.3fr',
        'tabs-products': '0.25fr 0.5fr 0.25fr',
      },
      gridTemplateRows : {
        'goal-fund': '0.4fr 0.6fr',
      },
      fontWeight: {
        'book' : 350
      },
      flex: {
        'full': '0 0 auto'
      }
    }
  },
  plugins: [],
}
