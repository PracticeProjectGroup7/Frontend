/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],

  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: [{
      corporate: {
        ...require('daisyui/src/theming/themes')['[data-theme=corporate]'],

        '--rounded-box': '0rem', // border radius rounded-box utility class, used in card and other large boxes
        '--rounded-btn': '0rem', // border radius rounded-btn utility class, used in buttons and similar element
        '--rounded-badge': '0rem', // border radius rounded-badge utility class, used in badges and similar
        '--animation-btn': '0.1s', // duration of animation when you click on button
        '--animation-input': '0.1s', // duration of animation for inputs like checkbox, toggle, radio, etc
        '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
        '--tab-radius': '0rem', // border radius of tabs
      },
    }],
    logs: false,
  },
};

