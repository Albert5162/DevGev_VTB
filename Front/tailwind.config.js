module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extends: {
      colors: {
        blue: {
          '50': '#EBF3FE', 
          '100': '#D8E6FC', 
          '200': '#B0CDF9', 
          '300': '#89B5F7', 
          '400': '#629CF4', 
          '500': '#3A83F1', 
          '600': '#316FCC', 
          '700': '#225094', 
          '800': '#14315C', 
          '900': '#0B1D37', 
        }
      },
      textColor: {
        blue: {
          '50': '#EBF3FE', 
          '100': '#D8E6FC', 
          '200': '#B0CDF9', 
          '300': '#89B5F7', 
          '400': '#629CF4', 
          '500': '#3A83F1', 
          '600': '#316FCC', 
          '700': '#225094', 
          '800': '#14315C', 
          '900': '#0B1D37', 
        }
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
