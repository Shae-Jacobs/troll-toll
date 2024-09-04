/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'accent-1': '#CEEAFF',
        'accent-2': '#9DCCF1',
        'accent-3': '#69B1E9',
        'accent-4': '#1D7ECA',
        'accent-5': '#03045E',
        'accent-bg': '#F3FBFF',
      },
    },
  },
  plugins: [],
}
