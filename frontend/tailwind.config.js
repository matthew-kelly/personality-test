module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e9c376',
        secondary: '#dfb8ac',
      },
      backgroundImage: {
        'page-background-mobile': `url('/img/bg.jpg')`,
        'page-background-desktop': `url('/img/bg--desktop.jpg')`,
        'checkbox-checked': `url('/img/checkbox--checked.svg')`,
        'checkbox-unchecked': `url('/img/checkbox--unchecked.svg')`,
      },
      borderWidth: {
        1: '1px',
      },
    },
    fontFamily: {
      sans: ['"Nunito Sans"'],
      serif: ['"Roboto Slab"'],
      display: ['Mirage'],
      handwriting: ['BrittanySignature'],
    },
  },
  plugins: [],
};
