module.exports = {
  darkMode: 'class',
  corePlugins: {
    container: false
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxHeight: {
      'screen-1/3': '33vh',
      'screen-80': '80vh',
    },
    container: {
      center: true,
    },
    extend: {
      spacing: {
        '1.25': '5px',
      },
      margin: {
        '6.5': '26px',
        '8.5': '34px'
      },
      flex: {
        '2': '2 2 0%'
      },
      fontFamily: {
        nobile: ["Nobile", "sans-serif"],
        notosans: ["Noto Sans TC", "sans-serif"]
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'dark-mask': '#00000088',
        'primary': '#0A253E',
        'primary-opacity': '#243B52',
        'secondary': '#F67024',
        'light': "#EDEDED",
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'cyan-450': '#39AFC9',
      },
      transitionProperty: {
        'opacity-and-transform': 'opacity, transform'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '80%',
          '@screen sm': {
            maxWidth: '600px',
          },
          '@screen xl': {
            maxWidth: '1024px',
          },
        },
      })
    }
  ]
}
